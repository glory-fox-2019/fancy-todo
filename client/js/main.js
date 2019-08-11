const base_url = "http://localhost:3000"

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    axios({
        method: "post",
        url: `${base_url}/home/user/signInGoogle`,
        data: {
            id_token
        }
    })
    .then(response => {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username",response.data.username)
        localStorage.setItem("signIn", "google")
        $("#login").hide()
        $("#home-page").show()
        $("#username").append(`
        <h3>Hello ${response.data.username} !</h3>
        <h4>What are you gonna do today ?</h4>
        `)
        loadTodo()
    })
    .catch(err => {
        swal({
            icon: "error",
            title: "Login Failed :(",
            text: err.response.data,
            button: false,
            timer: 1500
        })
    })
}

function signIn(email, password) {
    axios({
        method: 'post',
        url: `${base_url}/home/user/signIn`,
        data: {
            email,
            password
        }
    })
    .then(response => {
        swal({
            title: "Login Success!",
            text: `Welcome Back ${response.data.username} !`,
            icon: "success",
            button: false,
            timer:  1500
        })
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username",response.data.username)
        localStorage.setItem("signIn", "manual")
        $("#login").hide()
        $("#home-page").show()
        $("#username").append(`
        <h3>Hello ${response.data.username} !</h3>
        <h4>What are you gonna do today ?</h4>
        `)
        loadTodo()
    })
    .catch(err => {
        swal({
            icon: "error",
            title: "Login Failed :(",
            text: err.response.data,
            button: false,
            timer: 1500
        })
    })
}

function register(username, password, email) {
    axios({
        method: "post",
        url: `${base_url}/home/user`,
        data: {
            username,
            email,
            password
        }
    })
    .then(response => {
        swal({
            title: response.data,
            text: "Please Login :)",
            icon: "success",
            button: false,
            timer:  1500
        })
        setTimeout(function () {
            $('#login').show()
            $('#register').hide()
          }, 2000)
    })
    .catch(err => {
        swal({
            icon: "error",
            title: "Register Failed :(",
            text: err.response.data,
            button: false,
            timer: 1500
        })
    })
}

function loadTodo() {
    $("nav").show()
    axios({
        method: "get",
        url: `${base_url}/home/todo`,
        headers: {
            token: localStorage.token
        }
    })
    .then(response => {
        let todo = response.data;
        todo.forEach((el) => {
            $("#todo-list").prepend(`
            <div class="card teal lighten-1">
            <div id="todo${el._id}" class="card-content white-text">
              <span class="card-title" style="text-align: center"><b>${el.name}</b></span>
              <h5><b>Description:</b></h5>
              <p id="description"><b>${el.description}</b></p>
              <h5><b>Due time:</b></h5>
              <p id="due_time"><b>${el.due_date}</b></p>
              <h5><b>Status:</b></h5>
              <p id="status"><b>${el.status}</b></p>
            </div>
            <div class="card-action white-text">
            <a class="btn waves-effect waves-light" onclick="deleteTodo('${el._id}')">Delete Activity</a>
            <a class="btn waves-effect waves-light" onclick="updateTodo('${el._id}')">Update Activity</a>
            </div>
            </div>
            `)
        })
    })
    .catch(err => {
        console.log(err)
    })
}


function createTodo() {
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
            input: "text",
            title: 'What name of your activity ?',
            text: 'Type in this column below'
        },
        {
            input: "textarea",
            title: 'Describe your activity',
            text: 'Type in this column below'
        },        
        {
            input: "text",
            title: 'Make your due date !',
            text: 'Input in this column below',
            inputPlaceholder: 'YYYY-MM-DD'
        }
      ]).then((result) => {
        if (result.value) {
            axios({
                method: "post",
                url: `${base_url}/home/todo`,
                headers: {
                    token: localStorage.token
                },
                data: {
                    name: result.value[0],
                    description: result.value[1],
                    due_date: result.value[2]
                }
            })
            .then(response => {
                swal({
                    title: "Activity successfully created!",
                    text: response.data,
                    icon: "success",
                    button: false,
                    timer:  1500
                })
                $("#todo-list").empty()
                loadTodo()
            })
            .catch(err => {
                swal({
                    icon: "error",
                    title: "Fail create Activity :(",
                    text: err.response.data,
                    button: false,
                    timer: 2000
                })
            })
        }
      })
      .catch(err => {
        swal({
            icon: "error",
            title: "Fail create Activity :(",
            text: err,
            button: false,
            timer: 1500
        })
      })
}


