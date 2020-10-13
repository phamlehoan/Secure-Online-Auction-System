loginInfo = {};
function checkLogin(){
  loginInfo.email = $(this).val();
  let regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  if(!regexEmail.test(loginInfo.email))
  {
      alertify.notify("Email must be in format example@gmail.com!","error",7)
      $(this).val("");
      delete loginInfo.email;
      return false;
  }
}
