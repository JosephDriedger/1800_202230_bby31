var currentUser;

<<<<<<< HEAD
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userDate = userDoc.data().date;
                    var userTime = userDoc.data().time;
                    var userTimeZone = userDoc.data().timezone;
                    var userNote = userDoc.data().note;

                    //if the data fields are not empty, then write them in to the form.
                    if (userDate != null) {
                        document.getElementById("dateInput").value = userDate;
                    }
                    if (userTime != null) {
                        document.getElementById("timeInput").value = userTime;
                    }
                    if (userTimeZone != null) {
                        document.getElementById("timezoneInput").value = userTimeZone;
                    }
                    if (userNote != null) {
                        document.getElementById("noteInput").value = userNote;
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

function saveUserInfo() {
    userDate = document.getElementById('dateInput').value;
    userTime = document.getElementById('timeInput').value;
    userTimeZone = document.getElementById('timezoneInput').value;

    currentUser.update({
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

    currentUser.update({
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

    currentUser.update({
       Destination: userDestination,
       PostCode: userPostCode,
       TripMode: userTripMode
    })
    .then(() => {
        console.log("Saved successfully!");
    })
}
=======
function accessSchedules() {

}

function addSchedule() {
    var date = document.getElementByClass('date').value;
    var time = document.getElementByClass('time').value;
    var timeZone = document.getElementByClass('timezone').value;
    var notes = document.getElementById('scheduleNotes').value;

    currentUser.update({
        date: date,
        phoneNum: time,
        city: userCity,
        province: userProvince,
        country: userCountry,
        transport: userTransport
    })
    .then(() => {
        console.log("Document successfully updated!");
        document.getElementById('id01').style.display='none';
    })
}
>>>>>>> 3b3f7bc8e0ff8a369fb0822288352fc8b331c4a6
