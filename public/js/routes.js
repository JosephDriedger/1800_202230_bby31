firebase.auth().onAuthStateChanged(user => {
  if (user) {
      getRoutes(user)
  } else {
      console.log("No user is signed in");
  }
});

function getRoutes(user) {
  db.collection("users").doc(user.uid)
      .collection("routes").get()
        .then(allRoutes => {
          allRoutes.forEach(doc => {
            // Time of day in UTC+0
            var tripTime = doc.data().time; 
            // Destination Address
            var tripDestAdress = doc.data().destinationaddress;
            // Destination Name
            var tripDestName = doc.data().destinationname;
            // Destination Location lat+long
            var tripDestLocation = doc.data().destinationlocation
            // Departing Point Adress
            var tripOrginAddress = doc.data().orginaddress;
            // Departing Point lat+long
            var tripOrginLocation = doc.data().orginlocation;
            // Mode of trip
            var tripMode = doc.data().tripmode;
            // Array that contains data about each trip method
            var tripData = doc.data().tripdata;
            
            if(!tripTime || !tripDestAdress || !tripDestLocation || !tripOrginAddress || !tripOrginLocation || !tripMode || !tripData) {
              console.log("Important Value missing, skipping value");
            } else {

              console.log(tripTime);
              console.log(tripDestAdress);
              console.log(tripDestName);
              console.log(tripDestLocation);
              console.log(tripOrginAddress);
              console.log(tripOrginLocation);
              console.log(tripMode);
              console.log(tripData);

              let testRouteCard = routeCardTemplate.content.cloneNode(true);
              testRouteCard.querySelector('.card-title').innerHTML = tripDate;     //equiv getElementByClassName
              testRouteCard.querySelector('.card-length').innerHTML = tripDest;  //equiv getElementByClassName
              

              // testHikeCard.querySelector('.card-length').innerHTML = 
              // "Length: " + doc.data().length + " km <br>" +
              // "Duration: " + doc.data().length_time + "min <br>" +
              // "Last updated: " + doc.data().last_updated.toDate(); 

              // testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);//equiv getElementByTagName

              // testHikeCard.querySelector('i').id = 'save-' + hikeID;
              // testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);


              // testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
              // testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + hikeID;
              // hikeCardGroup.appendChild(testHikeCard);
            }
        })
})};

function loadSkeleton(){
  console.log($('#addroute').load('./text/addroute.html'));;
}
loadSkeleton();  //invoke the function

var myModal = new bootstrap.Modal(document.getElementById('exampleModalLong'))

function togglemodal() {
  myModal.toggle()
}

function showmodal() {
  myModal.show()
}

function hidemodal() {
  myModal.hide()
}

function saveRoute() {
  db.collection("users").doc(user.uid).collection("routes")
}