const serverUrl = "http://localhost:3000"
$(document).ready(function(){

    //set page if user log in or not

    if(localStorage.getItem("token")) {
        addTokenAfterSigned({
            full_name: localStorage.getItem("loggedIn"),
            token: localStorage.getItem("token")
        } )
    } else {
        $('#first-pop-up').css('visibility', 'visible')
    }

    //register the user

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

                addTokenAfterSigned(data)

            })
            .fail(function(err) {
                showError(err.responseJSON.message)
            })
    })

    //user login

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

    //add click event on dynamically added complete button

    $(document).on('click', '.update-todo', function(){ 
       
        if(confirm("Have you finished this task?")) {
            $.ajax({
                url: `${serverUrl}/todo/${$(this).val()}`,
                type: 'PATCH',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            .done(function() {
                location.reload()
                console.log('You have completed this todo')
            })
            .fail(function(err) {
                console.log(err)
            })
        }   
    });

    //add click event on dynamically added complete button

    $(document).on('click', '.delete-todo', function(){ 
        if(confirm('Are you sure you want to delete this todo?') ) {

            $(this).closest("div.card").remove();
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
        }

   });

   //filter todo list based on input

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

            $('#todo-lists').empty()
            populateTodos(todos)
        })
        .fail(function(err) {
            console.log(err)
        })
   })

   //create a todo list

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
                console.log(newTodo)             
                populateTodos([newTodo])
            })
            .fail(function(err) {
                showError(err.responseJSON.message)
            })
   })

  
})
//  End Document Ready

//sign in with google
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

// hide and show things after log in or register

function addTokenAfterSigned(data) {
    $('#first-pop-up').css('visibility', 'hidden')

    localStorage.setItem("token", data.token)
    localStorage.setItem("loggedIn", data.full_name)

    $('#google-button').css('visibility', 'hidden')
    $('#error-message').css('visibility', 'hidden')
    $('#sign-out').css('visibility', 'visible')
    $('form').find("input[type=text], textarea").val("")
    $('form').find("input[type=password], textarea").val("")
    $('#content').css('display', 'block')
    $('#welcome').text(`${data.full_name}'s Todo List`)
    $('#todo-lists').empty()
    loadTodoList()
}

//get user's todo list after log in
function loadTodoList() {

    $.ajax({
        url: `${serverUrl}/todo`,
        method: 'GET',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .done(function(todos){

            $('#todo-lists').empty()
            populateTodos(todos)
        })
}

// load the todo list on page after login
function populateTodos(list) {
    
            list.forEach(function(td, idx) {
                $('#todo-lists').prepend(`
                <div class="card">
                    <div class="card-header" id="heading${idx}">
                        <h2 class="mb-0">
                            <div class="todo-data row">
                                <div class="todo-title col-6">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">
                                    Todo: ${td.name}
                                    </button>
                                </div>
                                <div class="todo-updel-buttons col-6">
                                    <button id=""complete-todo-button class="btn btn-info update-todo" value="${td._id}" dataTarget="#updateModal" data-id="${td._id}" >Complete</button>
                                    <button class="btn btn-danger delete-todo" value="${td._id}">Delete</button>
                                </div>
                            </div>
                        </h2>
                    </div>

                    <div id="collapse${idx}" class="collapse show" aria-labelledby="heading${idx}" data-parent="#todo-lists">
                        <div class="card-body row">
                            <div class="col-4">
                                <p class=""desc>Description: ${td.description}</p>
                                <p class="due_date">Due: ${td.due_date.toString().slice(0, 10)}</p>
                                <p class="completed-todo">Completed: ${td.completed}</p>
                            </div>
                            <div class="col-5">
                                <img src="${td.qr_link}">
                            </div>
                        </div>
                    </div>
                </div>
                `)
            })
}

// function checkCompleted() {
//     $('.card').each(function() {
//         console.log($(this))
//         console.log($(this).find('.completed-todo'))
//     })
// }