function loginContent() {

    let template = `<div class="row login-register" style="margin:10vh">
<div class="col-md-6 login-form">
    <h3>Login Form</h3>
    <form class="login">
        <div class="form-group">
            <input type="email" class="form-control" id="login-email" placeholder="Your Email *" required />
        </div>
        <div class="form-group">
            <input type="password" class="form-control" id="login-password" placeholder="Your Password *" required/>
        </div>
        <div class="form-group">
            <input type="submit" class="btnSubmit btnLogin" value="Login" />
        </div>
       <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </form>

</div>
<div class="col-md-6 register-form">
    <h3>Register Form</h3>
    <form class="register">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Firstname*" id="register-firstname" value="" required />
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Lastname *" id="register-lastname" value="" required />
        </div>
        <div class="form-group">
            <input type="email" class="form-control" placeholder="Your Email *" id="register-email" value="" required/>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Your Password *" id="register-password" value="" />
        </div>
        <div class="form-group">
            <input type="submit" class="btnSubmit btnRegister" value="Register" />
        </div>
    </form>
</div>
</div>`

    $('#app').empty();
    $('#app').append(template)


    $('.login').on('submit', function() {
        const email = $('#login-email').val();
        const password = $('#login-password').val();
        event.preventDefault()
        Swal.showLoading()
        $.ajax({
                method: `post`,
                url: `http://localhost:3000/user/login`,
                data: { email, password }
            })
            .done(data => {
                $('#app').empty();
                $('.login-register').remove()
                Swal.fire({
                    type: 'success',
                    text: 'successfully login',
                })
                localStorage.setItem('token', data.token)
                localStorage.setItem('firstname', data.firstname)
                mainContent()
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    text: 'Something error',
                })
            })
    })

    $('.register').on('submit', function() {
        const email = $('#register-email').val();
        const password = $('#register-password').val();
        const firstname = $('#register-firstname').val();
        const lastname = $('#register-lastname').val();
        event.preventDefault()
        Swal.showLoading()
        $.ajax({
                method: `post`,
                url: `http://localhost:3000/user/register`,
                data: { email, password, firstname, lastname }
            })
            .done(data => {
                Swal.fire({
                    type: 'success',
                    text: 'successfully register',
                })

            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    text: 'Something error',
                })
            })
    })

    // $('body').on('click', '.g-signin2n', function onSignIn(googleUser) {
    //     console.log('aaa')
    //     event.preventDefault()
    //     var id_token = googleUser.getAuthResponse().id_token
    //     $.ajax({
    //             url: `http://localhost:3000/user/loginOauth`,
    //             method: `POST`,
    //             data: {
    //                 token: id_token
    //             }
    //         })
    //         .then(data => {
    //             console.log('berhasil')
    //             localStorage.setItem('token', data.token)
    //             localStorage.setItem('firstname', data.firstname)
    //             mainContent()
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // })




}