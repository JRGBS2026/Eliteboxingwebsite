const products = [

    {
        id: 1,
        name: 'Elite Pro Boxing Gloves',
        price: 59.99,
        category: 'Gloves',
        image: 'media/images/pro-gloves.jpg',
        badge: 'Best Seller'
    },

    {
        id: 2,
        name: 'Elite Bag Gloves',
        price: 44.99,
        category: 'Gloves',
        image: 'media/images/bag-gloves.jpg',
        badge: 'New'
    },

    {
        id: 3,
        name: 'Elite Full-Face Headguard',
        price: 54.99,
        category: 'Protection',
        image: 'media/images/headguard.jpg',
        badge: 'Premium'
    },

    {
        id: 4,
        name: 'Elite Pro Mouthguard',
        price: 12.99,
        category: 'Protection',
        image: 'media/images/mouthguard.jpg',
        badge: 'Essential'
    },

    {
        id: 5,
        name: 'Elite Groin Guard',
        price: 34.99,
        category: 'Protection',
        image: 'media/images/groin-guard.jpg',
        badge: 'Pro'
    },

    {
        id: 6,
        name: 'Elite Heavy Punch Bag',
        price: 129.99,
        category: 'Training',
        image: 'media/images/heavy-bag.jpg',
        badge: 'Best Seller'
    },

    {
        id: 7,
        name: 'Elite Speed Bag',
        price: 49.99,
        category: 'Training',
        image: 'media/images/speed-bag.jpg',
        badge: 'New'
    },

    {
        id: 8,
        name: 'Elite Focus Mitts',
        price: 39.99,
        category: 'Training',
        image: 'media/images/focus-mitts.jpg',
        badge: 'Coach Pick'
    },

    {
        id: 9,
        name: 'Elite Speed Rope',
        price: 14.99,
        category: 'Fitness',
        image: 'media/images/skipping-rope.jpg',
        badge: 'New'
    },

    {
        id: 10,
        name: 'Elite Hand Wraps',
        price: 9.99,
        category: 'Accessories',
        image: 'media/images/hand-wraps.jpg',
        badge: 'Essential'
    },

    {
        id: 11,
        name: 'Elite Boxing Boots',
        price: 79.99,
        category: 'Footwear',
        image: 'media/images/boxing-boots.jpg',
        badge: 'Premium'
    },

    {
        id: 12,
        name: 'Elite Training Gym Bag',
        price: 44.99,
        category: 'Accessories',
        image: 'media/images/gym-bag.jpg',
        badge: 'New'
    }

];


/* ==========================================
   MONEY FORMAT
========================================== */

const money = n => `£${n.toFixed(2)}`;


/* ==========================================
   GET CART FROM LOCAL STORAGE
========================================== */

const getCart = () => {

    return JSON.parse(
        localStorage.getItem('eliteCart') || '[]'
    );

};


/* ==========================================
   SAVE CART
========================================== */

const saveCart = c => {

    localStorage.setItem(
        'eliteCart',
        JSON.stringify(c)
    );

    updateCartCount();

};


/* ==========================================
   UPDATE CART COUNT
========================================== */

function updateCartCount() {

    const el = document.querySelector(
        '[data-cart-count]'
    );

    if (el) {

        el.textContent = getCart().reduce(
            (s, i) => s + i.qty,
            0
        );

    }

}


/* ==========================================
   ADD PRODUCT TO CART
========================================== */

function addToCart(id) {

    const cart = getCart();

    const p = products.find(
        x => x.id === id
    );

    const item = cart.find(
        x => x.id === id
    );


    if (item) {

        item.qty++;

    } else {

        cart.push({
            ...p,
            qty: 1
        });

    }


    saveCart(cart);

    showToast(
        `${p.name} added to cart`
    );

}


/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(msg) {

    const t = document.querySelector(
        '.toast'
    );


    if (!t) {
        return;
    }


    t.textContent = msg;

    t.classList.add(
        'show'
    );


    setTimeout(() => {

        t.classList.remove(
            'show'
        );

    }, 2200);

}


/* ==========================================
   PRODUCT CARD
========================================== */

function card(p) {

    return `
        <article
            class="product-card"
            data-category="${p.category.toLowerCase()}"
            data-name="${p.name.toLowerCase()}"
        >

            <img
                class="product-image"
                src="${p.image}"
                alt="${p.name}"
            >

            <div class="product-info">

                <span class="badge">
                    ${p.badge}
                </span>

                <h3>
                    ${p.name}
                </h3>

                <span class="category">
                    ${p.category}
                </span>

                <div class="price">
                    ${money(p.price)}
                </div>

                <button
                    class="btn add-btn"
                    data-id="${p.id}"
                >
                    Add to Cart
                </button>

            </div>

        </article>
    `;

}


/* ==========================================
   RENDER PRODUCTS
========================================== */

function renderProducts(
    list = products,
    target = '#productGrid'
) {

    const grid = document.querySelector(
        target
    );


    if (grid) {

        grid.innerHTML = list
            .map(card)
            .join('');


        grid
            .querySelectorAll('.add-btn')
            .forEach(b => {

                b.addEventListener(
                    'click',
                    () => addToCart(
                        Number(b.dataset.id)
                    )
                );

            });

    }

}


/* ==========================================
   FEATURED PRODUCTS
========================================== */

