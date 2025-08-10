import os
import time
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

url = "https://www.pdga.com/mpo-world-rankings-august-6-2025"
base_url = "https://www.pdga.com"

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

table = soup.find("table", class_="worldranking-container")
tbody = table.find("tbody")
rows = tbody.find_all("tr")

# Make sure the folder exists
os.makedirs("mpo_pages", exist_ok=True)

for i, row in enumerate(rows, start=1):
    anchor = row.find("a")
    if not anchor:
        continue  # skip rows without links

    link = urljoin(base_url, anchor["href"])
    body = requests.get(link)

    filename = f"mpo_pages/mpo_{i}.html"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(body.text)
        time.sleep(10)
