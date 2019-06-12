

  // Connect to Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyD5DFsjaRC24Vq2Lxo7Hvm-Dqmk2ab_ir0",
    authDomain: "train-schedule-6ccd5.firebaseapp.com",
    databaseURL: "https://train-schedule-6ccd5.firebaseio.com",
    projectId: "train-schedule-6ccd5",
    storageBucket: "train-schedule-6ccd5.appspot.com",
    messagingSenderId: "1031916164642",
    appId: "1:1031916164642:web:05e115f33e69defc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.database();
  
  $("#submit").on("click", function(){
      event.preventDefault();
      //When form is clicked the data should be pushed to the firebase database
      
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();
      var frequency = $("#frequency").val().trim();
      console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);

    var newTrain = {
        trainName: trainName,
        destinaton: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
    db.ref().push(newTrain);
  });

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  dataRef.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);
  },

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#trainName").text(snapshot.val().trainName);
    $("#destination").text(snapshot.val().destination);
    $("#firstTrainTime").text(snapshot.val().firstTrainTime);
    $("#frequency").text(snapshot.val().frequency);
  }))
