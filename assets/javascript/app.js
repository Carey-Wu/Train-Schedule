// variable to link back to firebase database
var database = firebase.database();

// on-click function to take input data and log it in the database and clear out the input fields after
$("#sub-button").on("click", function (event) {
  event.preventDefault();

  var nameInput = $("#name").val().trim();
  console.log(nameInput);
  var destinationData = $("#destination").val().trim();
  console.log(destinationData);
  var startTime = $("#start-time").val().trim()
  console.log(startTime);
  var frequencyData = $("#frequency").val().trim();
  console.log(frequencyData);

  database.ref().push({
    name: nameInput,
    destination: destinationData,
    firstTrain: startTime,
    frequency: frequencyData,

  })

  $("#name").val("")
  $("#destination").val("")
  $("#start-time").val("")
  $("#frequency").val("")

})

  // function to add child elements based on firebase data
  database.ref().on("child_added", function (childSnapshot) {

    //assigns a name from the database
    var nameData = childSnapshot.val().name;
    console.log(nameData);

    //assigns destination from database
    var destinationData = childSnapshot.val().destination;
    console.log(destinationData);

    //assigns train frequency from database
    var trainFrequency = childSnapshot.val().frequency;
    console.log(trainFrequency);

    //assigns the train's initial start time
    var trainStartTime = childSnapshot.val().firstTrain;
    console.log(trainStartTime);

    //converts the start time into a format used by moment.js
    var convertedTime = moment(trainStartTime, "HH:mm");
    console.log(convertedTime);

    //variable for the current time using moment.js
    var currentTime = moment();
    console.log(currentTime);

    //variable to calculate the difference in time between current time and start time
    var timeDifference = moment().diff(moment(convertedTime), "minutes");
    console.log(timeDifference);

    //variable to account for remaining time based on frequency and difference from the current time
    var timeRemainder = timeDifference % trainFrequency;
    console.log(timeRemainder);

    //variable to calculate minutes until train arrives
    var timeUntilArrival = trainFrequency - timeRemainder;
    console.log(timeUntilArrival);

    //variable to calculate time until next train
    var nextTrainArrival = moment().add(timeUntilArrival, "minutes");
    console.log(nextTrainArrival);

    //variable to display time of next train in proper format using moment.js documentation
    var pendingArrival = moment(nextTrainArrival).format("LT");
    console.log(pendingArrival);

    // variable to call to append for minutes until arrival
    var minutesUntilArrival = timeUntilArrival
    console.log(minutesUntilArrival);

    //variable to append data to the table
    var newRow = $("<tr>").append(
      $("<td>").text(nameData),
      $("<td>").text(destinationData),
      $("<td>").text(trainFrequency),
      $("<td>").text(pendingArrival),
      $("<td>").text(minutesUntilArrival)
    )
      console.log(newRow);

    //appending new row to table with all the data from database for the object
    $("#table-body").append(newRow);


  })
