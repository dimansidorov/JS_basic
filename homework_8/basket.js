"use strict";

const basketCountElem = document.querySelector('.cartIconWrap span');
const totalElem = document.querySelector('.basketTotal');
const basketElem = document.querySelector('.basket');
const basketTotalValueElem = document.querySelector(".basketTotalValue");

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketElem.classList.toggle('hidden');
});

const goodsInBasket = {};
const goods = document.querySelector('.featuredItems');

goods.addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const good = event.target.closest('.featuredItem');
    const goodId = Number(good.dataset.id);
    const goodName = good.dataset.name;
    const goodPrice = Number(good.dataset.price);
    addToCart(goodId, goodName, goodPrice);
    basketCountElem.textContent = totalInBasket();
    basketTotalValueElem.textContent = basketTotalValue();
    renderGoodsInBasket(goodId);
});

function addToCart(id, name, price) {
    if (goodsInBasket[id]) {
        goodsInBasket[id].count++;
    } else {
        goodsInBasket[id] = {
            'id': id,
            'name': name,
            'price': price,
            'count': 1
        }
    }
}

function totalInBasket() {
    return Object.values(goodsInBasket)
        .reduce((acc, product) => acc + product.count, 0);
}

function basketTotalValue() {
    return Object.values(goodsInBasket)
        .reduce((acc, product) => acc + product.price * product.count, 0)
}

function renderGoodsInBasket(id) {
    const basketRowElem = basketElem.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowElem) {
        renderNewGood(id);
        return
    }

    basketRowElem
        .querySelector('.productCount').textContent = goodsInBasket[id].count;
    basketRowElem
        .querySelector('.productTotalRow')
        .textContent = goodsInBasket[id].count * goodsInBasket[id].price;
    return;

}

function renderNewGood(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${goodsInBasket[productId].name}</div>
            <div>
                <span class="productCount">${goodsInBasket[productId].count}</span> шт.
            </div>
            <div> $${goodsInBasket[productId].price}</div>
            <div>
                <span class="productTotalRow">${goodsInBasket[productId].count * goodsInBasket[productId].price}</span>
            </div>
        </div>`;
    totalElem.insertAdjacentHTML('beforebegin', productRow);

}