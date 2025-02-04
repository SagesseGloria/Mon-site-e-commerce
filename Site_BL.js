const translations = {
    "fr": {
        "hero-text": "Découvrez l'élégance de la mode africaine",
        "btn-shop": "Parcourir la Boutique",
        "categories-title": "Nos Catégories",
        "category-dress": "Robes Africaines",
        "category-shirt": "Chemises Africaines",
        "category-accessories": "Accessoires"
    },
    "en": {
        "hero-text": "Discover the elegance of African fashion",
        "btn-shop": "Browse the Shop",
        "categories-title": "Our Categories",
        "category-dress": "African Dresses",
        "category-shirt": "African Shirts",
        "category-accessories": "Accessories"
    },
    "ru": {
        "hero-text": "Откройте для себя элегантность африканской моды",
        "btn-shop": "Посмотреть магазин",
        "categories-title": "Наши категории",
        "category-dress": "Африканские платья",
        "category-shirt": "Африканские рубашки",
        "category-accessories": "Аксессуары"
    }
};

document.getElementById("language").addEventListener("change", function () {
    const lang = this.value;

    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        element.textContent = translations[lang][key];
    });
});

// Barre de Recherche
document.getElementById("search-btn").addEventListener("click", function () {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        alert("Résultats de recherche pour : " + query);
        // Ici, tu pourras ajouter une logique pour filtrer les produits.
    } else {
        alert("Veuillez entrer un terme à rechercher.");
    }
});
// Sélection des éléments
const loginModal = document.getElementById("login-modal");
const openLogin = document.getElementById("open-login");
const closeModal = document.getElementById("close-modal");

// Ouvrir la fenêtre modale
openLogin.addEventListener("click", function (event) {
    event.preventDefault();
    loginModal.style.display = "block";
});

// Fermer la fenêtre modale
closeModal.addEventListener("click", function () {
    loginModal.style.display = "none";
});

// Fermer si on clique en dehors du formulaire
window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});


 // Fermer le formulaire d'inscription
 const closeRegisterModal = document.getElementById("close-register-modal");
 const registerModal = document.getElementById("register-modal");
 
 closeRegisterModal.addEventListener("click", () => {
     registerModal.style.display = "none";
 });
 
 // Валидация формы регистрации
 document.getElementById("register-form").addEventListener("submit", function (e) {
     e.preventDefault();
 
     const fullName = document.getElementById("full-name").value;
     const email = document.getElementById("new-email").value;
     const phone = document.getElementById("phone").value;
     const address = document.getElementById("address").value;
     const password = document.getElementById("new-password").value;
     const confirmPassword = document.getElementById("confirm-password").value;
 
     // Проверка совпадения паролей
     if (password !== confirmPassword) {
         alert("Les mots de passe ne correspondent pas.");
         return;
     }
     // Проверка номера телефона: должен начинаться с '+' и содержать только цифры
    const phoneRegex = /^\+\d{1,}$/; // + и минимум одна цифра
    if (!phoneRegex.test(phone)) {
        alert("Le numéro de téléphone doit commencer par '+' suivi uniquement de chiffres.");
        return;
    }
 
     // Временный вывод данных (можно заменить на отправку на сервер)
     console.log("Nom complet:", fullName);
     console.log("Email:", email);
     console.log("Téléphone:", phone);
     console.log("Adresse:", address);
     console.log("Mot de passe:", password);
 
     alert("Inscription réussie !");
     registerModal.style.display = "none";
 });
 // Переключение между окнами входа и регистрации
document.getElementById("register-link").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("register-modal").style.display = "block";
});

// Gestion du panier
const cart = []; // Tableau pour stocker les produits ajoutés

// Exemple d'ajout d'un produit au panier
function addToCart(product, price) {
    const item = {
        product: product,
        price: price
    };
    cart.push(item);
    updateCartUI();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartDetails = document.getElementById('cart-details');
    let totalPrice = 0;

    // Compter les articles et calculer le prix total
    cartDetails.innerHTML = ''; // Réinitialiser les détails du panier
    cart.forEach((item, index) => {
        totalPrice += item.price;

        // Ajouter un élément au panier
        cartDetails.innerHTML += `
            <div class="cart-item">
                <span>${item.product}</span>
                <span>${item.price} FCFA</span>
                <button onclick="removeFromCart(${index})">Retirer</button>
            </div>
        `;
    });

    // Mettre à jour le compteur et le prix total
    cartCount.innerText = cart.length;
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = '${totalPrice} FCFA';
    }
}

// Fonction pour retirer un article du panier
function removeFromCart(index) {
    cart.splice(index, 1); // Retirer l'article à l'index spécifié
    updateCartUI();
}