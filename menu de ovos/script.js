const produts = [
    {
        name: "Ovo de Páscoa Minions 100g - Kinder",
        price: 90.00,
        image: "./img/ovominions.png",
    },
    {
        name: "Ovo de Páscoa Marshall 90g - Delice  ",
        price: 60.00,
        image:"./img/ovopatrulha.png",
    },
    {
        name: "Ovo de Páscoa Homem Aranha 150g - Nestle  ",
        price: 70.00,
        image:"./img/ovohomemaranha.png",
    },
    {
        name: "Ovo de Páscoa Barbie 166g - Lacta  ",
        price: 100.00,
        image:"./img/ovobarbie.png",
    },
];
 
let listaprodutos = "";
let carrinhoItens = [];
 
produts.forEach(function(produto) {
    listaprodutos += `
        <div class="box">
            <img src="${produto.image}" alt="" class="image">
            <h2 class="name">${produto.name}</h2>
            <span class="price">R$ ${produto.price.toFixed(2)}</span>
            <div>
            <button class="btn" onclick="adicionarAoCarrinho(${produts.indexOf(produto)})">Comprar</button>
        </div>
        </div>
    `;
});
 
document.getElementById("listaprodutos").innerHTML = listaprodutos;
 
const btnCarrinho = document.getElementById("btnCarrinho");
const btnClose = document.getElementById("close");
const carrinho = document.getElementById("carrinho");
 
btnCarrinho.addEventListener('click', () => {
    carrinho.style.animation = "deslizarDentro 1s forwards";
    btnCarrinho.style.animation = "deslizarDentroBtn 1s forwards";
    carrinho.style.visibility = "visible";
});
 
btnClose.addEventListener('click', () => {
    carrinho.style.animation = "deslizarFora 1s forwards"
    btnCarrinho.style.animation = "deslizarForaBtn 1s forwards"
    setTimeout(() => {
        carrinho.style.visibility = "hidden";
    }, 1000);
});
 
 
function adicionarAoCarrinho(index) {
    const produto = produts[index];
    const itemExistente = carrinhoItens.find(item => item.name === produto.name);
   
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinhoItens.push({ ...produto, quantidade: 1 });
    }
    renderCarrinho();
}
 
function renderCarrinho() {
    let carrinhoDiv = document.getElementById("carrinho");
    carrinhoDiv.innerHTML = `
        <button id="close">X</button>
        <h1 class="titlecart">Minha cesta</h1>
    `;
 
    // Reatribui o evento de fechar carrinho
    const btnClose = document.getElementById("close");
    btnClose.addEventListener('click', () => {
        carrinho.style.animation = "deslizarFora 1s forwards";
        btnCarrinho.style.animation = "deslizarForaBtn 1s forwards";
        setTimeout(() => {
            carrinho.style.visibility = "hidden";
        }, 1000);
    });
 
    let total = 0;
 
    carrinhoItens.forEach((item, index) => {
        const subtotal = item.price * item.quantidade;
        total += subtotal;
 
        carrinhoDiv.innerHTML += `
            <div class="item-carrinho">
                <img src="${item.image}" alt="${item.name}" class="image-carrinho">
               
                <span>R$ ${item.price.toFixed(2)}  = <strong>R$ ${subtotal.toFixed(2)}</strong></span>
                <div>
                    <button onclick="alterarQuantidade(${index}, 1)">+</button>
                    <button onclick="alterarQuantidade(${index}, -1)">-</button>
                    <button onclick="removerDoCarrinho(${index})">Remover</button>
                </div>
            </div>
        `;
    });
 
    carrinhoDiv.innerHTML += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}
 
function alterarQuantidade(index, operacao) {
    carrinhoItens[index].quantidade += operacao;
    if (carrinhoItens[index].quantidade <= 0) {
        carrinhoItens.splice(index, 1);
    }
    renderCarrinho();
}
 
function removerDoCarrinho(index) {
    carrinhoItens.splice(index, 1);
    renderCarrinho();
}