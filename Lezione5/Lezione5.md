## ASYNCRONOUS WORK-FLOW

## CALLBACKS

- Vedremo come utilizzare le callback per il codice asincrono ed i modelli comuni per le callbacks in Node.js;

-Un esempio di codice asincrono è il setTimeout, funzione che prende due parametri (una callback function ed un lasso di delay espresso in millisecondi); => Questo metodo rende il codice asincrono visto che ritarda la compilazione del codice inserito al suo intenro per il lasso di tempo deciso nel secondo parametro;

-Usiamo il fle system module per capire come gestire le callbacks con Node.js:

1. Importiamo tutto (\*) e lo utilizziamo come 'fs' prendendolo da node:fs;

2. Utilizziamo il metodo fs.readFile che è un API basata sulle funzioni di callback che come primo argomento prende il nome del file e come secondo argomento una callback function, nella quale avremo come argomenti degli errori e dei dati; => Il metodo readFile cercherà di leggere immediatamente il contenuto del file inserito come primo argomento, senza però rompere il flusso del codice, perciò se c'è altro codice prima o dopo questo verrà runnato ed il codice che viene analizzato dal metodo readFile verrà spostato in background dal sistema di codice e quando il file è stato letto ed il contenuto ne è stato estrapolato utilizzerà una callback per richiamare quel codice;

-Quello che otteniamo dal console.log dei dati è un buffer ovvero una rappresentazione in basso livello del file che vogliamo stampare, per renderlo una stringa dobbiamo inserire un option object come argomento nel metodo fs.readFile, ed utilizziamo la proprietà encoding con il formato utf-8;
{encoding: 'utf-8'}

- Un'altra convenzione è che nelle callbacks il primo argomento deve essere sempre un errore, in questo caso facciamo un controllo con un if statement per verificare se l'errore esiste, se esiste lo inseriamo in display con console.error, inseriamo inoltre il return in modo tale che se non ci sono errori il codice si interrompa e non venga eseguito; Inoltre questo permetterà al codice successivo di runnare, nel caso in cui l'errore non esista;

-Possiamo nestare le callbacks tra loro, ricordiamoci di adeguare i parametri delle funzioni di callback in modo tale che il nostro workspace sia pulito;

## PROMISES

-Sono un altro modo per scrivere codice asincrono in JS, possiamo vederla come una proxy per un valore che non è disponibile.

-La promise accetta una callback function come parametro, la quale possied come argomenti resolve e reject:

Resolve: una callback che ritorna il valore della promise dopo che c'è stata una computazione di dati(es http request, lettura di file etc.)

Reject: Se qualcosa va storto nellla computazione dei dati, scattera la callback reject;

3 Stati delle promises:

-Pending state => Quando la promise è stata creata, fino a quando non succede qualcosa

-Fulfilled => Quando la promise va a buon fine e si attiva la resolve callback

-D
Rejected => Task fallita e si attiva il reject argument;

-Le promise utilizzano i .then metod per collegare i gestori in modo che quando lo stato cambia possiamo venire avvisati sullo stato di questa promise e fare qualcosa;

-Possiamo ad esempio utilizzare il metodo someTask.then che accetta due stadi della nostra promise, il primo è un onfulfilled handler, ovvero quando la promise viene soddisfatta, e possiamo fare delle azioni in questo stato, come ad esempio loggare la promise o il valore;

Il secondo metodo è quello onreject, che ovviamente si attiva quando la richiesta alla promise non viene soddisfatta ed il task non viene eseguito;
Il parametro di questa funzione è una reason, ovvero molto spesso un error object, e si attiva quando ovviamente c'è qualcosa che non permette alla promise di andare a buon fine;

