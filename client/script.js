function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        url: `http://localhost:3000/users/sign-in`,
        method: "POST",
        data: { id_token }
    })
    .done(function(returnData) {
        localStorage.setItem("token", returnData.token)
        $('#login-button').hide()
        navbar(returnData)
        renderUser(returnData)
        home(returnData)
    })
    .catch(err => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
      localStorage.removeItem("token");
      $('#nav-bar').children().remove()
      $('#user-signin').children().remove()
      $('#content-container').children().remove()
      $('#form-container').children().remove()
      $("#login-button").show();
    });
}

function renderUser(dataUser) {
    $('#user-signin').children().remove()
    $('#user-signin').append(`
    <img src="${dataUser.picture}">
    <p>Hello ${dataUser.name} </p>
    <a href="#" onclick="signOut()">Logout</a>`)
}

function home(user) {
    $('#form-container').children().remove()
    $('#content-container').children().remove()
    $('#content-container').append(`
        <a href="#" onclick="addTodo('${user._id}')"><h1>+</h1></a>`)
    $.ajax({
        url: `http://localhost:3000/todos/find-unchecked/${user._id}`,
        method: 'GET'
    })
    .then(function(data) {
        for(let i = 0; i < data.length; i++) {
            $('#content-container').prepend(`
            <div class="todo-list">
            <h1><a href="#" onclick="doneTodo('${data[i]._id}')">✔</a></h1>
            <h2>${data[i].name}<h2>
            <h5>${data[i].description}</h5>
            <h3><a href="#" onclick="editTodo('${data[i]._id}')">edit</a> | <a href="#" onclick="deleteTodo('${data[i]._id}')">delete</h3></a>
            ------------------------------------------------------
            </div>`)
        }
        
    }) 
}

function addTodo(data) {
    // console.log(data)
    $('#content-container').children().remove()
    $('#form-container').prepend(`<form id="add-form">
    Name : <br>
    <input type="text" id="name" name="name"><br>
    Description: <br>
    <input type="text" id="description" name="description" placeholder="input description here.."><br>
    <button type="submit">Submit</button>
    </form>`)
    $('#add-form').submit(function(event) {
        event.preventDefault()
        let name = $('#name').val()
        let description = $('#description').val()
        $.ajax({
            url: `http://localhost:3000/todos/create/${data}`,
            method: "POST",
            data: {name, description}

        })
        .done(function(result) {
            let obj = {}
            obj._id = result.user
            home(obj)
        })
    })
}

function editTodo(data) {
    console.log(data)
    $('#content-container').children().remove()
    $('#form-container').prepend(`<form id="edit-form">
    Name : <br>
    <input type="text" id="name" name="name"><br>
    Description: <br>
    <input type="text" id="description" name="description" placeholder="input description here.."><br>
    Status : <br>
    <select id="status" name="status">
        <option value="true">true</option>
        <option value="false">false</option>
    </select>
    <button type="submit">Submit</button>
    </form>`)
    $('#edit-form').submit(function(event) {
        event.preventDefault()
        let name = $('#name').val()
        let description = $('#description').val()
        let status = $('#status').val()
        $.ajax({
            url: `http://localhost:3000/todos/update/${data}`,
            method: "PATCH",
            data: {name, description, status}
        })
        .done(function(result) {
            let obj = {}
            obj._id = result.user
            home(obj)
        })
    })
}

function deleteTodo(data) {
    $.ajax({
        url: `http://localhost:3000/todos/delete/${data}`,
        method: 'DELETE'
    })
}

function doneTodo(data) {
    $.ajax({
        url: `http://localhost:3000/todos/check/${data}`,
        method: 'PATCH'
    })
    .done(function(result) {
        let obj = {}
        obj._id = result.user
        home(obj)
    }
    )
}

function undoneTodo(data) {
    $.ajax({
        url: `http://localhost:3000/todos/uncheck/${data}`,
        method: 'PATCH'
    })
    .done(function(result) {
        let obj = {}
        obj._id = result.user
        finished(obj)
    }
    )
}

function navbar(data) {
    $('#nav-bar').prepend(`
    <div id="navbar">
    <h4 id="home">Home</h4>
    <h4 id="finished">Finished</h4>
    </div>`)
    $('#home').click(function() {
        home(data)
    })
    $('#finished').click(function() {
        finished(data)
    })
}

function finished(user) {
    $('#form-container').children().remove()
    $('#content-container').children().remove()
    $.ajax({
        url: `http://localhost:3000/todos/find-checked/${user._id}`,
        method: 'GET'
    })
    .then(function(data) {
        for(let i = 0; i < data.length; i++) {
            $('#content-container').prepend(`
            <div class="todo-list">
            <h1><a href="#" onclick="undoneTodo('${data[i]._id}')">✘</a></h1>
            <h2>${data[i].name}<h2>
            <h5>${data[i].description}</h5>
            ------------------------------------------------------
            </div>`
            )}
    })
}