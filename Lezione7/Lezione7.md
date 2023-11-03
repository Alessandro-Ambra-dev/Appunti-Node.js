## DATABASE SETUP

- Vedremo come settare PostgresSQL nella nostra app in express;

- Dobbiamo accantonar eil nostro database fittizio per crearne uno effettivo, collegandoci a questo database tramite Postgress ed usando pg-promises come dependency.

-Dopo aver settato delle impostazioni in postgress, come il local host o la port su cui girerà il nostro database, e dopo esserci accertati di aver creato appunto un database, possiamo sfruttarlo nel nostro server;

-Assicuriamoci di installare la dependency pg-promise;

-Dopo aver fatto ciò dobbiamo creare una const database che richiama appunto il pgPromise, che utilizza appunto una promise dove nella prima serie di tonde va un oggetto con delle impostazioni customizzabili, mentre nella seconda serie di tonde va specificato come segue:

"postgres://postgresuser:postgrespassword@localhost:port/name del batabase";

-Se dopo aver fatto il lgo ritorna una serie di comandi che sono delle funzioni allora vuol dire che il database è stato collegato con successo;

## DATABASE TABLES AND GET ROUTES

- Come settare al melgio il nostro database, creando delle tabelle e popolandole;

- Creiamo nel nostro controller planets una funzione asyncrona che serve a setuppare il nostro database, poi utilizziamo il metodo none di SQL e all'interno di esso definiamo la nostra Table =>
  CREATE TABLE planets(
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
  )

-In questa tabella bbiamo specificato due chiavi, una numerica ID,che è anche la nostra primary key, di cui ogni database ha bisogno, che specifichiamo essere primario (interno non con la virgola), not null (quindi obbligatoria), e seriale (ovvero che lista i nostro oggetti da 1 a index);

-La chiave name invece specifichiamo che dev'essere un testo, anch'esso non nullo;

-Dopo aver settato la tabella andremo a popolarla, con un nuovo db.none, nel quale inseriremo questo codice (INSERT INTO planets (name) VALUES ('Earth')) => Questo specifica che stiamo inserendo all'interno della tabella planets il valore della chiave name, NB: il valore della key va messo dentro gli APICI SONGOLI;

-In questo modo creeremo il nostro primo oggetto nel database, con i nostri pianeti al suo interno;

-Per vederlo nel terminale faremo await db.many( SELECT \* FROM planets) => Facendo il console.log di questa const avremo il database di pianeti;

-Ora non avremo neanche più bisogno di TS ovvero dei type che ho creato pima, perché la table che abbiamo già ha al suo interno una validazione sulle nostre key, in quanto sappiamo che id può esser esolo un numero primo e non nullo, e che name è una stringa non nulla;

-Dopo aver tolto TS dobbiamo avere a che fare con dei problemi di script, che valicheremo andando ad utilizzare proprio la const planets che abbiamo creato nella table:

-Per la getAll ci basterà inserire la const planets e metterla come risposta in json per la richiesta get;

