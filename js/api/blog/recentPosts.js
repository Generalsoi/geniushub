let API_URL_ORIGIN = "https://alert-rooster.jurassic.ninja";

const url = `${API_URL_ORIGIN}/wp-json/wp/v2/posts?_embed&per_page=3`;

(async () => {
  const postParent = document.getElementById("blogPosts");

  try {
    const res = await fetch(url);

    const data = await res.json();

    // hide the spinner after post data loaded
    document.getElementById("loading").style.display = "none";

    // Iterate through each post and append styled html to it's parent in index.html
    data.forEach((d) => {
      const postData = parsePostAPIPayload(d);

      const { id, slug, title, excerpt, imageSource, categoryName } = postData;

      const singlePostLink = getSinglePostLink(slug);

      const postString = getHtmlStringWithData(
        title,
        excerpt,
        categoryName,
        imageSource,
        singlePostLink
      );

      const postHtml = convertHtmlStringToDomElement(postString);

      postParent.appendChild(postHtml);
    });
  } catch (error) {
    //   remove spinner before displaying error message
    document.getElementById("loading").style.display = "none";
    console.log(error);
    const errorMessage = document.createElement("h5");
    errorMessage.className = "pt-3";
    errorMessage.innerHTML = "Server Error, something went wrong.";
    postParent.appendChild(errorMessage);
  }
})();

/*
    Helper functions
*/

// takes a dom string, returns a dom object
const convertHtmlStringToDomElement = (domString) =>
  document.createRange().createContextualFragment(domString);

// takes a postAPI return object, returns a parsed post object
const parsePostAPIPayload = (payload) => {
  return {
    id: payload.id,
    slug: payload.slug,
    title: payload.title.rendered,
    excerpt: payload.content.rendered.slice(0, 200) + "...",
    imageSource: payload._embedded?.["wp:featuredmedia"]?.["0"].source_url,
    categoryName: payload._embedded["wp:term"]["0"][0].name,
  };
};

// takes a post_slug, returns single post link
const getSinglePostLink = (postSlug) =>
  window.location.origin + "/blog-post.html?post_title=" + postSlug;

// returns htmlString
const getHtmlStringWithData = (
  title,
  excerpt,
  categoryName,
  imageSource,
  singlePostLink
) => {
  return `<div class="col">
    <div class="card h-100">
      <div class="card-head">
        <a href="${singlePostLink}" class="goto"><img src="${imageSource}" class="card-img-top" alt="${title}"></a>
      </div>
      <div class="card-body">
        <h6 class="card-title">${categoryName}</h6>
        <h5 class="card-title"><a href="${singlePostLink}" class="goto">${title}</a></h5>
        <p class="card-text">${excerpt}</p>
      </div>
    </div>
  </div>`;
};
