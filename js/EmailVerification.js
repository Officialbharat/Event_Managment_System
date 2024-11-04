let _user_message = document.getElementById("_user_message");
let email = document.getElementById("email");
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        email.innerHTML = user.email
        if (user.emailVerified === true) {
            errow_show.innerHTML = "Your email has been verified";
            errow_show.style.display = "block";
            errow_show.setAttribute("class", "sucess_message");
            setTimeout(() => {
                errow_show.style.display = "none";
                window.location.href = "./../database/Home.html"
            }, 3000)
        }

    } else {
        errow_show.innerHTML = "please login first";
            errow_show.style.display = "block";
            errow_show.setAttribute("class", "error_message");
            setTimeout(() => {
                errow_show.style.display = "none";
                window.location.href = "./../database/login.html"
            }, 3000)
 
    }
})



let reSendEmail = () => {
    var loginUser = firebase.auth().currentUser;
    loginUser.sendEmailVerification();
}
let goToHome = () => {
    location.reload();
}