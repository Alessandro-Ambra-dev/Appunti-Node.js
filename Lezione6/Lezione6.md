## CRUD ACTIONS

## SETUP

-Vedremo come setuppare una applicaizone bas eusando express e come configurarla al meglio;

- I pacchetti che andremo a scaricare saranno Express, poi l'estensionse per la gestione degli errori con Express e Morgan che è un logger per le middleware nelle HTTP request(di Morgan sceglieremo la funzionalità dev);

- Dopo runniamo il più semplice comando per il nostro server, importiamo express dalla dependency appena installata, dichiariamo due let che sono :
  app => Ovvero l'app express che andremo a creare e che hosterà il server;

port => Che è il portale dove runnerà il nostro server (utilizziamo il valore 3000 che è quello del local host);

-Poi creiamo un listerner ed un getter per il nostro server:

-nel getter andremo a gestire le request/response del server, all'interno creiamo una risposta del nostro server con il metodo send, il metodo get è un metodo di richiesta del modulo HTTP, express utilizza anche il route, quindi nel getter specifichiamo anche la route, in questo caso mettiamo la root route, ovvero quella iniziale;

-Nella repsonse utilizziamo quasi sempre il metodo json, che appunto trasforma i dati in un oggetto json che l'utente riceve quando fa la richiesta al server, inoltre si possono concatenare vari metodi l'uno con l'altro, nell'esempio del server abbiamo unito il metodo status (che controlla lo stato ed il codice del server, abbiamo messo 200 che sta ad indicare una richiesta andata a buon fine), e poi il metodo json, che dà l'oggetto come riposta;

-nel listener invece andiamo a chiarire inanzitutto il nostro port, che abbiamo specificato prima, e poi facciamo il console log dello stato, ovvero diciamo in che port sta runnando il server.

-Per runnare l'app utilizziamo il comando npm run dev;

-Se facciamo una browser request od una curl request otterremo la risposta inserita nel getter;

-possiamo utilizzare l'estensione postman per gestire le richieste inviate ad un server

-Infine importiamo le altre due dependencies per usufruire dei loro servizi, l'estenzione per gestire gli errori nel codice asincrono e morgan, che è un tool che ci dà informazioni specifiche sulle richieste e risposte del server;

-In questo esempio abbiamo dovuto settare morgan, utilizzando il metodo use per poi specificare quale tool stessimo usando e che versione di quest'ultimo volessimo (In questo caso usiamo morgan nella sua versione per sviluppatori);

## MAKING REQUEST: GET

- Vedremo come creare un database fittizio di pianeti per avere di dati su cui lavorare e per vedere come potervi accedere grazue al get route;

- Creiamo inanzitutto un type Planet con un id che accetta un numero ed un nome che accetta una stringa;

-Poi creiamo invece un type Planets che sarà un array contenente i vari Planet;

-Creiamo infine l'array planets che contiene degli oggetti che presentano le key id e name;

-Modifichiamo poi l'app get per simulare una chiamata ad un API, e visto che le chiamate ad un API spesso ritornano dei JSON, quindi la route per simulare sarà la seguente api/planets, in modo tale che l'utente possa prendere il JSON, modificarlo e reinviarlo al server, ed anche perché in questo modo si capisce meglio anche la request fatta al server;

-La prima route sarà quindi quella che ci permette di visualizzare tutti i pianeti all'interno del nostro sistema fittizio,

-Il secondo invece ci permette di andare a focalizzarci su un solo pianeta, quindi dovremmo inserire il planets/:id, con id come valore dinamico che prende il valore della key 'id' presente nel nostro database;

-Ora destrutturiamo la key id utilizzando la request => const {id} = request.params (con params abbiamo accesso ai parametri del nostro container);

-Poi creiamo una const pianeta dove utilizziamo il metodo find per surfare nel nostro array di pianeti, e vogliamo trovare appunto il nostro pianeta, andando a verificare che l'id del pianeta sia lo stesso dell'id che abbiamo destrutturato;

-Visto che l'id è un valore numerico ed il metodo params restituisce una stringa, dobbiamo porre il secondo id come un Number (castiamo perciò il valore da stringa a numero);

-Facendo la request ed inserendo la route che abbiamo specificato nel get avremo per api/planets l'array contenente i pianeti,
mentre per api/planets/1 => Il pianeta con id 1
e così via;

## MAKING REQUEST: POST

- Vedremo come creare un nuovo pianeta nel nostro database fittizio utilizzando il metodo post della request al server.

-Per farlo dobbiamo utilizzare il metodo post della nostra app, dove specifichiamo la route (sempre api/planets) e utilizziamo sempre la callback per gestire la request/response del nostro server, dovremo però in questo cado accettare il Json che ci viene dato dal client;

-Prima fi usare il post method dobbiamo dire al nostro server di accettare i JSON, perciò utilizzeremo il metodo use nel quale specificheremo express.json();

