$(document).ready(() => {
    indexItems();

    const domContainer = document.querySelector('#like_button_container');
    ReactDOM.render((
        <button onClick={() => this.setState({ liked: true })}>
            Like
        </button>
    ), domContainer);
});

function indexItems() {
    $.get('http://localhost:8003/items/')
    .done((items) => {
        for (const item of items) {
            const $itemContainer = $(`
    <div class="item-container"
    onClick="location.href = '/item-detail.html?id=${item.id}'">
        <img src="${item.image}" alt="">
        <p class="item-title">${item.title}</p>
        <p class="item-price">가격 : ${item.price}</p>
    </div>`);
            const itemListContainer = $('#item-list-container');
            $itemContainer.appendTo(itemListContainer);
        }
    });
}
