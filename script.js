const API_KEY = "738af41efe28d187631d17ba081413fc";  // your GNews API key
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("India"));

// Fetch News
async function fetchNews(query) {
  const res = await fetch(
    `${url}${query}&lang=en&country=in&max=10&apikey=${API_KEY}`
  );
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

// Reload page
function reload() {
  window.location.reload();
}

// Bind News Data
function bindData(articles) {
  const cardscontainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardscontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.image) return; // GNews uses "image" instead of "urlToImage"
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardscontainer.appendChild(cardClone);
  });
}

// Fill Data in Card
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.image || "default.jpg"; // fallback if no image
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description || "";

  const date = new Date(article.publishedAt).toLocaleString("en-us", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// Navigation click
let curSelectNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectNav?.classList.remove("active");
  curSelectNav = navItem;
  curSelectNav?.classList.add("active");
}

// Search button
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("searchText");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectNav?.classList.remove("active");
  curSelectNav = null;
});

// Dark mode toggle
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

function redirectToPage(url) {
  window.location.href = url;
}

const darkModeBtn = document.querySelector("#darkbtn");
darkModeBtn.addEventListener("click", function () {
  if (darkModeBtn.textContent === "Dark Mode") {
    darkModeBtn.textContent = "Light Mode";
  } else {
    darkModeBtn.textContent = "Dark Mode";
  }
  darkMode();
});
