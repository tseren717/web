document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const cartData = params.get('cart');

  if (cartData) {
    const cartItems = JSON.parse(cartData);
    const list = document.getElementById('cart-items-list');

    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₮${item.price}`;
      list.appendChild(li);
    });
  }
});
