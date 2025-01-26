function changeColorAndImage(element) {
    // Change the background color to red
    element.classList.toggle('red');

    // Send API command based on the current color
    if (element.classList.contains('red')) {
        sendApiCommand(element, "red");
    } else {
        sendApiCommand(element, "green");
    }
}

function sendApiCommand(element, color) {
    const xhr = new XMLHttpRequest();
    let apiUrl = "";

    if (color === "red") {
        apiUrl = "http://192.168.0.49/core/api/jeeApi.php?apikey=WPsynhMvFe6gLnEkWmqXcM3Jv66g84lm&type=cmd&id=491"; // API endpoint for red
    } else {
        apiUrl = "http://192.168.0.49/core/api/jeeApi.php?apikey=WPsynhMvFe6gLnEkWmqXcM3Jv66g84lm&type=cmd&id=490"; // API endpoint for green
    }

    xhr.open("POST", apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
    xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // Allow methods
    xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow headers

    const data = {
        id: element.classList[1], // Assuming the second class is the identifier (e.g., square1, square2)
        command: "toggle"
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("API command sent successfully");
        }
    };

    xhr.send(JSON.stringify(data));
}