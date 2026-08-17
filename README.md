# Swapify Flask Dev Server

This lightweight Flask server serves the static `HTML` site files and provides a small API for notices.

Prerequisites: Python 3.8+ and `pip`.

Install and run:

```bash
cd "HTML/server_py"
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# macOS / Linux
# source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Server will run on `http://swapify.com`. Open `http://swapify.com/` to test the site with the API.

API endpoints:
- `GET /api/notices` — list notices
- `POST /api/notices` — add a notice (JSON body)
- `DELETE /api/notices` — clear notices

The server writes notices to `notices.json` in the same folder.
