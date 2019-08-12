
$(document).ready(function() {
    let baseurl = 'http://localhost:3000/api/users'
    //Register Trigger
     $('#register-button').on('click', function() {
        event.preventDefault()
        $('.homepage').hide()
        $('#login-form').hide()   
        $('#signup-form').show()  
        })
    
    $('#register-link').on('click', function() {
        event.preventDefault()
        $('.homepage').hide()
        $('#login-form').hide()   
        $('#signup-form').show()  
        })
    
    // Login
    $('#login-button').on('click', function() {
        event.preventDefault()
        $('.homepage').hide()
        $('#signup-form').hide()  
        $('#login-form').show()  
        })

    // Register
    $('#signup-form-submit').on('submit', function() {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url: `${baseurl}/signup`,
            data: {
                email : $('#register-email').val(),
                username : $('#register-username').val(),
                password : $('#register-password').val()
            }            
        })
        .done( user => {
            console.log(user)
            $('#signup-form').hide()  
            $('#login-form').show() 
        })
        .fail( err => {
            $('#register-alert').empty().append(`
            <div class="mt-3 alert alert-warning alert-dismissible fade show" role="alert">
            ${err.responseJSON}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`)
        })
    })

    $('#login-form-submit').on('submit',function() {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url: `${baseurl}/signin`,
            data: {
                email : $('#login-email').val(),
                password : $('#login-password').val()
            }            
        })
        .done( user => {
            localStorage.setItem('token', user.access_token)
            localStorage.setItem('username', user.username)
            $('#login-button').hide()
            $('.logout').show()
            $('#login-form').hide()
            $('#workspace').show() 
        })
        .fail( err => {
            $('#login-alert').empty().append(`
            <div class="mt-3 alert alert-warning alert-dismissible fade show" role="alert">
            ${err.responseJSON}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`)
        })
    })

    $('#logout-button').on('click', function() {
        signOut()
    })
})


function onSuccess(googleUser) {
    const { id_token } = googleUser.getAuthResponse();
    console.log("Signing in with Google");
    
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/users/signin/google",
        data: {
        id_token
        }
    })
    .done( user => {
        localStorage.setItem('token', user.access_token)
        localStorage.setItem('username', user.username)
        $('#login-button').hide()
        $('.logout').show()
        $('#login-form').hide()
        $('#workspace').show() 
    })
    .fail( err => {
        console.log(err.responseJSON)
    })
}

function onFailure(error) {
console.log(error);
}

function renderButton() {
gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 350,
    'height': 40,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
});
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log("User signed out.");
      localStorage.clear();
      $('#login-button').show()
        $('.logout').hide()
        $('.homepage').show()
        $('#workspace').hide() 
    });
  }