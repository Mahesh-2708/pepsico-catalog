const drinks = [
  { id: 1, name: "Pepsi", brand: "Pepsi", flavor: "Regular", caffeine: "Yes", dietary: "Contains Sugar",
    ingredients: ["Carbonated Water", "High Fructose Corn Syrup", "Caramel Color"],
    nutrition: { calories: 150, sugar: "41g", caffeine: "38mg" },
    tasteNotes: "Crisp, refreshing cola taste",
    image: "https://as1.ftcdn.net/jpg/02/88/22/60/1000_F_288226078_DPT0wLkxHtZFcF8bbQCirRpR96wlWxka.jpg"
  },
  { id: 2, name: "Mirinda", brand: "Mirinda", flavor: "Orange", caffeine: "No", dietary: "Contains Sugar",
    ingredients: ["Carbonated Water", "Sugar", "Orange Flavor"],
    nutrition: { calories: 160, sugar: "44g", caffeine: "0mg" },
    tasteNotes: "Sweet, tangy orange flavor",
    image: "https://as2.ftcdn.net/jpg/05/05/79/99/1000_F_505799961_IfByycPLuAWGIT1DNoK4jC0BnKyPu0Fx.jpg"
  },
  { id: 3, name: "7UP", brand: "7UP", flavor: "Lemon-Lime", caffeine: "No", dietary: "Contains Sugar",
    ingredients: ["Carbonated Water", "Sugar", "Lemon-Lime Flavor"],
    nutrition: { calories: 150, sugar: "39g", caffeine: "0mg" },
    tasteNotes: "Refreshing lemon-lime soda",
    image: "https://as2.ftcdn.net/jpg/04/37/90/27/1000_F_437902741_aK3VggBNvwwpu0U4O5HPJsOp9mBxeD74.jpg"
  },
  { id: 4, name: "Mountain Dew", brand: "Mountain Dew", flavor: "Citrus", caffeine: "Yes", dietary: "Contains Sugar",
    ingredients: ["Carbonated Water", "High Fructose Corn Syrup", "Natural Flavors"],
    nutrition: { calories: 170, sugar: "46g", caffeine: "54mg" },
    tasteNotes: "Bold citrus flavor",
    image: "https://as2.ftcdn.net/jpg/15/73/68/81/1000_F_1573688136_90JfgVZ7B0db94mYPUVmf3LhdwJCn6za.jpg"
  },
  { id: 5, name: "Slice", brand: "Slice", flavor: "Mango", caffeine: "No", dietary: "Contains Sugar",
    ingredients: ["Water", "Mango Pulp", "Sugar"],
    nutrition: { calories: 140, sugar: "35g", caffeine: "0mg" },
    tasteNotes: "Rich mango taste",
    image: "https://i.pinimg.com/originals/bf/de/da/bfdeda138026a563a12a40bd3922dfc5.jpg"
  }
];

localStorage.setItem('allDrinks', JSON.stringify(drinks));

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const filterBrand = document.getElementById('filterBrand');
const filterCaffeine = document.getElementById('filterCaffeine');
const filterDietary = document.getElementById('filterDietary');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalTaste = document.getElementById('modalTaste');
const modalIngredients = document.getElementById('modalIngredients');
const modalNutrition = document.getElementById('modalNutrition');
const toggleDark = document.getElementById('toggleDark');
const popupContainer = document.getElementById('popupContainer');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function renderDrinks(list) {
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<p class="col-span-full text-center text-gray-500">No drinks found.</p>';
    return;
  }
  list.forEach(drink => {
    const card = document.createElement('div');
    card.className = 'border rounded-lg p-4 text-center shadow hover:shadow-lg transition relative bg-white dark:bg-gray-700';
    card.innerHTML = `
      <img src="${drink.image}" class="h-32 mx-auto mb-2 cursor-pointer object-contain" alt="${drink.name}">
      <h2 class="font-bold">${drink.name}</h2>
      <p class="text-gray-500">${drink.brand}</p>
      <div class="flex justify-center gap-2 mt-2">
        <button class="favorite-btn text-2xl ${favorites.includes(drink.id) ? 'text-red-500' : 'text-gray-300'}">&#10084;</button>
        <button class="add-cart bg-green-500 text-white px-2 py-1 rounded">Add to Cart</button>
      </div>
    `;
    card.querySelector('img').addEventListener('click', () => openModal(drink));
    card.querySelector('.favorite-btn').addEventListener('click', () => {
      toggleFavorite(drink.id);
      showPopup('❤️ Added to Favorites', 'bg-red-500');
    });
    card.querySelector('.add-cart').addEventListener('click', () => {
      addToCart(drink.id);
      showPopup('🛒 Added to Cart', 'bg-green-500');
    });
    grid.appendChild(card);
  });
}

function filterDrinks() {
  const query = search.value.toLowerCase();
  const brand = filterBrand.value;
  const caffeine = filterCaffeine.value;
  const dietary = filterDietary.value;
  const filtered = drinks.filter(d =>
    d.name.toLowerCase().includes(query) &&
    (brand === '' || d.brand === brand) &&
    (caffeine === '' || d.caffeine === caffeine) &&
    (dietary === '' || d.dietary === dietary)
  );
  renderDrinks(filtered);
}

function openModal(drink) {
  modalImg.src = drink.image;
  modalName.textContent = drink.name;
  modalTaste.textContent = drink.tasteNotes;
  modalIngredients.innerHTML = drink.ingredients.map(i => `<li>${i}</li>`).join('');
  modalNutrition.textContent = `Calories: ${drink.nutrition.calories}, Sugar: ${drink.nutrition.sugar}, Caffeine: ${drink.nutrition.caffeine}`;
  modal.classList.remove('hidden');
}
closeModal.addEventListener('click', () => modal.classList.add('hidden'));

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  filterDrinks();
}

function showPopup(message, color) {
  const popup = document.createElement('div');
  popup.className = `text-white ${color} px-4 py-2 rounded shadow mb-2 animate-bounce`;
  popup.textContent = message;
  popupContainer.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

search.addEventListener('input', filterDrinks);
filterBrand.addEventListener('change', filterDrinks);
filterCaffeine.addEventListener('change', filterDrinks);
filterDietary.addEventListener('change', filterDrinks);

renderDrinks(drinks);

// Background bubbles
const bubblesContainer = document.getElementById('bubbles');
for (let i = 0; i < 15; i++) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const size = Math.random() * 40 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${5 + Math.random() * 5}s`;
  bubblesContainer.appendChild(bubble);
}
