export const env = {};

fetch('/.env')
    .then(response => response.text())
    .then(text => {
        text.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                env[key.trim()] = value.trim();
            }
        });
    });