$("#logout").hide()
$('.register-form').hide()
$('.container').hide()

function login() {
    event.preventDefault();
    const data = {
        username: $('#username-login').val(),
        password: $('#password-login').val()
    };

    $.ajax({
        url: `http://localhost:3000/api/login`,
        type: 'POST',
        data

    })
        .done(function (token) {
            console.log(token)
            localStorage.setItem('token',token)
            $('.login-form').hide()
            $('.g-signin2').hide()
            $('.register-form').hide()
            $('#logout').show()
            $('.container').show()
        })
        .fail(function (gg, textStatus) {
            console.log('Err:', textStatus)
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/google-login',
        data: {
            token: id_token
        }
    })
        .done(function (data) {
            console.log('Sign in as', data);
            localStorage.setItem('token',data)
            $('.login-form').hide()
            $('.g-signin2').hide()
            $('.register-form').hide()
            $('#logout').show()
            $('.container').show()
        })
        .fail(function (gg, textStatus) {
            console.log('Error', textStatus);
        })
}

function signOut() {
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $("#logout").hide()
    $('.register-form').hide()
    $('.login-form').show()
    $('.g-signin2').show()
    $('.container').hide()
}

function showRegister(){
    $('.register-form').show()
    $('.login-form').hide()
    $('.g-signin2').hide()
    $("#logout").hide()
    $('.container').hide()
}

function register() {
    event.preventDefault();
    const data = {
        username: $('#username-register').val(),
        password: $('#password-register').val()
    };

    $.ajax({
        url: `http://localhost:3000/api/register`,
        type: 'POST',
        data

    })
        .done(function (token) {
            console.log(token)
            localStorage.setItem('token',token)
            $('.login-form').hide()
            $('.g-signin2').hide()
            $('.register-form').hide()
            $('#logout').show()
        })
        .fail(function (gg, textStatus) {
            console.log('Err:', textStatus)
        })
}

function back(){
    $("#logout").hide()
    $('.register-form').hide()
    $('.login-form').show()
    $('.g-signin2').show()
    $('.container').hide()
}



