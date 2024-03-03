const API_KEY="4808b53ae73a4b7e838b427bf8ef5b2e";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',() => fetchnews("India"));

function reload(){
    window.location.reload;
}
async function fetchnews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    
    const newsimg=cardClone.querySelector('#news-img');
    const newstitle=cardClone.querySelector('.news-title');
    const newssource=cardClone.querySelector('.news-source');
    const newsdesc=cardClone.querySelector('.news-desc');

    newsimg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{ timeZone:"Asia/Jakarta"});
    newssource.innerHTML=`${article.source.name} | ${date}`;

    cardClone.firstElementChild.addEventListener('click',() =>{
        window.open(article.url,"_blank");
    })
}
let curselectednav=null;
function onNavitemClick(id){
    fetchnews(id);
    const Navitem=document.getElementById(id);
    curselectednav?.classList.remove('active');
    curselectednav=Navitem;
    curselectednav?.classList.add('active');
}
const searchbutton=document.getElementById("search-button");
const searchtext=document.getElementById("search-text");
searchbutton.addEventListener('click',() =>{
    const query=searchtext.value;
    if(!query) return;
    fetchnews(query); 
    curselectednav?.classList.remove('active');
    curselectednav=null;
});