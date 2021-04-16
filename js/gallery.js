const url = "https://alert-rooster.jurassic.ninja/wp-json/wp/v2/media";

let media;

(async () => {
  const res = await fetch(url);

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
