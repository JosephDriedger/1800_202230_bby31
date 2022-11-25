function saveRoute() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentSchedule = db.collection("users").doc(user.uid).collection("events");
            //get the document for current user.
            currentSchedule.get()
                .then(userDoc => {
                    //get the data fields of the user

                    // Name Of the Route
                    var name = document.getElementById('nameInput').value;

                    // Place ID - Passed down as an int by the client side
                    var startPlaceId = document.getElementById('startPlaceIdInput').value;

                    // Place ID - Passed down as an int by the client side
                    var endPlaceId = document.getElementById('endPlaceIdInput').value;

                    // Links with Time
                    var scheduleId = document.getElementById('scheduleIdInput').value;

                    var mode = document.getElementById('modeInput').value;


                    db.collection("users").doc(user.uid).collection("Routes")
                        .add({
                            name: name,
                            startPlaceId: startPlaceId,
                            endPlaceId: endPlaceId,
                            scheduleId: scheduleId,
                            modeId: modeId

                        })
                        .then(() => {
                            console.log("Saved successfully!");
                        })
                })
        }
    })
}