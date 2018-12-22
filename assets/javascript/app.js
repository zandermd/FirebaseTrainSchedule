// Steps to complete:

// 1. initialize Firebase
// 2. create button for adding new trains - then update the html + update the database
// 3. grab user input
// 4. console test
// 5. clear text boxes
// 6. upload data to firebase & HTML
// 7. store objects as varibles 
// 8. console test 
// 9. add math 

/*When adding trains, administrators should be able to submit the following:
Train Name
Destination 
First Train Time -- in military time
Frequency -- in minutes
Code this app to calculate when the next train will arrive; this should be relative to the current time.
Users from many different machines must be able to view same train times.*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDuQJhHI4Bkfmbw-DNQxHMQBGOl6_v-9-A",
    authDomain: "train-schedule-d4847.firebaseapp.com",
    databaseURL: "https://train-schedule-d4847.firebaseio.com",
    projectId: "train-schedule-d4847",
    storageBucket: "",
    messagingSenderId: "730750266595"
};
firebase.initializeApp(config);
var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
});

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDest = $("#destination-input").val().trim();
var trainStart = moment($('#start-input').val().trim()).format("HH:mm");
var trainFreq = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding data
var newTrain = {
    name: trainName,
    destination: trainDest,
    fristTrainTime: trainStart,
    frequency: trainFreq,
};

//upload to database
database.ref().push(newTrain);

// console test
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.fristTrainTime);
console.log(newTrain.frequency);

alert("Train successfully added");

// clears text-boxes
$("#trian-name-input").val("");
$("#destination-input").val("");
$("#start-input").val("");
$("#frequency-input").val("");

//firebase event for adding trains to the database and to the HTML when entry is made
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //store into varibles 
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().fristTrainTime;
    var trainFreq = childSnapshot.val().frequency;

    // console test
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);

    var trainStartPretty = moment.unix(trainStart).format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainStartPretty),
        $("<td>").text(trainStart),
        $("<td>").text(trainfreq),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

