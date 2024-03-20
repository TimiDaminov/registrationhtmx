document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  console.log(formData);
  const response = await fetch("/signup", {
    method: "POST",
    body: formData,
  });
  const data = await response.text();
  document.getElementById("body").innerHTML = data;
});
