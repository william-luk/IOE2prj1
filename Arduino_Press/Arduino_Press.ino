const int ledPin = 7;
int sendData = 0;

void setup(){
  Serial.begin(9600);
  pinMode(10, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(10);
    if (digitalRead(10) == HIGH) {
      digitalWrite(ledPin, LOW);
      sendData = 0;
    }else {
      digitalWrite(ledPin, HIGH);
      sendData = 1;
    }
    //delay(1000);
//    Serial.write(buttonState);
    Serial.write(sendData);
//    Serial.print("\n");
    delay(2000);
}
