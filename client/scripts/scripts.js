const serverUrl = "http://localhost:3000"
$(document).ready(function(){

    if(localStorage.getItem("token")) {
        addTokenAfterSigned({
            full_name: localStorage.getItem("loggedIn"),
            token: localStorage.getItem("token")
        } )
    }

    $('#register').submit(function() {
        event.preventDefault()
        let sendData = {}
        let formData = $(this).serializeArray()
        formData.forEach(function(el) {
            sendData[el.name] = el.value
        })

        $.ajax({
            url: `${serverUrl}/user/register`,
            type: 'POST',
            data: sendData
        })
            .done(function(data) {
                console.log(data)
                addTokenAfterSigned(data)

            })
            .fail(function(err) {
                showError(err.responseJSON.message)
            })
    })

    $('#login').submit(function() {
        event.preventDefault()
        let sendData = {}
        let formData = $(this).serializeArray()
        formData.forEach(function(el) {
            sendData[el.name] = el.value
        })
        $.ajax({
            url: `${serverUrl}/user/signin`,
            type: 'POST',
            data: sendData
        })
            .done(function(data) {
                document.documentElement.scrollTop = 0;
                addTokenAfterSigned(data)
            })
            .fail(function(err) {
                showError(err.responseJSON.message)
            })
        })

        $(document).on('click', '.update-todo', function(){ 
            console.log($(this).val(), "update this")
       });

       $(document).on('click', '.delete-todo', function(){ 

        $.ajax({
            url: `${serverUrl}/todo/${$(this).val()}`,
            type: 'DELETE',
            headers: {
                'token': localStorage.getItem('token')
            }
        })
            .done(function() {
                console.log("Todo successfully deleted")
            })
            .fail(function(err) {
                console.log(err)
            })
   });

   $('#filter-todo').submit(function() {
       event.preventDefault()

       $.ajax({
            url: `${serverUrl}/todo/${$(this).serializeArray()[0].value}`,
            type: 'get',
            headers: {
                'token': localStorage.getItem('token')
            }
       })
        .done(function(todos) {
            console.log(todos)
            $('#todo-lists').empty()
            populateTodos(todos)
        })
   })

   $('#make-todo').submit(function() {
       event.preventDefault()
       let sendData = {}
        let formData = $(this).serializeArray()
        formData.forEach(function(el) {
            sendData[el.name] = el.value
        })
       $.ajax({
           url: `${serverUrl}/todo`,
           method: 'post',
           data: sendData,
           headers: {
               'token': localStorage.getItem('token')
           }
       })
            .done( function(newTodo) {
                
                populateTodos([newTodo])
                console.log(newTodo)
            })
   })
})
//  End Document Ready


function onSignIn(googleUser) {

    const {id_token} = googleUser.getAuthResponse()
    $.ajax({
        url: `${serverUrl}/user/googleSignIn`,
        method: 'POST',
        data: {id_token}
    })
        .done( signedInUser => {
            document.documentElement.scrollTop = 0;
            addTokenAfterSigned(signedInUser)
            console.log("User sign in")
        })
  }
    
      function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.removeItem("loggedIn")
            localStorage.removeItem("token")
            $('#todo-lists').empty()
            $('#first-pop-up').css('visibility', 'visible')
            $('#google-button').css('visibility', 'visible')
            $('#sign-out').css('visibility', 'hidden')
            $('#content').css('display', 'none')
            console.log('User signed out.');
        });

      }

function showError(message) {
    $('#error-message').text(message)
    $('#error-message').css('visibility', 'visible')
}

function addTokenAfterSigned(data) {
    localStorage.setItem("token", data.token)
    localStorage.setItem("loggedIn", data.full_name)
    console.log(localStorage)
    $('#first-pop-up').css('visibility', 'hidden')
    $('#google-button').css('visibility', 'hidden')
    $('#error-message').css('visibility', 'hidden')
    $('#sign-out').css('visibility', 'visible')
    $('form').find("input[type=text], textarea").val("")
    $('form').find("input[type=password], textarea").val("")
    $('#content').css('display', 'block')
    $('#welcome').text(`Welcome ${data.full_name}`)
    $('#todo-lists').empty()
    loadTodoList()
}


function loadTodoList() {
    console.log(localStorage.getItem('token'), "masuk function load")
    $.ajax({
        url: `${serverUrl}/todo`,
        method: 'GET',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .done(function(todos){
            console.log(todos)
            $('#todo-lists').empty()
            populateTodos(todos)
        })
}

function populateTodos(list) {
    
            list.forEach(function(td, idx) {
                $('#todo-lists').prepend(`
                <div class="card">
                    <div class="card-header" id="heading${idx}">
                    <h2 class="mb-0">
                        <div class="todo-data row">
                            <div class="todo-title col-6">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">
                                Title: ${td.name}
                                </button>
                            </div>
                            <div class="todo-updel-buttons col-6">
                                <button class="btn btn-info update-todo" value="${td._id}" dataTarget="#updateModal" data-id="${td._id}" >Update</button>
                                <button class="btn btn-danger delete-todo" onclick="return confirm('Are you sure you want to delete this?');" value="${td._id}">Delete</button>
                            </div>
                        </div>
                    </h2>
                    </div>

                    <div id="collapse${idx}" class="collapse show" aria-labelledby="heading${idx}" data-parent="#todo-lists">
                        <div class="card-body">
                            Description: ${td.description}
                            <p class="due_date">Due: ${td.due_date || "none"}<p>
                        </div>
                    </div>
                </div>
                `)
            })
}