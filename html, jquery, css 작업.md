# html, jquery, css 작업

**cmd에서 front작업할 디렉토리로 이동**

```
python -m http.server 8080
```

> http서버 실행, 'localhost:8080' 주소로 이동하면 해당 디렉토리의 index.html 실행



**.html의 기본 형식**

```html
<!DOCTYPE html>
<html>
    <head>
		<meta charset="utf8">
    </head>
    <body>
        <header></header>
        <footer></footer>
    </body>
</html>
```



**css, jquery, js연결하기**

```html
<link rel="stylesheet" href="style.css">
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="index.js" type="text/javascript"></script>
```



**index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8">
        <link rel="stylesheet" href="style.css">
        <script src="//code.jquery.com/jquery.min.js"></script>
        <script src="index.js" type="text/javascript"></script>
    </head>
    <body>
        <header>
            <a href="/">PointMall</a>
        </header>
        <div id="container"></div>
        <div id="item-list-container"></div>
        <footer>
            <p>PointMall</p>
            <p>Email : support@pointmall.com</p>
        </footer>
    </body>
</html>
```



**index.js**

```js
$(document).ready(() =>{
    indexItems();
});

function indexItems(){
    $.get('http://localhost:8004/items/')
    .done((items) =>{
        for(item of items){
            const $itemContainer = $(`
            <div class="item-container" onclick="location.href = '/item_detail.html?id=${item.id}'">
            <img src="${item.image}" alt="">
            <p class="item-title">${item.title}</p>
            <p class="item-price">가격 : ${item.price}</p>
            </div>
            `);
            const itemListContainer = $('#item-list-container');
            $itemContainer.appendTo(itemListContainer);
        }
    });
}
```



**item_detail.html**

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8">
    <link rel="stylesheet" href="style.css">
    <script src="//code.jquery.com/jquery.min.js"></script>
    <script src="item_detail.js"></script>
</head>

<body>
    <header>
        <a href="/">PointMall</a>
    </header>
    <div id="container"></div>
    <div class="item-image-container">
        <img src="" alt="">
    </div>
    <div class="item-detail-container">
        <p>
            <b></b>
        </p>
        <p>

        </p>
        <button onclick="purchase()">구입</button>
    </div>
    <footer>
        <p>Point Mall</p>
        <p>Email : support@pointmall.com</p>
    </footer>
</body>

</html>
```



**item_detail.js**

```js
let itemId = 0;

$(document).ready(() => {
    const url = new URL(location.href);
    itemId = url.searchParams.get("id");
    getItem(itemId)
});

function getItem(itemId) {
    $.get('http://localhost:8004/items/' + itemId + '/')
        .done((item) => {
            $('.item-image-container > img').attr('src', item.image);
            $('.item-detail-container > p > b').text('상품명 : ' + item.title);
            const descElement = $('.item-detail-container > p')[1];
            $(descElement).text('설명 : ' + item.description);
        });
}

function purchase() {
    $.ajax({
        url: 'http://localhost:8004/items/' + itemId + '/purchase/',
        type: 'post',
        dataType: 'json',
        beforeSend: function (xhr) {
            const username = 'admin';
            const password = 'admin';
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
    }).done((result) => {
        location.href = '/my_items.html';
    });
}
```



**my_items.html**

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8">
    <link rel="stylesheet" href="style.css">
    <script src="//code.jquery.com/jquery.min.js"></script>
    <script src="my_items.js" type="text/javascript"></script>
</head>

<body>
    <header>
        <a href="/">PointMall</a>
    </header>
    <div id="container">
        <h1>내 아이템 목록</h1>
        <h2> </h2>
    </div>
    <div id="item-list-container">
    </div>
    <footer>
        <p>Point Mall</p>
        <p>Email : support@pointmall.com</p>
    </footer>
</body>

</html>
```



**my_items.js**

```js
const userId = 1;

$(document).ready(()=> {
    getUser();
    indexItems();
});

function getUser(){
    $.get('http://localhost:8004/users/' + userId + '/')
    .done((user)=> {
        $('#container > h2').text('잔고 : ' + user.point);
    });
}

function indexItems(){
    $.get('http://localhost:8004/users/' + userId + '/items/')
    .done((userItems)=> {
        for (userItem of userItems){
            const item = userItem.item;
            const $itemContainer = $(`
            <div class="item-container"
            onclick="location.href = '/item_detail.html?id=${item.id}'">
            <img src="http://localhost:8004${item.image}" alt="">
            <p class="item-title">${item.title}</p>
            <p class="item-price">갯수 : ${userItem.count}</p>
            </div>
            `);
            const itemListContainer = $('#item-list-container');
            $itemContainer.appendTo(itemListContainer);
        }
    });
}
```