function deleteTodo(id) {
    Swal.fire({
        title: 'Delete this activity ?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.value) {
            axios({
                method: 'delete',
                url: `${base_url}/home/todo/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                swal({
                    title: "Deleted!",
                    text: `Your activity has been deleted!`,
                    icon: "success",
                    button: false,
                    timer:  1500
                })
                $("#todo-list").empty()
                loadTodo()
            })
            .catch(err => {
                swal({
                    icon: "error",
                    title: "Fail Delete Activity :(",
                    text: err.response.data,
                    button: false,
                    timer: 1500
                })
            })
        }
      })
      .catch(err => {
        swal({
            icon: "error",
            title: "Fail Delete Activity :(",
            text: err,
            button: false,
            timer: 1500
        })
      })
}

function updateTodo(id) {
    let name = $(`#todo${id}`).children('span').text()
    let description = $(`#todo${id}`).children('#description').text()
    let due_time = $(`#todo${id}`).children('#due_time').text()
    let status = $(`#todo${id}`).children('#status').text()
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3','4']
      }).queue([
        {
            input: "text",
            title: 'What name of your activity ?',
            text: 'Type in this column below',
            inputValue: `${name}`
        },
        {
            input: "textarea",
            title: 'Describe your activity',
            text: 'Type in this column below',
            inputPlaceholder: `${description}`,
            inputValue: `${description}`
        },        
        {
            input: "text",
            title: 'Make your due date !',
            text: 'Input in this column below',
            inputValue: `${due_time}`,
        },{
            title: 'What this activity status ?',
            input: "radio",
            inputOptions: {
                [`${false}`]: "Pending",
                [`${true}`]: "Done"
            },
            inputValue: `${status}`
        }
      ])
    .then(results => {
        const name = results.value[0]
        const description = results.value[1]
        const due_date = results.value[2]
        const status = results.value[3]
        axios({
            method: 'put',
            url: `${base_url}/home/todo/${id}`,
            headers: {
                token: localStorage.token
            },
            data: {
                name,
                description,
                due_date,
                status
            }
        })
        .then(response => {
            swal({
                title: "Updated!",
                text: `Your activity has been updated!`,
                icon: "success",
                button: false,
                timer:  1500
            })
            setTimeout(() => {
                $("#todo-list").empty()
                loadTodo()
            }, 1800)
        })
        .catch(err => {
            swal({
                icon: "error",
                title: "Fail Update Activity :(",
                text: err.response.data,
                button: false,
                timer: 1500
            })
        })
    })

}

function signOut() {
    const signIn = localStorage.signIn
    if (signIn === "manual") {
        localStorage.clear()
        swal({
            title: "Bye Bye!",
            text: `Have a nice day :)!`,
            icon: "success",
            button: false,
            timer:  1500
        })
        setTimeout(() => {
            $("nav").toggle()
            $("#todo-list").empty()
            $("#username").empty()
            $("#home-page").toggle()
            $("#login").toggle()
        }, 1800)
    }
    else if (signIn === "google") {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.clear()
            swal({
                title: "Bye Bye!",
                text: `Have a nice day :)!`,
                icon: "success",
                button: false,
                timer:  1500
            })
            setTimeout(() => {
                $("nav").toggle()
                $("#todo-list").empty()
                $("#username").empty()
                $("#home-page").toggle()
                $("#login").toggle()
            }, 1800)
        });
    }
}



$(document).ready(function () {

    $("#register").hide()
    $("#home-page").hide()
    $("nav").hide()
    $("#form-signIn").submit(function (event) {
        event.preventDefault()
        const email = $("#signIn_email").val()
        const password = $("#signIn_password").val()
        $("#signIn_email").empty()
        $("#signIn_password").empty()
        signIn(email, password)
    })

    $("#btn-register").click(function () {
        $("#login").hide()
        $("#register").show()
    })

    $("#register-back").click(function() {
        $("#login").show()
        $("#register").hide()
    })

    $("#form_register").submit(function (event) {
        event.preventDefault()
        const username = $("#register_username").val()
        const email = $("#register_email").val()
        const password = $("#register_password").val()
        $("#register_username").empty()
        $("#register_email").empty()
        $("#register_password").empty()
        register(username, password, email)
    })
})