let _user_message = document.getElementById("_user_message");
var fullName;
var mobNumber;
var email;
var uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (!user.emailVerified) {
            _user_message.style.display = "block";
            _user_message.innerHTML = "Please verify email ";
            _user_message.setAttribute("class", "error_message");
            setTimeout(() => {
                _user_message.style.display = "none";
                window.location.href = "./../pages/auth/emailverification.html"
            }, 3000)
        } else {
            firebase.firestore().collection("users").doc(user.uid).get()
                .then((currUserData) => {
                    var currentUser = currUserData.data();
                    fullName = `${currentUser.fName} ${currentUser.lName}`
                    mobNumber = currentUser.mobNumber
                    email = currentUser.email
                    uid = currentUser.uid
                })
        }

    } else {
        _user_message.style.display = "block";
        _user_message.innerHTML = "please login first";
        _user_message.setAttribute("class", "error_message");
        setTimeout(() => {
            _user_message.style.display = "none";
            window.location.href = "./../pages/auth/login.html"
        }, 3000)

    }
})


let imagePath;
let eventImage =(e) => {
    let uploaded_progress = document.getElementById("uploaded_progress");
    let selectedEventImage = e.target.files[0];
    let storageRef = firebase.storage().ref();
    storageRef.child(`/eventsImages/${selectedEventImage.name}/`)
    let uploadTask = storageRef.put(selectedEventImage);
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            uploaded_progress.innerHTML = 'Upload is ' + progress + '% done'
        },
        (error) => {
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                imagePath = downloadURL
            });
        }
    );

}



let createEventData = () => {
    let eventName = document.getElementById("eventName");
    let eventTime = document.getElementById("eventTime");
    let eventDate = document.getElementById("eventDate");
    let eventPrice = document.getElementById("eventPrice");
    let eventImage = document.getElementById("eventImage");
    let eventDes = document.getElementById("eventDes");

    if (eventName.value === "") {
        _user_message.innerHTML = "Please enter event name ";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        eventName.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else if (eventTime.value === "") {
        _user_message.innerHTML = "Please select event time ";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        eventTime.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else if (eventDate.value === "") {
        _user_message.innerHTML = "Please select event date ";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        eventDate.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else if (eventPrice.value === "") {
        _user_message.innerHTML = "Please enter event price in PKR ";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        eventPrice.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else if (eventImage.value === "") {
        _user_message.innerHTML = "Please select event image ";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        _user_message.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else if (eventDes.value === "") {
        _user_message.innerHTML = "Please add event des...";
        _user_message.style.display = "block";
        _user_message.setAttribute("class", "error_message");
        eventDes.focus();
        setTimeout(() => {
            _user_message.style.display = "none";
        }, 3000)
    } else {
        var eventObj = {
            eventName: eventName.value,
            eventTime: eventTime.value,
            eventDate: eventDate.value,
            eventPrice: eventPrice.value,
            imagePath: imagePath,
            eventDes: eventDes.value,
            fullName: fullName,
            mobNumber: mobNumber,
            email: email,
            uid: uid
        }



        firebase.firestore().collection(`events`)
            .add(eventObj)
            .then(() => {
                _user_message.innerHTML = "Successfylly added event ";
                _user_message.style.display = "block";
                _user_message.setAttribute("class", "sucess_message");
                setTimeout(() => {
                    _user_message.style.display = "none";
                    location.reload();
                }, 3000)
            })
        console.log(eventObj)
    }

}
let logout = () => {
    firebase.auth().signOut()
    .then(() =>{
        window.location.href = "./../pages/auth/login.html";
    })
}