function onSignIn(googleUser) {
    event.preventDefault()
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

$.ajax({
    url: 'https://localhost:4000/users/google-signin',
    method: 'POST',
    data: {
        id_token
    }
        .done((response) => {
            console.log(response)
            $(`#login`).hide()
            $(`#action-btn`).show()
            localStorage.setItem('token', response.token)
            localStorage.setItem('userId', response._id)
            localStorage.setItem('username', response.username)
            todo()
        })
        .fail((err) => {
            console.log(err)
        })
})

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $(`#login`).show()
    $(`#action-btn`).hide()
    $(`#todo`).hide()
    $(`#zero-todo`).hide()
}

function signin(user) {
    console.log('masuk login ga yaaa')
    event.preventDefault()

    $.ajax({
        url: 'http://localhost:4000/users/signin',
        // http://localhost:4000/users/signin
        method: 'POST',
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
        .done((response) => {
            $(`#login`).hide()
            $(`#action-btn`).show()
            $(`#todo`).show()
            console.log(response)
            localStorage.setItem('token', response.token)
            localStorage.setItem('creator', response._id)
            localStorage.setItem('username', response.username)
            todo()
        })
        .fail((err) => {
            console.log(err)
        })
}

function register() {
    // 
    console.log('masuk registerrr ga ya sisss')
    event.preventDefault()
    $.ajax({
        url: 'http://localhost:4000/users/register',
        method: 'POST',
        data: {
            fullName: $('#fullName').val(),
            email: $('#registrasi-email').val(),
            password: $('#registrasi-password').val()
        }
    })
        .then((response) => {
            console.log(response)
            alert('Success Registration')
            $(`#register`).hide()
            $(`#login`).show()
        })
        .catch((err) => {
            console.log(err)
        })
}

function addTodo() {
    console.log('masuk addTodooooooooooooo')
    let id = localStorage.getItem(_id)
    console.log(id)
    $.ajax({
        url: 'http://localhost:4000/todos/create',
        method: 'POST',
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            creator: localStorage.getItem(`_id`),
            isFinished: false,
            due_date: new Date($(`#dueDate`).val())
        }
    })
        .then((response) => {
            let { isFinished, title, description, due_date } = response.todoDetails

            if (isFinished == true) {
                isFinished = ` <label>
                            <input type="checkbox" class="filled-in" checked="checked" />
                            <span>Completed</span>
                       </label>`
            } else {
                isFinished = ` <label>
                            <input type="checkbox" class="filled-in"/>
                            <span>Uncompleted</span>
                       </label>`
            }
            $(`#todo-content`).append(
                ` <tr>
               <td>${isFinished}</td>
               <td>${title}</td>
               <td>${completedAt}</td>
                <td>${description}</td>
                <td>${new Date(due_date).toDateString()}</td>
                <td><a class="btn-floating btn-small waves-effect waves-light red")><i class="material-icons">delete</i></a></td>
            </tr>`
            )
            todo()
            console.log(response)
        })
        .fail((err) => {
            console.log(err)
        })
}

function todo() {
    let id = localStorage.getItem(_id)
    $.ajax({
        url: 'https://localhost:4000/todos/update/:id',
        method: 'GET',
        headers: {
            token: localStorage.getItem(`token`)
        }
    })
        .then((response) => {
            if (response.length == 0) {
                $(`#todo`).hide()
                $(`#zero-todo`).show()
            } else {
                $(`#todo`).show()
                $(`#zero-todo`).hide()
                response.forEach(list => {
                    let label = null
                    if (list.status == false) {
                        label = ` <label>
                              <input type="checkbox" class="filled-in" onclick="changeStatus('${list._id}')"/>
                              <span>Uncompleted</span>
                            </label>`
                    } else {
                        label = ` <label>
                              <input type="checkbox" class="filled-in" checked="checked" onclick="changeStatus('${list._id}')"/>
                              <span>Completed</span>
                          </label>`
                    }

                    $(`#todo-content`).append(
                        ` <tr>
                      <td>${label}</td>
                      <td>${list.name}</td>
                      <td>${list.description}</td>
                      <td>${new Date(list.due_date).toDateString()}</td>
                      <td>${list.isFinished}</td>
                      <td> <a class="btn-floating btn-small waves-effect waves-light red" onclick="deleteTodo('${list._id}')"><i class="material-icons">delete</i></a></td>
                    </tr>`
                    )
                })

                $(`#todo-content`).show()
                $(`#description`).show()
            }
            console.log(response);
        })
        .fail((err) => {
            console.log(err)
        })
}

$(document).ready(function () {
    let token = localStorage.getItem(`token`)

    if (token) {
        $(`#zero-todo`).hide()
        $(`#todo`).show()
        $(`#register`).hide()
        $(`#login`).hide()
        $(`#action-btn`).show()
        todo()
        $(`#logout-btn`).on(`click`, function () {
            $(`#action-btn`).hide()
            $(`#login`).show()
            signOut()
            localStorage.removeItem(`token`)
            localStorage.removeItem(`_id`)
        })
    } else {
        $(`#zero-todo`).hide()
        $(`#login`).show()
        $(`#todo`).hide()
        $(`#register`).hide()
        $(`#action-btn`).hide()
    }
    $(`#back-btn`).on(`click`, function () {
        $(`#register`).hide()
        $(`#login`).show()
    })
    $(`#register-btn`).on(`click`, function () {
        $(`#login`).hide()
        $(`#register`).show()
    })

})