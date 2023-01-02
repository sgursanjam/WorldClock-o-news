let news_data = null;
var result1 = localStorage.getItem("result");
console.log(result1);
const getNewsData = async () => {
  var m = document.getElementById("headingnews");
  if (result1 == "Local") {
    m.innerHTML = "Please go back and select your country instead of Local ";
  } else {
    m.innerHTML = "Top News of " + result1;
  }
  await fetch(`https://restcountries.com/v2/name/${result1}?fullText=true`)
    .then((res) => res.json())
    .then((res) => {
      isocode = res[0]["alpha2Code"];
    })
    .catch((err) => {
      console.log(err);
    });

  isocode1 = isocode.toLowerCase();
  console.log(isocode1);
  await fetch(
    `https://newsapi.org/v2/top-headlines?country=${isocode1}&apiKey=398a122378434b528b1bb97dd9b712cb`
  )
    .then((res) => res.json())
    .then((res) => {
      news_data = res.articles;
    })
    .catch((err) => {
      console.log(err);
      error = "Sorry News Not Available";
      return error;
    });
  return news_data;
};

const fetchNews = async () => {
  const data = await getNewsData();
  console.log(data.length);

  const data2 = data
    .map((news) => {
      return `
      <div style="border:2px solid white;background-color:white;color:black; height:40vh;width:40vw;margin-top:2vh;  "> 
      <h3 style="width:80%;margin-left:2rem;"> ${news.title}</h3>;

      <img src=${news.urlToImage} style="height:60%;width:80%;margin-left:2rem;  "/>
      </div> `;
    })
    .join("");

  const n1 = document.getElementById("news_one");
  const n2 = document.getElementById("newstitle");
  n1.innerHTML = data2;
  if (data.length == 0) {
    n2.innerHTML = "Sorry news of this country is not available";
  }
};
fetchNews();
