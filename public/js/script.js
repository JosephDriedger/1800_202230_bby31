function reportPage() {
    console.log("You're in " + window.location.pathname);
}

function goToMainOrHome() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is logged in
        if (user) {
            // Do something for the currently logged in user here:
            window.location.href = "./main";
        } else {
            window.location.href = "./";
        }
        
    });
}

reportPage();