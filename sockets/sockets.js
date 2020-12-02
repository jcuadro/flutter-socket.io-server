const {io}= require('../index');
const Band =  require('../models/band')
const Bands =  require('../models/bands')

const bands =  new Bands();
bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Heroes'));
bands.addBand( new Band('Metallica'));

//console.log(bands);

// mensajes de sockets

io.on('connection', client => {  
    console.log('Cliente conectado')
    client.emit('active-bands',bands.getBands());
  
    client.on('disconnect', () => {       
      console.log('Cliente desconectado')
   });

   client.on('mensaje',(payload)=>{
       console.log('Mensaje!!!!',payload);
       io.emit('mensaje', { admin: 'Nuevo Mensaje' });

   });
 /*  client.on('emitir-mensaje',(payload)=>{
    //console.log('nuevo-mensaje',payload);
    //io.emit('nuevo-mensaje',payload);// esto emite a todos
    client.broadcast.emit('nuevo-mensaje',payload); //emite a todos menos al que emitio el mensaje
    });
    */

    client.on('vote-band',(payload)=>{

        //console.log(payload)
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });

    client.on('add-band',(payload)=>{
        const newBand = new Band(payload.name);
        //console.log(payload)
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band',(payload)=>{
        //const newBand = new Band(payload.id);
        //console.log(payload)
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });



});
