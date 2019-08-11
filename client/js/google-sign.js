let baseURL = 'http://localhost:3000'

function onSignIn(googleUser) {

    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $.ajax({
            method: 'POST',
            url: `${baseURL}/users/login-google`,
            data: {
                "token": id_token
            }
        })
        .done(response => {
            localStorage.setItem('token', response)
            localStorage.setItem('name', profile.getName())

            $('.user-name').empty()
            $('.user-name').append(`${localStorage.getItem('name')}`)
            $('a.home-switch').removeClass('homebase').addClass('home')
            $('.logged-user-name').html(`${localStorage.name}`)

            $('.todos-list').empty()

            getMyTodo()
            $('.logout').show()
            $('.todo-btn').show()
            $('.user-page').show()
            $('.todos-list').show()
            $('.project-btn').show()
            $('.logged-user-name').show()
            $('.user-prof-pic').show()

            $('.login-btn').hide()
            $('.register-form').hide()
            $('.login-form').hide()

        })
        .fail(err => {
            console.log({
                message: 'Google Auth Error',
                error: err
            })
        })


}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();

    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out after this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
        if (result.value) {
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            $('.logout').hide()
            $('.todo-btn').hide()
            $('.user-page').hide()
            $('.todo-form').hide()
            $('.todo-edit-form').hide()
            $('.project-btn').hide()
            $('.project-page-container').hide()
            $('.projects-list-container').hide()
            $('.logged-user-name').hide()
            $('.user-prof-pic').hide()

            $('.login-btn').show()
            $('.register-form').show()

            $('a.home-switch').removeClass('home')
            $('a.home-switch').addClass('homebase')
        }
    })

}