const API_URL_ORIGIN = "https://alert-rooster.jurassic.ninja";
const url = `${API_URL_ORIGIN}/wp-json/wp/v2/media`;

let media;

(async () => {
  const res = await fetch(url, { mode: "no-cors" });

  const resJson = await res.json();
  const data = resJson;
  console.log(data);
  data.forEach((d) => {
    const imageSource = d.source_url;

    const imageHtmlString = `<div class="col">
    <img src="${imageSource}" alt="">
  </div>`;

    const imageDomHtml = convertHtmlStringToDomElement(imageHtmlString);
    const postParent = document.getElementById("media");
    postParent.appendChild(imageDomHtml);
  });
})();

const convertHtmlStringToDomElement = (domString) =>
  document.createRange().createContextualFragment(domString);
