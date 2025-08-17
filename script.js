const API_KEY = "06168f1c3e1e4656b4cab8e0bfc0f536";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',() => fetchNews("India"));
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);

}
function reload() {
    window.location.reload();
}
function bindData(articles){
    const cardscontainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");
    cardscontainer.innerHTML='';

    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardscontainer.appendChild(cardClone);
    })
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;




    const date=new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"blank");
    });
}
let curSelectNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectNav?.classList.remove("active");
    curSelectNav=navItem;
    curSelectNav?.classList.add("active");
}
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('searchText');
searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectNav?.classList.remove("active");
    curSelectNav=null;
});
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
function redirectToPage(url) {
    window.location.href = url;
  }

  const darkModeBtn = document.querySelector('#darkbtn');
  darkModeBtn.addEventListener('click', function onClick(darkMode) {
    darkModeBtn.textContent = 'Light Mode';

  });