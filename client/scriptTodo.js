let addTodoErrorList = $("#addTodoErrorList")
$('#addTodoForm').submit(function(event) {
  event.preventDefault()
  addTodoErrorList.children().remove()
  $("#addTodoButton").append(`
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  `)
  $("#addTodoButton").prop("disabled", true)
  $("#addTodoButton").html("Loading...")
  const todo = {
    title : $('#titleTodo').val(),
    description : $('#descriptionTodo').val(),
    deadline : $('#deadlineTodo').val(),
  }
  const request =
  $.ajax({
    url : "http://localhost:3000/todo/addTodo",
    headers : {
      token : localStorage.getItem("token")
    },
    type : "POST",
    data : todo
  })
  request.done( function(result) {
    $("#addTodoButton").prop("disabled", false)
    $("#addTodoButton").html("Create Todo")
    $("#addTodoModal").modal('hide')
    renderTodos()
  })
  request.fail(function(jqXHR, textStatus) {
    console.log(jqXHR)
    $("#addTodoButton").prop("disabled", false)
    $("#addTodoButton").html("Create Todo")
    if(jqXHR.status === 400 || jqXHR.status === 403 || jqXHR.status === 404) {
      for(let i=0;i<jqXHR.responseJSON.message.length;i++) {
        addTodoErrorList.append(`
          <div class="alert alert-danger" role="alert">
            ${jqXHR.responseJSON.message[i]}
          </div>`)
      }
    }
  })
})
let globalId = null
function updateTodo(id){
  $.ajax({
    url : "http://localhost:3000/todo/findOne",
    headers : {
      token : localStorage.getItem("token"),
      id : id
    },
    type : "GET"
  })
  .done( function(todo) {
    let deadline = new Date(todo.todo.deadline)
    let year = deadline.getFullYear()
    let month = deadline.getMonth() + 1
    if(month < 10){
      month = '0'+month
    }
    let day = deadline.getDate()
    if(day < 10) {
      day = '0'+day
    }
    globalId = todo.todo._id
    $('#titleUpdateTodo').val(todo.todo.title),
    $('#descriptionUpdateTodo').val(todo.todo.description),
    $('#deadlineUpdateTodo').val(year + '-' + month + '-' + day)
    $("#updateTodoModal").modal('show')
  })
  .fail(function(jqXHR, textStatus) {
    console.log(jqXHR)
  })
}

let updateTodoErrorList = $("#updateTodoErrorList")
$('#updateTodoForm').submit(function(event) {
  event.preventDefault()
  updateTodoErrorList.children().remove()
  $("#updateTodoButton").append(`
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  `)
  $("#updateTodoButton").prop("disabled", true)
  $("#updateTodoButton").html("Loading...")
  const todo = {
    title : $('#titleUpdateTodo').val(),
    description : $('#descriptionUpdateTodo').val(),
    deadline : $('#deadlineUpdateTodo').val(),
  }
  const request =
  $.ajax({
    url : "http://localhost:3000/todo/updateTodo",
    headers : {
      token : localStorage.getItem("token"),
      id : globalId
    },
    type : "PATCH",
    data : todo
  })
  request.done( function(result) {
    $("#updateTodoButton").prop("disabled", false)
    $("#updateTodoButton").html("Update Todo")
    $("#updateTodoModal").modal('hide')
    renderTodos()
  })
  request.fail(function(jqXHR, textStatus) {
    console.log(jqXHR)
    $("#updateTodoButton").prop("disabled", false)
    $("#updateTodoButton").html("Update Todo")
    if(jqXHR.status === 400 || jqXHR.status === 403 || jqXHR.status === 404) {
      for(let i=0;i<jqXHR.responseJSON.message.length;i++) {
        updateTodoErrorList.append(`
          <div class="alert alert-danger" role="alert">
            ${jqXHR.responseJSON.message[i]}
          </div>`)
      }
    }
  })
})