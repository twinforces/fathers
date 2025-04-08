console.log("app.js loaded");

document.addEventListener("deviceready", onDeviceReady, false);
console.log("deviceready listener added");

function onDeviceReady() {
  console.log("Device ready fired");
  if (!cordova.file) {
    console.error("cordova.file not available");
    return;
  }
  try {
    console.log("Checking if webserver is already running...");
    fetch("http://localhost:8080/cordova.html")
      .then(response => {
        console.log("Server already running, redirecting...");
        window.location.href = "http://localhost:8080/cordova.html";
      })
      .catch(err => {
        console.log("Server not running, starting now...");
        var options = {
          "port": 8080,
          "root": cordova.file.applicationDirectory + "www"
        };
        webserver.start(options,
          function () {
            console.log("Web server started successfully at http://localhost:8080");
            console.log("Redirecting to localhost...");
            window.location.href = "http://localhost:8080/cordova.html";
          },
          function (error) {
            console.error("Failed to start web server: " + error);
          }
        );
      });
  } catch (e) {
    console.error("Exception in webserver setup: " + e);
  }
}

function goBack() {
  console.log("Back clicked");
  document.getElementById("content").contentWindow.history.back();
}

function goForward() {
  console.log("Forward clicked");
  document.getElementById("content").contentWindow.history.forward();
}
