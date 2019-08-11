const url = `http://localhost:3000`;

$(document).ready(function () {
    loginStatus();
    getLocation();
    $('#add-task').submit(function (event) {
        event.preventDefault()
        let input = {
            UserId: localStorage.getItem('_id'),
            name: $('#name').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val()
        }
        createNewTask(input);
    });

    $('#edit-task').submit(function (event) {
        event.preventDefault()
        let input = {
            taskId: localStorage.getItem('taskId'),
            UserId: localStorage.getItem('_id'),
            name: $('#taskName').val(),
            description: $('#taskDescription').val(),
            dueDate: $('#taskDueDate').val()
        }
        updateTask(input);
    });

    $('#sign-up').submit(function (event) {
        event.preventDefault()
        let input = {
            name: $('#userName').val(),
            email: $('#userEmail').val(),
            password: $('#userPassword').val()
        }
        register(input);
    });

    $('#sign-in').submit(function (event) {
        event.preventDefault()
        let input = {
            email: $('#email').val(),
            password: $('#password').val()
        }
        signIn(input);
    });

});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        location = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
}

function signIn(input) {
    axios({
        url: `${url}/users/login`,
        method: 'post',
        data: input
    })
        .then(function ({ data }) {
            console.log(data)
            localStorage.removeItem('register');
            localStorage.setItem('token', data.token);
            localStorage.setItem('_id', data._id);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            hasToken();
        })
        .catch(function (err) {
            console.log(err)
        })
}

function register(input) {
    axios({
        url: `${url}/users/register`,
        method: 'post',
        data: input
    })
        .then(function ({ data }) {
            console.log(data)
            localStorage.removeItem('register');
            hasToken();
        })
        .catch(function (err) {
            console.log(err)
        })
}


function createNewTask(input) {
    axios({
        url: `${url}/tasks/create`,
        method: 'post',
        data: input
    })
        .then(({ data }) => {
            event.preventDefault()
            localStorage.removeItem('addNewTask')
            hasToken();
            // console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}

function loginStatus() {
    if (localStorage.getItem('token')) {
        hasToken();
    } else {
        noToken();
    }
}

function hasToken() {
    $('#registerForm').hide();
    $('#beforeLogin').hide();
    if (localStorage.getItem('addNewTask')) {
        $('#afterLogin').hide();
        $('#editTaskForm').hide();
        $('#addNewTaskForm').show();
        $('#name').val('');
        $('#description').val('');
    } else if (localStorage.getItem('editTask')) {
        $('#addNewTaskForm').hide();
        $('#afterLogin').hide();
        $('#editTaskForm').show();
    } else {
        $('#addNewTaskForm').hide();
        $('#editTaskForm').hide();
        $('#afterLogin').show();
        renderTask();
    }
}

function noToken() {
    $('#addNewTaskForm').hide();
    $('#editTaskForm').hide();
    $('#afterLogin').hide();
    if (localStorage.getItem('register')) {
        $('#beforeLogin').hide()
        $('#registerForm').show();
    } else {
        $('#registerForm').hide();
        $('#beforeLogin').show();
    }
}


function renderTask() {
    $('#taskListBody').empty();
    const id = localStorage.getItem('_id');
    // console.log(`render task ${id}`)
    axios({
        url: `${url}/tasks?id=${id}`,
        method: 'get',
    })
        .then(function ({ data }) {
            let number = 1;
            data.forEach(task => {
                if (task.status) {
                    $('#taskListBody').append(`
                    <tr>
                        <div class="taskList">
                        <td><button class="btn" onclick="changeTaskStatus('${task._id}')"><img src="./css/logo/checked.png" width="30px" height= "30px"></button></td>
                            <td class="labelName text-center">${number} .</td>
                            <td class="labelName text-center">${task.name}</td>
                            <td class="labelName">
                            <button onclick="editTask('${task._id}')" class="btn"><img src="./css/logo/edit.png" width="30px" height= "30px"></button>
                            <button onclick="deleteTask('${task._id}')" class="btn"><img src="./css/logo/trash.png" width="30px" height= "30px"></button>
                            </td>
                        </div>
                    </tr>
                `)
                } else {
                    $('#taskListBody').append(`
                        <tr>
                            <div class="taskList">
                                <td><button class="btn" onclick="changeTaskStatus('${task._id}')"><img src="./css/logo/unchecked.png" width="30px" height= "30px"></button></td>
                                <td class="labelName text-center">${number} .</td>
                                <td class="labelName text-center">${task.name}</td>
                                <td>
                                    <button class="btn" onclick="editTask('${task._id}')"><img src="./css/logo/edit.png" width="30px" height= "30px"></button>
                                    <button class="btn" onclick="deleteTask('${task._id}')"><img src="./css/logo/trash.png" width="30px" height= "30px"></button>
                                </td>
                            </div>
                        </tr>
                    `)
                }
                number++
            })
        })
        .catch(function (err) {
            console.log(err);
        })
}

function onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    // console.log(idToken);
    axios({
        url: `${url}/users/googleLogin`,
        method: 'post',
        data: { idToken }
    })
        .then(({ data }) => {
            // console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('_id', data._id);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            hasToken();
        })
        .catch(function (err) {
            // console.log(`masuk error aaaaaaaa`);
            console.log(err);
        })
}

function signOut() {
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    noToken()
}

function registerOn() {
    localStorage.setItem('register', 'true');
    hasToken();
}

function addNewTask() {
    localStorage.setItem('addNewTask', 'true');
    hasToken();
}

function backToTaskList() {
    // console.log(test);
    localStorage.removeItem('register');
    localStorage.removeItem('editTask');
    localStorage.removeItem('taskDescription');
    localStorage.removeItem('taskName');
    localStorage.removeItem('taskId');
    localStorage.removeItem('editTask');
    localStorage.removeItem('addNewTask');
    hasToken();
}

function deleteTask(taskId) {
    // console.log(taskId);
    axios({
        url: `${url}/tasks/${taskId}`,
        data: {
            UserId: localStorage.getItem('_id')
        },
        method: 'delete'
    })
        .then(function (data) {
            // console.log(data)
            hasToken();
        })
        .catch(function (err) {
            console.log(err);
        })

}

function changeTaskStatus(taskId) {
    axios({
        url: `${url}/tasks/${taskId}`,
        data: {
            UserId: localStorage.getItem('_id')
        },
        method: 'patch'
    })
        .then(function (data) {
            // console.log(data)
            hasToken();
        })
        .catch(function (err) {
            console.log(err);
        })
}

function editTask(taskId) {
    localStorage.setItem('editTask', 'true');
    hasToken();
    const UserId = localStorage.getItem('_id');
    // console.log(`render task ${id}`)
    axios.get(`${url}/tasks/findOne`, {
        params: {
            UserId,
            taskId
        }
    })
        .then(function ({ data }) {
            // console.log(data);
            localStorage.setItem('taskName', data.name);
            localStorage.setItem('taskDescription', data.description);
            localStorage.setItem('taskId', data._id);
            $('#taskName').val(localStorage.getItem('taskName', data.name));
            $('#taskDescription').val(localStorage.getItem('taskDescription', data.description));
        })
        .catch(function (err) {
            console.log(err);

        })

}

function updateTask(input) {
    // console.log(input)
    axios({
        url: `${url}/tasks/edit`,
        method: 'post',
        data: input
    })
        .then(({ data }) => {
            localStorage.removeItem('editTask');
            localStorage.removeItem('taskDescription');
            localStorage.removeItem('taskName');
            localStorage.removeItem('taskId');
            hasToken();
            // console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}