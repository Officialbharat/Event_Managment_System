setTimeout(()=>{
    // window.location.assign("./pages/auth/login.html")
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if(user.emailVerified){
                window.location.href = "./pages/database/Home.html";
            }else{
                window.location.href = "./pages/auth/EmailVerification.html";
            }
        } else {
            window.location.href = "./pages/auth/Login.html";
        }
      });
},2000);