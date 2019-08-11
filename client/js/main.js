if(localStorage.getItem('token')){
    $("#landingPage").hide()
    $("#dashboard").show()
    $("#logout").show()
    $("#viewall").empty()
    $("#createForm").hide()
    $('#editform').empty()

}else{
    $("#landingPage").show()
    $("#formRegister").hide()
    $("#formLogin").show()
    $("#logout").hide()
    $("#dashboard").hide()
}


function loginUser(){
    event.preventDefault()
    $.ajax({
        type : 'POST',
        url : 'http://localhost:3000/api/users/login',
        data : {
            email : $('#email').val(),
            password : $('#pwd').val()
        }
    })
    .done(function(token){
        console.log('user logged in');
        localStorage.setItem('token',token)
        $("#viewall").empty()
        $('#editform').empty()
        $("#createForm").hide()
        $("#landingPage").hide()
        $("#dashboard").show()
        $("#logout").show()


    })
    .fail(function(gg,textStatus){
        console.log('Error',textStatus);
    })

}

function showRegister(){
    $("#formLogin").hide()
    $("#formRegister").show()
}

function showLogin(){
    $("#formRegister").hide()
    $("#formLogin").show()

}

function createUser(){
    $.ajax({
        type : 'POST',
        url : 'http://localhost:3000/api/users/',
        data : {
            name : $('#nameR').val(),
            email: $('#emailR').val(),
            password : $('#pwdR').val(),
            birthday_date : $('#bdayR').val()
        }
    })
    .done(function(data){
        console.log('data created',data);
        showLogin()

    })
    .fail(function(gg,textStatus){
        console.log('Error',textStatus);
    })

}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/api/users/googleLogin',
        data : {
            token : id_token
        }
    })
    .done(function(data){
        console.log('Sign in as', data);
        localStorage.setItem('token',data)
        $("#landingPage").hide()
        $("#logout").show()
        $("#dashboard").show()
        $("#viewall").empty()
        $('#editform').empty()
        $("#createForm").hide()

    })
    .fail(function(gg,textStatus){
        console.log('Error', textStatus);
    })
    
  }

function signOut(){
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $("#landingPage").show()
    $("#formRegister").hide()
    $("#formLogin").show()
    $("#dashboard").hide()
    $("#logout").hide()
}


function findAll(){
    $("#createForm").hide()
    $('#editform').empty()
    $('#viewall').empty()
    $('#viewall').show()
    $.ajax({
        type : 'GET',
        url : 'http://localhost:3000/api/todos/',
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data);
        
        data.forEach(e=>{

            let date = new Date(e.due)
            let outputDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
            if(!e.description) e.description = " "
            if(e.status){
                $('#viewall').prepend(
                `       
                <center>
                <div class="card mt-4 mb-4 ml-4 mr-4 text-dark border-success" >
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <p class="card-text">${e.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>Due date : ${outputDate}</b></li>
                        <li class="list-group-item"><b>Status : Done<b></li>
                        <li class="list-group-item" onclick="markundone('${e._id}')"><button>Mark as undone</button></li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link" onclick = "editdata('${e._id}')">Edit</a>
                        <a href="#" class="card-link" onclick = "deleteone('${e._id}')">Delete</a>
                    </div>
                    </center>
                </div>

                ` )
            }else{
                $('#viewall').prepend(
                    `            
                    <div class="card mt-4 mb-4 ml-4 mr-4 text-dark border-danger" >
                    <center>
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">${e.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Due date : ${outputDate}</b></li>
                            <li class="list-group-item"><b>Status : Undone<b></li>
                            <li class="list-group-item" onclick="markdone('${e._id}')"><center><button>Mark as done</button><center></li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link" onclick = "editdata('${e._id}')">Edit</a>
                            <a href="#" class="card-link" onclick = "deleteone('${e._id}')">Delete</a>
                        </div>
                    </center>
                    </div>
                    ` )
            }
        })
    })
    .fail(function(gg,codeErr){
        console.log('Error', codeErr);
    })
}

function create(){
    $('#viewall').hide()
    $('#editform').empty()
    $('#createForm').show()
}






