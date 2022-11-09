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

function goToUserOnlyPage(page) {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is logged in
    if (user) {
        // Do something for the currently logged in user here:
        window.location.href = page;
    } else {
        window.location.href = "./login";
    }
    
  });
}

function signOut() {
  firebase.auth().signOut().then(function() {
    window.location.href = "./";
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
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