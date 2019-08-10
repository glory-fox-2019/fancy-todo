const serverUrl = "http://localhost:3000"
$(document).ready(function(){
    $('body').css('background-color', 'blue !important');

    $('#register').submit(function() {
        event.preventDefault()
        let sendData = {}
        let formData = $(this).serializeArray()
        formData.forEach(function(el) {
            sendData[el.name] = el.value
        })

        $.ajax({
            url: `${serverUrl}/user/register`,
            type: 'POST',
            data: sendData
        })
            .done(function(data) {
                addTokenAfterSigned(data.token)
                console.log(data)
            })
            .fail(function(err) {
                console.log(err.responseJSON.message)
                showError(err.responseJSON.message)
            })
    })

    $('#login').submit(function() {
        event.preventDefault()
        let sendData = {}
        let formData = $(this).serializeArray()
        formData.forEach(function(el) {
            sendData[el.name] = el.value
        })
        console.log(sendData)
        $.ajax({
            url: `${serverUrl}/user/signin`,
            type: 'POST',
            data: sendData
        })
            .done(function(data) {
                addTokenAfterSigned(data)
                console.log(data)
            })
            .fail(function(err) {
                console.log(err.responseJSON.message)
                showError(err.responseJSON.message)
            })
        })
    })
    
function showError(message) {
    $('#error-message').text(message)
    $('#error-message').css('visibility', 'visible')
}

function addTokenAfterSigned(data) {
    console.log(data)
    localStorage.setItem("key", data)
    // localStorage.setItem("registeredUser", data.full)
    $('#first-pop-up').css('visibility', 'hidden')
    $('#google-button').css('visibility', 'hidden')
    $('#error-message').css('visibility', 'hidden')
    $('form').find("input[type=text], textarea").val("")
    $('form').find("input[type=password], textarea").val("")
    $('#content').css('display', 'block')
    $('#content h1').text(`Welcome ${data.full_name}`)
    console.log(data)
}