-Per la getOneById invece dovremmo cambiare la const in questo modo:
await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`,Number(id)) => Ciò vuol dire che db si aspetta un solo oggetto, dove le jey id e number sono le stesse di quello che andremo a selezionare nella route della richiesta GET (quindi ad id1 corrisponde il pianeta con id 1), mentre se cerchiamo un ID che non esiste nel database otteremo null;

## DATABASE CREATE AND DELETE

-Andremo a vedere come inserire qualcosa nel nostro database e come eliminarlo;

-Nella funzione create all'interno dei controllers, vado a creare una async function, dove inserisco un await db.none (poiché non si aspetta più di un argomento), e vado a specificare con SQL che voglio creare un elemento in planets con la chiave name e come valore quello che inserisco (che si indica con il placeholder $1), e vado poi a specificare quale sia il valore che inserisco specificando la const name che ho destrutturato all'inizio della funzione create;

-Per eliminare invece un elemento tramite database vado nella funzione deleteById, la rendo asincrona e specifico un await db.none, dove specifico di volere eliminare un elemento quando l'id che inserisco è lo stesso del placeholder ($1), poi vado sempre a richiamarmi la const id che ho destrutturato nella funzione, castandola però a numero visto che la request.params ritorna una stringa;

## UPDATE DATABASE

-Per aggiornare la nostra update function la rendiamo asincrona, e poi stanziamo un await db.none, dove specifichiamo che vogliamo aggiornare la nostra table planets, aggiornando il name con il valore del placeholder $2 e con il valore dell'id del placeholder $1 (questo perché vogliamo che il nostro id sia sempre la primary key del nostro database e quindi è messa in primo piano rispetto al name), come valore utilizziamo sempre le const che abbiamo destrutturato dai params, che inseriamo in un array dove al primo posto c'è id e nel secondo name;

## FILE UPLOAD

- Come salvare un file sul disco e come creare un riferimento al percorso di quel file all'interno del database;

-Per fare ciò utilizzeremo un pacchetto "multer", che ci permetterà di fare queste operazioni, il comando è npm i multer,

-Avremo inoltre bisogno di una nuova route:

Creiamo un app.post("api/plantes/:id/image") =>
In questo modo il server saprà che all'id corrispondente del nostro pianeta dovrà inserire quell'immagine specifica;

-Subito dopo andremo nel nostro controller, e stanzieremo una nuova funzione chiamata createImage, che servirà appunto a inserire un'immagine all'interno del nostro server; LA createImage sarà una funzione asincrona, e all'interno della stessa andremo a prendere l'id dei nostri pianeti destrutturandolo e ponendolo come request.params;

-La cosa che ci servirà ora sarà il fileName, ovvero il nome del file che andremo a caricare nella table del nostro server => Come facciamo ad ottenere questo fileName? => request.file?path => Questo operatore (?), serve a far capire alla funzione e a node che il file deve necessariamente esistere e perciò il path di questo file dovrà essere preso solo nel caso in cui il file è effetivamente presente nella directory dei files;

-Ora non ci servirà che fare un controllo sulla presenza o meno della cont fileName:

1. Se presente, allora diciamo al nostro database (tramite un db.none) di aggiornare la table planets e di aggiungere l'immagine come valore al pianeta che presenta quell'id specifico, ovviamente image=$2 e id=$1 sempre perché vogliamo che il nostro id sia la primary key; Dopo al di fuori degli apici settiamo un array con le const id e fileName, e alleghiamo ad essa la response del nostro server, con uno status di 201 (ovvero quello di creazione di contenuto con successo) e con un json che invia un messaggio di buona riuscita dell'opearazione; Nell'else invece gestiamo l'errore, ponendo la risposta ad uno stato di errore 400, e un json che invia un messaggio di errore;

-Per fare in modo che tale operazione vada a buon fine, dobbiamo sia inserire la key image nella nostra table, specificando che sia un testo generico (e che quindi può anche avere valore nullo);

-Dopo aver fatto l'export della funzione ed averla importata nel server, la inseriamo nella get con il path di nostro interesse, e tra il path e la funzione va inserito un nuovo membro che è la const che fuoriesce dal settaggio di multer:

-Nel server stanziamo una const storage che si serve del metodo diskStorage di multer, il quale accetta come valori due keys:

1. Destination

2.filename

Entrambe accettano una callback con tre argomenti: request, file, callback;

Nella destination all'interno della callback specifichiamo una callback che ha come primo paramentro null, e come secondo la directory dove andranno inserite le immagini (es "./uploads").

Nella filename all'interno della callback stanziamo una callback che come primo argomento ha null, e come secondo il metodo "originalname" del modulo file => In questo modo il nome del file sarà lo stesso di quello che abbiamo scelto per la nostra immagine;

Dopo aver settato lo storage stanziamo una const update che utilizza multer e al suo interno ha un oggetto con lo storage;

-Questa const update finirà nella get dove si trova il path per caricare le immagini e la funzione createImage, in mezzo ad essi, ed utilizzeremo il metodo update.single("image") => Così potremo caricare un unico file alla volta;

NB => All'interno del update.single c'è "image" perché questa dev'essere collegata al nome che mettiamo nel SQL della funzione createImage;

## FILE STATIC

-Come poter esporre dei file statici all'utente tramite express;

-Per aprire dei file statici con express dobbiamo utilizzare l'app.use, specificando poi il nome della cartella in cui vorremmo permettere all'utente di poter visitare i file e poi il vero e proprio folder sul nostro server express;

app.use("/static", express static('public'));

-Nel caso del nostro server abbiamo un file main.css nel nostro folder static, perciò la directory sarà la seguente localhost:3000/static/main.css => In questo modo l'utente potrà visionare il file che si trova in quel percorso;
