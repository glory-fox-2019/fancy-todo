$(document).ready(function () {

    homeBase()
    registerButton()
    loginPage()
    loginPost()
    todoPage()
    todoPost()
    home()
    done()
    undone()
    deleteTodo()
    search()
    editPage()
    editPost()
    // ================= projects
    addProjectForm()
    cancelAddProject()
    projectPage()
    addProject()
    detailProjectPage()
    openEditProject()
    editProject()
    deleteProject()

    inviteMember()
    removeMember()
    openProjectTodoForm()
    addProjectTodo()
    openEditProjectTodo()
    editProjectTodo()
    deleteProjectTodo()
    // ================ 3rd party API
    yesOrNo()
})

if (localStorage.getItem('token')) {

    $('a.home-switch').removeClass('homebase').addClass('home')
    $('.user-name').append(`${localStorage.name}`)

    $('.logout').show()
    $('.todo-btn').show()
    $('.project-btn').show()

    $('.user-page').show()
    $('.login-btn').hide()
    $('.register-form').hide()

    getMyTodo()
}

function homeBase() {
    $('.homebase').click(function (event) {
        event.preventDefault()
        // console.log('masuk homebase <<<<<<<<<<<<<')
        $('.register-form').empty()
        $('.register-form').append(
            `
            <div class="banner-inner">
                <h1 class="center">Welcome to Fancy Todo</h1>
                <h2>Get a quick register and manage your todo now</h2>
                <form action="">
                    <table>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name" id="name" placeholder="Input your username" required>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" name="email" id="email" placeholder="Input your email" required></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" name="password" id="password" placeholder="Input your password"
                                    required>
                            </td>
                        </tr>
                    </table>
                    <a href="" class="btn-form btn">Register</a>
                </form>
                <br>
                <h2>Login with Google Account</h2>
                <div class="g-signin2 signin" data-onsuccess="onSignIn"></div>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </div>
            `
        )

        $('.login-form').hide()
        $('.register-form').show()
    })
}

function registerButton() {
    $(document).on('click', '.btn-form', function (event) {
        event.preventDefault()

        $.ajax({
                method: 'POST',
                url: `${baseURL}/users/register`,
                data: {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    password: $('#password').val()
                }
            })
            .done(response => {
                // console.log(response)
                $('.info').empty()
                $('.info').append(
                    `
                    <span class="message">${response}<span>
                    `
                )
                $('.message').show(300, function () {
                    setTimeout(() => {
                        $('.message').hide(300)
                    }, 1500);
                })
            })
            .fail(err => {
                console.log(err)
                let errors = err.responseJSON.message.split('User validation failed: ')[1].split(',')

                $('.info').empty()

                for (let i = 0; i < errors.length; i++) {
                    $('.info').append(
                        `
                        <span class="error">${errors[i].split(': ')[1]}<span>
                        `
                    )
                    $('.error').show(300, function () {
                        setTimeout(() => {
                            $('.error').hide(300)
                        }, 1200);
                    })
                }
            })
    })
}

function loginPage() {
    $('.login-btn').click(function (event) {
        event.preventDefault()

        $.ajax({
                method: 'GET',
                url: `${baseURL}/users/login`
            })
            .done(response => {
                // console.log(response)
                $('.register-form').hide()
                // $('.todo-form').hide()

                $('.login-form').remove()
                $('.container').append(
                    `
                <div class="banner-outer login-form">
                <div class="banner-inner">
                <h1>Login</h1>
                <form class="login-value" action="">
                        <table>
                            <tr>
                                <td>Email</td>
                                <td><input type="text" name="email" id="email" placeholder="Input your email" required></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" name="password" id="password" placeholder="Input your password"
                                        required>
                                </td>
                            </tr>
                        </table>
                    <a href="#" class="login-post btn">Login</a>
                </form>
                </div>
                </div>
                `
                )
            })
            .fail(err => {
                console.log(err)
            })

    })
}