-Dopo aver fatto ciò nella callback request/repsonse andiamo a destrutturare la request.body, chiarendo come ci aspettiamo che essa abbia un id ed un nome;

-Creeremo poi un newPlanet con queste due keys, ed infine stanzieremo un nuovo valore per l'array planets con lo spread operator (che accetta i valori dell'array vecchio) e aggiunge il newPlanet;

-infine specificheremo lo status della response, che è il 201 (utilizzato per quando si crea qualcosa) ed invieremo un messaggio in formato JSON che attesta la buona riuscita dell'azione post;

-Ora ci basterà fare una post request, specificando il formato JSON ed inserendo i valori che il server si aspetta, alla fine quando faremo il log dei dati del server vedremo come l'elemento inserito è stato aggiunto con successo;

## MAKING REQUEST: PUT

- Vedremo come fare l'update di un dato nel nostro database fittizio di pianeti;

-Creiamo il metodo put della nostra app, nel quale inseriamo sempre la route "api/planets/:id" => L'id ci serve per capire quale pianeta aggiornare;

-Dopo aver fatto cio stiliamo la callback per la request/response, nel quale destrutturiamo l'id del nostro pianeta ed il nome, rispettivamente attribuiti ai params ed al body della response;

-Successivamente aggiorniamo l'array planets facendo un map sui suoi elementi, se vediamo che l'id del pianeta corrisponde con l'id da noi cercato allora aggiorniamo il parametro dell'array con i parametri da noi inseriti nella request, altrimenti lasciamo stare quel pianeta;
-Ricordiamoci di castare a Number il secondo id della nostra uguaglianza;

-Ora la richiesta sarà una put, dove specificheremo l'url https://localhost:3000/api/planets/(id numerico del pianeta che vogliamo cambiare);

-Inseriremo un JSON con il nome che vogliamo sostituisca quello del pianeta corrente;

## MAKING REQUEST: DELETE

- Vedremo come eliminare un dato dal database fittizio di pianti che abbiamo costruito;
  -Come con gli altri metodi specifichiamo il metodo .delete, come primo parametro inseriamo l'url del database con l'id, poi destrutturiamo l'id del pianeta da eliminare e lo poniamo uguale a response.params, infine andiamo a fare un filter dell'array di pianeti dove controlliamo che l'id del pianeta da rimuovere sia diverso dall'id che abbiamo destrutturato precedentemente, poi infine inseriamo sempre la risposta in formato JSON con la response.status(200) e concatenando il metodo json che ci darà il JSON di riposta del nostro server;

## CONTROLLERS

- Vediamo come aggiungere dei controllers alla nostra Express Api;

-Essi sono utilizzati molto spesso nell'archittetura base del backend;

-Nel nostro caso sposteremo le callback in cui richiamiamo la request e la response dell'api in un file esterno che chiameremo controller per il database fittizio di pianeti;

-Quindi creiamo un file che chiameremo planets.ts all'interno del folder controllers;

-In questo file inseriremo sia i type da noi creati sia il database fittizio;

-Poi stanziamo una const per ogni callback che andiamo ad utilizzare nel server, i nomi ricordiamoci che devono essere esplicativi e semplici;

-Infine facciamo l'export di queste const che contengono le callback e le importiamo nel file server.ts, inserendole nel secondo termine dei metodi .get, .post, .put, .delete etc.

-Assicurandoci che tutto funzioni per il meglio, i controller sono degli strumenti utilissimi per staccare la logica e la creazione di funzioni dal server e falle funzionare in un luogo sicuro, senza il rischio di doverle compromettere con aggiornamenti sul server futuri;

## VALIDATION

-Vediamo come convalidare l'oggetto planet nel nostro database con l'aiuto di una libreria "Joi";

- Joi utilizza una sintassi ed un metodo specifico per la validazione dei dati nel nostro database;

-Dopo aver installato Joi tramite npm: npm i joi, andremo ad importarlo nel file planets.ts all'interno dei controllers, subito dopo andremo a stanziate una const che specifichiamo essere la validazione dei nostri pianeti;

-In questa const utilizziamo il metodo Joi.object, che crea un oggetto con le coppie chiavi valore che decidiamo noi;

-il nostro id sarà validato da Joi come un numero, intero e obbligatorio (required)
-mentre il name sarà validato come una stringa obbligatoria;

-infine utilizziamo questa nuova validazione ad esempio nel metodo create del nostro server, dove andremo a fare la validazione dell'oggetto che vogliamo inviare al nostro server => se le key value corrispondono allora il processo sarà il solito e l'oggetto nuovo verrà inserito nel JSON che è il nostro database, se invece la validate dà un errore, allora ritorneremo un json di errore (che ha status 400), e che come messaggio ha proprio l'errore che viene compilato dalla validaizone di Joi;
