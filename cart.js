const cartGrid = document.getElementById('cartGrid');
const popupContainer = document.getElementById('popupContainer');
const modal = document.getElementById('emailModal');
const emailInput = document.getElementById('emailInput');
const confirmBuy = document.getElementById('confirmBuy');
const closeModal = document.getElementById('closeModal');

let allDrinks = JSON.parse(localStorage.getItem('allDrinks')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedDrink = null;

function renderCart() {
  cartGrid.innerHTML = '';
  if (cart.length === 0) {
    cartGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">Your cart is empty.</p>';
    return;
  }
  cart.forEach(id => {
    const drink = allDrinks.find(d => d.id === id);
    if (drink) {
      const card = document.createElement('div');
      card.className = 'border rounded-lg p-4 text-center bg-white shadow';
      card.innerHTML = `
        <img src="${drink.image}" class="h-32 mx-auto mb-2 object-contain" alt="${drink.name}">
        <h2 class="font-bold">${drink.name}</h2>
        <div class="flex justify-center gap-2 mt-2">
          <button class="buy-btn bg-blue-500 text-white px-3 py-1 rounded">Buy</button>
          <button class="remove-cart bg-red-500 text-white px-3 py-1 rounded">Remove</button>
        </div>
      `;
      card.querySelector('.buy-btn').addEventListener('click', () => openModal(drink));
      card.querySelector('.remove-cart').addEventListener('click', () => removeFromCart(drink.id));
      cartGrid.appendChild(card);
    }
  });
}

function openModal(drink) {
  selectedDrink = drink;
  modal.classList.remove('hidden');
}

confirmBuy.addEventListener('click', () => {
  if (emailInput.value) {
    showPopup(`✅ Order for ${selectedDrink.name} placed!`, 'bg-green-500');
    modal.classList.add('hidden');
    emailInput.value = '';
    // Show "Thanks" popup after a delay
    setTimeout(() => {
      showPopup('🎉 Thanks for shopping! Continue exploring our catalog.', 'bg-blue-600');
    }, 1500);
  } else {
    showPopup('❌ Please enter a valid email.', 'bg-red-500');
  }
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));

function removeFromCart(id) {
  cart = cart.filter(item => item !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  showPopup('✅ Removed from Cart', 'bg-gray-700');
}

function showPopup(message, color) {
  const popup = document.createElement('div');
  popup.className = `text-white ${color} px-4 py-2 rounded shadow mb-2 animate-bounce`;
  popup.textContent = message;
  popupContainer.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

renderCart();
