var currentSchedule;

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentSchedule = db.collection("schedules").doc(user.uid)
            //get the document for current user.
            currentSchedule.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var scheduleDate = userDoc.data().date;
                    var scheduleTime = userDoc.data().time;
                    var scheduleTimeZone = userDoc.data().timezone;
                    var scheduleNotes = userDoc.data().notes;

                    //if the data fields are not empty, then write them in to the form.
                    if (scheduleDate != null) {
                        document.getElementById("dateInput").value = scheduleDate;
                    }
                    if (scheduleTime != null) {
                        document.getElementById("timeInput").value = scheduleTime;
                    }
                    if (scheduleTimeZone != null) {
                        document.getElementById("timezoneInput").value = scheduleTimeZone;
                    }
                    if (scheduleNotes != null) {
                        document.getElementById("noteInput").value = scheduleNotes;
                    }
                    if (userDestination != null) {
                        document.getElementById("address").value = userDestination;
                    }
                    if (userPostCode != null) {
                        document.getElementById("postCode").value = userPostCode;
                    }
                    if (userTripMode != null) {
                        document.getElementById("tripCode").value = userTripCode;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function saveSchedule() {
    scheduleDate = document.getElementById('dateInput').value;
    scheduleTime = document.getElementById('timeInput').value;
    scheduleTimeZone = document.getElementById('timezoneInput').value;
    scheduleNotes = document.getElementById('noteInput').value;
    userDestination = document.getElementById('address').value;
    userPostCode = document.getElementById('postCode').value;
    userTripMode = document.getElementById('tripCode').value;

    currentSchedule.update({
        date: scheduleDate,
        time: scheduleTime,
        timezone: scheduleTimeZone,
        note: scheduleNote,
    })
    .then(() => {
        console.log("Saved successfully!");
    })
}

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
