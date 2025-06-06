#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

#define SSID "ssid"
#define PASSWORD "password"
#define NAME "esp"

String id = SSID;
String pass = PASSWORD;
String name = NAME;

ESP8266WebServer server(5555);  //esp port in local network

IPAddress local_IP(192, 168, 1, 185);  //set static esp local address
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8);
IPAddress secondaryDNS(8, 8, 4, 4);

byte relayPin = 0;

WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;

void onWifiConnect(const WiFiEventStationModeGotIP& event) {
  Serial.println("Connected to Wi-Fi sucessfully.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void onWifiDisconnect(const WiFiEventStationModeDisconnected& event) {
  Serial.println("Disconnected from Wi-Fi, trying to connect...");
  WiFi.disconnect();
  WiFi.begin(SSID, PASSWORD);
}

void sendData() {
  byte status = digitalRead(relayPin);

  StaticJsonDocument<300> JSONData;

  JSONData["status"] = status;

  JSONData["name"] = name;

  JSONData["type"] = "toggle";

  char data[300];
  serializeJson(JSONData, data);
  server.send(200, "application/json", data);
}

void receiveData() {
  StaticJsonDocument<300> JSONData;

  String receivedString = server.arg("status");

  int receivedInt = receivedString.toInt();

  digitalWrite(relayPin, receivedInt);
  JSONData["status"] = receivedInt;

  char data[300];
  serializeJson(JSONData, data);
  server.send(200, "application/json", data);
}

void setup() {
  Serial.begin(9600);

  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  WiFi.begin(SSID, PASSWORD);
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("STA Failed to configure");
  }
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting");
    delay(1000);
  }
  Serial.println("Connected to");
  Serial.println(WiFi.localIP());
  delay(500);
  server.on("/relay", HTTP_GET, sendData);
  server.on("/set", HTTP_GET, receiveData);
  server.begin();

  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH);
}

void loop() {
  server.handleClient();
}