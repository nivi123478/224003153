function addUrlField() {
    var container = document.getElementById('urlContainer');
    var inputField = document.createElement('div');
    inputField.classList.add('input-field');
    inputField.innerHTML = `
        <label for="url">URL:</label>
        <input type="text" name="url" required>
    `;
    container.appendChild(inputField);
}

document.getElementById('numberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = event.target;
    var urls = form.querySelectorAll('input[name="url"]');
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    var numbers = [];

    for (var i = 0; i < urls.length; i++) {
        var url = urls[i].value.trim();
        if (url !== '') {
            fetch(url)
                .then(function(response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not OK');
                    }
                })
                .then(function(data) {
                    if ('numbers' in data) {
                        numbers = numbers.concat(data.numbers);
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        }
    }
    setTimeout(function() {
        var result = document.createElement('p');
        result.textContent = 'Numbers: ' + numbers.join(', ');
        resultDiv.appendChild(result);
    }, 1000);
});
