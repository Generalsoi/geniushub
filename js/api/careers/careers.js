let API_URL_ORIGIN = "https://geniushubglobal.com/geniusadmin/index.php";

const searchInput = document.getElementById("searchQuery");
const searchForm = document.getElementById("search");

searchForm.onsubmit = (event) => {
  event.preventDefault();
  return (window.location.href = `?search=${searchInput.value}#careers`);
};

const urlSearchString = window.location.search;

const searchQuery = urlSearchString.split("=")[1];

let url;

if (searchQuery) {
  url = `${API_URL_ORIGIN}/wp-json/wp/v2/job-listings?search=${searchQuery}`;
} else {
  url = `${API_URL_ORIGIN}/wp-json/wp/v2/job-listings`;
}

(async () => {
  const careerTable = document.querySelector(".jobs").children[2];

  try {
    const res = await fetch(url);

    const data = await res.json();

    if (data.length === 0) {
      document.getElementById("loading").style.display = "none";
      careerTable.innerHTML =
        "<h5 class=text-center>Sorry, no result found</h5>";
      return;
    }

    // hide the spinner after post data loaded
    document.getElementById("loading").style.display = "none";

    // Iterate through each job and append styled html to it's parent in careers.html
    data.forEach(async (d) => {
      const jobData = parsePostAPIPayload(d);

      const { id, slug, title, price, location, jobTypeID } = jobData;

      const jobDataRes = await getJobRole(jobTypeID);
      const jobType = jobDataRes === undefined ? "No role stated" : jobDataRes;

      const jobPrice = price === undefined ? "---" : price;

      const singleJobLink = getSingleJobLink(slug);

      const tableRow = document.createElement("tr");
      tableRow.className = "roles";

      const jobTitle = document.createElement("td");
      jobTitle.className = "role-title";
      jobTitle.innerText = `${title}`;

      const jobPriceRange = document.createElement("td");
      jobPriceRange.style.color = "#F36F21";
      jobPriceRange.innerText = jobPrice;

      const jobRole = document.createElement("td");
      jobRole.innerHTML = `<button class="role-type">${jobType}</button>`;

      const jobLocation = document.createElement("td");
      jobLocation.innerHTML = `<button class="location">${location}</button>`;

      const jobSingleData = document.createElement("td");
      jobSingleData.innerHTML = `<a href="${singleJobLink}"><button class="apply">Apply</button></a>`;

      tableRow.append(
        jobTitle,
        jobPriceRange,
        jobRole,
        jobLocation,
        jobSingleData
      );

      careerTable.appendChild(tableRow);
    });
  } catch (error) {
    console.log(error);
    // remove spinner before displaying error message
    document.getElementById("loading").style.display = "none";

    const errorMessage = document.createElement("h5");
    errorMessage.className = "pt-3 text-center";
    errorMessage.innerHTML = "Server Error, something went wrong.";
    careerTable.appendChild(errorMessage);
  }
})();

// takes a postAPI return object, returns a parsed post object
const parsePostAPIPayload = (payload) => {
  return {
    id: payload.id,
    slug: payload.slug,
    title: payload.title.rendered,
    price: payload.meta._company_tagline,
    location: payload.meta._job_location,
    jobTypeID: payload["job-types"][0],
  };
};

// takes a post_slug, returns single post link
const getSingleJobLink = (jobSlug) => `/career-info.html?job_title=${jobSlug}`;

// get job role
const getJobRole = async (jobTypeID) => {
  const fetchUrl = `${API_URL_ORIGIN}/wp-json/wp/v2/job-types/${jobTypeID}`;

  try {
    const res = await fetch(fetchUrl);

    const data = await res.json();
    return data.name;
  } catch (error) {
    // console.log(error);
  }
};
