// LISTA (ARRAY) DO CARRINHO
let cartList = [];

// LISTA DE ITENS ENCONTRADOS NA PESQUISA
let searchList = [];

// ATÉ PENSEI EM FAZER UMA LISTA PARA O PADRÃO (TODOS), PORÉM ACREDITO QUE SERIA REDUNDANTE, AFINAL EU VOU PUXAR TUDO DE UM ARQUIVO.JS DENTRO DO PROJETO

// RENDERIZAR OS PRODUTOS DE UMA LISTA
function renderCards(list) {

    clearCards ();

    let cardList = document.querySelector("#card-list");

    if (list.length == 0) { // condição de lista vazia para aviso 
        cardList.insertAdjacentHTML("beforeend",
            `<li class="card-empty">
                <span class="card-empty-title">OPS... NENHUM PRODUTO ENCONTRADO</span>
                <span class="card-empty-description">Infelizmente sua busca não teve resultados, tente outros termos.</span>
            </li>`
        )
    }

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

// LIMPAR OS PRODUTOS NO HTML
function clearCards () {
    let cardList = document.querySelector("#card-list");
    cardList.innerHTML = "";
}

// RENDERIZAR CARRINHO
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

// BOTÃO DE ADICIONAR O PRODUTO AO CARRINHO (CART)
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

// ADICIONAR O PRODUTO AO CARRINHO
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

// LIMPAR CARRINHO
function clearCart() {
    let ulCartList = document.querySelector("#cart-list");
    ulCartList.innerHTML = "";
}

// CHECAR SE O PRODUTO JÁ EXISTE NO CARRINHO
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

// BOTÃO DE REMOVER ITEM COMPLETAMENTE DO CARRINHO
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

// REMOVER COMPLETAMENTE PRODUTO DO CARRINHO
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

// ATUALIZAR QUANTIDADE DE CADA ITEM NO CARRINHO
function updateItemQuantity () {

    let cartQuantities = document.querySelectorAll(".cart-quantity")

    for (let i = 0; i < cartQuantities.length; i++) {

        let cartQuantity = cartQuantities[i];

        cartQuantity.innerHTML = `${cartList[i].quantity}`;
    }
}

// BOTÃO DE DIMINUIR 1 DA QUANTIDADE DO ITEM NO CARRINHO
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

// DIMINUIR EM 1 A QUANTIDADE DO ITEM NO CARRINHO
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

// BOTÃO DE ADICIONAR 1 NA QUANTIDADE DO ITEM NO CARRINHO
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

// ATUALIZAR QUANTIDADE TOTAL DE TODOS OS ITENS NO CARRINHO
function updateCartQuantity () {
    let cartQuantity = document.querySelector("#cart-quantity");

    let total = 0;

    for (let i = 0; i < cartList.length; i++) {
        let cartItem = cartList[i];
        total+= cartItem.quantity;
    }

    cartQuantity.innerHTML = `${total}`
}

// ATUALIZAR O CUSTO DE TODOS OS ITENS NO CARRINHO
function updateCartValue (coupon) {
    let cartValue = document.querySelector("#cart-value");

    let cartTotalValue = 0;

    for (let i = 0; i < cartList.length; i++) {

        let cartItem = cartList[i];

        cartTotalValue += cartItem.value * cartItem.quantity;
    }

    if (coupon == "cupom25") {
        cartTotalValue -= cartTotalValue/100*25;
    }

    cartValue.innerHTML = `R$ ${cartTotalValue.toFixed(2)}`
}

// CHAMA FUNÇÕES DE ATUALIZAÇÃO DO FINAL DO CARRINHO E ALTERA ESTILO DO "FINAL" DO CARRINHO SE NECESSÁRIO
function updateCartTail () {
    updateCartQuantity ();
    updateCartValue (coupon.value);

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

// FUNÇÃO PARA FAZER O FORM DO SEARCH IR COM ENTER (E NÃO RECARREGAR A PÁGINA)
function searchInput () {
    let form = document.querySelector("#form-search");
    let searchBar = document.querySelector("#search");

    form.addEventListener("submit", function(e){
        e.preventDefault();
        search(searchBar.value);
        // return false;
    })
}

// BOTÃO DE PESQUISA
function searchButton () {
    let searchButton = document.querySelector("#button-search");
    let searchBar = document.querySelector("#search");

    searchButton.addEventListener("click", function (e){
        search(searchBar.value);
    })
}

// PESQUISA
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

// BOTÕES DE TAG
function tagButtons () {
    let tagAllButton = document.querySelector("#tagAll");
    let tagAcessoryButton = document.querySelector("#tagAcessory");
    let tagShoesButton = document.querySelector("#tagShoes");
    let tagShirtButton = document.querySelector("#tagShirts");

    tagAllButton.addEventListener("click", function (e) {
        tagAllButton.classList.add("bold");
        tagAcessoryButton.classList.remove("bold");
        tagShoesButton.classList.remove("bold");
        tagShirtButton.classList.remove("bold");
        renderCards(data);
    })

    tagAcessoryButton.addEventListener("click", function (e) {
        tagAllButton.classList.remove("bold");
        tagAcessoryButton.classList.add("bold");
        tagShoesButton.classList.remove("bold");
        tagShirtButton.classList.remove("bold");
        renderCards(tagFilterList ("Acessórios"));
    })
    
    tagShoesButton.addEventListener("click", function (e) {
        tagAllButton.classList.remove("bold");
        tagAcessoryButton.classList.remove("bold");
        tagShoesButton.classList.add("bold");
        tagShirtButton.classList.remove("bold");
        renderCards(tagFilterList ("Calçados"));
    })
    
    tagShirtButton.addEventListener("click", function (e) {
        tagAllButton.classList.remove("bold");
        tagAcessoryButton.classList.remove("bold");
        tagShoesButton.classList.remove("bold");
        tagShirtButton.classList.add("bold");
        renderCards(tagFilterList ("Camisetas"));
    })
}

// FILTRO DE TAGS
function tagFilterList (tag) {

    const tagList = [];

    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        for (let j = 0; j < item.tag.length; j++) {
            let itemTag = item.tag[j];
            if (itemTag == tag) {
                tagList.push (item);
            }
        }
    }
    return tagList;
}

// APLICAR CUPOM
function couponApply () {
    let couponButton = document.querySelector("#button-coupon");
    let coupon = document.querySelector("#coupon")

    couponButton.addEventListener("click", function(e){
        updateCartValue (coupon.value);
    })

    coupon.addEventListener("keypress", function(e){
        if (e.key === "Enter") {
            updateCartValue (coupon.value);
        }
    })
}

// FINALIZAR COMPRA
function checkOut () {
    let checkOutButton = document.querySelector("#button-checkout");

    let alertBox = document.querySelector("#alert-box");

    checkOutButton.addEventListener("click", function(e){

        alertBox.innerHTML = "";

        alertBox.insertAdjacentHTML("beforeend", `
        <div class="container">
            <span class="alert-msg">Compra realizada com sucesso!</span>
            <span class="alert-close-button">X</span>
        </div>
        `)
        closeAlertButton ();
    })
}

// BOTÃO DE FECHAR ALERTA 
function closeAlertButton () {
    let alertBox = document.querySelector("#alert-box");
    let closeButton = document.querySelector(".alert-close-button");

    closeButton.addEventListener("click", function (e){
        alertBox.innerHTML = "";
    })
}

// FUNÇÃO PARA INICIAR TODO O FUNCIONAMENTO
function start() {
    renderCards(data);
    renderCart(cartList); // eu chamo o carrinho aqui, porque se fosse um site completinho eu teria que renderizar o que o cliente deixou no carrinho;
    tagButtons ();
    searchButton ();
    couponApply ();
    checkOut ();
    searchInput ();
}

// CHAMANDO A FUNÇÃO START
start();