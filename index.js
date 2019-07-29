$(document).ready(() => {
    indexItems();
});

function indexItems(){
    $.get('http://localhost:8004/items/')
    .done((items) => {
        for (item of items) {
            const $itemContainer = $(`
    <div class="item-container" 
    onClick="location.href = '/item_detail.html?id=${item.id}'">
        <img src="${item.image}" alt="">
            <p class="item-title">${item.title}</p>
            <p class="item-price">가격 : ${item.price}</p>
    </div>`);
            const itemListContainer = $('#item-list-container');
            $itemContainer.appendTo(itemListContainer);
        }
    });
}