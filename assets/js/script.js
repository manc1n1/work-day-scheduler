// Initialize day.js API - https://day.js.org/en/
// Today's date object
var today = dayjs();

// Wrap all code that interacts with the DOM in a call to jQuery
// to ensure that the code isn't run until the browser
// has finished rendering all the elements in the HTML
$(function () {
    var currDayEl = $("#currentDay");

    // Sets the currentDay class element to the local
    // current day from the dayjs object and formats
    // it in dddd, MMMM D format (Sunday, January 1)
    currDayEl.text(today.format("dddd, MMMM D"));

    // For loop creating each time-block from 9AM to 5PM
    for (let hour = 9; hour < 18; hour++) {
        createTimeBlock(hour);

        // Unique save buttons per time-block that sets the
        // unique local storage item to corresponding text
        // area description user input value
        $("#hour-" + hour)
            .children(".saveBtn")
            .on("click", function () {
                localStorage.setItem(
                    "userInput-" + hour,
                    $(".description-" + hour).val()
                );
            });

        // Gets the unique user input value from local
        // storage and assigns it to the text area text
        $("#hour-" + hour)
            .children(".description-" + hour)
            .text(localStorage.getItem("userInput-" + hour));
    }
});

function createTimeBlock(hour) {
    var containerEl = $(".container-fluid");
    var timeBlockEl = $("<div></div>");
    var timeEl = $("<div></div>");
    var textAreaEl = $("<textarea></textarea>");
    var buttonEl = $("<button></button>");
    var iconEl = $("<i></i>");

    // Today's local current hour in 24-hour format
    var currHour = today.format("H");

    // Sets the Ante Meridiem (AM) and
    // Post Meridiem(PM) of the hour
    if (hour < 12) {
        timeEl.text(hour + "AM");
    } else if (hour > 12) {
        timeEl.text(hour - 12 + "PM");
    } else {
        timeEl.text(hour + "PM");
    }

    // Sets the class to be future, past, or present to allow
    // the div to be the correct color based on local time
    if (currHour < hour) {
        timeBlockEl.addClass("future");
    } else if (currHour > hour) {
        timeBlockEl.addClass("past");
    } else {
        timeBlockEl.addClass("present");
    }

    // Draws a div including the following elements
    // and sets that element's classes/attruibutes
    containerEl.append(timeBlockEl.attr("id", "hour-" + hour));
    timeBlockEl.addClass("row time-block");

    timeBlockEl.append(timeEl);
    timeEl.addClass("col-2 col-md-1 hour text-center py-3");

    timeBlockEl.append(textAreaEl);
    textAreaEl.addClass("col-8 col-md-10");
    textAreaEl.addClass("description-" + hour);
    textAreaEl.attr("rows", "3");

    timeBlockEl.append(buttonEl);
    buttonEl.addClass("btn saveBtn col-2 col-md-1");
    buttonEl.attr("aria-label", "save");

    buttonEl.append(iconEl);
    iconEl.addClass("fas fa-save");
    iconEl.attr("aria-hidden", "true");
}
