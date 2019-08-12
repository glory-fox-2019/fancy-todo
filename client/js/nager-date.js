function holiday(){
    $("#createForm").hide()
    $('#editform').empty()
    $('#viewall').empty()
    $.ajax({
        type : 'GET',
        url : 'http://localhost:3000/api/todos/holiday',
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        console.log(data);
        data.forEach((e,i) => {
            $('#viewholiday').prepend(
                `       
                <center>
                <div class="card mt-4 mb-4 ml-4 mr-4 text-dark border-primary" >
                    <div class="card-body">
                        <h5 class="card-title" id="holName${i}" >${e.name}</h5>
                        <p class="card-text" id="holLoc${i}" >${e.localName}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="holDue${i}" ><b>Due date : ${e.date}</b></li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link" id="addholiday${i}")">Add to your ToDo!</a>
                    </div>
                    </center>
                </div>

                ` )

                $(`#addholiday${i}`).click(function(){
           
                    $.ajax({
                        method : 'POST',
                        url : 'http://localhost:3000/api/todos/',
                        headers : {
                            token : localStorage.getItem('token')
                        },
                        data : {
                            name : `${e.name}`,
                            description :`${e.localName}`,
                            due : `${e.date}`
                        }
                
                    })
                    .done(function(data){
                        findAll()
                        console.log(data);
                    })
                    .fail(function(gg, textStatus){
                        console.log('Error :',textStatus);
                    })
                        
        
                })
        });

    })
    .fail(function(gg, textStatus){
        console.log('Error :',textStatus);

    })
}