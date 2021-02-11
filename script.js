const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDom() {
    countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now; /*Början på tideräkningen fram till nutid */
    console.log('distance', distance);

    const days = Math.floor(distance / day); /*Math.floor returns the largest hole nr */
    const hours = Math.floor((distance % day) / hour); /* Reminder returns what ever is leftover after previous calc*/
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`; /* Use template strings to convert variabels to strings */
    timeElements[0].textContent = `${days}`; /*These are the 4 spans (indexHtml) */
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    // Show CountDown
    countdownEl.hidden = false;
    }, second); //changes every second
}

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.'); /*Normally one would build this into the UI instead*/       
    } else {
        // Get number of current date, update Dom
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value:', countdownValue);
    updateDom();
    }
}

// Reset All Values
function reset() {
    // Hide Countdowns, show Input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    // Stp the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = '';
    countdownDate = '';
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown); //Observe targetting the "form" itself (IndexHtml)
countdownBtn.addEventListener('click', reset);
