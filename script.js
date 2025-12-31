// Initialize cart from LocalStorage or empty array
let cart = JSON.parse(localStorage.getItem('berryBubblesCart')) || [];

// 1. ADD TO CART FUNCTIONALITY
const addButtons = document.querySelectorAll('.add-btn');

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        const item = { name, price };
        cart.push(item);

        // Save to localStorage
        localStorage.setItem('berryBubblesCart', JSON.stringify(cart));
        
        alert(`${name} added to cart!`);
    });
});

// 2. DISPLAY CART FUNCTIONALITY (Only runs on cart.html)
if (window.location.pathname.includes('cart.html')) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const clearBtn = document.getElementById('clear-cart');
    const purchaseBtn = document.getElementById('purchase-btn');

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price}</span>
                `;
                cartItemsContainer.appendChild(itemDiv);
                total += item.price;
            });
        }

        totalPriceElement.innerText = total;
    }

    // Empty Cart Button
    clearBtn.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('berryBubblesCart', JSON.stringify(cart));
        renderCart();
    });

    // Purchase Button
    purchaseBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Products purchased successfully!');
            cart = [];
            localStorage.setItem('berryBubblesCart', JSON.stringify(cart));
            renderCart();
        } else {
            alert('Your cart is empty!');
        }
    });

    // Initial render
    renderCart();
}