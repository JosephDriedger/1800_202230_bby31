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
            document.getElementById('id_add').style.display = 'none';
        })
}



function viewSchedule() {
    let commuteSchedule = document.getElementById("viewScheduleform");
    let commuteGroup = document.getElementById("viewScheduleGroup");

  

    db.collection("users").doc(user.uid).collection("Schedules")
        .limit(10)
        .get()
        .then(allviews => {
            Views = allviews.docs
            console.log(Views);
            Views.forEach(doc => {
                var date = doc.data().date; 
                var time = doc.data().time; 
                var timezone = doc.data().timezone;
                var note = doc.data().note; 
                var address = doc.data().address;
                var tripCode = doc.data().tripmode;
                var postCode = doc.data().postCode

                let checkSchedule = commuteSchedule.content.cloneNode(true);
                checkSchedule.querySelector('date').innerHTML = date;
                checkSchedule.querySelector('time').innerHTML = time;
                checkSchedule.querySelector('timezone').innerHTML = timezone;
                checkSchedule.querySelector('note').innerHTML = note;
                checkSchedule.querySelector('address').innerHTML = address;
                checkSchedule.querySelector('postCode').innerHTML = postCode;
                checkSchedule.querySelector('tripCode').innerHTML = tripCode;

                commuteGroup.appendChildcheckSchedule});
        }) 

 }

viewSchedule();