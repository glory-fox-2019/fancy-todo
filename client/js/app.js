$(document).ready(function(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
     
      
    // Initial Fetch 
    $('#login-form').hide()
    $('#signup-form').hide()

    if(!localStorage.getItem('token')){
      $('#workspace').hide()
      $('.logout').hide()
    } else {
      $('.homepage').hide()
      $('.login').hide()
    }
})
