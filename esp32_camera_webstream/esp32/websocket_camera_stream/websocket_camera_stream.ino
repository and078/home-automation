#include "esp_camera.h"
#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include "esp_timer.h"
#include "img_converters.h"
#include "fb_gfx.h"
#include "soc/soc.h"           //disable brownout problems
#include "soc/rtc_cntl_reg.h"  //disable brownout problems
#include "driver/gpio.h"
#include <ESP32Servo.h>

// configuration for AI Thinker Camera board
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27
#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

const char* ssid = "ssid";    // CHANGE HERE
const char* password = "password";  // CHANGE HERE

IPAddress local_IP(192, 168, 100, 210);  // Set your desired IP
IPAddress gateway(192, 168, 100, 1);     // Set your network gateway
IPAddress subnet(255, 255, 255, 0);    // Set your subnet mask
IPAddress primaryDNS(8, 8, 8, 8);      // Optional: Primary DNS
IPAddress secondaryDNS(8, 8, 4, 4);    // Optional: Secondary DNS

const char* websockets_server_host = "192.168.100.224";  //CHANGE HERE
const uint16_t websockets_server_port = 6000;          // OPTIONAL CHANGE

camera_fb_t* fb = NULL;
size_t _jpg_buf_len = 0;
uint8_t* _jpg_buf = NULL;
uint8_t state = 0;


uint8_t flash = 4;

static const int servoPin = 14;
const int DEGREES_PER_PRESS = 10;
byte servoAngle = 90;  // EEPROM.read(0);

Servo servo;

using namespace websockets;
WebsocketsClient client;

void WiFiStationConnected(WiFiEvent_t event, WiFiEventInfo_t info) {
  Serial.println("Connected to AP successfully!");
}

void WiFiGotIP(WiFiEvent_t event, WiFiEventInfo_t info) {
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void WiFiStationDisconnected(WiFiEvent_t event, WiFiEventInfo_t info) {
  Serial.println("Disconnected from WiFi access point");
  Serial.print("WiFi lost connection. Reason: ");
  Serial.println(info.wifi_sta_disconnected.reason);
  Serial.println("Trying to Reconnect");
  WiFi.begin(ssid, password);
}

void onMessageCallback(WebsocketsMessage message) {
  String msg = message.data();
  Serial.print("Got Message: ");
  Serial.println(msg);

  if (msg == "restart") {
    ESP.restart();
  }

  if (msg == "flashON") {
    digitalWrite(flash, HIGH);
  }

  if (msg == "flashOFF") {
    digitalWrite(flash, LOW);
  }

  if (msg == "moveRight") {
    moveRight();
  }

  if (msg == "moveLeft") {
    moveLeft();
  }
}

void moveRight() {
  if (servo.attached() == false) {
    servo.attach(servoPin);
  }
  if (servoAngle > 0) {
    servoAngle -= DEGREES_PER_PRESS;
    servo.write(servoAngle);
  }
}

void moveLeft() {
  if (servo.attached() == false) {
    servo.attach(servoPin);
  }
  if (servoAngle < 180) {
    servoAngle += DEGREES_PER_PRESS;
    servo.write(servoAngle);
  }
}

esp_err_t init_camera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  // parameters for image quality and size
  config.frame_size = FRAMESIZE_VGA;  // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
  config.jpeg_quality = 10;           //10-63 lower number means higher quality
  config.fb_count = 2;

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("camera init FAIL: 0x%x", err);
    return err;
  }
  sensor_t* s = esp_camera_sensor_get();
  s->set_framesize(s, FRAMESIZE_VGA);
  s->set_vflip(s, 1);
  s->set_hmirror(s, 1);
  // s->set_saturation(s, 2);
  // s->set_contrast(s, 2);
  Serial.println("camera init OK");
  return ESP_OK;
};

esp_err_t init_wifi() {
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("Failed to configure Static IP!");
    return ESP_FAIL;
  }

  WiFi.begin(ssid, password);
  Serial.println("Wifi init ");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi OK");
  Serial.println("connecting to WS: ");
  client.onMessage(onMessageCallback);
  bool connected = client.connect(websockets_server_host, websockets_server_port, "/");
  if (!connected) {
    Serial.println("WS connect failed!");
    Serial.println(WiFi.localIP());
    state = 3;
    return ESP_FAIL;
  }
  if (state == 3) {
    return ESP_FAIL;
  }

  Serial.println("WS OK");
  client.send("hello from ESP32 camera stream!");
  return ESP_OK;
};

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);

  pinMode(flash, OUTPUT);
  pinMode(servoPin, OUTPUT);

  Serial.begin(115200);
  Serial.setDebugOutput(true);

  WiFi.disconnect(true);

  delay(1000);

  WiFi.onEvent(WiFiStationConnected, WiFiEvent_t::ARDUINO_EVENT_WIFI_STA_CONNECTED);
  WiFi.onEvent(WiFiGotIP, WiFiEvent_t::ARDUINO_EVENT_WIFI_STA_GOT_IP);
  WiFi.onEvent(WiFiStationDisconnected, WiFiEvent_t::ARDUINO_EVENT_WIFI_STA_DISCONNECTED);

  init_camera();
  init_wifi();

  if (servo.attached()) {
    servo.detach();
  }
}

void loop() {
  if (client.available()) {
    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("img capture failed");
      esp_camera_fb_return(fb);
      ESP.restart();
    }
    client.sendBinary((const char*)fb->buf, fb->len);
    // Serial.println(fb->len);
    esp_camera_fb_return(fb);
    client.poll();
  } else {
    ESP.restart();
  }
}