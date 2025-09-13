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

// Update like counter (heart icon in header)
function updateLikeCounter() {
  const heartCounter = document.getElementById('like-counter');
  const count = likedItems.length;

  if (count > 0) {
    heartCounter.textContent = count;
    heartCounter.style.display = 'flex';
  } else {
    heartCounter.style.display = 'none';
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

  // Handle heart icon clicks (like) - UPDATED WITH COUNTER
  const likeIcons = document.querySelectorAll('.add-to-like-icon');
  likeIcons.forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      const productId = this.getAttribute('data-product-id');
      const productCard = this.closest('.product-card');
      const price = productCard.getAttribute('data-price');
      const name = productCard.querySelector('.product-image').alt;

      // Check if product already liked
      const index = likedItems.findIndex(item => item.id === productId);
      if (index === -1) {
        // Add to liked items
        likedItems.push({ id: productId, name, price });
        this.classList.add('liked');
        this.style.fill = '#ff4757'; // Red color for liked items
      } else {
        // Remove from liked items
        likedItems.splice(index, 1);
        this.classList.remove('liked');
        this.style.fill = '';
      }

      // Update the heart counter in header
      updateLikeCounter();
    });
  });

  const profileLink = document.getElementById('profile-link');
  if (profileLink) {
    profileLink.addEventListener('click', function (e) {
      e.preventDefault();

      // Store cart and like data for profile page
      const cartData = {
        items: cartItems,
        count: cartItems.length,
        timestamp: Date.now()
      };

      const likeData = {
        items: likedItems,
        count: likedItems.length,
        timestamp: Date.now()
      };

      // Since we can't use localStorage, we'll use URL parameters
      const params = new URLSearchParams();
      params.set('cart', JSON.stringify(cartItems));
      params.set('likes', JSON.stringify(likedItems));
      
      console.log('Navigating to profile page with data:', { cartItems, likedItems });

      window.location.href = `profile.html?${params.toString()}`;
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

    // Press Ctrl+L to clear liked items
    if (e.key === 'l' || e.key === 'L') {
      if (e.ctrlKey && likedItems.length > 0) {
        likedItems = [];
        updateLikeCounter();
        // Reset all like icon colors
        likeIcons.forEach(icon => {
          icon.classList.remove('liked');
          icon.style.fill = '';
        });
        console.log('Liked items cleared!');
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
  if (!cartItems.find(item => item.id === productId)) {
    cartItems.push({ id: productId });
    updateCartCounter();
    return true;
  }
  return false;
};

window.removeFromCart = function (productId) {
  const index = cartItems.findIndex(item => item.id === productId);
  if (index > -1) {
    cartItems.splice(index, 1);
    updateCartCounter();
    return true;
  }
  return false;
};

window.addToLikes = function (productId) {
  if (!likedItems.find(item => item.id === productId)) {
    likedItems.push({ id: productId });
    updateLikeCounter();
    return true;
  }
  return false;
};

window.removeFromLikes = function (productId) {
  const index = likedItems.findIndex(item => item.id === productId);
  if (index > -1) {
    likedItems.splice(index, 1);
    updateLikeCounter();
    return true;
  }
  return false;
};

window.getCartItems = function () {
  return [...cartItems];
};

window.getLikedItems = function () {
  return [...likedItems];
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

window.clearLikes = function () {
  likedItems = [];
  updateLikeCounter();
  // Reset all like icon colors
  const likeIcons = document.querySelectorAll('.add-to-like-icon');
  likeIcons.forEach(icon => {
    icon.classList.remove('liked');
    icon.style.fill = '';
  });
};
