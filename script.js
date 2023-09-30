document.addEventListener("DOMContentLoaded", () => {
    const cart = document.getElementById("cart");
    const productList = document.querySelector(".product-list");

    let cartItems = [];

    // Fetch data from FakeStore API
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            // Loop through the products and display them
            data.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>$${product.price}</p>
                    <button data-id="${product.id}">Add to Cart</button>
                `;
                productList.appendChild(productDiv);

                // Add click event to the "Add to Cart" button
                const addToCartButton = productDiv.querySelector("button");
                addToCartButton.addEventListener("click", () => {
                    const productId = addToCartButton.getAttribute("data-id");
                    const productToAdd = data.find((p) => p.id === productId);
                    cartItems.push(productToAdd);
                    updateCart();
                });
            });
        });

    // Update cart count and display
    function updateCart() {
        cart.textContent = `Cart (${cartItems.length})`;
    }
});
