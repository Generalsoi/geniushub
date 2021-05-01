let API_URL_ORIGIN = "https://muzzlab.com/geniushub";

const urlSearchString = window.location.search;

const jobSlug = urlSearchString.split("=")[1];

const url = `${API_URL_ORIGIN}/wp-json/wp/v2/job-listings?&slug=${jobSlug}`;

post = (async () => {
  try {
    const res = await fetch(url);

    const jsonResponse = await res.json();
    const data = jsonResponse[0];

    // hide the spinner after post data loaded
    document.getElementById("loading").style.display = "none";

    const jobData = parsePostAPIPayload(data);
    const { title, description, submissionEmail } = jobData;

    // set the job title and submissionEmail for the application API
    document.getElementById("jobTitle").innerText = title;
    document.getElementById("submissionEmail").innerText = submissionEmail;

    // get html data location
    const jobDescription = document.querySelector(".job-description");
    const jobDescriptionHTMLString = getHtmlStringWithData(title, description);
    const jobDescriptionHTMLNode = convertHtmlStringToDomElement(
      jobDescriptionHTMLString
    );
    jobDescription.appendChild(jobDescriptionHTMLNode);
  } catch (error) {
    console.log(error);
    //   remove spinner before displaying error message
    document.getElementById("loading").style.display = "none";

    const jobDescriptionParent = document.querySelector(".content");

    const errorMessage = document.createElement("h5");
    errorMessage.className = "pt-3 text-center";
    errorMessage.innerHTML =
      "Server Error, something went wrong while retrieving post from the server.";
    jobDescriptionParent.appendChild(errorMessage);
  }
})();

// takes a postAPI return object, returns a parsed post object
const parsePostAPIPayload = (payload) => {
  return {
    id: payload.id,
    slug: payload.slug,
    description: payload.content.rendered,
    title: payload.title.rendered,
    location: payload.meta._job_location,
    submissionEmail: payload.meta._application,
  };
};

// takes a dom string, returns a dom object
const convertHtmlStringToDomElement = (domString) =>
  document.createRange().createContextualFragment(domString);

// returns htmlString
const getHtmlStringWithData = (title, description) => {
  return `<div class="heading">
  <h5><a id="goBack" href="careers.html"><i class="fas fa-angle-left"></i></a>&nbsp;${title}</h5>
</div>

<div class="content">${description}<button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="trainee">Apply Now</button></div>`;
};
