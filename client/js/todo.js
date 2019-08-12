$(document).ready(function() {
    const baseurl = 'http://localhost:3000/api/todos'

    //Fetch To Do
    fetchTodo()

    $('#user-projects').on('change', function() {
        $('#list-todo').empty()
        fetchTodo()
    })

    $('#add-todo-trigger').on('click', function() {
        event.preventDefault()
        $('#create-todo-form').removeClass('d-none')
    })

    $('#create-todo-submit').on('submit', function() {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url: baseurl,
            data: {
                name: $('#todo-name').val(),
                description: $('#todo-description').val(),
                due_date: $('#todo-due-date').val(),
                project_id: $('#user-projects').val()
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(todo => {
            $('#create-todo-form').addClass('d-none')
            let formatted_date = ''
            if(todo.due_date) {
                let date = new Date(todo.due_date)
                formatted_date = `<span class="badge badge-success">${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</span>`
            }
            $('#list-todo').prepend(`
            <div class="form-check ml-4 mb-1">
                <input class="form-check-input" type="checkbox" value="TODOID" id="todo-TODONAME">
                <label class="form-check-label">
                    <a class="text-secondary" href="#">${todo.name}</a>
                    <p class="text-justify p-0 m-0" style="font-size: 12px;"> ${todo.description}</p>
                    ${formatted_date}
                </label>
            </div>`)
            $('#todo-name').empty(),
            $('#todo-description').empty(),
            $('#todo-due-date').val()
        })
        .fail( err => {
            $('#todo-alert').empty().append(`
            <div class="mt-3 alert alert-warning alert-dismissible fade show" role="alert">
            ${err.responseJSON}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`)
        })
    })

    function fetchTodo(){
        $.ajax({
            method: 'GET',
            url: `${baseurl}?id=${$('#user-projects').val()}`,
            headers: {
                token: localStorage.getItem('token')
            }
        }).
        done(todos => {
            console.log('Fetched Todos')
            for(let i in todos) {
                let formatted_date = ''
                if(todos[i].due_date) {
                    let date = new Date(todos[i].due_date)
                    formatted_date = `<span class="badge badge-success">${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</span>`
                }
                $('#list-todo').prepend(`
                <div class="form-check ml-4 mb-1">
                    <input class="form-check-input" type="checkbox" value="TODOID" id="todo-TODONAME">
                    <label class="form-check-label">
                        <a class="text-secondary" href="#">${todos[i].name}</a>
                        <p class="text-justify p-0 m-0" style="font-size: 12px;"> ${todos[i].description}</p>
                        ${formatted_date}
                    </label>
                </div>`)
            }
        })
        .fail( err => console.log(err.responseJSON))
    }
})