-Ora mettiamo per caso che la nostra promise invece incorra in un problema, andremo a creare una reject che ha come argomento un Error object che come output ha una stringa;
Vedremo nel .then che abbiamo messo prima che a triggerarsi sarà la seconda funzione, quella che presenta la reason (dove verrà mostrato l'errore che abbiamo inserito nella reject);

- Ora vediamo come poter utilizzare queste promises con Node.js, utilizzando le promises del fileSystem module;

Utilizziamo l'import per il fs, e prendiamo il modulo node: fs/promises;

Node saprà già che stiamo lavorando con del codice asincrono e che lo gestiremo con le promises;

Infatti se proviamo a runnare il nostro file senza utilizzare i .then, in console non avremo alcun risultato, proprio perché mancano gli handlers necessari alle promises per funzionare;

Nel .then inseriamo le due funzioni che andranno a gestire i parametri di dati e di errore;

-Sia che la promise vada a buon fine che essa non vada a buon fine siamo coperti grazie a questi due handlers;

-Il metodo then ritorna sempre delle promise e grazie ad esso è possibile collegare più promises assieme;

-il pattern che vedremo più spesso è un THEN per gestire lo stato fulfilled della promise ed un CATCH per gestire eventuali errori;

-ora che abbiamo due metodi differenti per gestire successi ed errori, possiamo collegare più promises l'una all'altra, nell' esempio subito dopo il primo .then, ne utilizzo un altro che ritorna di nuovo il metodo fs.readFile, dove ovviamente vado ad inserire un file diverso dal precendete, per accedere e stampare il valore di quel file mi basterà collegare un altro then dove vado a fare il consol log della data della seconda promise, e così via;

-La catch rimane una sola perché avviene ogni volta che occorre un errore, interrompendo perciò il flusso delle promises;

-TIP => Utilizzare le arrow function per rendere il codice più snello e leggibile

## ASYNC & AWAIT

- Esse sono due parole chiave che ci aiutano a lavorare con l'asyncronous code delle Promises;

-Nell'esempio possiamo vedere che dopo aver importato il modulo fs/promises da node, utilizziamo una funzione con la parola chiave async all'inizio, ciò farà capire a JS che la funzione è asincrona => le variabili e il codice all'interno dell'async function devono necessariamente avere la parola await,farà in modo che JS aspetti la computazione del codice per poi renderlo usufruibile, come succede con le promises;

-Per fare in modo di gestire anche gli errori dobbiamo usare il metodo try & catch => Nel try inseriamo il codice onFulfilled della promise, nel catch invece l' onReject e mettiamo a schermo degli errori;

-Anche con questi costrutti possiaamo inserire più computazioni nello stesso try block, e il codice si interromperà ogni volta che c'è un errore,attivando il catch block;

-Queste due parole chiave servono per rendere più leggibile il codice asincrono e farlo sembrare sincrono;

-Ovviamente con il codice asincrono si può utilizzare una feature che permette di leggere tutte le promises assieme e solo DOPO runnarle, facendo attenzione agli eventuali errori (gestiti dal catch);

-Questa feature è Promise.all che come suggerisce il nome va ad analizzare tutte le promise assieme e le compila in un unico flow;

-Await non richede la callback poiché la parola chiave implicitamente richiede una callback;

-Come usare la await al di fuori di una funzione asincrona in Node.js, questo è possibile poiché stiamo usando un ECMAScript module, che quindi permette all'await di trovarsi anche nel top level del file;

## CALLBACKS AS MIDDLEWARE

-Middelware è un modello reso famoso in Node.js grazie ad Express framework;

-Vedremo le callbacks come middleware per processare delle pipeline di elaborazione funzionanti;

-Utilizzando il framework express per questo progetto, dovremmo importarlo (e quindi scaricarlo con npm), dopo averlo importato creiamo una const app in cui richiamiamo la funzione express(ovvero possiamo utilizzare i metodi al suo interno);

-Aggiungiamo poi una porta di ascolto finale con il . listen (ricordiamoci di inserire il numero del port come valore);

-Runnando così il server la risposta che otterremo sara : 404 not found, questo perché dobbiamo usare delle Middleware per far funzionare il sever.

-Le middleware sono delle callback function che sono organizzate come delle pipelines;

-Nel caso specifico abbiamo due funzioni middleware una che setta l'intestazione della middleware e una che invece setta i dati della middleware, entrambe le callback functions vengono passate all'interno del metodo app.use;

-Express in questo caso funge da vero e proprio manager per i metodi e le callback che inseriamo al suo interno;

-Le middlevwre di express hanno una signature ed una serie di argomenti ben delineati => request, response, next

-Request => è l'oggetto della richiesta http.

-Response => è l'oggetto della risposta del
server;

-Next => funzione che serve per collegare tra loro le varie middlewares, dice ad espress che le azioni in questa middleware sono finite e di passare all'azione successiva;

-Possiamo anche fare l'handling degli errori con le middleware, se abbiamo un errore lo passiamo nella funzione next della middleware che si occupa di gestire gli errori, se non c'è ovviamente il flow passa alla prossima middleware;

-Quando creiamo un mesaggio di error dobbiamo anche ricordarci di inserire una middleware che si occupi di gestire quando e come gestire l'errore;

-Questa funzione di handling dell'errore va chiamata dopo tutte le middleware create in modo tale che possa gestire tutto il flow della pipeline.

-La funzione si trigghererà ogni volta che nel server c'è un errore, quindi si attiva la middleware che crea l'errore, la quale chiama la middleware che gestisce l'errore per loggare l'errore in console.
