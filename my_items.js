const userId = 1;

$(document).ready(() => {
    indexItems();
    getUser();
});

function getUser() {
    $.ajax({
        url: 'http://localhost:8003/me/',
        type: 'get',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", localStorage.getItem('authorization'));
        }
    }).done((user) => {
        $('#container > h2').text('잔고 : ' + user.point);
    });
}

function indexItems() {
    $.ajax({
        url: 'http://localhost:8003/me/items',
        type: 'get',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", localStorage.getItem('authorization'));
        }
    }).done((userItems) => {
        for (userItem of userItems) {
            const item = userItem.item;
            const $itemContainer = $(`
    <div class="item-container"
    onClick="location.href = '/item-detail.html?id=${item.id}'">
        <img src="http://localhost:8003${item.image}" alt="">
        <p class="item-title">${item.title}</p>
        <p class="item-price">갯수 : ${userItem.count}</p>
    </div>`);
            const itemListContainer = $('#item-list-container');
            $itemContainer.appendTo(itemListContainer);
        }
    });
}