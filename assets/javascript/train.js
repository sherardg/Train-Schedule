  // Connect to Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyBqFvkgB2VhYayQmrSk9Tp04Rra9Cu_z2w",
    authDomain: "train-schedule-homework-1f531.firebaseapp.com",
    databaseURL: "https://train-schedule-homework-1f531.firebaseio.com",
    projectId: "train-schedule-homework-1f531",
    storageBucket: "",
    messagingSenderId: "1020585078766",
    appId: "1:1020585078766:web:f54f7f19d4a0d0a1"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.database();

  // Send data to firebase when submit button is clicked.
  //When form is clicked the data should be pushed to the firebase database
  
  $("#submit").on("click", function(){
      event.preventDefault(); 
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainTime = moment($("#firstTrainTime").val().trim(),"HH:mm").subtract(1,"years").format("x");
      var frequency = $("#frequency").val().trim();
      
      var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
    db.ref().push(newTrain);

    alert("Your Train is Added!");

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
    console.log(firstTrainTime);
    return false
   
  });

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  db.ref().on("child_added",function(snapshot) {

    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrainTime = snapshot.val().firstTrainTime;

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment.unix(firstTrainTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // var remainder = moment().diff(moment.unix(firstTrainTime),"minutes")%frequency;
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutes = frequency - tRemainder;

    // Next Train
    var arrival = moment().add(minutes,"m").format("hh:mm A");
    
    var nextTrain = moment().add(minutes, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     console.log("Time Remaining:" + tRemainder);
     console.log("Minutes:" + minutes);
     console.log("Arrival:" + arrival);
     console.log("Next Train:" + nextTrain);

     //Push added train data into the Train Schedule Table
     $("#trainSchedule > tbody").append("<tr><td>"+trainName+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

    });

   