function loginPost() {
    $('.container').on('click', '.login-post', function (event) {
        event.preventDefault()

        let result = {}
        $.each($('.login-value').serializeArray(), function () {
            result[this.name] = this.value
        })

        $.ajax({
                method: 'POST',
                url: `${baseURL}/users/login`,
                data: result
            })
            .done(response => {
                // console.log(response)
                localStorage.setItem('token', response.token)
                localStorage.setItem('name', response.username)

                $('.welcome').append(`${localStorage.getItem('name')}`)
                $('a.home-switch').removeClass('homebase').addClass('home')

                $('.logout').show()
                $('.todo-btn').show()
                $('.user-page').show()
                $('.goto').show()
                $('.project-btn').show()
                $('.welcome-title').show()

                $('.login-btn').hide()
                $('.register-form').hide()
                $('.login-form').hide()
                $('.todos').hide()

            })
            .fail(err => {
                console.log(err)
                $('.info').empty()
                $('.info').append(
                    `
                    <span class="error">${err.responseText}<span>
                    `
                )
                $('.error').show(300, function () {
                    setTimeout(() => {
                        $('.error').hide(300)
                    }, 1200);
                })
            })
    })
}

function todoPage() {
    $('.todo-btn').click(function (event) {
        event.preventDefault()

        $('#todo-name').val("")
        $('#description').val("")
        $('#due_date').val("")

        $('.user-page').hide()
        $('.projects-list-container').hide()
        $('.project-page-container').hide()
        $('.todo-edit-form').hide()

        $('.todo-form').show()
    })
}

function todoPost() {
    $('.todo-post').click(function (event) {
        event.preventDefault()

        let result = {}
        $.each($('.todo-value').serializeArray(), function () {
            result[this.name] = this.value
        })

        $.ajax({
                method: 'POST',
                url: `${baseURL}/todos/add`,
                data: result,
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            .done(response => {
                console.log('Successfuly created a Todo!')
                $('.info').empty()
                $('.info').append(`<span class="message">Successfuly created a Todo!</span>`)
                $('.info').show(300, function () {
                    setTimeout(() => {
                        $('.info').hide(300)
                    }, 1500);
                })

                $('#todo-name').val("")
                $('#description').val("")
                $('#due_date').val("")
            })
            .fail(err => {
                // console.log(err.responseJSON.message.split('Todo validation failed: '), 'error dari create todo<<<<<<<<')
                $('.info').empty()
                let errors = err.responseJSON.message.split('Todo validation failed: ')[1].split(',')
                for (let i = 0; i < errors.length; i++) {
                    $('.info').append(
                        `
                        <span class="error">${errors[i].split(': ')[1]}<span>
                        `
                    )
                    $('.error').show(300, function () {
                        setTimeout(() => {
                            $('.error').hide(300)
                        }, 1200);
                    })
                }
            })
    })
}

function home() {
    $(document).on('click', '.home', function (event) {
        event.preventDefault()

        $('.todos-list').empty()

        getMyTodo()

        $('.user-name').empty()
        $('.user-name').append(`${localStorage.name}`)

        $('.todo-form').hide()
        $('.login-btn').hide()
        $('.register-form').hide()
        $('.goto').hide()
        $('.welcome-title').hide()
        $('.todo-edit-form').hide()
        $('.projects-list-container').hide()
        $('.project-page-container').hide()


        $('.logout').show()
        $('.todo-btn').show()
        $('.user-page').show()
        $('.todos').show()
    })
}

function done() {
    $(document).on('click', '.finish', function (event) {
        event.preventDefault()
        let todoId = $(this).attr('class').split(' ')[1]

        $.ajax({
                method: 'PATCH',
                url: `${baseURL}/todos/${todoId}/status`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                $('.todos-list').empty()
                getMyTodo()

                // get project todos
                if ($('.project-page-title').attr('class').split(' ')[1]) {
                    getProjectTodos($('.project-page-title').attr('class').split(' ')[1])
                }
            })
            .fail(err => {
                console.log(err)
            })
    })
}

function undone() {
    $(document).on('click', '.unfinish', function (event) {
        event.preventDefault()
        let todoId = $(this).attr('class').split(' ')[1]

        $.ajax({
                method: 'PATCH',
                url: `${baseURL}/todos/${todoId}/status`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                $('.todos-list').empty()
                getMyTodo()

                if ($('.project-page-title').attr('class').split(' ')[1]) {
                    getProjectTodos($('.project-page-title').attr('class').split(' ')[1])
                }
            })
            .fail(err => {
                console.log(err)
            })
    })
}

function deleteTodo() {

    $(document).on('click', '.delete', function (event) {
        event.preventDefault()
        let todoId = $(this).attr('class').split(' ')[1]

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                        type: 'DELETE',
                        url: `${baseURL}/todos/${todoId}/delete`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(response => {
                        console.log(response)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        $('.todos-list').empty()
                        getMyTodo()

                        // get project todo
                        if ($('.project-page-title').attr('class').split(' ')[1]) {
                            getProjectTodos($('.project-page-title').attr('class').split(' ')[1])
                        }
                    })
                    .fail(err => {
                        console.log(err)
                    })

            }
        })

    })
}

