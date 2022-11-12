let cartList = [];

function renderCards(data) {

    let cardList = document.querySelector("#card-list");

    for (let i = 0; i < data.length; i++) {
        let product = data[i];

        cardList.insertAdjacentHTML("beforeend",
            `<li class="card">
            <img src="${product.img}" alt="${product.nameItem}" class="card-img">
            <span class="card-category">${product.tag}</span>
            <span class="card-title">${product.nameItem}</span>
            <span class="card-description">${product.description}</span>
            <span class="card-price">R$ ${product.value.toFixed(2)}</span>
            <span class="addToCart" id="${product.id}">${product.addCart}</span>
            </li>`
        )
    }
    addToCartButton();
}

function clearCart() {
    let ulCartList = document.querySelector("#cart-list");
    ulCartList.innerHTML = "";
}

function addToCart(product) {

    cartList.push(product);
    clearCart();
    renderCart(cartList);
}

function removeFromCart(product) {
    for (let i = 0; i < cartList.length; i++) {

        let productOnCart = cartList[i];

        if (product.id == productOnCart.id) {
            cartList.splice(i, 1);
            clearCart();
            renderCart(cartList);
            return;
        }
    }
}

function renderCart(cartList) {
    let ulCartList = document.querySelector("#cart-list");

    for (let i = 0; i < cartList.length; i++) {

        let product = cartList[i];

        ulCartList.insertAdjacentHTML("beforeend",
            `<li class="cart-item">
        <div class="cart-list-part1">
            <img src="${product.img}" alt="${product.nameItem}" class="cart-img">
        </div>
        <div class="cart-list-part2">
            <span class="cart-title">${product.nameItem}</span>
            <span class="cart-price">R$ ${product.value.toFixed(2)}</span>
            <span class="removeFromCart" id="cartId-${product.id}">Remover produto</span>
        </div>
        </li>`
        )
    }
    removeFromCartButton();
    updateCartTail ();
}

function addToCartButton() {

    let addToCartButtons = document.querySelectorAll(".addToCart");

    for (let i = 0; i < addToCartButtons.length; i++) {
        let addToCartButton = addToCartButtons[i];

        addToCartButton.addEventListener("click", function (e) {
            let target = e.target;
            addToCart(data[target.id - 1]);
        });
    }
}

function removeFromCartButton() {

    let removeFromCartButtons = document.querySelectorAll(".removeFromCart");

    for (let i = 0; i < removeFromCartButtons.length; i++) {

        let removeFromCartButton = removeFromCartButtons[i];

        removeFromCartButton.addEventListener("click", function (e) {
            let target = e.target;
            let cartId = target.id.substring(7)
            removeFromCart(data[cartId - 1]);
        });
    }
}

function updateCartQuantity () {
    let cartQuantity = document.querySelector("#cart-quantity");
    cartQuantity.innerHTML = `${cartList.length}`
}

function updateCartValue () {
    let cartValue = document.querySelector("#cart-value");

    let cartTotalValue = 0;

    for (let i = 0; i < cartList.length; i++) {

        let cartItem = cartList[i];

        cartTotalValue += cartItem.value;
    }

    cartValue.innerHTML = `R$ ${cartTotalValue.toFixed(2)}`
}

function updateCartTail () {
    updateCartQuantity ();
    updateCartValue ();

    let cartTail = document.querySelector("#cart-tail");
    let ulCartList = document.querySelector("#cart-list");

    if (cartList.length == 0) {
        cartTail.classList.add("hide");
        ulCartList.classList.add("hide-scrollbar");

        ulCartList.insertAdjacentHTML("beforeend", 
        `<li class="cart-empty-title">Carinho vazio</li>
        <li class="cart-empty-description">Adicione itens</li>
        `
        )

    }
    else {
        cartTail.classList.remove("hide");   
        ulCartList.classList.remove("hide-scrollbar");
    } 
}

function start() {
    renderCards(data);
    renderCart(cartList); // eu chamo o carrinho aqui, porque se fosse um site completinho eu teria que renderizar o que o cliente deixou no carrinho;
}

start();