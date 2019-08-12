function createTodo(){
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/api/todos/',
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            name : $('#nameTodo').val(),
            description : $('#desc').val(),
            due : $('#due').val()
        }

    })
    .done(function(data){
        findAll()
        console.log(data);
        $('.login-form').hide()
        $('.g-signin2').hide()
        $('.register-form').hide()
        $('#logout').show()
        $('.container').show()
    })
    .fail(function(gg, textStatus){
        console.log('Error :',textStatus);
    })
        
}