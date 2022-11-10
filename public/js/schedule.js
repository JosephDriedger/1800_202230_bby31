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
                    var scheduleNotes = userDoc.data().note;

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
                        document.getElecmentById("tripCode").value = userTripCode;
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

function saveTimeInfo() {
    userDate = document.getElementById('dateInput').value;
    userTime = document.getElementById('timeInput').value;
    userTimeZone = document.getElementById('timezoneInput').value;

    currentSchedule.update({
        date: userDate,
        time: userTime,
        timezone: userTimeZone,
    })
    .then(() => {
        console.log("Saved successfully!");
    })
}

function saveUserNote() {
    userNote = document.getElementById('noteInput').value;

    currentSchedule.update({
        note: userNote
    })
    .then(() => {
        console.log("Saved successfully!");
    })
}

function saveUserRoute() {
    userDestination = document.getElementById('address').value;
    userPostCode = document.getElementById('postCode').value;
    userTripMode = document.getElementById('tripCode').value;

    currentSchedule.update({
       Destination: userDestination,
       PostCode: userPostCode,
       TripMode: userTripMode
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
