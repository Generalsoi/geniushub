let origin = "https://geniushubglobal.com";
const API_NEWSLETTER_url = `${origin}/wp-json/newsletter/v2/subscribers`;
const CLIENT_KEY_username = "532adf72c37084ba885b2a12669372d367f2e9c5";
const CLIENT_SECRET_password = "1193d2eb5dfa26c3c14734a9f1a7f0c21196692e";
// handle newsletter subscription
const form = document.getElementById("subscribe");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailElement = form.elements["email"];
  const submitElement = form.elements["submit"];
  // const email = emailElement.value;
  const options = {
    method: "GET",
    headers: new Headers({
      credentials: "include",
      Authorization:
        "Basic " + btoa(CLIENT_KEY_username + ":" + CLIENT_SECRET_password),
      "Content-Type": "application/json",
    }),
    // body: new FormData(form),
  };

  try {
    const res = await fetch("https://geniushubglobal.com/?na=s", options);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
