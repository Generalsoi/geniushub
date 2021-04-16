const urlSearchString = window.location.search;

const postSlug = urlSearchString.split("=")[1];

const url = `https://alert-rooster.jurassic.ninja/wp-json/wp/v2/posts?_embed&slug=${postSlug}`;

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
    const postExcerptElement = document.getElementById("postExcerpt");
    const postContentElement = document.getElementById("postContent");
    const backgroundImageElement = document.querySelector(".introduction");

    // append data to html location
    postTitleElement.innerHTML = title;
    postExcerptElement.innerHTML = content.slice(0, 200) + "...";
    postContentElement.innerHTML = content;
    backgroundImageElement.style.backgroundImage = `url(${imageSource})`;

    /*
     * handling related posts
     */

    const relatedPosts = await getRelatedPosts(categoryId);
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

      console.log(postHtml);

      const postParent = document.getElementById("relatedPosts");
      postParent.appendChild(postHtml);
    });
  } catch (error) {
    //   remove spinner before displaying error message
    document.getElementById("loading").style.display = "none";

    const postParent = document.getElementById("postContent");

    const errorMessage = document.createElement("h5");
    errorMessage.className = "pt-3 text-center";
    errorMessage.innerHTML = "Server Error, something went wrong.";
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
    imageSource: payload._embedded["wp:featuredmedia"]["0"].source_url,
    categoryId: payload._embedded["wp:term"]["0"][0].id,
    categoryName: payload._embedded["wp:term"]["0"][0].name,
  };
};

// takes categoryId returns an array of related Posts Objects
const getRelatedPosts = async (categoryId) => {
  const relatedPostUrl = `https://alert-rooster.jurassic.ninja/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=3`;

  const relatedPostObjects = [];
  const res = await fetch(relatedPostUrl);

  const data = await res.json();

  data.forEach((d) => relatedPostObjects.push(d));

  return relatedPostObjects;
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
  window.location.origin + "/blog-single.html?post=" + postSlug;
