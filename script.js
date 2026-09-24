const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const emptyMessage = document.getElementById("empty-message");

function render(items, query) {
  results.innerHTML = "";

  emptyMessage.textContent = `Showing ${items.length} results for "${query}"`;

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.imageinfo[0].thumburl;
    img.alt = item.title;

    const caption = document.createElement("p");
    caption.textContent = item.title;

    card.appendChild(img);
    card.appendChild(caption);

    results.appendChild(card);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();

  // Ignore empty searches
  if (!query) return;

  const url =
    "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12" +
    "&prop=imageinfo&iiprop=url&iiurlwidth=300" +
    "&format=json&origin=*";

  const response = await fetch(url);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  const items = Object.values(data.query.pages);

  render(items, query);
});