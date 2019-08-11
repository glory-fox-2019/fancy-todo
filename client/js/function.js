function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    showLoginPage();
  });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${baseUrl}/user/google`,
    data: { id_token }
  })
  .done(function(res) {
    localStorage.setItem('token', res.token);
    showDashboardPage(res.token);
  })
  .fail(function(err) {
    console.log(err, '<<<<<<<<<<<<<<<<< error');
  })
}

function showLoginPage() {
  $('#login-register').show();
  $('#dashboard').hide();
  $('#register-right').hide();
  $('#register-left').hide();
}

function prependCard(data) {
  let icon = '';
  if (data.status === true) {
    icon = 'fas fa-check-circle'
  } else {
    icon = 'far fa-times-circle'
  }
  const html = `
  <div class="card blue-bg" obj-id="${data._id}">
    <div class="card-body">
      <i class="${icon} fa-2x"></i>
      <div class="title-desc-task">
        <div class="title-task">${data.todo}</div>
        <div class="date-task">${data.due_date}</div>
      </div>
    </div>
  </div>`
  $('#box-list-task').prepend(html);
}

function showDashboardPage(token) {
  $('#login-register').hide();
  $('#dashboard').show();
  $('#body-detail').hide();
  $('#done-task').hide();
  $('#box-edit-icon').hide();
  $('#box-delete-icon').hide();

  $('#logout').on('click', function() {
    signOut();
    localStorage.clear();
  })

  $('#add-task').on('click', function() {
    $.ajax({
      method: "POST",
      url: `${baseUrl}/todo`,
      data: {
        todo: "bermain terus",
        desc: "hanya description",
        due_date: "2020-10-20",
        user_id: "5d4e7a82a9ec172e364ee4ba"
      }
    })
    .done(function(data) {
      prependCard(data);
      cardClick();
    })
    .fail(function(err) {
      console.log(err);
    })
  })

  $.ajax({
    method: "GET",
    url: `${baseUrl}/todo/${token}`
  })
  .done(function(data) {
    for (let i = 0; i < data.length; i++) {
      prependCard(data[i]);
    }
    cardClick();
    $('#box-delete-icon').on('click', function() {
      const todo_id = $('#box-delete-icon').attr('todo-id');
      deleteTodo(todo_id, localStorage.getItem('token'));
    })
  })
  .fail(function(err) {
    console.log(err);
  })
}

function cardClick() {
  $('.card').on('click', function() {
    const id = $(this).attr('obj-id');
    showDetailTodo(id);
  })
}

function showDetailTodo(id) {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todo/detail/${id}`
  })
  .done(function(data) {
    $('#body-detail').show();
    if (data.status === true) {
      $('#status-detail').html('<i class="fas fa-check-circle fa-2x"></i>');
    } else {
      $('#status-detail').html('<i class="far fa-times-circle fa-2x"></i>');
    }
    $('#title-todo').html(data.todo);
    $('#date-detail').html(`<i class="far fa-clock"></i> ${Date(data.createdAt)}`)
    $('#description-detail').html(data.desc);
    $('#box-edit-icon').show();
    $('#box-delete-icon').show();
    $('#box-edit-icon').attr('todo-id', data._id);
    $('#box-delete-icon').attr('todo-id', data._id);
    $('#done-task').show();
  })
  .fail(function(err) {
    console.log(err);
  })
}

function deleteTodo(todo_id, token) {
  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/todo/${todo_id}/${token}`
  })
}