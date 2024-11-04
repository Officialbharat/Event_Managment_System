let userData = ()=>{
    let email =document.getElementById("_email");
    let password =document.getElementById("_password");
    let _user_message = document.getElementById("_user_message");


    if(email.value === ""){
      _user_message.style.display = "block";
      _user_message.innerHTML = "please enter valid email address";
      _user_message.setAttribute("class", "error_message");
        email.focus();
        setTimeout(() => {
          _user_message.style.display = "none";
        }, 3000)
    } else if (password.value === "" || password.value.length < 6) {
      _user_message.innerHTML = "The password must not be identical to one of the last 6 passwords that were used for that account.";
      _user_message.style.display = "block";
      _user_message.setAttribute("class", "error_message");
      password.focus();
      setTimeout(() => {
        _user_message.style.display = "none";
      }, 3000)
    } else{
      let userobj = {
        email: email.value,
        password: password.value
      }
    firebase.auth().signInWithEmailAndPassword(userobj.email, userobj.password)
    .then((User) => {
      console.log(User);
      _user_message.style.display = "block";
      _user_message.innerHTML = "You are successfully logged in";
      _user_message.setAttribute("class", "sucess_message");
      setTimeout(() => {
        _user_message.style.display = "none";
      }, 3000)
      // console.log(loginUser.user.emailVerified);
      if (User.user.emailVerified === false){
          setTimeout(() => {
              window.location.href = './../auth/emailverification.html'
          }, 3000)
      } else {
          setTimeout(() => {
              window.location.href = './../database/home.html'
          }, 3000)
      }
  })
  .catch((error) => {
      console.log(error);
      _user_message.innerHTML = error.message;
      _user_message.style.display = "block";
      _user_message.setAttribute("class", "error_message");
      email.focus();
      setTimeout(() => {
        _user_message.style.display = "none";
      }, 3000)
  })
}
}