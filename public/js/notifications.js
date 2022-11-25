var currentUser;

// Number of Notifications
var numOfNotifications = 0;

// Display Message if No Notifications are Available.
function displayNoneNotification() {
    if (numOfNotifications === 0) {
        document.getElementById("notification-none").hidden = false;
    } else {
        document.getElementById("notification-none").hidden = true;
    }
}
displayNoneNotification();

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

    firebase.auth().onAuthStateChanged(user => {
        db.collection("users").doc(user.uid).collection("Notifications")
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
                    testNotificationCard.querySelector('.notify-suggestion').innerHTML = suggestion;
                } else {
                    testNotificationCard.querySelector('.notify-suggestion').innerHTML = "No suggestions available.";
                }

                notificationGroup.appendChild(testNotificationCard);

                numOfNotifications++;
            })
            document.getElementById("notify-num").innerHTML = numOfNotifications;
            displayNoneNotification();
        })
    })
}

postNotifications();

// Test Purposes
function createNotification() {
    firebase.auth().onAuthStateChanged(user => {
        let notification = db.collection("users").doc(user.uid).collection("Notifications");
        notification.add({
            route: "Route 1",
            description: "Accident on Highway 1",
            suggestion: "Leave 1 hour earlier"
        }).then(function() {
            console.log("Notification Added")
        }) 
        loadNotificationSettings();
    })
    
}