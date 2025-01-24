function changeColorAndImage(element) {
    // Change the background color to red
    element.classList.toggle('red');

    // Change the image source
    const img = element.querySelector('.image');
    if (img.src.includes('Soleil.jpeg')) {
        img.src = 'assets/Lune.jpeg';
    } else {
        img.src = 'assets/Soleil.jpeg';
    }

    // Send API command
    sendApiCommand(element);
}

function sendApiCommand(element) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://example.com/api/command", true); // Replace with your API endpoint
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

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