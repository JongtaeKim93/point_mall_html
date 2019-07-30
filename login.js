function login() {
    const username = $('#username').val();
    const password = $('#password').val();
    const authorization = 'Basic ' + btoa(username + ":" + password);
    localStorage.setItem('authorization', authorization);
    location.href = '/';
}