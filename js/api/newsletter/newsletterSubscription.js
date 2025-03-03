let origin = "https://geniushubglobal.com/geniusadmin/index.php";

const API_NEWSLETTER_url = `${origin}/wp-json/newsletter/v2/subscribers`;

// handle newsletter subscription
const form = document.getElementById("subscribe");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.getElementById("newsSubscribeBtn").disabled = true;

  const emailElement = form.elements["email"];

  // clean up server image from the dom
  document.getElementById("serverPop")?.remove();

  const options = {
    method: "POST",
    headers: new Headers({
      Authorization:
        "Basic " +
        btoa(
          "c716f072dc80c3b02b4f4d916bc83b0bda8d3a11:999304c216d4d888abcf5523fd3291da4b693e67"
        ),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      email: emailElement.value,
    }),
  };

  try {
    const res = await fetch(API_NEWSLETTER_url, options);
    const data = await res.json();

    const docBody = document.querySelector("body");
    let status, message, imgSrc;

    if (data.code === "rest_invalid_param") {
      status = "danger";
      message = "Please enter a valid email.";
      imgSrc = "./images/error.jpg";
    } else {
      status = "success";
      message = "Subscription successfull.";
      imgSrc = "./images/check.jpg";
    }

    const serverResponse = convertHtmlStringToDomElem(
      htmlString(status, message, imgSrc)
    );
    docBody.appendChild(serverResponse);
    document.getElementById(`${status}Button`).click();
    document.getElementById("newsSubscribeBtn").disabled = false;
    form.reset();

    // console.log("data", data);
  } catch (error) {
    document.getElementById("newsSubscribeBtn").disabled = false;

    // console.log("error", error);
  }
});

const htmlString = (
  status,
  message,
  imgSrc
) => `  <!-- Form ${status} Button trigger modal -->
<div id="serverPop">
<button type="button" id='${status}Button' class="btn btn-primary d-none" data-bs-toggle="modal"
  data-bs-target="#exampleModal6">
  Success
</button>

<!-- Form ${status} modal -->
<div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body text-center px-5 py-5">
        <h5 id='${status}' class='text-${status}' role="alert">
          ${message}
        </h5>
        <img width="150" class="pt-3" src='${imgSrc}' alt=${status}>
        <div class="d-grid gap-2 pt-5">
          <button class='btn btn-lg btn-${status}' data-bs-dismiss="modal" type="button">OK</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;

const convertHtmlStringToDomElem = (domString) =>
  document.createRange().createContextualFragment(domString);
