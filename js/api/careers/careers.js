let API_URL_ORIGIN = "https://alert-rooster.jurassic.ninja";

const url = `${API_URL_ORIGIN}/wp-json/wp/v2/job-listings`;

(async () => {
  const careerTable = document.querySelector(".jobs").children[2];

  try {
    const res = await fetch(url);

    const data = await res.json();

    // hide the spinner after post data loaded
    document.getElementById("loading").style.display = "none";

    // Iterate through each job and append styled html to it's parent in careers.html
    data.forEach((d) => {
      const jobData = parsePostAPIPayload(d);

      const { id, slug, title, location } = jobData;

      const singleJobLink = getSingleJobLink(slug);

      const tableRow = document.createElement("tr");
      tableRow.className = "roles";

      const jobTitle = document.createElement("td");
      jobTitle.className = "role-title px-5";
      jobTitle.innerText = `${title} (x - time)`;

      const jobPriceRange = document.createElement("td");
      jobPriceRange.className = "px-5";
      jobPriceRange.style.color = "#F36F21";
      jobPriceRange.innerText = "-";

      const jobRole = document.createElement("td");
      jobRole.className = "px-5";
      jobRole.innerHTML = `<button class="role-type">x Role</button>`;

      const jobLocation = document.createElement("td");
      jobLocation.className = "px-5";
      jobLocation.innerHTML = `<button class="location">${location}</button>`;

      const jobSingleData = document.createElement("td");
      jobSingleData.className = "px-0";
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
    console.log(careerTable);
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
    location: payload.meta._job_location,
  };
};

// takes a post_slug, returns single post link
const getSingleJobLink = (jobSlug) => `/career-info.html?job_title=${jobSlug}`;
