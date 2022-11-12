let cartList = [];

let searchList = [];

function renderCards(list) {

    clearCards ();

    let cardList = document.querySelector("#card-list");

    for (let i = 0; i < list.length; i++) {
        let product = list[i];

        cardList.insertAdjacentHTML("beforeend",
            `<li class="card">
                <figure class="card-figure">
                    <img src="${product.img}" alt="${product.nameItem}" class="card-img">
                </figure>
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

function clearCards () {
    let cardList = document.querySelector("#card-list");
    cardList.innerHTML = "";
}

function clearCart() {
    let ulCartList = document.querySelector("#cart-list");
    ulCartList.innerHTML = "";
}

function checkCart (product) {

    let productID = product.id;

    for (let i = 0; i < cartList.length; i++) {
        let cartItem = cartList[i];

        if (productID == cartItem.id) {
            return true;
        }
    }
    return false;
}

function addToCart(product) {

    let resultCheck = checkCart (product);

    if (resultCheck == false) {
        product.quantity = 1;
        cartList.push({...product});
    }
    else {
        for (let i = 0; i < cartList.length; i++) {
            let cartItem = cartList[i];

            if (product.id == cartItem.id) {
                cartItem.quantity++;
                renderCart(cartList);
            }
        }
    }

    renderCart(cartList);
}

function removeFromCart(product) {
    for (let i = 0; i < cartList.length; i++) {

        let productOnCart = cartList[i];

        if (product.id == productOnCart.id) {
            cartList.splice(i, 1);
            renderCart(cartList);
            return;
        }
    }
}

function renderCart(cartList) {

    clearCart();

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
            <div class="cart-amount">
                <button class="cart-remove1" id="cartSubId-${product.id}"type="button">-</button>
                <button class="cart-quantity" type="button">1</button>
                <button class="cart-add1" id="cartAddId-${product.id}" type="button">+</button>
            </div>
            <span class="removeFromCart" id="cartId-${product.id}">Remover produto</span>
        </div>
        </li>`
        )
    }
    removeFromCartButton();
    subQuantityCartButton ();
    addQuantityCartButton ();
    updateItemQuantity ();
    updateCartTail ();
}

function updateItemQuantity () {

    let cartQuantities = document.querySelectorAll(".cart-quantity")

    for (let i = 0; i < cartQuantities.length; i++) {

        let cartQuantity = cartQuantities[i];

        cartQuantity.innerHTML = `${cartList[i].quantity}`;
    }
}

function subQuantityCartButton () {
    let subQuantityCartButtons = document.querySelectorAll(".cart-remove1");

    for (let i = 0; i < subQuantityCartButtons.length; i++) {
        let subQtCartButton = subQuantityCartButtons[i];

        subQtCartButton.addEventListener("click", function (e){
            let target = e.target;
            let cartId = target.id.substring(10);
            removeOneUnit(data[cartId - 1]);
        })
    }
}

function removeOneUnit (product){

    for (let i = 0; i < cartList.length; i++) {
        let cartItem = cartList[i];

        if (product.id == cartItem.id) {
            cartItem.quantity--;

            if (cartItem.quantity <= 0) {
                removeFromCart(product);
            }
            renderCart(cartList);
        }
    }
}


function addQuantityCartButton () {

    let addQuantityCartButtons = document.querySelectorAll(".cart-add1");

    for (let i = 0; i < addQuantityCartButtons.length; i++) {
        let addQtCartButton = addQuantityCartButtons[i];

        addQtCartButton.addEventListener("click", function (e){
            let target = e.target;
            let cartId = target.id.substring(10);
            addToCart(data[cartId - 1]);
        })
    }
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

    let total = 0;

    for (let i = 0; i < cartList.length; i++) {
        let cartItem = cartList[i];
        total+= cartItem.quantity;
    }

    cartQuantity.innerHTML = `${total}`
}

function updateCartValue () {
    let cartValue = document.querySelector("#cart-value");

    let cartTotalValue = 0;

    for (let i = 0; i < cartList.length; i++) {

        let cartItem = cartList[i];

        cartTotalValue += cartItem.value * cartItem.quantity;
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

function search(parameter) {
    
    let filter = parameter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    searchList = [];

    for (let i = 0; i < data.length; i++) {
        let product = data[i];
        let productName = product.nameItem.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let productDescription = product.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if (productName.indexOf(filter) > -1 || productDescription.indexOf(filter) > -1) {
            searchList.push(product);
        }
        else { // só pesquisa por tag se ele não se encaixar na pesquisa pelo nome e descrição
            for (let j = 0; j < product.tag.length; j++) {

                let tag = product.tag[j].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                if (tag.indexOf(filter) > -1) {
                    searchList.push(product);
                }

            }
        }
    }

    renderCards(searchList);
}


function searchButton () {
    let searchButton = document.querySelector("#button-search");
    let searchBar = document.querySelector("#search");

    searchButton.addEventListener("click", function (e){
        search(searchBar.value);
    })
}


function start() {
    renderCards(data);
    renderCart(cartList); // eu chamo o carrinho aqui, porque se fosse um site completinho eu teria que renderizar o que o cliente deixou no carrinho;
    searchButton ();
}

start();