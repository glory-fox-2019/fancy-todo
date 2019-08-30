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
        Swal.fire({
            type: 'success',
            title: 'Todo is created!',
            showConfirmButton: false,
            timer: 1500
          })
        findAll()
        console.log(data);
    })
    .fail(function(gg, textStatus){
        Swal.fire({
            type: 'error',
            title: 'Please fill your ToDo, first!',
            showConfirmButton: false,
            timer: 1500
          })
        console.log('Error :',textStatus);
    })
        
}

function deleteone(id){
    console.log(`http://localhost:3000/api/todos/${id}`)
    Swal.fire(
        {   title : "Are you sure want to delete this todo?",
            type : "question",
            showConfirmButton : true,
            showCancelButton : true,
        })
        .then((isConfirm)=>{
            if(isConfirm.value){
                $.ajax({
                    method : 'DELETE',
                    url : `http://localhost:3000/api/todos/${id}`,
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                    .done(function(data){
                        Swal.fire({
                            type: 'success',
                            title: 'ToDo has been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        findAll()
                        console.log(data);
                    })
                    .fail(function(gg, textStatus){
                        Swal.fire({
                            type: 'error',
                            title: 'Internal Server Error!',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        console.log('Error :',textStatus);
                    })
            }}
            )

}

function markdone(id){
    Swal.fire(
        {   title : "Do you want to change this ToDo status to Done?",
            type : "question",
            showConfirmButton : true,
            showCancelButton : true,
        })
        .then((isConfirm)=>{
            if(isConfirm.value){
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
                    Swal.fire({
                        type: 'success',
                        title: 'Todo mark as done!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    findAll()
                    console.log(data);
                })
                .fail(function(gg, textStatus){
                    Swal.fire({
                        type: 'error',
                        title: 'Internal Server Error!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    console.log('Error :',textStatus);
                })

            }
        })

}

function markundone(id){
    Swal.fire(
        {   title : "Do you want to change this ToDo status to Undone?",
            type : "question",
            showConfirmButton : true,
            showCancelButton : true,
        })
    .then((isConfirm)=>{
        if(isConfirm.value){
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
                Swal.fire({
                    type: 'success',
                    title: 'Todo mark as undone!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                findAll()
                console.log(data);
            })
            .fail(function(gg, textStatus){
                Swal.fire({
                    type: 'error',
                    title: 'Internal Server Error!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                console.log('Error :',textStatus);
            })

        }
    })

}