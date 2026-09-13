const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 899,
        rating: 4.6,
        icon: "🎧",
        description: "Comfortable wireless headphones for everyday use."
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 749,
        rating: 4.4,
        icon: "⌚",
        description: "A stylish smartwatch with useful everyday features."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 499,
        rating: 4.2,
        icon: "🔊",
        description: "Compact speaker with clear sound and easy connectivity."
    },
    {
        id: 4,
        name: "Casual T-Shirt",
        category: "fashion",
        price: 299,
        rating: 4.3,
        icon: "👕",
        description: "Comfortable cotton t-shirt suitable for casual wear."
    },
    {
        id: 5,
        name: "Classic Backpack",
        category: "fashion",
        price: 699,
        rating: 4.7,
        icon: "🎒",
        description: "A practical backpack for college, work and travel."
    },
    {
        id: 6,
        name: "The Alchemist",
        category: "books",
        price: 250,
        rating: 4.8,
        icon: "📖",
        description: "An inspiring fiction book about dreams and purpose."
    },
    {
        id: 7,
        name: "JavaScript Guide",
        category: "books",
        price: 450,
        rating: 4.5,
        icon: "📚",
        description: "A beginner-friendly guide to learning JavaScript."
    },
    {
        id: 8,
        name: "Desk Lamp",
        category: "home",
        price: 399,
        rating: 4.1,
        icon: "💡",
        description: "Simple and functional lamp for your study desk."
    },
    {
        id: 9,
        name: "Coffee Mug",
        category: "home",
        price: 149,
        rating: 4.0,
        icon: "☕",
        description: "A simple ceramic mug for everyday use."
    }
];


const productContainer = document.getElementById("productContainer");
const productCount = document.getElementById("productCount");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");
const resetBtn = document.getElementById("resetBtn");
const noProducts = document.getElementById("noProducts");


function displayProducts(productList) {

    productContainer.innerHTML = "";

    productCount.textContent =
        productList.length === 1
            ? "1 Product"
            : `${productList.length} Products`;


    if (productList.length === 0) {
        noProducts.style.display = "block";
        return;
    }

    noProducts.style.display = "none";


    productList.forEach(function (product) {

        const productCard = document.createElement("article");

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
                        ₹${product.price}
                    </span>

                    <span class="product-rating">
                        ⭐ ${product.rating}
                    </span>

                </div>

            </div>
        `;

        productContainer.appendChild(productCard);
    });
}


function filterAndSortProducts() {

    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    const selectedSort = sortFilter.value;


    let filteredProducts = products.filter(function (product) {

        const categoryMatches =
            selectedCategory === "all" ||
            product.category === selectedCategory;


        const priceMatches =
            selectedPrice === "all" ||
            product.price <= Number(selectedPrice);


        return categoryMatches && priceMatches;
    });


    if (selectedSort === "rating-high") {

        filteredProducts.sort(function (a, b) {
            return b.rating - a.rating;
        });

    } else if (selectedSort === "rating-low") {

        filteredProducts.sort(function (a, b) {
            return a.rating - b.rating;

        });

    } else if (selectedSort === "price-low") {

        filteredProducts.sort(function (a, b) {
            return a.price - b.price;

        });

    } else if (selectedSort === "price-high") {

        filteredProducts.sort(function (a, b) {
            return b.price - a.price;
        });
    }


    displayProducts(filteredProducts);
}


categoryFilter.addEventListener(
    "change",
    filterAndSortProducts
);

priceFilter.addEventListener(
    "change",
    filterAndSortProducts
);

sortFilter.addEventListener(
    "change",
    filterAndSortProducts
);


resetBtn.addEventListener("click", function () {

    categoryFilter.value = "all";
    priceFilter.value = "all";
    sortFilter.value = "default";

    displayProducts(products);
});


displayProducts(products);