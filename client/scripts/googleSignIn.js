function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // console.log("authed")

    const {id_token} = googleUser.getAuthResponse()
    $.ajax({
        url: 'http://localhost:3000/user/googleSignIn',
        method: 'POST',
        data: {id_token}
    })
        .done( signedInUser => {
            localStorage.setItem("key", signedInUser.token)
        })
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    localStorage.removeItem("key")
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