function renderFeatured() {

    renderProducts(
        products.slice(0, 8),
        '#featuredGrid'
    );

}


/* ==========================================
   SEARCH & PRODUCT FILTERS
========================================== */

function initFilters() {

    const search = document.querySelector(
        '#searchInput'
    );

    const buttons = document.querySelectorAll(
        '.filter-btn'
    );


    if (!search) {
        return;
    }


    let cat = 'all';


    const apply = () => {

        const q = search.value
            .toLowerCase()
            .trim();


        renderProducts(

            products.filter(p =>

                (
                    cat === 'all' ||
                    p.category.toLowerCase() === cat
                )

                &&

                p.name
                    .toLowerCase()
                    .includes(q)

            )

        );

    };


    search.addEventListener(
        'input',
        apply
    );


    buttons.forEach(b => {

        b.addEventListener(
            'click',
            () => {

                buttons.forEach(x => {

                    x.classList.remove(
                        'active'
                    );

                });


                b.classList.add(
                    'active'
                );


                cat = b.dataset.filter;

                apply();

            }
        );

    });

}


/* ==========================================
   RENDER SHOPPING CART
========================================== */

function renderCart() {

    const wrap = document.querySelector(
        '#cartItems'
    );


    if (!wrap) {
        return;
    }


    const cart = getCart();


    if (!cart.length) {

        wrap.innerHTML = `
            <div class="empty">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some Elite Boxing equipment
                    to begin.
                </p>

                <a
                    class="btn"
                    href="products.html"
                >
                    Shop Products
                </a>

            </div>
        `;


        document.querySelector(
            '#subtotal'
        ).textContent = '£0.00';


        document.querySelector(
            '#total'
        ).textContent = '£0.00';


        return;

    }


    wrap.innerHTML = cart.map(i => `

        <div class="cart-item">

            <img
                src="${i.image}"
                alt="${i.name}"
            >


            <div>

                <h3>
                    ${i.name}
                </h3>

                <p>
                    ${money(i.price)} each
                </p>

                <button
                    class="remove-btn"
                    data-remove="${i.id}"
                >
                    Remove
                </button>

            </div>


            <div>

                <div class="qty">

                    <button
                        aria-label="Decrease quantity"
                        data-change="${i.id}"
                        data-delta="-1"
                    >
                        −
                    </button>


                    <strong>
                        ${i.qty}
                    </strong>


                    <button
                        aria-label="Increase quantity"
                        data-change="${i.id}"
                        data-delta="1"
                    >
                        +
                    </button>

                </div>


                <p>

                    <strong>
                        ${money(i.price * i.qty)}
                    </strong>

                </p>

            </div>

        </div>

    `).join('');


    wrap
        .querySelectorAll(
            '[data-change]'
        )
        .forEach(b => {

            b.onclick = () => changeQty(

                Number(
                    b.dataset.change
                ),

                Number(
                    b.dataset.delta
                )

            );

        });


    wrap
        .querySelectorAll(
            '[data-remove]'
        )
        .forEach(b => {

            b.onclick = () => removeItem(

                Number(
                    b.dataset.remove
                )

            );

        });


    const sub = cart.reduce(

        (s, i) =>
            s + i.price * i.qty,

        0

    );


    document.querySelector(
        '#subtotal'
    ).textContent = money(sub);


    document.querySelector(
        '#total'
    ).textContent = money(sub);

}


/* ==========================================
   CHANGE PRODUCT QUANTITY
========================================== */

function changeQty(id, d) {

    let c = getCart();


    const i = c.find(
        x => x.id === id
    );


    i.qty += d;


    if (i.qty <= 0) {

        c = c.filter(
            x => x.id !== id
        );

    }


    saveCart(c);

    renderCart();

}


/* ==========================================
   REMOVE PRODUCT FROM CART
========================================== */

function removeItem(id) {

    saveCart(

        getCart().filter(
            x => x.id !== id
        )

    );


    renderCart();

}


/* ==========================================
   CONTACT FORM VALIDATION
========================================== */

function initContact() {

    const f = document.querySelector(
        '#contactForm'
    );

    const m = document.querySelector(
        '#formMessage'
    );


    if (!f) {
        return;
    }


    f.addEventListener(
        'submit',
        e => {

            e.preventDefault();


            const name =
                f.name.value.trim();


            const email =
                f.email.value.trim();


            const message =
                f.message.value.trim();


            if (
                name.length < 2 ||
                !email.includes('@') ||
                message.length < 10
            ) {

                m.textContent =
                    'Please complete all fields correctly.';


                m.style.color =
                    '#ff8f8f';


                return;

            }


            m.textContent =
                'Thank you. Your message has been validated successfully.';


            m.style.color =
                '#f1d483';


            f.reset();

        }
    );

}


/* ==========================================
   MOBILE NAVIGATION MENU
========================================== */

function initMenu() {

    const b = document.querySelector(
        '.menu-btn'
    );


    const n = document.querySelector(
        '.nav'
    );


    if (b) {

        b.onclick = () => {

            n.classList.toggle(
                'open'
            );


            b.setAttribute(

                'aria-expanded',

                n.classList.contains(
                    'open'
                )

            );

        };

    }

}


/* ==========================================
   LOAD WEBSITE FUNCTIONS
========================================== */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        updateCartCount();

        renderFeatured();

        renderProducts();

        initFilters();

        renderCart();

        initContact();

        initMenu();

    }
);