function search() {
    $(document).on('click', '.search', function (event) {
        event.preventDefault()

        let search = $('#search').val()
        console.log(search)
        $.ajax({
                method: 'GET',
                url: `${baseURL}/todos/search?name=${search}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                // console.log(response)
                $('.todos-list').empty()
                for (let i = 0; i < response.length; i++) {
                    $('.todos-list').append(
                        `
                        <li class="todo-card">
                            <table style="text-align: left" class="card-table">
                                <tr>
                                    <td>Name</td>
                                    <td>: <span style="font-weight: bold;">${response[i].name}</span></td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>: ${response[i].description}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>: <span class="${response[i].status}">${response[i].status}</span></td>
                                </tr>
                                <tr>
                                    <td>Due Date</td>
                                    <td>: ${response[i].due_date}</td>
                                </tr>
                            </table>
                            <a href="#" class="finish ${response[i]._id} btn">Done</a>
                            <a href="#" class="delete ${response[i]._id} btn">Delete</a> 
                        </li>
                        `
                    )
                }
            })
            .fail(err => {
                console.log(err)
            })

    })
}

function editPage() {
    $(document).on('click', '.edit', function (event) {
        event.preventDefault()
        let todoId = $(this).attr('class').split(' ')[1]

        console.log(todoId)

        $.ajax({
                method: 'get',
                url: `${baseURL}/todos/${todoId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                let year = response.due_date.split('-')[0]
                let month = response.due_date.split('-')[1]
                let date = response.due_date.split('-')[2].substr(0, 2)
                let dateFormat = `${year}-${month}-${date}`

                $('#name-edit').val(response.name)
                $('#description-edit').val(response.description)
                $('#due_date-edit').val(dateFormat)
                $('.todo-edit-post').addClass(response._id)

                $('.user-page').hide()

                $('.todo-edit-form').show()
            })
            .catch(err => {
                console.log(err)
            })
    })
}

function editPost() {
    $(document).on('click', '.todo-edit-post', function (event) {
        event.preventDefault()

        let update = {}
        $.each($('.todo-edit-value').serializeArray(), function () {
            update[this.name] = this.value
        })

        let todoId = $(this).attr('class').split(' ')[2]
        console.log(todoId)
        // console.log(update)
        $.ajax({
                method: 'PATCH',
                url: `${baseURL}/todos/${todoId}/edit`,
                data: update,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                // console.log(response, 'response from edit todo')
                $('.todo-edit-post').removeClass(response._id)
                Swal.fire({
                    type: 'success',
                    title: 'Update Success!',
                    text: 'Successfuly updated a todo.'
                })
            })
            .catch(err => {
                console.log(err)
            })
    })
}

// ================================================ PROJECTS
function addProjectForm() {
    $('.to-add-project').click(function (event) {
        event.preventDefault()

        $('.to-add-project').fadeOut(100, () => {
            $('.add-project-form').fadeIn()
        })

    })
}

function cancelAddProject() {
    $('.cancel-add-project').click(function (event) {
        event.preventDefault()

        $('.add-project-form').fadeOut(400, () => {
            $('.to-add-project').show()
        })

    })
}

function addProject() {
    $('.add-project').click(function (event) {
        event.preventDefault()

        let newData = {}
        $.each($('.add-project-value').serializeArray(), function () {
            newData[this.name] = this.value
        })

        // console.log(newData)
        $.ajax({
                method: 'post',
                url: `${baseURL}/projects`,
                data: newData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {

                $('#name-project').val("")
                $('#description-project').val("")

                getAllProject()

                $('.add-project-form').fadeOut(400, () => {
                    $('.to-add-project').show()
                })

                Swal.fire({
                    type: 'success',
                    title: `Success creating Project: ${response.name}`,
                    text: 'Lets invite some user to be a members of your project.'
                })

            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    type: 'error',
                    title: 'Something wrong..',
                    text: 'Please input all fields!'
                })
            })
    })
}

