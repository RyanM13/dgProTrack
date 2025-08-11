import json
from pathlib import Path

from bs4 import BeautifulSoup

files = Path("mpo_pages")
mpo = [{} for _ in range(100)]

index = 0

for index, file in enumerate(files.iterdir()):
    with open(file, "r") as f:
        html_content = f.read()
        soup = BeautifulSoup(html_content, "html.parser")
        player_content = soup.find("h1", class_="title")
        mpo[index]["name"] = player_content.text
        player_info = soup.find("ul", class_="player-info info-list")
        location = player_info.find("li", class_="location")
        if location:
            mpo[index]["location"] = location.find("a").text

        memberSince = player_info.find("li", class_="join-date")
        if memberSince:
            mpo[index]["Member Since"] = memberSince.find("strong").next_sibling.strip()

        rating = player_info.find("li", class_="current-rating")
        if rating:
            mpo[index]["Rating"] = rating.find("strong").next_sibling.strip()

        wins = player_info.find("li", class_="career-wins disclaimer")
        if wins:
            mpo[index]["Wins"] = wins.find("a").text

        earnings = player_info.find("li", class_="career-earnings")
        if earnings:
            mpo[index]["Earnings"] = earnings.find("strong").next_sibling.strip()


for players in mpo:
    for key, value in players.items():
        print(f"  {key}: {value}")


with open("mpo.json", "w", encoding="utf-8") as f:
    json.dump(mpo, f, ensure_ascii=False, indent=2)
