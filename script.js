// Déclaration des constantes
const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');

const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btnCart');

const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const productCounter = document.querySelector('.counter');

const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.product-hero');

const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

const btnAddToCard = document.querySelector('.btn');
const cartCount = document.querySelector('.cart-count');
const productInShoppingCart = document.querySelector('.products-in-cart');

const msgEmpty = document.querySelector('.msg-empty');
const checkout = document.querySelector('.checkout');

const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');

let lightboxGallery;
let lightboxHero;


// Les variables (1 produit , 0 dans le panier , le prix 250 avec la réduction de 50%)
let productCounterValue = 1;
let productsInCart = 0;
let price = 250.0
let discount = 0.5;

// Les clicks
btnHamburger.addEventListener('click', onHamburgerClick);
btnMenuClose.addEventListener('click', onBtnMenuCloseClick);

btnCart.addEventListener('click', openCart);

btnPlus.addEventListener('click', productCounterPlus);
btnMinus.addEventListener('click', productCounterMinus);

// Pour chaques images , on peut cliquer
gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);

btnAddToCard.addEventListener('click', addToCart);

heroImg.addEventListener('click', onHeroImgClick);


// Création des fonctions
function onHamburgerClick() {
    menu.classList.remove('hidden');
}

function onBtnMenuCloseClick() {
    menu.classList.add('hidden');
}

function openCart() {
    cart.classList.toggle('hidden');
}

function productCounterPlus() {
    setProductCounter(1);
}

function productCounterMinus() {
    setProductCounter(-1);
}

// Change le nombre de produits
function setProductCounter(value) {
    if ((productCounterValue + value) > 0) {
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue;
    }
}


function onThumbClick(event) {
    // Enlève pour chaques images le statut active
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    event.target.parentElement.classList.add('active');
    heroImg.src = event.target.src.replace('-thumbnail', '');
}

// Change d'image (vers la droite)
function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

//  Change d'image (vers la gauche)
function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

// Fonction pour avoir la bonne image 
function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}


function setHeroImage(imageIndex) {
    heroImg.src = `./images/image-product-${imageIndex}.jpg`;
    // Enlève le statut active pour chaques images
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    // Ajoute le statut active à la miniature
    gallery[imageIndex-1].classList.add('active');
}

// Ajouter au panier
function addToCart() {
    productsInCart += productCounterValue;

    const productHTMLElement = `
    <div class="item">
        <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
        <div class="details">
            <div class="product-name">Autumn Limited Edition...</div>
            <div class="price-group">
                <div class="price">$${(price*discount).toFixed(2)}</div> x
                <div class="count">${productsInCart}</div>
                <div class="total-amount">$${(price*discount*productsInCart).toFixed(2)}</div>
        </div>
        </div>
        <img id="btnDelete" src="./images/icon-delete.svg" alt="icon delete">
    </div>
    `;

    productInShoppingCart.innerHTML = productHTMLElement;

    updateCart();

    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.addEventListener('click', onBtnDeleteClick);
    //console.log(productsInCart);
}

// Maj du panier
function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}

// Maj de l'icône
function updateCartIcon() {
    cartCount.textContent = productsInCart;
    if (productsInCart == 0) {
        if (!cartCount.classList.contains('hidden')) {
            cartCount.classList.add('hidden');
        }
    } else {
        cartCount.classList.remove('hidden');
    }
}

// Maj du message comme quoi le panier est vide
function updateMsgEmpty() {
    if (productsInCart == 0) {
        if (msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.remove('hidden');
        }
    } else {
        if (!msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.add('hidden');
        }
    }

}

// Maj du bouton checkout
function updateCheckoutButton() {
    if (productsInCart == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        }
    } else {
        checkout.classList.remove('hidden');
    }
}

// Bouton supprimer 
function onBtnDeleteClick() {
    productsInCart--;
    updateCart();

    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML = productsInCart;
    totalAmount.innerHTML = `$${(price*discount*productsInCart).toFixed(2)}`;

    if (productsInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}

//  Clique sur l'image
function onHeroImgClick() {
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1) {
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose);

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.product-hero');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });

            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.previous');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
        }
        overlay.classList.remove('hidden');
    }
}

// Fermeture du bouton
function onBtnOverlayClose() {
    overlay.classList.add('hidden');
}

function onThumbClickLightbox(event) {
    // Pour chaques images de la lightbox , supprime le statut active
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    // Ajoute le statut active
    event.target.parentElement.classList.add('active');
    // Maj de la miniature
    lightboxHero.src = event.target.src.replace('-thumbnail', '');
}

// Quand on clique sur le bouton suivant 
function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

// Quand on clique sur le bouton précédent de l'overlay
function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}

// Image de base de l'overlay
function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}


function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `./images/image-product-${imageIndex}.jpg`;
    // Pour chaques images , enlève le statut active
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    // Statut active sur l'image
    lightboxGallery[imageIndex-1].classList.add('active');
}