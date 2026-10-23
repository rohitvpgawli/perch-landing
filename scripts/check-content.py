"""Check the built public site, including no-JS discovery and internal navigation.

Run after npm run build. No third-party Python packages or network access required.
An optional .qa/home-before.html additionally checks the landing body against a
pre-change build. .qa is local and ignored by Git.
"""
import collections
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ORIGIN = "https://perched.fyi"


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.canonical = []
        self.meta = {}
        self.h1 = []
        self.title = ""
        self.schemas = []
        self.main_events = []
        self.main_depth = 0
        self.capture = None
        self.buffer = ""
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if "id" in d:
            self.ids.append(d["id"])
        if tag == "a" and d.get("href"):
            self.links.append(d["href"])
        if tag == "link" and d.get("rel") == "canonical":
            self.canonical.append(d["href"])
        if tag == "meta":
            self.meta[d.get("name", d.get("property"))] = d.get("content", "")
        if tag in ("title", "h1") or (tag == "script" and d.get("type") == "application/ld+json"):
            self.capture = tag
            self.buffer = ""
        if tag == "main":
            self.main_depth += 1
        if self.main_depth:
            normalized = sorted((k, v) for k, v in attrs if not k.startswith("data-astro-"))
            self.main_events.append(("start", tag, normalized))

    def handle_endtag(self, tag):
        if self.main_depth:
            self.main_events.append(("end", tag))
        if tag == "main":
            self.main_depth -= 1
        if tag == self.capture:
            if tag == "h1":
                self.h1.append(" ".join(self.buffer.split()))
            elif tag == "title":
                self.title = self.buffer.strip()
            else:
                self.schemas.append(json.loads(self.buffer))
            self.capture = None

    def handle_data(self, data):
        if self.capture:
            self.buffer += data
        if self.main_depth and data.strip():
            self.main_events.append(("text", data.strip()))


def route_for(file):
    rel = file.relative_to(DIST).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[:-len("index.html")]
    return "/" + rel


docs = {route_for(file): Document(file.read_text()) for file in DIST.rglob("*.html")}
assert len(docs) >= 40, f"Expected the expanded site, found {len(docs)} HTML pages"
indexable = set()
for route, doc in docs.items():
    assert len(doc.h1) == 1, (route, "must have one H1", doc.h1)
    # The unchanged home demo reuses provider SVG gradient IDs. New editorial
    # pages must have unique IDs; the home body is checked against its baseline.
    if route != "/":
        assert len(doc.ids) == len(set(doc.ids)), (route, "duplicate IDs")
    expected = ORIGIN + ("/404/" if route == "/404.html" else route)
    assert doc.canonical == [expected], (route, "canonical", doc.canonical)
    assert doc.meta.get("description"), (route, "missing description")
    assert doc.meta.get("og:url") == expected, (route, "Open Graph URL")
    assert doc.meta.get("og:title") == doc.title, (route, "Open Graph title")
    if "noindex" not in doc.meta.get("robots", ""):
        indexable.add(route)
    for href in doc.links:
        target = urlsplit(href)
        if target.scheme in ("mailto", "tel") or (target.netloc and target.netloc != "perched.fyi"):
            continue
        if not target.path.startswith("/") and target.path:
            raise AssertionError((route, "unexpected relative URL", href))
        path = unquote(target.path) or route
        if path in docs:
            if target.fragment:
                assert unquote(target.fragment) in docs[path].ids, (route, "broken fragment", href)
        else:
            assert (DIST / path.lstrip("/")).is_file(), (route, "broken internal link", href)

sitemap = ET.parse(DIST / "sitemap.xml")
urls = [el.text for el in sitemap.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
assert len(urls) == len(set(urls)), "Duplicate sitemap URLs"
assert set(urls) == {ORIGIN + path for path in indexable}, "Sitemap does not match indexable HTML"
assert "/checkout/" not in indexable and "/404.html" not in indexable
assert "Sitemap: " + ORIGIN + "/sitemap.xml" in (DIST / "robots.txt").read_text()

directory = json.loads((DIST / "resources/content.json").read_text())
new_titles = []
new_descriptions = []
for page in directory["pages"]:
    route = urlsplit(page["url"]).path
    doc = docs[route]
    assert doc.h1 == [page["title"]], (route, "title missing from static HTML")
    assert doc.meta["description"] == page["description"]
    assert doc.schemas, (route, "missing structured data")
    md_path = DIST / urlsplit(page["markdown"]).path.lstrip("/")
    markdown = md_path.read_text()
    assert markdown.startswith("# " + page["title"] + "\n")
    assert page["url"] in markdown and page["lead"] in markdown
    assert page["lead"] in (DIST / "llms-full.txt").read_text()
    new_titles.append(doc.title)
    new_descriptions.append(doc.meta["description"])
assert len(set(new_titles)) == len(new_titles), "Duplicate content titles"
assert len(set(new_descriptions)) == len(new_descriptions), "Duplicate content descriptions"

# Ensure every page is reachable by an ordinary HTML link from the home page.
reachable = {"/"}
queue = collections.deque(["/"])
while queue:
    for href in docs[queue.popleft()].links:
        target = urlsplit(href)
        path = target.path
        if target.netloc and target.netloc != "perched.fyi":
            continue
        if path in docs and path not in reachable:
            reachable.add(path)
            queue.append(path)
assert indexable <= reachable, ("Orphan pages", indexable - reachable)

feed = ET.parse(DIST / "blog/rss.xml")
feed_urls = [item.findtext("link") for item in feed.findall("./channel/item")]
assert set(feed_urls) == {p["url"] for p in directory["pages"] if p["category"] == "blog"}

baseline = ROOT / ".qa/home-before.html"
if baseline.exists():
    before = Document(baseline.read_text()).main_events
    after = docs["/"].main_events
    assert before == after, "Landing-page main content changed"

print(json.dumps({"html_pages": len(docs), "new_detail_pages": len(directory["pages"]), "indexable_urls": len(indexable), "markdown_pages": len(list((DIST / "content").rglob("*.md"))), "rss_articles": len(feed_urls), "internal_links_and_fragments": "passed", "static_content_and_metadata": "passed", "sitemap_and_reachability": "passed", "landing_body": "unchanged" if baseline.exists() else "baseline not supplied"}, indent=2))
