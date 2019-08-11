let baseurl = 'http://localhost:3100/api';
$(document).ready(function(){
  initialLoad();
  $('#modal--more--tag').keypress(function(e){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      addTag('#modal--more--tag--list',$(this).val());
      $(this).val('');
    }
  })
  $('#modal--add--tag').keypress(function(e){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      addTag('#modal--add--tag--list',$(this).val());
      $(this).val('');
    }
  })
  $('#form--search').submit(function(el){
    $.ajax({
      url: `${}`
    })
  });
});

function initialLoad(){
  if(isLogin()){
    getUserData();
    initialMaterialize();
    loadTodos();
    $('#signin').hide();
    $('#todo').show();    
    $('.navbar--right').show();
  }else{
    $('#signin').show();    
    $('#todo').hide();    
    $('.navbar--right').hide();
  }
}
function initialMaterialize(){
  $('.modal').modal();
  $('.datepicker').datepicker();
  M.updateTextFields();
}
function getUserData(){
  $.ajax({
    url: `${baseurl}/user`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(function(data){
    console.log(data);
    $('.navbar--username').text(data.username);
  })
  .fail((error, errorName) => {
    console.error(error,errorName)
  });
}
function loadTodos(){
  $.ajax({
    url: `${baseurl}/todos/`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done((data) => {
    $('.todo--list .row').html('');
    data.forEach((el)=>{
      loadIndividualTodo(el);
    });
  })
  .fail((error,errorName) => {
    console.log(errorName,error);
  })
}
function loadIndividualTodo(el){
  let html;
  if(el.thumbnail){
    html = `
    <div class="todo__item col s4" data-id="${el._id}">
      <div class="card">
        <div class="todo__item--thumbnail" style="background-image: url('${el.thumbnail}');">
          <div class="todo__item--action">
            <a href="#modal--more" class="btn-floating waves-effect waves-yellow btn btn-flat white btn--more-todo modal-trigger" onclick="loadOneTodo(this)"><i class="material-icons">more</i></a>
            <a href="#modal--delete-permission" class="btn-floating waves-effect waves-red btn btn-flat white btn--delete-todo modal-trigger" onclick="loadDeleteOneTodo(this)"><i class="material-icons">delete</i></a>
          </div>
          <div class="todo__item--dueDate" ${!el.dueDate && 'style="display:none"' }>
            <div class="date">
              <i class="material-icons">date_range</i><span>${moment(el.dueDate).calendar()}</span>
            </div>
          </div>
        </div>
        <div class="todo__item--bottom">
          <label class="todo__item--checkbox">
            <input type="checkbox" onchange="checkboxChange(this)" ${ (el.status) ? 'checked' : ''}/>
            <span>${el.title}</span>
          </label>
        </div>
      </div>
    </div>
    `
  }else{
    html = `
    <div class="todo__item col s4" data-id="${el._id}">
      <div class="card">
        <div class="todo__item--bottom">
          <label class="todo__item--checkbox">
            <input type="checkbox" onchange="checkboxChange(this)" ${ (el.status) ? 'checked' : ''}/>
            <span>${el.title}</span>
          </label>
        </div>
        <div class="todo__item--essential">
          <div class="todo__item--action">
            <a href="#modal--more" class="btn-floating waves-effect waves-yellow btn btn-flat white btn--more-todo modal-trigger" onclick="loadOneTodo(this)"><i class="material-icons">more</i></a>
            <a href="#modal--delete-permission" class="btn-floating waves-effect waves-red btn btn-flat white btn--delete-todo modal-trigger" onclick="loadDeleteOneTodo(this)"><i class="material-icons">delete</i></a>
          </div>
          <div class="todo__item--dueDate"  ${!el.dueDate && 'style="display:none"' }>
            <div class="date">
              <i class="material-icons">date_range</i><span>${moment(el.dueDate).calendar()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`
  }
  $('.todo--list .row').prepend(html)
}
function loadDeleteOneTodo(element){
  let id = $(element).closest('.todo__item').attr('data-id');
  $('#modal--delete-permission').attr('data-id', id);
}
function loadOneTodo(element){
  let id = $(element).closest('.todo__item').attr('data-id');
  console.log(id);
  $.ajax({
    url: `${baseurl}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done((data) => {
    console.log(data);
    $('#modal--more--id').val(data._id);
    $('#modal--more--title').val(data.title);
    $('#modal--more--dueDate').datepicker({setDefaultDate: true,defaultDate:new Date(data.dueDate), minDate: new Date()});
    $('#modal--more--description').val(data.description);
    // Thumbnail
    $('#modal--more--thumbnail--image img').attr('src',data.thumbnail);
    // $('#modal--more--thumbnail--image').css('background-image:',`url('${data.thumbnail}')`);    

    // Tag
    $('#modal--more--tag--list').html('');
    data.tag.forEach((el) => {
      let htmlTag = `
        <div class="chip" data-tag="${el}">
          ${el}
          <i class="close material-icons">close</i>
        </div>
      `
      $('#modal--more--tag--list').append(htmlTag);
    })

  })
  .fail((error, errorName) => {
    console.error(errorName,error);
  })
}
function updateOneTodo(){
  let id = $('#modal--more--id').val();
  let tags = [];
  $('#modal--more--tag--list').find('.chip').each(function(i){
    tags.push($(this).attr('data-tag'))
  });
  let data = {
    title: $('#modal--more--title').val(),
    dueDate: $('#modal--more--dueDate').val(),
    description: $('#modal--more--description').val(),
    thumbnail: $('#modal--more--thumbnail--image img').attr('src'),
    tag: tags,
  }
  $.ajax({
    url: `${baseurl}/todos/${id}`,
    method: 'PATCH',
    data,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done((data) => {
    let element = $(`.todo__item[data-id=${id}]`);
    let html;
    if(data.thumbnail){
      html = `
        <div class="card">
          <div class="todo__item--thumbnail" style="background-image: url('${data.thumbnail}');">
            <div class="todo__item--action">
              <a href="#modal--more" class="btn-floating waves-effect waves-yellow btn btn-flat white btn--more-todo modal-trigger" onclick="loadOneTodo(this)"><i class="material-icons">more</i></a>
              <a href="#modal--delete-permission" class="btn-floating waves-effect waves-red btn btn-flat white btn--delete-todo modal-trigger" onclick="loadDeleteOneTodo(this)"><i class="material-icons">delete</i></a>
            </div>
            <div class="todo__item--dueDate" ${!data.dueDate && 'style="display:none"' }>
              <div class="date">
                <i class="material-icons">date_range</i><span>${moment(data.dueDate).calendar()}</span>
              </div>
            </div>
          </div>
          <div class="todo__item--bottom">
            <label class="todo__item--checkbox">
              <input type="checkbox" onchange="checkboxChange(this)" ${ (data.status) ? 'checked' : ''}/>
              <span>${data.title}</span>
            </label>
          </div>
        </div>
      `
    }else{
      html = `
        <div class="card">
          <div class="todo__item--bottom">
            <label class="todo__item--checkbox">
              <input type="checkbox" onchange="checkboxChange(this)" ${ (data.status) ? 'checked' : ''}/>
              <span>${data.title}</span>
            </label>
          </div>
          <div class="todo__item--essential">
            <div class="todo__item--action">
              <a href="#modal--more" class="btn-floating waves-effect waves-yellow btn btn-flat white btn--more-todo modal-trigger" onclick="loadOneTodo(this)"><i class="material-icons">more</i></a>
              <a href="#modal--delete-permission" class="btn-floating waves-effect waves-red btn btn-flat white btn--delete-todo modal-trigger" onclick="loadDeleteOneTodo(this)"><i class="material-icons">delete</i></a>
            </div>
            <div class="todo__item--dueDate" ${!data.dueDate && 'style="display:none"' }>
              <div class="date">
                <i class="material-icons">date_range</i><span>${moment(data.dueDate).calendar()}</span>
              </div>
            </div>
          </div>
        </div>`
    }
    $(element).html(html);
  })
  .fail((error,errorName) => {
    console.error(errorName,error);
  })
}
function deleteOneTodo(){
  let id = $('#modal--delete-permission').attr('data-id');
  $.ajax({
    method: 'DELETE',
    url: `${baseurl}/todos/${id}`,
    headers:{
      token: localStorage.getItem('token')
    }
  })
  .then((data) => {
    $(`.todo__item[data-id=${id}]`).slideToggle(400,function(){
      $(`.todo__item[data-id=${id}]`).remove();
    });
  })
  .fail((error,errorName) => {
    console.error(errorName,error);
  });
}
function loadAddTodo(){
  $('#modal--add--title').val('');
  $('#modal--add--dueDate').val(''),
  $('#modal--add--description').val(''),
  $('#modal--add--thumbnail--image img').attr('src','');
  $('#modal--add--tag').val('');
  $('#modal--add--tag--list').html('');
}
function addOneTodo(){
  let tags = [];
  $('#modal--add--tag--list').find('.chip').each(function(i){
    tags.push($(this).attr('data-tag'))
  });
  let data = {
    title: $('#modal--add--title').val(),
    dueDate: $('#modal--add--dueDate').val(),
    description: $('#modal--add--description').val(),
    thumbnail: $('#modal--add--thumbnail--image img').attr('src'),
    tag: tags,
  }
  $.ajax({
    method: 'POST',
    url: `${baseurl}/todos`,
    data,
    headers:{
      token: localStorage.getItem('token')
    }
  })
  .done(function(data){
    loadIndividualTodo(data);
  })
  .fail(function(error, errorName){
    console.error(errorName,error)
  })
}
function isLogin(){
  return localStorage.getItem('token');
}
function addTag(element,value){
  let html = `
    <div class="chip" data-tag="${value}">
      ${value}
      <i class="close material-icons">close</i>
    </div>
  `
  $(element).append(html);
}
function checkboxChange(el){
  if($(el).is(':checked')){
    checked(el);
  }else{
    unchecked(el);
  }
}
function checked(el){
  let id = $(el).closest('.todo__item').attr('data-id');
  $.ajax({
    url: `${baseurl}/todos/${id}/check`,
    headers:{
      token: localStorage.getItem('token')
    }
  })
  .done(function(el){
    
  })
  .fail(function(error,errorName){
    console.error(errorName, error);
  })
}
function unchecked(el){
  let id = $(el).closest('.todo__item').attr('data-id');
  $.ajax({
    url: `${baseurl}/todos/${id}/uncheck`,
    headers:{
      token: localStorage.getItem('token')
    }
  })
  .done(function(el){
    
  })
  .fail(function(error,errorName){
    console.error(errorName, error);
  })
}
function onSignIn(googleUser){
  let idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${baseurl}/user/login/google`,
    method: 'POST',
    data: {
      idToken
    }
  })
  .done(function(data){
    localStorage.setItem('token', data);
    initialLoad();
  })
  .fail(function(error, errorName){
    console.error(errorName, error);
  })
}
function signOut() {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear();
    initialLoad();
  });
}
