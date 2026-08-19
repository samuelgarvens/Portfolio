#!/usr/bin/env python3
"""
Local dev server that mimics the .htaccess clean-URL rules, so links like
"./illustration" and "./bluesky" resolve to the correct .html file locally,
the same way they resolve on the live (Apache) server.

Usage:
    python3 serve_local.py [port]     (default port 8000)
Then open http://localhost:8000/
"""
import http.server
import os
import sys
import urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

# Pages that share a name with an asset directory -> explicit override,
# mirrors the two hardcoded RewriteRule lines in .htaccess
OVERRIDES = {
    "illustration": "illustration.html",
    "bluesky": "bluesky.html",
}

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        parsed = urllib.parse.urlparse(path)
        clean = parsed.path.strip("/")

        # 1. Explicit overrides (illustration, bluesky), with or without trailing slash
        if clean in OVERRIDES:
            return os.path.join(os.getcwd(), OVERRIDES[clean])

        # 2. General fallback: /page -> page.html, only if "page" isn't a
        #    real file or directory already (mirrors the .htaccess !-d !-f rule)
        if clean and "/" not in clean:
            fs_path = os.path.join(os.getcwd(), clean)
            html_path = fs_path + ".html"
            if not os.path.isdir(fs_path) and not os.path.isfile(fs_path) and os.path.isfile(html_path):
                return html_path

        # 3. Default behavior (serves real files/directories as normal,
        #    e.g. /illustration/i1.webp still works)
        return super().translate_path(path)

if __name__ == "__main__":
    with http.server.HTTPServer(("", PORT), CleanURLHandler) as httpd:
        print(f"Serving {os.getcwd()} at http://localhost:{PORT}/  (Ctrl+C to stop)")
        httpd.serve_forever()
