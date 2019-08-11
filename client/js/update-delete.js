function createtodo(){
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
    })
    .fail(function(gg, textStatus){
        console.log('Error :',textStatus);
    })
        
}

function deleteone(id){
    console.log(`http://localhost:3000/api/todos/${id}`)
    $.ajax({
        method : 'DELETE',
        url : `http://localhost:3000/api/todos/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
        .done(function(data){
            findAll()
            console.log(data);
        })
        .fail(function(gg, textStatus){
            console.log('Error :',textStatus);
        })

}

function markdone(id){
    $.ajax({
        method : 'PATCH',
        url : `http://localhost:3000/api/todos/${id}`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            status : true
        }
    })
    .done(function(data){
        findAll()
        console.log(data);
    })
    .fail(function(gg, textStatus){
        console.log('Error :',textStatus);
    })

}

function markundone(id){
    $.ajax({
        method : 'PATCH',
        url : `http://localhost:3000/api/todos/${id}`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            status : false
        }
    })
    .done(function(data){
        findAll()
        console.log(data);
    })
    .fail(function(gg, textStatus){
        console.log('Error :',textStatus);
    })

}