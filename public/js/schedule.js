var currentSchedule;

/**
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        read_display_Quote();
        insertName();
        populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});
*/

function saveSchedule() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentSchedule = db.collection("users").doc(user.uid).collection("events");
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
            document.getElementById('id_add').style.display = 'none';
        })
}

var firebaseConfig = {
    apiKey: "AIzaSyDQiBwI8IU3gFUnv4ML80V04LqtJL3q268",
    authDomain: "bby31-7f183.firebaseapp.com",
    projectId: "bby31-7f183",
    storageBucket: "bby31-7f183.appspot.com",
    messagingSenderId: "499251907282",
    appId: "1:499251907282:web:f4e5de098b196c3af1fb0b",
    measurementId: "G-W1JBD9K2GT"
};



function viewSchedule() {
    var commuteSchedule = document.getElementById("viewScheduleform");
    var commuteGroup = document.getElementById("viewScheduleGroup");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("Schedules")
                .get()
                .then(allviews => {
                    allviews.forEach(doc => {
                        var date = doc.data().date;
                        var time = doc.data().time;
                        var timezone = doc.data().timezone;
                        var note = doc.data().note;
                        var address = doc.data().address;
                        var tripCode = doc.data().tripmode;
                        var postCode = doc.data().postCode

                        var checkSchedule = commuteSchedule.content.cloneNode(true);
                        //checkSchedule.querySelector('.date').innerHTML = date;
                        checkSchedule.getElementById("date").innerHTML = date;
                        checkSchedule.querySelector('.time').innerHTML = time;
                        checkSchedule.querySelector('.timezone').innerHTML = timezone;
                        checkSchedule.querySelector('.note').innerHTML = note;
                        checkSchedule.querySelector('.address').innerHTML = address;
                        checkSchedule.querySelector('.postCode').innerHTML = postCode;
                        checkSchedule.querySelector('.tripCode').innerHTML = tripCode;

                        commuteGroup.appendChild(checkSchedule);
                        console.log('you get it');
                    })
                });
        };
    })
}
viewSchedule();