function openEditProject() {

    $(document).on('click', '.open-edit-project', function (e) {
        e.preventDefault()


        let projectId = $(this).attr('class').split(' ')[2]
        let idBefore = $('.edit-proj').attr('class').split(' ')[2]

        $('.edit-proj').removeClass(idBefore).addClass(`${projectId}`)

        $.ajax({
                method: 'get',
                url: `${baseURL}/projects/${projectId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                console.log(projectId)

                $('#name-edit-proj').val(`${response.name}`)
                $('#description-edit-proj').val(`${response.description}`)


            })
            .fail(err => {
                console.log(err)
            })
    })

}

function editProject() {

    $('.edit-proj').click(function (e) {
        e.preventDefault()

        // console.log('masuk <<<<<<<<<<<<<<')
        let projectId = $(this).attr('class').split(' ')[2]
        let result = {}
        $.each($('.project-edit-value').serializeArray(), function () {
            result[this.name] = this.value
        })

        // console.log(projectId)

        $.ajax({
                method: 'patch',
                url: `${baseURL}/projects/${projectId}`,
                data: result,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                console.log('Successfully update project')
                // console.log(response)

                $('body').css('overflow', 'visible')
                $('.jquery-modal').hide()

                Swal.fire({
                    type: 'success',
                    title: 'Success!',
                    text: 'The project has been successfuly updated!'
                })
                getAllProject()
            })
            .fail(err => {
                console.log(err)
                Swal.fire({
                    type: 'warning',
                    title: 'Unauthorized process.',
                    text: err.responseJSON.message
                })
            })
    })

}

function projectPage() {
    $('.project-btn').click(function (event) {
        event.preventDefault()

        $('.project-page-title').empty()

        getAllProject()

        $('.user-page').hide()
        $('.todo-form').hide()
        $('.project-page-container').hide()
        $('.todo-edit-form').hide()
        $('.add-project-form').hide()

        $('.to-add-project').show()
        $('.projects-list-container').show()
    })
}

function deleteProject() {
    $(document).on('click', '.delete-project', function (event) {
        event.preventDefault()

        // console.log($(this).attr('class').split(' ')[2])
        let projectId = $(this).attr('class').split(' ')[2]

        Swal.fire({
            title: 'Are you sure to delete this project?',
            text: "Your project and all its entire todos will be deleted after this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                        method: 'delete',
                        url: `${baseURL}/projects/${projectId}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(response => {
                        // console.log(response)
                        Swal.fire(
                            'Successfully deleted!',
                            'Your project and its todos has been deleted.',
                            'success'
                        )
                        getAllProject()
                    })
                    .fail(err => {
                        console.log(err)
                        Swal.fire({
                            type: 'warning',
                            title: 'Unauthorized process.',
                            text: err.responseJSON.message
                        })
                    })
            }
        })

    })
}

// ----------------------- details project

