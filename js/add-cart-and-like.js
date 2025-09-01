// Cart and like functionality
let cartItems = [];
let likedItems = [];

// Update cart counter
function updateCartCounter() {
  const counter = document.getElementById('cart-counter');
  const count = cartItems.length;

  if (count > 0) {
    counter.textContent = count;
    counter.style.display = 'flex';
  } else {
    counter.style.display = 'none';
  }
}

// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {

  // Handle bag icon clicks (add to cart)
  const cartIcons = document.querySelectorAll('.add-to-cart-icon');
cartIcons.forEach(icon => {
  icon.addEventListener('click', function (e) {
    e.preventDefault();
    const productId = this.getAttribute('data-product-id');
    const productCard = this.closest('.product-card');
    const price = productCard.getAttribute('data-price');
    const name = productCard.querySelector('.product-image').alt;

    // Check if product already in cart
    const index = cartItems.findIndex(item => item.id === productId);
    if (index === -1) {
      // Add to cart
      cartItems.push({ id: productId, name, price });
      this.classList.add('active');
      this.style.fill = '#2ce6e3';
    } else {
      // Remove from cart
      cartItems.splice(index, 1);
      this.classList.remove('active');
      this.style.fill = '';
    }

    updateCartCounter();
  });
});


  // Handle heart icon clicks (like)
  const likeIcons = document.querySelectorAll('.add-to-like-icon');
  likeIcons.forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      const productId = this.getAttribute('data-product-id');

      if (!likedItems.includes(productId)) {
        likedItems.push(productId);
        this.classList.add('liked');
      } else {
        likedItems = likedItems.filter(item => item !== productId);
        this.classList.remove('liked');
      }
    });
  });

  // Profile link click with cart data
  const profileLink = document.getElementById('profile-link');
  if (profileLink) {
    profileLink.addEventListener('click', function (e) {
      e.preventDefault();

      // Store cart data for profile page
      const cartData = {
        items: cartItems,
        count: cartItems.length,
        timestamp: Date.now()
      };

      // Since we can't use localStorage, we'll use URL parameters
      const params = new URLSearchParams();
      params.set('cart', cartItems.length);

      // Navigate to profile page
      window.location.href = `../profile.html?${params.toString()}`;
    });
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
    });
  }

  // Optional: Add keyboard support
  document.addEventListener('keydown', function (e) {
    // Press Ctrl+C to clear cart
    if (e.key === 'c' || e.key === 'C') {
      if (e.ctrlKey && cartItems.length > 0) {
        cartItems = [];
        updateCartCounter();
        // Reset all cart icon colors
        cartIcons.forEach(icon => {
          icon.classList.remove('active');
          icon.style.fill = '';
        });
        console.log('Cart cleared!');
      }
    }
  });

  // Auto-save cart state (session only)
  window.cartState = {
    items: cartItems,
    liked: likedItems,
    getCartCount: () => cartItems.length,
    getLikedCount: () => likedItems.length
  };
});

// Export functions for external use
window.addToCart = function (productId) {
  if (!cartItems.includes(productId)) {
    cartItems.push(productId);
    updateCartCounter();
    return true;
  }
  return false;
};

window.removeFromCart = function (productId) {
  const index = cartItems.indexOf(productId);
  if (index > -1) {
    cartItems.splice(index, 1);
    updateCartCounter();
    return true;
  }
  return false;
};

window.getCartItems = function () {
  return [...cartItems];
};

window.clearCart = function () {
  cartItems = [];
  updateCartCounter();
  // Reset all cart icon colors
  const cartIcons = document.querySelectorAll('.add-to-cart-icon');
  cartIcons.forEach(icon => {
    icon.classList.remove('active');
    icon.style.fill = '';
  });
};

const profileLink = document.getElementById('profile-link');
profileLink.addEventListener('click', function(e) {
  e.preventDefault();
  const params = new URLSearchParams();
  params.set('cart', JSON.stringify(cartItems));
  window.location.href = `../profile.html?${params.toString()}`;
});

