from pathlib import Path

from bs4 import BeautifulSoup

files = Path("fpo_pages")
fpo = [{} for _ in range(100)]
mpo = [{} for _ in range(100)]
index = 0

for index, file in enumerate(files.iterdir()):
    with open(file, "r") as f:
        html_content = f.read()
        soup = BeautifulSoup(html_content, "html.parser")
        player_content = soup.find("h1", class_="title")
        fpo[index]["name"] = player_content.text

with open("fpo.html", "r") as f:
    for index in range(100):
        html_content_rank = f.read()
        soup = beautifulsoup(html_content_rank, "html.parser")
        table = soup.find("table", class_="worldranking-container")
        rank = table.find("span", class_="rank")
        fpo[index]["rank"] = rank.text


for players in fpo:
    print("Processing dictionary:")
    for key, value in players.items():
        print(f"  {key}: {value}")
