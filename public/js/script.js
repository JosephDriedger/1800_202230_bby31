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

var pattern = /[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9]/,
$result = $("#result");

$('#postCode').keyup(function(){
  var val = this.value
  if(!val.match(pattern)){
    $result.text("invalid");
  } else {
    $result.text("valid");      
  }
});
reportPage();