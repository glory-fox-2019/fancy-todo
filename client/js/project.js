$(document).ready(function() {
    const baseurl = 'http://localhost:3000/api/projects'

    fetchProject()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/users',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( users => {
        for(let i in users){
            $('#project-users').append(`
            <option value="${users[i]._id}">${users[i].username}</option>
            `)
        }
    })
    .fail( err => console.log(err) )

    $('#create-project-trigger').on('click', function() {
        event.preventDefault()
        $('#create-project-form').removeClass('d-none')
    })

    $('#add-member-button').on('click', function() {
        if($('#project-users').val()){
            $('#add-member').append(`
            <button class="btn btn-outline-primary btn-block mt-2">${$('#project-users').text()}</button>
            <input class="add-member form-control btn-sm btn-block mt-2" type="hidden" name="user"
            value="${$('#project-users').val()}">
            `)
        }
    })

    $('#create-project-submit').on('submit', function() {
        event.preventDefault()
        let input = {}
        input.name = $('#project-name').val()
        input.users = []
        
        let users = $('.add-member')
        for(let i = 0; i < users.length; i++) {
            input.users.push(users[i].value)
        }

        console.log(input)

        $.ajax({
            method: 'POST',
            url: baseurl,
            data: input,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done( project => {
            $('#create-project-form').addClass('d-none')
            $('#user-projects').append(`
            <option select value="${project._id}">${project.name}</option>
            `)
        })
        .fail( err => console.log(err))
    })

    function fetchProject(){
        $.ajax({
            method: 'GET',
            url: baseurl,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(projects => {
            console.log('Fetched Projects')
            for(let i in projects) {
                $('#user-projects').prepend(`
                <option value="${projects[i]._id}"><h4>${projects[i].name}</h4></option>
                `)
            }
        })
        .fail( err => console.log(err.responseJSON))
    }
})