document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const formData = new FormData(this);

    fetch('php/process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage('Formulario enviado correctamente.');
            this.reset(); // Limpiar los inputs del formulario
        } else {
            showErrorMessage('Hubo un error al enviar el formulario.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage('Hubo un error en la conexión con el servidor.');
    });
});

function showSuccessMessage(message) {
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'close-button';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(messageCard);
    });

    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.className = 'message-text';

    messageCard.appendChild(closeButton);
    messageCard.appendChild(messageText);

    document.body.appendChild(messageCard);
}

function showErrorMessage(message) {
    alert(message);
}
