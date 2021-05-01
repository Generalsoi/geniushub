let API_URL_ORIGIN = "https://alert-rooster.jurassic.ninja";
const url = `${API_URL_ORIGIN}/wp-json/wp/v2/media`;

(async () => {
  const mediaParent = document.getElementById("media");

  try {
    const res = await fetch(url);

    const resJson = await res.json();

    // hide the spinner after post data loaded
    document.getElementById("loading").style.display = "none";

    const data = resJson;
    data.forEach((d, i) => {
      const imageSource = d.source_url;

      const imageHtmlString = `<div id="imageParent" class="col-lg-4 col-md-4 col-sm-6 mb-3">
    <img src="${imageSource}" width="100% alt="${d.title}">
    <div class="caption">${d.caption.rendered}</div>
  </div>`;

      const imageDomHtml = convertHtmlStringToDomElement(imageHtmlString);
      mediaParent.appendChild(imageDomHtml);
    });
  } catch (error) {
    //   remove spinner before displaying error message
    console.log(error);
    document.getElementById("loading").style.display = "none";

    const errorMessage = document.createElement("h5");
    errorMessage.className = "pt-3 text-center";
    errorMessage.innerHTML = "Server Error, something went wrong.";
    mediaParent.appendChild(errorMessage);
  }
})();

const convertHtmlStringToDomElement = (domString) =>
  document.createRange().createContextualFragment(domString);
