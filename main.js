// Login
async function login(username, password) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  console.log(data);
}

// Load products
async function loadProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();
  console.log(products);
}

// Жишээ дуудлага
login("test", "123");
loadProducts();


fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => console.log(data));

