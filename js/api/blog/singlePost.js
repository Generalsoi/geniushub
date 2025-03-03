let API_URL_ORIGIN = "https://geniushubglobal.com/geniusadmin/index.php";

const urlSearchString = window.location.search;

const postSlug = urlSearchString.split("=")[1];

const url = `${API_URL_ORIGIN}/wp-json/wp/v2/posts?_embed&slug=${postSlug}`;

let post;

post = (async () => {
  try {
    const res = await fetch(url);

    const jsonResponse = await res.json();
    const data = jsonResponse[0];

    // hide the spinner after post data loaded
    document.getElementById("loading").style.display = "none";

    const postData = parsePostAPIPayload(data);
    const { id, title, content, imageSource, categoryId } = postData;

    // get html data location
    const postTitleElement = document.getElementById("postTitle");
    const postContentElement = document.getElementById("postContent");
    const backgroundImageElement = document.querySelector(".introduction");

    // append data to html location
    postTitleElement.innerHTML = title.slice(0, 50) + "...";
    postContentElement.innerHTML = content;
    backgroundImageElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageSource})`;
    /*
     * handling related posts
     */

    const relatedPosts = await getRelatedPosts(id, categoryId);

    const relatedPostHeader = document.getElementById("relatedPostHeader");

    // hide Related post header if no related post
    if (relatedPosts.length === 0) {
      relatedPostHeader.style.display = "none";
    }

    relatedPosts.forEach((post) => {
      const {
        title,
        slug,
        excerpt,
        categoryName,
        imageSource,
      } = parsePostAPIPayload(post);

      const singlePostLink = getSinglePostLink(slug);
      const postString = getHtmlStringWithData(
        title,
        excerpt,
        categoryName,
        imageSource,
        singlePostLink
      );

      const postHtml = convertHtmlStringToDomElement(postString);

      const postParent = document.getElementById("relatedPosts");
      postParent.appendChild(postHtml);
    });
  } catch (error) {
    console.log(error);
    //   remove spinner before displaying error message
    document.getElementById("loading").style.display = "none";

    const postParent = document.getElementById("postContent");

    const errorMessage = document.createElement("h5");
    errorMessage.className = "pt-3 text-center";
    errorMessage.innerHTML =
      "Server Error, something went wrong while retrieving post from the server.";
    postParent.appendChild(errorMessage);
  }
})();

// takes a postAPI return object, returns a parsed post object
const parsePostAPIPayload = (payload) => {
  return {
    id: payload.id,
    slug: payload.slug,
    title: payload.title.rendered,
    excerpt: payload.content.rendered.slice(0, 200) + "...",
    content: payload.content.rendered,
    imageSource: payload._embedded["wp:featuredmedia"]?.["0"].source_url,
    categoryId: payload._embedded["wp:term"]["0"][0].id,
    categoryName: payload._embedded["wp:term"]["0"][0].name,
  };
};

// takes categoryId returns an array of related Posts Objects
const getRelatedPosts = async (postId, categoryId) => {
  const relatedPostUrl = `${API_URL_ORIGIN}/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=4`;

  const res = await fetch(relatedPostUrl);

  const data = await res.json();

  const relatedPostsWithoutCurrentPost = data.filter((d) => d.id !== postId);

  return relatedPostsWithoutCurrentPost;
};

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

// takes a dom string, returns a dom object
const convertHtmlStringToDomElement = (domString) =>
  document.createRange().createContextualFragment(domString);

// takes a post_slug, returns single post link
const getSinglePostLink = (postSlug) =>
  window.location.origin + "/blog-post.html?post_title=" + postSlug;
