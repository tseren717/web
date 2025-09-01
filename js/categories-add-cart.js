const profileLink = document.getElementById('profile-link');
profileLink.addEventListener('click', function(e) {
  e.preventDefault();

  // JSON-р дамжуулах
  const params = new URLSearchParams();
  params.set('cart', JSON.stringify(cartItems));

  window.location.href = `../profile.html?${params.toString()}`;
});