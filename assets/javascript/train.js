

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
  };
    db.ref().push(newTrain);
  });

