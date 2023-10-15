## CREATE AN HTTP SERVER

- La documentazione di Node ci à dei metodi e dei tips per creare un server HTTP che poi possiamo far runnare sul browser desiderato;

- http.createServer([options],[Setting]) => Comando che ciu permette di crear eun server http;

-Creiamo un file che chiameremo server.mjs, al
cui interno importeremo questo codice:

import { createServer } from 'node:http';

const server = createServer((request, response)=>{
console.log('request recieved')

response.statusCode = 200;

response.setHeader('Content-Type', 'text-html');

response.end('<html><body><h1>This page was served with Node.js!</h1></body></html>');
});

server.listen(3000,()=>{
console.log('Server is running at http://localhost:3000')
});

-La const server utilizzerà il metodo createServer, che svilupperà una callback con 2 parametri:

-request => Tutto ciò che riceve il nostro server, tutti gli input che arrivano ad esso, compresi i metodi get, post e vari altri metodi per mostrare informazioni quando richieste;

-response => La risposta del server all'oggetto request, in base a come la request viene fatta la response può avere successi, fallire etc.

-response.statusCode => Questo è il codice di risposta che genera il response object quando viene fatta una chiamata, lo status code ha dei valori molto precisi:

ES:

status : 200 => richiesta andata a buon fine;

status: 404 => richiesta fallita perché non è stato trovato ciò che veniva richiesto;

-response.setHeader => Setta un header per la nostra response, il cui nome è il primo valore che viene passato, mentre il secondo valore è il contenuto (in questo caso text/html);

-response.end => Setta il body della nostra response, quindi è la parte finale della nostra risposta, ovvero ciò che viene mostrato all'utente (all'interno dell'end possiamo mettere del codice html; In questo caso abbiamo messo un H1, ovviamente rispettiamo la logica dell'HTML, quindi gli elementi body ed html sempre presenti);

-server.listen => Questo metodo serve a sviluppare il luogo dove il nostro server deve lavorare, quindi inseriamo come primo valore un port (mettiamo quello di default 3000), quindi tutti i dati che arriveranno al port 3000 dovranno essere sottoposti al server e ai processi che abbiamo appena creato;

-il secondo argomento del listen è una callback function, in cui faremo il console.log del processo di run del nostro server e specificheremo su che port stia lavorando (in questo caso il messaggio dirà che il srver sta lavorando sul local host:3000);

-Una volta fatto tutto ciò possiamo aprire il nostro terminale in VSCode e utilizzare node per runnare il nostro server:

node server.mjs => Avremo come risultato il console.log della callback function che abbiamo inserito come secondo argomento del server.listen => In questo modo sappiamo che il server sta runnando ed è pronto ad accettare le request ;

Per stoppare il server basrterà utilizzare il solito comando Ctrl + C => QUesti stopperà il nostro server;

## TEST THE HTTP SERVER

-Vedremo come testare il nostro server in 2 modi:

1. Web Browser;

2. Client a riga di comando;

-Runniamo il server nel terminale e proviamo a fare una richiesta al server con un web browser:

- andiamo sulla barra di ricerca del nostro browser e scriviamo il protocollo che occorre per fare la richiesta:

htpp://localhost:3000/ => Quando premiamo invio avremo come risultato la pagina html che abbiamo creato nel response.end (in questo caso l'h1);

-Altri server invece possono essere gestiti direttamente dalla linea di comando del terminale, tramite il CURL method;

-Splittiamo il terminale e scriviamo questo codice:

-curl http://localhost:3000/ => Avremo come risposta il raw html che abbiamo inserito nella response.end del nostro server;

-Se vogliamo avere più info riguardo il nostro server possiamo runnare il comando:

curl --verbose localhost:3000/ => Avremo molte più informazioni del server (il method usato per la request, l'host, la versione del modulo http che stiamo utilizzando etc.)

## SEND A JSON RESPONSE

- Di norma le API accettano e rispondono con dati in formato JSON;

-Json è un formato di dati (daya format) e possiamo utilizzarlo per rappresentare dati;

Abbiamo le coppie key/values => Le values possono essere di qualsiasi tipi (stringa, numero, boolean, altri oggetti, array);

-Apriamo il terminale ed avviamo il nostro server, dopo averlo avviato, splittiamo il nostro server e andiamo a creare una richiesta con CURL al nostro server;

-Usiamo il comando curl -v localhost:3000

Il flag -v serve per ottenere informazioni dettagliate sulla richiesta che andremo a fare;

-Per ottenere un JSON come riposta dal nostro server quando facciamo una richiesta, dobbiamo crearlo noi direttamente nella const server che abbiamo creato:

const server = createServer((request, response)=>{
console.log('request recieved')

response.statusCode = 200;

response.setHeader('Content-Type', 'application/json');

const jsonResponseBody = JSON.stringify({
location: 'Earth'
});

response.end(jsonResponseBody);
});

-Come si può vedere abbiamo stanziato una const che sarà il JSON che verrà fuori quando viene fatta una richiesta al nostro server; All'interno di questa const utilizziamo il metodo stingify dei JSON, questo perché la risposta non può essere un oggetto ma deve necessariamente essere una stringa; (Come accade solitamente anche quando facciamo una richiesta di dati ad un API esterna);

-Ovviamente dobbiamo inserire nell'end il JSON appena creato, poiché vogliamo che esso sia la risposta del nostro server;

-Inoltre dobbiamo cambiare il valore del nostro Content-type nel response.setHeader, poiché non stiamo più utilizzando un html ma un json;

-Il valore riconosciuto come Contet-Type quando la risposta è in formato JSON è 'application/json';

-Per salvare tali modifiche e metterle in atto bisogna:

a. salvare il file e le modifiche

b. stoppare il server con Ctrl + C

c. Riavviare il server in modo che possa mettere in pratica le modifiche fatte;
