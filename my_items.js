const userId = 1;

$(document).ready(() => {
    indexItems();
    getUser();
});

function getUser(){
    $.get('http://localhost:8004/users/' + userId + '/')
    .done((user) => {
        $('#container > h2').text('잔고 : ' + user.point);
    });
}

function indexItems() {
    $.get('http://localhost:8004/users/' + userId + '/items/')
        .done((userItems) => {
            for (userItem of userItems) {
                const item = userItem.item;
                const $itemContainer = $(`
    <div class="item-container" 
    onClick="location.href = '/item_detail.html?id=${item.id}'">
        <img src="http://localhost:8004${item.image}" alt="">
            <p class="item-title">${item.title}</p>
            <p class="item-price">갯수 : ${userItem.count}</p>
    </div>`);
                const itemListContainer = $('#item-list-container');
                $itemContainer.appendTo(itemListContainer);
            }
        });
}