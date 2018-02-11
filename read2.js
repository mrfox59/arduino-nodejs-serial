// à mettre en variable d'environnement
const portName = '/dev/ttyUSB0';
const baudRate = 9600;

const SerialPort = require("serialport");
const fs = require("fs");

const serialport = new SerialPort(portName, {
   baudRate: baudRate,
   // on coupe les retour de ligne
   parser: SerialPort.parsers.readline("\n")
});

serialport.on('open', function(err) {
    console.log('Serial Port open.');
    serialport.on('data', function(data) {
    // on split la chaine recu
    const arrayOfValues = data.split(':');
    // recuperation de l'id de la sonde
    const sonde = data.split('ID:');
    const sondeId = sonde[1].split(':')[0];
    const filename = sondeId+'.json';
    const date = new Date();
    console.log('la sonde recu est la '+sondeId+'    '+date);
    console.log(data);
    // il faut organiser les data en objet json
    // tronquer les : 
    fs.writeFileSync(filename, data, "UTF-8");
});
if(err) {
    console.log('Error when trying to open:' + err);
}});
