window.addEventListener('DOMContentLoaded', (event) => {
    var checkForgotPassword = document.getElementById('check-forgot-passwd');
    var loginForm = document.getElementById('login');
    var forgotPasswordForm = document.getElementById('forgot-passwd');
    checkForgotPassword.onclick = function(){
        if(checkForgotPassword.checked == true){
            loginForm.style.display = "none";
            forgotPasswordForm.style.display = "block";
            document.getElementsByClassName('form-title')[0].innerHTML = "Forgot Password";
            document.getElementsByClassName('form-title')[0].innerHTML = "Login";
            document.getElementById('signin').value = "Send email";
        }
        else{
            loginForm.style.display = "block";
            forgotPasswordForm.style.display = "none";
            document.getElementsByClassName('form-title')[0].innerHTML = "Login";
            document.getElementById('signin').value = "Log in";
        }
    }
});