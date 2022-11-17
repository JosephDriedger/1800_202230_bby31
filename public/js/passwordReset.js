var user = firebase.auth().currentUser;
var currentUser;
var emailAddress;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        currentUser.get()
            .then(userDoc => {
                emailAddress = userDoc.data().email;
                console.log(emailAddress);
            })
    } else {
        window.location.href = "/login";
    }
});

// Check if email entered matches the current user's email.
function matchInputWithValues() {
    if (document.getElementById("emailInput").value === emailAddress) {
        // Allow user to send a request
        document.getElementById("sendRequest").disabled = false;
        document.getElementById("emailMessage").className = "text-success";
        document.getElementById("emailMessage").innerHTML = "Email Verified.";
    } else {
        document.getElementById("savePassword").disabled = true;
        document.getElementById("emailMessage").className = "text-danger";
        document.getElementById("emailMessage").innerHTML = "Your email input does not match your account.";
    }
}

document.getElementById("sendRequest").addEventListener("click", sendRequest);

function sendRequest() {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email).then(function() {
        document.getElementById("emailMessage").className = "text-success";
        document.getElementById("emailMessage").innerHTML = "Email Sent. Please check your Inbox.";
        console.log("Email Sent. Please check your Inbox.");
        document.getElementById("sendRequest").disabled = true;
    }).catch(function(error) {
        document.getElementById("emailMessage").className = "text-danger";
        document.getElementById("emailMessage").innerHTML = "Something went wrong. Please try again later.";
        console.log(error);
    }); 
}

function resetValues() {
    document.getElementById("emailInput").value = "";
    document.getElementById("savePassword").disabled = true;
}
