document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { name: 'Grilled Chicken', price: 750, category: 'non-vegan', img: 'https://th.bing.com/th/id/OIP.wgj_L9Iom995bGioXwSZHgHaE8?rs=1&pid=ImgDetMain' },
        { name: 'Vegan Salad', price: 250, category: 'vegan', img: 'https://th.bing.com/th/id/OIP.b5SxoWy5AlI0o2vk6I5ILQAAAA?rs=1&pid=ImgDetMain' },
        { name: 'Cheese Pizza', price: 1250, category: 'vegetarian', img: 'https://th.bing.com/th/id/OIP.GUtzz3zgkImN3_ikBYuNfgHaE8?rs=1&pid=ImgDetMain' },
        { name: 'Beef Burger', price: 550, category: 'non-vegan', img: 'https://th.bing.com/th/id/OIP.Z34VvdCT6bEordzT-7HgqwHaF-?rs=1&pid=ImgDetMain' },
        { name: 'Paneer Tikka', price: 600, category: 'vegetarian', img: 'https://th.bing.com/th/id/OIP._NHQ1ouiRia0sYxwkc8lqAHaHa?rs=1&pid=ImgDetMain' },
        { name: 'Garlic Bread', price: 350, category: 'vegetarian', img: 'https://th.bing.com/th/id/OIP.2S2K71SfuZlbSsFw6N9eVQHaHa?rs=1&pid=ImgDetMain' },
        { name: 'Tandoori Chicken', price: 970, category: 'non-vegan', img: 'https://th.bing.com/th/id/OIP.21xfGQ9jUczQhBfBTgASHwHaEJ?rs=1&pid=ImgDetMain' },
        { name: 'Falafel Wrap', price: 360, category: 'vegan', img: 'https://th.bing.com/th/id/OIP.OTy2HSBl5OuWVsRP4hvKTgHaE5?rs=1&pid=ImgDetMain' },
        { name: 'Pasta Alfredo', price: 1450, category: 'vegetarian', img: 'https://th.bing.com/th/id/OIP.40MxDO_w69OYgZXIAGhE2wAAAA?rs=1&pid=ImgDetMain' },
        { name: 'Mushroom Soup', price: 240, category: 'vegetarian', img: 'https://th.bing.com/th/id/OIP.cQHPC0xUByDI80IPESrZDwHaHa?rs=1&pid=ImgDetMain' },
        { name: 'Fish Curry', price: 620, category: 'non-vegan', img: 'https://th.bing.com/th/id/OIP.WfUXLo8DaHhrp5B-pBNYPgHaE7?rs=1&pid=ImgDetMain' },
        { name: 'Fruit Bowl', price: 180, category: 'vegan', img: 'https://th.bing.com/th/id/OIP.5mi04Q0d3Ww2TTKYUIXKaQHaHa?rs=1&pid=ImgDetMain' },
        { name: 'Veggie Burger', price: 320, category: 'vegetarian', img: 'https://www.foodandwine.com/thmb/nfLq4BlAQNSaDlA8b7O5_yGE430=/2000x1334/filters:fill(auto,1)/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg' },
        { name: 'Lamb Chops', price: 1780, category: 'non-vegan', img: 'https://howtofeedaloon.com/wp-content/uploads/2022/04/lamb-rib-chop-IG.jpg' },
        { name: 'Spinach Pasta', price: 870, category: 'vegetarian', img: 'https://th.bing.com/th/id/OIP.phrgfaZx-HVg267zB-LTIwHaJ4?rs=1&pid=ImgDetMain' }
    ];

    const menuContainer = document.getElementById('menuItems');
    const cartMessage = document.getElementById('cartMessage');
    const searchInput = document.getElementById('menuSearch');
    const filters = document.querySelectorAll('input[name="dietary"]');

    const renderMenu = (items) => {
        menuContainer.innerHTML = '';
        items.forEach((item) => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price.toFixed(2)}</p>
                <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
            `;
            menuContainer.appendChild(menuItem);
        });
    };

    const filterMenu = () => {
        const query = searchInput.value.toLowerCase();
        const activeFilters = Array.from(filters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);

        const filteredItems = menuItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(query);
            const matchesFilter = activeFilters.length ? activeFilters.includes(item.category) : true;
            return matchesSearch && matchesFilter;
        });

        renderMenu(filteredItems);
    };

    // Initial render
    renderMenu(menuItems);

    // Event listeners
    searchInput.addEventListener('input', filterMenu);
    filters.forEach(filter => filter.addEventListener('change', filterMenu));

    menuContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const name = e.target.getAttribute('data-name');
            const price = e.target.getAttribute('data-price');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));

            cartMessage.innerHTML = `<p>${name} has been added to your cart!</p>`;
            cartMessage.style.display = 'block';

            setTimeout(() => {
                cartMessage.style.display = 'none';
            }, 3000);
        }
    });
});