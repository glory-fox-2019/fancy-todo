function logout(){
  localStorage.clear()
  signOut()
  $("#usernamePlace").empty()
  $(".nav-item").show()
  init()
}
function updateStatusTodo(id) {
  $.ajax({
    url : "http://localhost:3000/todo/updateStatusTodo",
    headers : {
      token : localStorage.getItem("token")
    },
    data : {
      id : id
    },
    type : "PATCH"
  })
  .done(function(result) {
    renderTodos()
  })
  .fail(function(jqXHR, textStatus) {
  })
}
function deleteTodo(id) {
  $.ajax({
    url : "http://localhost:3000/todo/deleteTodo",
    headers : {
      token : localStorage.getItem("token")
    },
    data : {
      id : id
    },
    type : "DELETE"
  })
  .done(function(result) {
    renderTodos()
  })
  .fail(function(jqXHR, textStatus) {

  })
}
function renderTodos() {
  $("#hero").hide()
  $("#todo-container").show()
  $.ajax({
    url : "http://localhost:3000/user/dashboard",
    headers : {
      token : localStorage.getItem("token")
    },
    type : "GET"
  })
  .done(function(result) {
    $(".nav-item").hide()
    // $("#navbarSupportedContent").empty()
    $("#usernamePlace").empty()
    $("#usernamePlace").show()
    $("#usernamePlace").append(`
      <a class="nav-link" href="#">Hello, ${result.name}</a>
      <button class="btn btn-outline-primary" onclick = "logout()">Logout</button>
    `)
    $("#itemTodoContainer").empty()
    $("#doneTodoContainer").empty()
    for(let i=0;i<result.data.length;i++) {
      let todo = result.data[i];
      let now = new Date()
      let deadlineDate = new Date(todo.deadline)
      let diffTime = deadlineDate.getTime() - now.getTime()
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if(todo.status === 'Belum Selesai') {
        $("#itemTodoContainer").append(`
          <div class="todo-item">
            <div class="todo-item-text">
              <h3>${todo.title}</h3>
              <p>${todo.description}</p>
              <div class="progress" style="height: 20px">
                <div class="progress-bar bg-warning" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${diffDays} Days More</div>
              </div>
            </div>
            <div class="todo-item-action">
              <button class="btn btn-success btn-sm" onclick = updateStatusTodo("${todo._id}")>
                <i class="fas fa-check"></i>
              </button>
              <button class="btn btn-info btn-sm" onclick = updateTodo("${todo._id}")>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick = deleteTodo("${todo._id}")>
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `)
      }else{
        $("#doneTodoContainer").append(`
          <div class="todo-item">
            <div class="todo-item-text">
              <h3>${todo.title}</h3>
              <p>${todo.description}</p>
            </div>
            <div class="todo-item-action">
              <button class="btn btn-info btn-sm" onclick = updateStatusTodo("${todo._id}")>
                <i class="fas fa-undo"></i>
              </button>
              <button class="btn btn-warning btn-sm" onclick = deleteTodo("${todo._id}")>
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `)
      }
    }
  })
  .fail(function(jqXHR, textStatus) {
    $("#hero").show()
    $("#todo-container").hide()
  })
}


let loginErrorList = $("#loginErrorList")
$('#loginForm').submit(function(event) {
  event.preventDefault()
  loginErrorList.children().remove()
  $("#loginButton").append(`
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  `)
  $("#loginButton").html("Loading...")
  $("#loginButton").prop("disabled", true)
  const user = {
    email : $('#email').val(),
    password : $('#password').val()
  }
  const request = $.ajax({
    url : "http://localhost:3000/user/login",
    type : "POST",
    data : user
  })
  request.done( function(result) {
    localStorage.setItem("token", result.token)
    $("#loginModal").modal('hide')
    $("#loginButton").prop("disabled", false)
    $("#loginButton").html("Login")
    $('#email').val("")
    $('#password').val("")
    renderTodos()
  })
  request.fail(function(jqXHR, textStatus) {
    $("#loginButton").prop("disabled", false)
    $("#loginButton").html("Login")
    if(jqXHR.status === 400 || jqXHR.status === 403 || jqXHR.status === 404) {
      for(let i=0;i<jqXHR.responseJSON.message.length;i++) {
        loginErrorList.append(`
          <div class="alert alert-danger" role="alert">
            ${jqXHR.responseJSON.message[i]}
          </div>`)
      }
    }
  })
})

let signupErrorList = $("#signupErrorList")
$('#signupForm').submit(function(event) {
  event.preventDefault()
  signupErrorList.children().remove()
  $("#signupButton").append(`
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  `)
  $("#signupButton").prop("disabled", true)
  $("#signupButton").html("Loading...")
  const user = {
    firstName : $('#firstName').val(),
    lastName : $('#lastName').val(),
    email : $('#emailSignup').val(),
    password : $('#passwordSignup').val()
  }
  const request = $.ajax({
    url : "http://localhost:3000/user/signup",
    type : "POST",
    data : user
  })
  request.done( function(result) {
    console.log('berhasil')
    $("#signupButton").prop("disabled", false)
    $("#signupButton").html("Signup")
  })
  request.fail(function(jqXHR, textStatus) {
    $("#signupButton").prop("disabled", false)
    $("#signupButton").html("Signup")
    if(jqXHR.status === 400 || jqXHR.status === 403 || jqXHR.status === 404) {
      for(let i=0;i<jqXHR.responseJSON.message.length;i++) {
        signupErrorList.append(`
          <div class="alert alert-danger" role="alert">
            ${jqXHR.responseJSON.message[i]}
          </div>`)
      }
    }
  })
})


function init() {
  if(localStorage.getItem("token")) {
    renderTodos()
  }else{
    $("#hero").show()
    $("#todo-container").hide()
  }
}

init()