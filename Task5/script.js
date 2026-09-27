
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.6,
        icon: "🎧",
        description: "Comfortable wireless headphones with clear sound."
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3299,
        rating: 4.5,
        icon: "⌚",
        description: "Track your activity, time and daily notifications."
    },
    {
        id: 3,
        name: "Casual Sneakers",
        category: "fashion",
        price: 1899,
        rating: 4.4,
        icon: "👟",
        description: "Lightweight sneakers designed for everyday comfort."
    },
    {
        id: 4,
        name: "Classic Backpack",
        category: "fashion",
        price: 1299,
        rating: 4.3,
        icon: "🎒",
        description: "A practical backpack for work, college and travel."
    },
    {
        id: 5,
        name: "Desk Lamp",
        category: "home",
        price: 899,
        rating: 4.2,
        icon: "💡",
        description: "Minimal desk lamp for a comfortable workspace."
    },
    {
        id: 6,
        name: "Ceramic Mug",
        category: "home",
        price: 499,
        rating: 4.7,
        icon: "☕",
        description: "Simple ceramic mug suitable for everyday use."
    },
    {
        id: 7,
        name: "JavaScript Guide",
        category: "books",
        price: 799,
        rating: 4.8,
        icon: "📘",
        description: "A practical introduction to modern JavaScript."
    },
    {
        id: 8,
        name: "Web Design Basics",
        category: "books",
        price: 649,
        rating: 4.5,
        icon: "📕",
        description: "Learn the fundamentals of creating modern websites."
    }
];


// =========================
// Application State
// =========================

let cart = [];


// =========================
// DOM Elements
// =========================

const productContainer =
    document.getElementById("productContainer");

const productCount =
    document.getElementById("productCount");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortFilter =
    document.getElementById("sortFilter");

const cartButton =
    document.getElementById("cartButton");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


// =========================
// Format Price
// =========================

function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}


// =========================
// Display Products
// =========================

function displayProducts(productList) {

    productContainer.innerHTML = "";

    productCount.textContent =
        `${productList.length} product${productList.length !== 1 ? "s" : ""}`;

    if (productList.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    productList.forEach(product => {

        const productCard =
            document.createElement("article");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="product-rating">
                        ★ ${product.rating}
                    </span>

                </div>

                <button
                    class="add-cart-button"
                    data-product-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(productCard);
    });
}


// =========================
// Filter and Sort Products
// =========================

function updateProducts() {

    const searchTerm =
        searchInput.value.trim().toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    const selectedSort =
        sortFilter.value;

    let filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });


    // Sorting

    if (selectedSort === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (selectedSort === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (selectedSort === "rating-high") {

        filteredProducts.sort(
            (a, b) => b.rating - a.rating
        );
    }


    displayProducts(filteredProducts);
}


// =========================
// Add Product to Cart
// =========================

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) return;

    const existingItem =
        cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    openCart();
}


// =========================
// Update Cart
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started.</p>
            </div>
        `;

    } else {

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-icon">
                    ${item.icon}
                </div>

                <div>

                    <h3>${item.name}</h3>

                    <p>
                        ${formatPrice(item.price)}
                    </p>

                    <div class="quantity-controls">

                        <button
                            class="decrease-quantity"
                            data-product-id="${item.id}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="increase-quantity"
                            data-product-id="${item.id}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-item"
                        data-product-id="${item.id}"
                    >
                        Remove
                    </button>

                </div>

                <strong>
                    ${formatPrice(item.price * item.quantity)}
                </strong>
            `;

            cartItems.appendChild(cartItem);
        });
    }


    // Total quantity

    const totalQuantity =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

    cartCount.textContent = totalQuantity;


    // Total price

    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

    cartTotal.textContent =
        formatPrice(totalPrice);
}


// =========================
// Change Cart Quantity
// =========================

function changeQuantity(productId, amount) {

    const item =
        cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== productId);
    }

    updateCart();
}


// =========================
// Remove Product
// =========================

function removeFromCart(productId) {

    cart =
        cart.filter(product => product.id !== productId);

    updateCart();
}


// =========================
// Open Cart
// =========================

function openCart() {

    cartPanel.classList.add("active");
    overlay.classList.add("active");
}


// =========================
// Close Cart
// =========================

function closeCartPanel() {

    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
}


// =========================
// Event Listeners
// =========================


// Product search

searchInput.addEventListener(
    "input",
    updateProducts
);


// Category filter

categoryFilter.addEventListener(
    "change",
    updateProducts
);


// Sort products

sortFilter.addEventListener(
    "change",
    updateProducts
);


// Add to cart

productContainer.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".add-cart-button");

        if (!button) return;

        const productId =
            Number(button.dataset.productId);

        addToCart(productId);
    }
);


// Cart quantity and remove buttons

cartItems.addEventListener(
    "click",
    event => {

        const productId =
            Number(event.target.dataset.productId);

        if (event.target.classList.contains("increase-quantity")) {

            changeQuantity(productId, 1);
        }

        if (event.target.classList.contains("decrease-quantity")) {

            changeQuantity(productId, -1);
        }

        if (event.target.classList.contains("remove-item")) {

            removeFromCart(productId);
        }
    }
);


// Cart controls

cartButton.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartPanel
);

overlay.addEventListener(
    "click",
    closeCartPanel
);


// Mobile navigation

menuButton.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("active");
    }
);


// Close mobile menu after selecting a link

navLinks.addEventListener(
    "click",
    event => {

        if (event.target.tagName === "A") {
            navLinks.classList.remove("active");
        }
    }
);


// Checkout

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert("Your cart is empty. Add a product first.");
            return;
        }

        alert(
            "Thank you for shopping with ShopNest! " +
            "Checkout functionality can be connected to a payment system later."
        );
    }
);


// =========================
// Initial Application Load
// =========================

displayProducts(products);

updateCart();