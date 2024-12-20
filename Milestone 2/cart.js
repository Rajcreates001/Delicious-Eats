document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear cart items first
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += parseFloat(item.price);
        });

        totalAmountElement.textContent = total.toFixed(2);

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeItem(index);
            });
        });
    }

    // Remove an item from the cart
    function removeItem(index) {
        cart.splice(index, 1); // Remove item from cart array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        renderCart(); // Re-render the cart
    }

    // Render the cart when the page loads
    renderCart();

    // Checkout Button
    document.querySelector('.checkout-button').addEventListener('click', () => {
        if (cart.length > 0) {
            // Redirect to the Billing Page and pass the cart information
            localStorage.setItem('checkoutCart', JSON.stringify(cart));
            window.location.href = 'billing.html';
        } else {
            alert("Your cart is empty!");
        }
    });
});