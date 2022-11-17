firebase.auth().onAuthStateChanged(user => {
  if (user) {
      getBookmarks(user)
  } else {
      console.log("No user is signed in");
  }
});

function getBookmarks(user) {
  db.collection("users").doc(user.uid)
      .collection("Schedules").get()
        .then(allRoutes => {
          allRoutes.forEach(doc => {
            var tripDate = doc.data().date; //gets the name field
            var tripDest = doc.data().destination; //gets the unique ID field
            var tripNote = doc.data().note; //gets the length field
            var tripPostCode = doc.data().postcode; //gets the length fiel
            var tripTime = doc.data().time; //gets the length fieldd
            var tripTimeZone = doc.data().timezone; //gets the length field
            var tripMode = doc.data().tripmode;
            
            if(!tripDate || !tripDest || !tripPostCode || !tripTime || !tripTimeZone || !tripMode) {
              console.log("Important Value missing, skipping value");
            } else {

              console.log(tripDate);
              console.log(tripDest);
              console.log(tripNote);
              console.log(tripPostCode);
              console.log(tripTime);
              console.log(tripTimeZone);
              console.log(tripMode);

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