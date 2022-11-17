firebase.auth().onAuthStateChanged(user => {
  if (user) {
      getBookmarks(user)
  } else {
      console.log("No user is signed in");
  }
});

function getBookmarks(user) {
  db.collection("users").doc(user.uid).get()
      .db.collection("Schedules")
        .then(allRoutes => {
          allHikes.forEach(doc => {
            var hikeName = doc.data().name; //gets the name field
            var hikeID = doc.data().code; //gets the unique ID field
            var hikeLength = doc.data().length; //gets the length field
            let testHikeCard = hikeCardTemplate.content.cloneNode(true);
            testHikeCard.querySelector('.card-title').innerHTML = hikeName;     //equiv getElementByClassName
            testHikeCard.querySelector('.card-length').innerHTML = hikeLength;  //equiv getElementByClassName
            

            testHikeCard.querySelector('.card-length').innerHTML = 
            "Length: " + doc.data().length + " km <br>" +
            "Duration: " + doc.data().length_time + "min <br>" +
            "Last updated: " + doc.data().last_updated.toDate(); 

            testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);//equiv getElementByTagName

            testHikeCard.querySelector('i').id = 'save-' + hikeID;
            testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);


            testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
            testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + hikeID;
            hikeCardGroup.appendChild(testHikeCard);
        })
})};