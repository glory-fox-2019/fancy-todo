function showAlert(message) {
    $('#notification').show();
    $('#notification__content').text(message);

    setTimeout(function () {
        $('#notification').hide();
    }, 5000);
}

function signin(email, password) {
    $.ajax({
        url: `http://localhost:3000/api/users/signin`,
        method: `post`,
        data: {
            email, password
        }
    })
        .done(function (response) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('name', response.name)
            localStorage.setItem('id', response.id)

            renderLoggedInPage()
        })
        .fail(function (jqXHR, textStatus) {
            showAlert(jqXHR.responseJSON.msg)
        })
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        url: 'http://localhost:3000/api/users/googlesignin',
        method: 'post',
        headers: { id_token }
    })
        .done(function (response) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('name', response.name)
            localStorage.setItem('id', response.id)
            renderLoggedPage()
        })
        .fail(function (jqXHR, textStatus) {
            showAlert(jqXHR.responseJSON.msg)
        })
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstence

    auth2.signOut()
        .done(function () {
            localStorage.removeItem('token')
        })
        .fail(function (jqXHR, textStatus) {
            showAlert(jqXHR.responseJSON.msg)
        })
}

function register(email, name, password) {
    $.ajax({
        url: `http://localhost:3000/api/users/signup`,
        method: `post`,
        data: {
            email, name, password
        }
    })
        .done(function (response) {
            $("#register").hide()
            $("#login").show()
        })
        .fail(function (jqXHR, textStatus) {
            showAlert(jqXHR.responseJSON.msg)
        })
}

function fetchTodo() {
    $.ajax({
        url: `http://localhost:3000/api/todos`,
        method: 'get',
        headers: {
            token: localStorage.token,
            id: localStorage.id
        }
    })
        .done(function (response) {
            $('#todo-lish > div').remove()
            response.forEach(todo => {
                $('#todo-lish').append(`
                <div>
                    <p>Created by: ${todo.owner}</p>
                    <h5>${todo.title}</h5>
                    <p class="description">${todo.descriptiob}}</p>
                    <p>Status : ${todo.status}</p>
                    <p>Status : ${todo.duedate}</p>
                </div>
                <div class="d-flex">
                    <div>
                        <button data-id="${todo._id}" class="edit-btn btn btn-outline-secondary" type="button" onclick="editTodo('${todo._id}', '${todo.title}', '${todo.description}', '${todo.duedate}')">Update</button>
                        <button data-id="${todo._id}" class="delete-btn btn btn-outline-secondary" type="button" onclick="confimDelete">Delete</button>
                    </div>
                </div>
                <hr>
            `)
            })
        })
        .fail(function (jqXHR, text) {
            showAlert(jqXHR.responseJSON.msg)
        })
}

function editTodo(id, title, desc, duedate) {
    $("#edit-title").val(title)
    $("#edit-desc").val(desc)
    $("#edit-duedate").val(dateFormat(duedate));
}

function deleteTodo(todoId) {
    const id = todoId

    $.ajax({
        url: `http://localhost:3000/api/todos/${id}`,
        method: `delete`,
        headers: {
            token: localStorage.token
        }
    })
        .done(function (response) {
            if (response) {
                fetchTodo()
            }
        })
        .fail(function (jqXHR, textStatus) {
            showAlert(jqXHR.responseJSON.msg)
        })
}

function renderLoggedPage() {
    if (localStorage.token) {
        $('#main').show()
        $('#login').hide()
        $('#register').hide()
        $('#create-todo').hide()

        fetchTodo()
    } else {
        $('#main').hide()
        $('#login').show()
        $('#register').hide()
        $('#create-todo').hide()
    }
}

function confirmDelete(id) {
    Swal.fire({
        title: 'Delete this todo?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            deleteTodo(id)

            Swal.fire(
                'Deleted!',
                'Your todo has been deleted.',
                'success'
            )
        }
    })
}

function changeStatus(id, status) {
    let newStatus = !status

    $.ajax({
        url: `http://localhost:3000/api/todos/${id}`,
        method: `patch`,
        data: {
            status: newStatus
        },
        headers: {
            token: localStorage.token
        }
    })
        .done(function (response) {
            showAlert('Status changed!')
            renderLoggedInPage()
        })
        .fail(function (jqXHR, textStatus) {
            showAlert(jqXHR.responseJSON.msg)
        })
}



