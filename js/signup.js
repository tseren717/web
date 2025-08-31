document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = form.querySelector("input[type='text']");
  const usernameInput = form.querySelector(
    "input[type='text']"
  );
  const emailInput = form.querySelector("input[type='email']");
  const passwordInput = form.querySelector("input[type='password']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const checkres = await fetch("http://localhost:3000/api/signup/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });

    if (checkres.status === 401) {                              // 401: Username already exists
      alert("Алдаа: Username аль хэдийн бүртгэлтэй байна!");
      return;
    } else if (checkres.status === 402) {                       // 402: Email already exists   
      alert("Алдаа: Email аль хэдийн бүртгэлтэй байна!");
      return;
    } else if (checkres.status === 403) {                       // 403: Username and Email already exists  
      alert("Алдаа: Username болон Email аль хэдийн бүртгэлтэй байна!");
      return;
    } else {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (res.ok) {
        alert("Амжилттай бүртгэгдлээ!");
        window.location.href = "profile.html";
      } else {
        const err = await res.json();
        alert("Алдаа: " + err.error);
      }
    }
  });
});
