// Conexión MQTT utilizando WebSocket seguro (wss://)
const client = mqtt.connect('wss://n1781645.ala.us-east-1.emqxsl.com:8084/mqtt', {
    username: 'cochabamba',  // Si necesitas un usuario para autenticarte
    password: 'bolivia',  // Si necesitas una contraseña
    rejectUnauthorized: false   // Evita errores de certificado (solo en entornos de prueba)
});

client.on('connect', function () {
    console.log('Conectado al broker MQTT');
});

client.on('error', function (err) {
    console.error('Error de conexión:', err);
});

client.on('message', function (topic, message) {
    console.log('Mensaje recibido:', topic, message.toString());
});

// Variable para guardar el estado del LED
let ledState = 'off';  // El estado inicial es 'apagado'

// Función para alternar el estado del LED
function toggleLED() {
    // Alterna el estado del LED
    if (ledState === 'off') {
        ledState = 'on';  // Si está apagado, lo enciende
        document.getElementById('ledButton').innerText = 'Apagar LED';  // Cambia el texto del botón
        client.publish('test/led1', 'on', { qos: 2, retain: true }, function (error) {
            if (error) {
                console.error('Error al enviar el mensaje:', error);
            } else {
                console.log('LED encendido');
            }
        });
    } else {
        ledState = 'off';  // Si está encendido, lo apaga
        document.getElementById('ledButton').innerText = 'Encender LED';  // Cambia el texto del botón
        client.publish('test/led1', 'off', { qos: 2, retain: true }, function (error) {
            if (error) {
                console.error('Error al enviar el mensaje:', error);
            } else {
                console.log('LED apagado');
            }
        });
    }
}
