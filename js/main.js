let origin = "https://alert-rooster.jurassic.ninja";
const API_NEWSLETTER_url = `${origin}/wp-json/newsletter/v2/subscribers`;

const CLIENT_KEY_username = "1aeb07c0f5a9629fce19a6661ac3c26fabf90e1e";
const CLIENT_SECRET_password = "d1bb5949030444060518e3aa91615a17bd507295";

// handle newsletter subscription
const form = document.getElementById("sub");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailElement = form.elements["email"];
  const submitElement = form.elements["submit"];
  // const email = emailElement.value;

  const options = {
    method: "POST",
    headers: new Headers({
      credentials: "include",
      Authorization:
        "Basic " + btoa(CLIENT_KEY_username + ":" + CLIENT_SECRET_password),
      "Content-Type": "application/json",
    }),
    body: new FormData(form),
  };

  try {
    const res = await fetch(
      "https://alert-rooster.jurassic.ninja/?na=s",
      options
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

// https://alert-rooster.jurassic.ninja/?na=s
