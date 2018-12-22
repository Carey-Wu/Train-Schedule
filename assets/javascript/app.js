
var database = firebase.database();

$("#sub-button").on("click", function (event) {
  event.preventDefault();

  var nameInput = $("#name").val().trim();
  var destinationData = $("#destination").val().trim();
  var startTime = $("#start-time").val().trim()  
  var frequencyData = $("#frequency").val().trim();

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

  database.ref().on("child_added", function (childSnapshot) {
    var nameData = childSnapshot.val().name;
    var destinationData = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainStartTime = childSnapshot.val().firstTrain;

    var convertedTime = moment(trainStartTime, "HH:mm");

    var currentTime = moment();
    console.log(currentTime);

    var timeDifference = moment().diff(moment(convertedTime), "minutes");

    var timeRemainder = timeDifference % trainFrequency;

    var timeUntilArrival = trainFrequency - timeRemainder;

    var nextTrainArrival = moment().add(timeUntilArrival, "minutes");

    var pendingArrival = moment(nextTrainArrival).format("LT");

    var minutesUntilArrival = timeUntilArrival

    var newRow = $("<tr>").append(
      $("<td>").text(nameData),
      $("<td>").text(destinationData),
      $("<td>").text(trainFrequency),
      $("<td>").text(pendingArrival),
      $("<td>").text(minutesUntilArrival)
    )

    $("#table-body").append(newRow);


  })
