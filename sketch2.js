let url = "https://io.adafruit.com/api/v2/";

var serial; // variable to hold an instance of the serialport library
var options = {
    baudRate: 9600
}; // set baudrate to 9600; must match Arduino baudrate
var portName = 'COM4'; // fill in your serial port name here
var myData, visitorData;

function setup() {
    //    createCanvas(windowWidth, windowHeight);
    //establish localhost server 
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.open(portName, options); // open a serial port @ 9600

    myButton = createButton('Notify Me');
    myButton.position(50, 50);
    myButton.mousePressed(notifyMe);
    myButton.mouseReleased(turnOff);
}

function draw() {

}

function notifyMe() {
    signalValue = 1;
    visitorData(signalValue);
    let notifyGot = createDiv('I got your ping, on my way.');

}

function visitorData(dataSent) {
    let postData = {
        "value": dataSent,
        "X-AIO-Key": ""
    };
    httpPost(url, 'json', postData, function (result) {
        return;
    });
}

function turnOff() {
    signalValue = 0;
    stopLED(signalValue);
}

function stopLED(dataSent) {
    let postData = {
        "value": dataSent,
        "X-AIO-Key": ""
    };
    httpPost(url, 'json', postData, function (result) {
        return;
    });
}


function serialEvent() {
    myData = Number(serial.read());

    //for sending data to AIO via Arduino serial
    //    if (myData == 1) {
    //        myResponse(myData);
    //    }

    if (myData == 1) {
        let notifyUser = createDiv('what do you want');

        let userNotification = createInput('');
        userNotification.size(400, 20);

        submitText = createButton('send');
        submitText.mousePressed(notifyWall);

        function notifyWall() {
            createDiv(userNotification.value());
            userNotification.value('');
        }
    }

}

//for sending data to AIO via Arduino serial
//function myResponse(dataSent) {
//    let postData = {
//        "value": dataSent,
//        "X-AIO-Key": ""
//    };
//    httpPost(url, 'json', postData, function (result) {
//        console.log(result);
//    })
//}

function serverConnected() {
    print('connected to server.');
}

function portOpen() {
    print('the serial port opened.')
}

function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

function portClose() {
    print('The serial port closed.');
}

function closingCode() {
    serial.close(portName);
    return null;
}
