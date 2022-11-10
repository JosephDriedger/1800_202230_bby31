var currentUser;

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