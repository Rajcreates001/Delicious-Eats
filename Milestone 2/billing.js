document.addEventListener('DOMContentLoaded', () => {
    const billingItemsContainer = document.getElementById('billingItems');
    const billingTotalElement = document.getElementById('billingTotal');
    let cart = JSON.parse(localStorage.getItem('checkoutCart')) || [];

    if (cart.length === 0) {
        window.location.href = 'cart.html'; // Redirect back to the cart page if no cart data found
        return;
    }

    // Render cart items in the billing page
    function renderBillingItems() {
        billingItemsContainer.innerHTML = ''; // Clear the previous content
        let total = 0;
        
        cart.forEach(item => {
            const billingItem = document.createElement('div');
            billingItem.className = 'billing-item';
            billingItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            `;
            billingItemsContainer.appendChild(billingItem);
            total += parseFloat(item.price);
        });

        billingTotalElement.textContent = total.toFixed(2);
    }

    // Render the billing information
    renderBillingItems();

    // Handle billing form submission
    document.getElementById('billingForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // You can handle the payment process here, for now, just log the form data
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment').value;

        alert(`Thank you, ${name}! Your order will be shipped to ${address}. Payment method: ${paymentMethod}.`);

        // Clear the cart after purchase
        localStorage.removeItem('checkoutCart');
        window.location.href = 'home.html'; // Redirect to home page after successful purchase
    });
});
