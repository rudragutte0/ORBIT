const joystick = document.getElementById("joystick");
const stick = document.getElementById("joystick-stick");

const throttleDisplay = document.getElementById("throttle");
const steeringDisplay = document.getElementById("steering");

let joystickActive = false;

let throttle = 0;
let steering = 0;


// Maximum distance the joystick can move
const maxDistance = 90;


// When the user touches/clicks the joystick
joystick.addEventListener("pointerdown", function(event) {

    joystickActive = true;

    joystick.setPointerCapture(event.pointerId);

    updateJoystick(event);
});


// While moving the joystick
joystick.addEventListener("pointermove", function(event) {

    if (!joystickActive) return;

    updateJoystick(event);
});


// Release joystick
joystick.addEventListener("pointerup", function() {

    joystickActive = false;

    resetJoystick();
});


// If the browser cancels the touch
joystick.addEventListener("pointercancel", function() {

    joystickActive = false;

    resetJoystick();
});


// Calculate joystick position
function updateJoystick(event) {

    const rect = joystick.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let x = event.clientX - centerX;
    let y = event.clientY - centerY;


    // Calculate distance from center
    const distance = Math.sqrt(x * x + y * y);


    // Prevent joystick from leaving its boundary
    if (distance > maxDistance) {

        x = (x / distance) * maxDistance;
        y = (y / distance) * maxDistance;

    }


    // Move visual joystick
    stick.style.transform =
        `translate(${x}px, ${y}px)`;


    /*
        Convert joystick position to values from -100 to +100.

        Up    = +100 throttle
        Down  = -100 throttle

        Right = +100 steering
        Left  = -100 steering
    */

    steering = Math.round((x / maxDistance) * 100);

    throttle = Math.round((-y / maxDistance) * 100);


    // Update screen
    throttleDisplay.textContent = throttle + "%";

    steeringDisplay.textContent = steering + "%";


    // For now, just show the values in the console
    console.log({
        throttle: throttle,
        steering: steering
    });
}


// Return joystick to center
function resetJoystick() {

    stick.style.transform = "translate(0px, 0px)";

    throttle = 0;
    steering = 0;

    throttleDisplay.textContent = "0%";
    steeringDisplay.textContent = "0%";


    console.log({
        throttle: 0,
        steering: 0
    });
}


// Emergency stop
const stopButton = document.getElementById("stop-button");

stopButton.addEventListener("click", function() {

    resetJoystick();

    console.log("EMERGENCY STOP");
});





// ARM POSITION CONTROLS

const armX = document.getElementById("arm-x");
const armY = document.getElementById("arm-y");
const armZ = document.getElementById("arm-z");

const armXValue = document.getElementById("arm-x-value");
const armYValue = document.getElementById("arm-y-value");
const armZValue = document.getElementById("arm-z-value");


armX.addEventListener("input", function() {
    armXValue.textContent = armX.value;
});

armY.addEventListener("input", function() {
    armYValue.textContent = armY.value;
});

armZ.addEventListener("input", function() {
    armZValue.textContent = armZ.value;
});
