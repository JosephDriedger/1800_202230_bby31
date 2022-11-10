var currentSchedule;

function saveSchedule() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentSchedule = db.collection("user").doc(user.uid).collection("events")
            //get the document for current user.
            currentSchedule.get()
                .then(userDoc => {
                    //get the data fields of the user

                    var scheduleDate = document.getElementById('dateInput').value;
                    var scheduleTime = document.getElementById('timeInput').value;
                    var scheduleTimeZone = document.getElementById('timezoneInput').value;
                    var scheduleNotes = document.getElementById('noteInput').value;
                    var userDestination = document.getElementById('address').value;
                    var userPostCode = document.getElementById('postCode').value;
                    var userTripMode = document.getElementById('tripCode').value;
                    
                    db.collection("users").doc(user.uid).collection("Schedules")
                        .add({
                        date: scheduleDate,
                        time: scheduleTime,
                        timezone: scheduleTimeZone,
                        note: scheduleNotes,
                        destination: userDestination,
                        postcode: userPostCode,
                        tripmode: userTripMode
                })
                .then(() => {
                    console.log("Saved successfully!");
                })   
        })
    }
})
}

//call the function to run it 
saveSchedule();



function accessSchedules() {

}

function addSchedule() {
    var date = document.getElementByClass('date').value;
    var time = document.getElementByClass('time').value;
    var timeZone = document.getElementByClass('timezone').value;
    var notes = document.getElementById('scheduleNotes').value;

    currentSchedule.update({
        date: date,
        time: time,
        timeZone: timeZone,
        notes: notes
    })
    .then(() => {
        console.log("Document successfully updated!");
        document.getElementById('id01').style.display='none';
    })
}
