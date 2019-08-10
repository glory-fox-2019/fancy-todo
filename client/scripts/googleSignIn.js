function onSignIn(googleUser) {

    const {id_token} = googleUser.getAuthResponse()
    $.ajax({
        url: 'http://localhost:3000/user/googleSignIn',
        method: 'POST',
        data: {id_token}
    })
        .done( signedInUser => {
            localStorage.setItem("key", signedInUser.token)
            console.log("User sign in")
        })
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    localStorage.removeItem("key")
    auth2.signOut().then(function () {
        $('#first-pop-up').css('visibility', 'visible')
        $('#google-button').css('visibility', 'visible')
        $('#content').css('display', 'none')
      console.log('User signed out.');
    });
  }
