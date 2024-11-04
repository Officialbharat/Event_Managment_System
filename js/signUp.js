function signUp() {
    let fName = document.getElementById("fName")
    let lName = document.getElementById("lName")
    let mobNumber = document.getElementById("mobNumber")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let gender = document.getElementsByName("gender");
    let _user_message = document.getElementById("_user_message")

    var genderSelected = false;
    var genderSelectedValue;
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            genderSelected = true
            genderSelectedValue = gender[i].value;
        }
    }

    if (fName.value === "") {
        _user_message.innerHTML = "please enter first name";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        fName.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    }
    else if (lName.value === "") {
        _user_message.innerHTML = "please enter last name";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        lName.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else if (mobNumber.value === "" || mobNumber.value.length < 11) {
        _user_message.innerHTML = "please enter 11 digit mobile number";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        mobNumber.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else if (email.value === "") {
        _user_message.innerHTML = "pease enter valid email address";
        _user_message.style.display = "block";
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
    } else if (!genderSelected) {
        _user_message.innerHTML = "please select gender";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else {
        let userObj = {
            fName: fName.value,
            lName: lName.value,
            mobNumber: mobNumber.value,
            email: email.value,
            password: password.value,
            genderSelectedValue: genderSelectedValue,
        }
        
console.log("====userObj====>>>",userObj)
        firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .then((User) => {
                userObj.uid = User.user.uid;
                _user_message.innerHTML = "You are successfully sign up";
                _user_message.style.display = "block";
                _user_message.setAttribute("class", "sucess_message");
                setTimeout(() => {
                    _user_message.style.display = "none";
                }, 3000)

                User.user.sendEmailVerification();
                console.log(User)
                firebase.firestore().collection('users').doc(User.user.uid).set(userObj);
                if (!User.user.emailVerified) {
                    setTimeout(() => {
                        window.location.href = "./../auth/emailverification.html"
                    }, 3000)
                } 
            })

            .catch((error) => {

                _user_message.innerHTML = error.message;
                _user_message.style.display = "block";
                _user_message.setAttribute("class", "error_message");
                mobNumber.focus();
                setTimeout(() => {
                    _user_message.style.display = "none";
                }, 3000)
            })
    }
}