function detailProjectPage() {
    $(document).on('click', '.detail', function (event) {
        event.preventDefault()

        // console.log('masuk yeee')
        let projectId = $(this).attr('class').split(' ')[2]
        // console.log(projectId)
        $.ajax({
                method: 'get',
                url: `${baseURL}/projects/${projectId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                // console.log(response)
                let projectId_before = $('.project-page-title').attr('class').split(' ')[1]
                let members = response.members

                // ----------------------------- fill members
                $('.members').empty()
                for (let i = 0; i < members.length; i++) {
                    if (members[i]._id == response.UserId) {
                        $('.members').append(
                            `
                            <tr class="${members[i]._id}">
                                <td>${members[i].name}</td>
                                <td><a>Owner</a></td>
                            </tr>
                            `
                        )
                    } else {
                        $('.members').append(
                            `
                            <tr class="${members[i]._id}">
                                <td>${members[i].name}</td>
                                <td><a href="" class="${members[i]._id} remove">remove</a></td>
                            </tr>
                            `
                        )
                    }
                }

                // ----------------------------- fill todos
                getProjectTodos(response._id)

                $('.project-page-title').append(`<span>Project: ${response.name}<span>`)
                $('.project-page-title').removeClass(`${projectId_before}`)
                $('.project-page-title').addClass(`${response._id}`)

                $('.projects-list-container').hide()
                $('.project-page-container').show()

            })
            .fail(err => {
                console.log(err)
            })

    })
}

function inviteMember() {
    $('#invite-member').submit(function (e) {
        e.preventDefault()

        let inputEmail = $('#invite-input-email').val()
        let projectId = $('.project-page-title').attr('class').split(' ')[1]
        // console.log(inputEmail, projectId)

        $.ajax({
                method: 'post',
                url: `${baseURL}/projects/invite?memberEmail=${inputEmail}&projectId=${projectId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                // console.log(response)
                $('#invite-input-email').val("")
                $('.members').append(
                    `
                    <tr class="${response._id}">
                        <td>${response.name}</td>
                        <td><a href="" class="${response._id} remove">remove</a></td>
                    </tr>
                    `
                )
            })
            .fail(err => {
                console.log(err)
                Swal.fire({
                    type: 'error',
                    title: "User not found.",
                    text: err.responseJSON.message
                })
            })

    })
}

function removeMember() {
    $(document).on('click', '.remove', function (e) {
        e.preventDefault()

        let userId = $(this).attr('class').split(' ')[0]
        let projectId = $('.project-page-title').attr('class').split(' ')[1]

        Swal.fire({
            title: 'Dow you want to remove this member?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove him!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                        method: 'post',
                        url: `${baseURL}/projects/remove-member?userId=${userId}&projectId=${projectId}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(response => {
                        console.log('Successfully remove a member.')
                        $(`.${userId}`).remove()
                        Swal.fire(
                            'Removed!',
                            'Your member has been removed.',
                            'success'
                        )
                    })
                    .fail(err => {
                        console.log(err)
                        Swal.fire({
                            type: 'warning',
                            title: 'Unauthorized process.',
                            text: err.responseJSON.message
                        })
                    })

            }
        })



    })
}

function openProjectTodoForm() {
    $('.open-project-todo-form').click(function (e) {
        e.preventDefault()

        $('.open-project-todo-form').hide()
        $('.add-todo-project').fadeIn(500)

    })

    $('.close-project-todo-form').click(function (e) {
        e.preventDefault()

        $('.add-todo-project').fadeOut(500, function () {
            $('.open-project-todo-form').show()
        })

    })
}

function addProjectTodo() {
    $('.add-todo-project-form').submit(function (e) {
        e.preventDefault()

        let projectId = $('.project-page-title').attr('class').split(' ')[1]
        let result = {}
        result.name = $('.inp-todo-proj-name').val()
        result.description = $('.inp-todo-proj-desc').val()
        result.due_date = $('.inp-todo-proj-date').val()

        // console.log(projectId)
        $.ajax({
                method: 'post',
                url: `${baseURL}/projects/todos/add`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    name: result.name,
                    description: result.description,
                    due_date: result.due_date,
                    projectId
                }
            })
            .done(response => {

                $('.inp-todo-proj-name').val("")
                $('.inp-todo-proj-desc').val("")
                $('.inp-todo-proj-date').val("")

                $('.open-project-todo-form').show()
                $('.add-todo-project').hide()

                getProjectTodos(projectId)
            })
            .fail(err => {
                console.log(err)
            })
    })
}

function openEditProjectTodo() {

    $(document).on('click', '.open-edit-proj-todo', function (e) {
        e.preventDefault()

        // console.log($(this).attr('class').split(' ')[1] ,'masuk yaaa edit <<<<<')
        let idBefore = $('.edit-proj-todo').attr('class').split(' ')[2]
        let todoId = $(this).attr('class').split(' ')[1]
        let projectId = $('.project-page-title').attr('class').split(' ')[1]

        $('.edit-proj-todo').removeClass(`${idBefore}`).addClass(`${todoId}`)
        // console.log(projectId, 'project id <<<<<<<<<<<')

        $.ajax({
                method: 'get',
                url: `${baseURL}/projects/todos/${todoId}`,
                data: {
                    projectId
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                // console.log(response.due_date.substr(0,10))

                $('#name-edit-proj-todo').val(`${response.name}`)
                $('#description-edit-proj-todo').val(`${response.description}`)
                $('#due_date-edit-proj-todo').val(`${response.due_date.substr(0,10)}`)

            })
            .fail(err => {
                console.log(err)
            })
    })

}

function editProjectTodo() {

    $('.project-todo-edit-value').submit(function (e) {
        e.preventDefault()

        let result = {}
        $.each($('.project-todo-edit-value').serializeArray(), function () {
            result[this.name] = this.value
        })

        let todoId = $('.edit-proj-todo').attr('class').split(' ')[2]
        let projectId = $('.project-page-title').attr('class').split(' ')[1]
        // console.log(todoId, projectId)

        $.ajax({
                method: 'patch',
                url: `${baseURL}/projects/todos/${todoId}/edit?projectId=${projectId}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: result
            })
            .done(response => {
                // console.log(response)

                $('body').css('overflow', 'visible')
                $('.jquery-modal').hide()

                Swal.fire({
                    type: 'success',
                    title: 'Success!',
                    text: 'Todo successfuly updated!'
                })

                getProjectTodos(projectId)
            })
            .fail(err => {
                console.log(err)
                Swal.fire({
                    type: 'error',
                    title: 'Please input the right date',
                    text: 'The date must be after today.'
                })
            })

    })

}

function deleteProjectTodo() {

    $(document).on('click', '.delete-project-todo', function (event) {
        event.preventDefault()
        let todoId = $(this).attr('class').split(' ')[1]
        let projectId = $('.project-page-title').attr('class').split(' ')[1]

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                        type: 'DELETE',
                        url: `${baseURL}/projects/todos/${todoId}/delete?projectId=${projectId}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(response => {
                        console.log(response)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        $('.todos-list').empty()
                        getMyTodo()

                        // get project todo
                        if ($('.project-page-title').attr('class').split(' ')[1]) {
                            getProjectTodos($('.project-page-title').attr('class').split(' ')[1])
                        }
                    })
                    .fail(err => {
                        console.log(err)
                    })

            }
        })

    })
}

// ===================================================== THIRD PARTY API

function yesOrNo() {
    $(document).on('click', '.should-i', function (e) {
        e.preventDefault()

        $('.yes-no-modal').empty()
        $('.yes-no-modal').append(
            `
            <div class="spinner">
                    <img src="./static/spinner.gif" alt="">
            </div>
            `
        )

        console.log('masuk yaaa...')
        $.ajax({
                method: 'get',
                url: `${baseURL}/thirdApi/yes-no`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                // console.log(response)
                $('.spinner').hide()
                $('.yes-no-modal').append(
                    `
                <h3 class="answer">ABSOLUTELY ${response.answer.toUpperCase()}!!<h3>
                <br>
                <img class="yes-no-image" src="${response.image}" alt="image">
                `
                )
            })
            .fail(err => {
                console.log(err)
            })

    })

}

// ===================================================== helpers

function getAllProject() {

    $.ajax({
            method: 'get',
            url: `${baseURL}/projects`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(projects => {
            // console.log(projects)

            $('.projects-list').empty()
            for (let i = 0; i < projects.length; i++) {

                $('.projects-list').append(
                    `
                <div class="project-card">
                    <div class="project-header">
                        <h2 class="project-title">${projects[i].name}</h2>
                        <small>members (${projects[i].members.length})</small>,
                        <small>todos (${projects[i].todos.length})</small>
                    </div>    
                    <p class="project-desc">${projects[i].description}</p>
                    <div class="project-options">
                        <a href="#" class="detail btn ${projects[i]._id}">Detail</a>
                        <a href="#ex3" rel="modal:open" href="#" class="open-edit-project btn ${projects[i]._id}">Edit</a>
                        <a href="#" class="delete-project btn ${projects[i]._id}">Delete</a>
                    </div>
                </div>
                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function getProjectTodos(projectId) {
    $.ajax({
            method: 'get',
            url: `${baseURL}/projects/${projectId}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(response => {
            let todos = response.todos
            // console.log(todos)
            todos.sort((a, b) => a.due_date - b.due_date)

            $('.project-todos-list').empty()
            for (let i = 0; i < todos.length; i++) {
                let status = todos[i].status == 'undone' ? 'Done' : 'Undone'
                let classStat = todos[i].status == 'undone' ? 'finish' : 'unfinish'

                $('.project-todos-list').append(
                    `
                    <li class="todo-card">
                        <table style="text-align: left" class="card-table">
                            <tr>
                                <td>Name</td>
                                <td>: <span style="font-weight: bold;">${todos[i].name}</span></td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>: ${todos[i].description}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>: <span class="${todos[i].status}">${todos[i].status}</span></td>
                            </tr>
                            <tr>
                                <td>Due Date</td>
                                <td>: ${todos[i].due_date}</td>
                            </tr>
                        </table>
                        <a href="#" class="${classStat} ${todos[i]._id} btn">${status}</a>
                        <a href="#" class="delete-project-todo ${todos[i]._id} btn">Delete</a>
                        <a href="#ex1" rel="modal:open" class="open-edit-proj-todo ${todos[i]._id} btn">Edit</a> 
                    </li>
                    `
                )

            }
        })
        .fail(err => {
            console.log(err)
        })
}

function getMyTodo() {
    $.ajax({
            method: 'GET',
            url: `${baseURL}/users/todos`,
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .done(response => {
            let todos = response
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].ProjectId == undefined || null) {
                    let status = todos[i].status == 'undone' ? 'Done' : 'Undone'
                    let classStat = todos[i].status == 'undone' ? 'finish' : 'unfinish'

                    $('.todos-list').append(
                        `
                    <li class="todo-card">
                        <table style="text-align: left" class="card-table">
                            <tr>
                                <td>Name</td>
                                <td>: <span style="font-weight: bold;">${todos[i].name}</span></td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>: ${todos[i].description}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>: <span class="${todos[i].status}">${todos[i].status}</span></td>
                            </tr>
                            <tr>
                                <td>Due Date</td>
                                <td>: ${todos[i].due_date}</td>
                            </tr>
                        </table>
                        <div class="my-todo-options">
                            <a href="#" class="${classStat} ${todos[i]._id} btn">${status}</a>
                            <a href="#" class="delete ${todos[i]._id} btn">Delete</a>
                            <a href="#" class="edit ${todos[i]._id} btn">Edit</a> 
                        </div>
                        <div class="should-i">
                            <a href="#ex2" rel="modal:open" href="">Should i do this task now?</a>
                        </div>
                    </li>
                    `
                    )
                }
            }
        })
        .fail(err => {
            console.log(err)
        })
}