$(document).ready(function () {

    $('#to-login').on('click', function () {
        $('#main').hide()
        $('#login').show()
        $('#register').hide()
        $('#create-todo').hide()
    })

    $('#to-register').on('click', function () {
        $('#main').hide()
        $('#login').hide()
        $('#register').show()
        $('#create-todo').hide()
    })

    $('#create-todo-btn').on('click', function () {
        $('#main').hide()
        $('#login').hide()
        $('#register').hide()
        $('#create-todo').show()
    })

    $("#create-todo").submit(function (e) {
        e.preventDefault();

        const owner = localStorage.id
        const title = $("#create-todo-title").val()
        const description = $("#create-todo-desc").val()
        const duedate = new Date($("#create-todo-duedate").val())

        $.ajax({
            url: `http://localhost:3000/api/todos`,
            method: `post`,
            data: {
                title, description, duedate, owner
            },
            headers: {
                token: localStorage.token
            }
        })
            .done(function (response) {
                $('#createTodoModal').modal('hide');
                clearTodoInputForm();
                fetchTodo()
            })
            .fail(function (jqXHR, textStatus) {
                $('#createTodoModal').modal('hide');

                let message = ''

                for (let key in jqXHR.responseJSON.msg.errors) {
                    message += jqXHR.responseJSON.msg.errors[key].message + '\n'
                }

                showAlert(message)

                fetchTodo()
            })
    })

    $("#editTodoForm").submit(function (e) {
        e.preventDefault();

        const title = $("#edit-title").val()
        const description = $("#edit-desc").val()
        const duedate = $("#edit-duedate").val()

        $.ajax({
            url: `http://localhost:3000/api/todos/${id}`,
            method: `patch`,
            data: {
                title, description, duedate
            },
            headers: {
                token: localStorage.token
            }
        })
            .done(function (response) {
                $('#edit-todo').modal('hide');
                fetchTodo()
            })
            .fail(function (jqXHR, textStatus) {
                $('#edit-todo').modal('hide');
                let message = ''

                for (let key in jqXHR.responseJSON.msg.errors) {
                    message += jqXHR.responseJSON.msg.errors[key].message + '\n'
                }

                showAlert(message)
                fetchTodo();
            })
    })

    $('#sign-out').on('click', function () {
        $('#main').hide()
        $('#login').show()
        $('#register').hide()
        $('#create-todo').show()
        localStorage.removeItem('token')
    })

    $("#login").submit(function (e) {
        e.preventDefault()

        const email = $("#login-email").val()
        const password = $("#login-pass").val()

        login(email, password)
    })

    $("#login").submit(function (e) {
        e.preventDefault()

        const email = $("#login-email").val()
        const password = $("#login-pass").val()

        login(email, password)
    })

    $("#register").submit(function (e) {
        e.preventDefault()

        const email = $("#register-email").val()
        const password = $("#register-password").val()
        const name = $("#register-name").val()

        register(email, name, password)
    })

    $("#searchTodo").submit(function (e) {
        e.preventDefault()

        const searchTodo = $("#search-value").val()

        $.ajax({
            url: `http://localhost:3000/api/todos/search?name=${searchTodo}`,
            type: `GET`,
            headers: {
                token: localStorage.token,
                id: localStorage.id
            }
        })
            .done(function (response) {
                $('#todo-lish > div').remove()
                response.forEach(todo => {
                    $('#todo-lish').append(`
                <div>
                    <p>Created by: ${todo.owner}</p>
                    <h5>${todo.title}</h5>
                    <p class="description">${todo.descriptiob}}</p>
                    <p>Status : ${todo.status}</p>
                    <p>Status : ${todo.duedate}</p>
                </div>
                <div class="d-flex">
                    <div>
                        <button data-id="${todo._id}" class="edit-btn btn btn-outline-secondary" type="button" onclick="editTodo('${todo._id}', '${todo.title}', '${todo.description}', '${todo.duedate}')">Update</button>
                        <button data-id="${todo._id}" class="delete-btn btn btn-outline-secondary" type="button" onclick="confimDelete">Delete</button>
                    </div>
                </div>
                <hr>
            `)
                })
            })
            .fail(function (jqXHR, textStatus) {
                showAlert(jqXHR.responseJSON.msg)
            })
    })

})
