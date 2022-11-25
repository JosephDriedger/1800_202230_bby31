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

// Sign Out User.
function signOut() {
  firebase.auth().signOut().then(function() {
    window.location.href = "./";
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
}
reportPage();

// Check if an incident has occured.
window.setInterval(function() {
  let keyWord
  let routes = db.collection("users").doc(user.uid).collection("routes");
  let schedules = db.collection("users").doc(user.uid).collection("Schedules")
  incidentRef.get().then(allIncidents => {
    allIncidents.forEach(doc => {
      var street;
    })
  });
}, 10)

// For Development Purposes Only
function createIncident(street, type, delay, description, suggestion) {
  var incidentRef = db.collection("incidents");

  incidentRef.add({
    street: street,
    type: type,
    delay: delay,
    description: description,
    suggestion: suggestion
  });
}