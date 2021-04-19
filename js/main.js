const API_URL_ORIGIN = "https://alert-rooster.jurassic.ninja";
const url = `${API_URL_ORIGIN}/wp-json/newsletter/v2/subscribers`;

const CLIENT_KEY_username = "1aeb07c0f5a9629fce19a6661ac3c26fabf90e1e";
const CLIENT_SECRET_password = "d1bb5949030444060518e3aa91615a17bd507295";

// handle newsletter subscription
const form = document.getElementById("subscribe");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailElement = form.elements["email"];
  const email = emailElement.value;

  const options = {
    method: "POST",
    headers: new Headers({
      credentials: "include",
      Authorization:
        "Basic " + btoa(CLIENT_KEY_username + ":" + CLIENT_SECRET_password),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      email: email,
    }),
  };

  try {
    const res = await fetch(API_URL_ORIGIN, options);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
