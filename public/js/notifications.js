var currentUser;

function loadNotificationSettings() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
            .then(userDoc => {
                var pushNotifications = userDoc.data().pushNotifications;

                if (pushNotifications != null) {
                    document.getElementById("turnOnNotifications").checked = pushNotifications;
                } else {
                    document.getElementById("turnOnNotifications").checked = false;
                    pushNotifications = document.getElementById("turnOnNotifications").checked;
                }
            })
        }
    });
}
loadNotificationSettings();

function saveNotifications() {
    pushNotifications = document.getElementById("turnOnNotifications").checked;

    currentUser.update({
        pushNotifications: pushNotifications
    }).then(() => {
        if (pushNotifications == true) {
            console.log("Push Notifications turned ON.");
        } else {
            console.log("Push Notfiications turned OFF");
        }
    })
}

// --------------------------------------------------
// DON'T RUN THE POST NOTIFICATIONS BUTTON RIGHT NOW.
// --------------------------------------------------
function postNotifications() {
    let notificationTemplate = document.getElementById("notificationTemplate");
    let notificationGroup = document.getElementById("notification-group");
    let numOfNotifications = 0;

    db.collection("users").doc(user.uid).collection("Notifications")
        .orderBy("daysSinceIncident")
        .get()
        .then(allIncidents => {
            allIncidents.forEach(doc => {
                var routeImpacted = doc.data().route;
                var incidentDescription = doc.data().description;
                var suggestion = doc.data().suggestion;
                let testNotificationCard = notificationTemplate.content.cloneNode(true);

                if (routeImpacted != null) {
                    testNotificationCard.querySelector('.notify-head').innerHTML = routeImpacted;
                } else {
                    testNotificationCard.querySelector('.notify-head').innerHTML = "YOUR ROUTES ARE IMPACTED";
                }

                if (incidentDescription != null) {
                    testNotificationCard.querySelector('.notify-description').innerHTML = incidentDescription;
                } else {
                    testNotificationCard.querySelector('.notify-description').innerHTML = "Empty Description.";
                }

                if (suggestion != null) {
                    testNotificationCard.querySelector('notify-suggestion').innerHTML = suggestion;
                } else {
                    testNotificationCard.querySelector('.notify-suggestion').innerHTML = "No suggestions available.";
                }
            })
        })
    
    // Display Message if No Notifications are Available.
    if (numOfNotifications == 0) {
        document.getElementById("notification-none").innerHTML = "No Notifications Available";
    } else {
        document.getElementById("notification-none").innerHTML = "";
    }
}