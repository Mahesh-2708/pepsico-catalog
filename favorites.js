const favoritesGrid = document.getElementById('favoritesGrid');
const popupContainer = document.getElementById('popupContainer');

let allDrinks = JSON.parse(localStorage.getItem('allDrinks')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function renderFavorites() {
  favoritesGrid.innerHTML = '';
  if (favorites.length === 0) {
    favoritesGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">No favorites yet.</p>';
    return;
  }
  favorites.forEach(id => {
    const drink = allDrinks.find(d => d.id === id);
    if (drink) {
      const card = document.createElement('div');
      card.className = 'border rounded-lg p-4 text-center bg-white shadow';
      card.innerHTML = `
        <img src="${drink.image}" class="h-32 mx-auto mb-2 object-contain" alt="${drink.name}">
        <h2 class="font-bold">${drink.name}</h2>
        <button class="remove-fav bg-red-500 text-white px-3 py-1 rounded mt-2">Remove</button>
      `;
      card.querySelector('.remove-fav').addEventListener('click', () => removeFavorite(drink.id));
      favoritesGrid.appendChild(card);
    }
  });
}

function removeFavorite(id) {
  favorites = favorites.filter(f => f !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
  showPopup('💔 Removed from Favorites', 'bg-gray-700');
}

function showPopup(message, color) {
  const popup = document.createElement('div');
  popup.className = `text-white ${color} px-4 py-2 rounded shadow mb-2 animate-bounce`;
  popup.textContent = message;
  popupContainer.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

renderFavorites();
