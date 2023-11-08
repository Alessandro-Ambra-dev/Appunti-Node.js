## JWT: JSON WEB TOKEN AUTH;

## 1.JWT PASSPORT

-Andremo a creare una nuova table per il nostro database con user e poi andremo a settarla in modo tale da avere una autenticazione completa dello user;

- La prima cosa da fare è un refactoring => muoveremo il database nel suo file chiamato db.ts, in modo che più file possano accedere al database, spostando il database (e la pgPromise) al suo interno, poi ovviamente importartiamo il db dove serve;

- Ora nel db.ts creiamo la table per gli users, con le chiavi id serial not null primary key e uno username con text not null, poi una password sempre text not null ed un token, che inizialisserà un token, che è una stringa che contiene algoritmi e payload che possiamo verificare, ovviamente andremo ad utilizzare dei pacchetti che ci evitino di fare questa verifica.
  -Inseriamo anche un dummy date all'interno della nostra Table users con await db.none(`INSERT INTO users (name, password) VALUES ('Alessandro', 'ALessandro')`)

- Un altro pacchetto che andremo ad utlizzare è ul dotenv che ci permette di creare delle keys locali e al cui interno inseriamo tutti quei valori del database che non andiamo a pushare nel git repo online, poiché inseriamo il file .env nel gitignore;

-Creiamo il file .env dove inseriamo il SECRET kwy, che è una stringa con dei caratteri casuali;

-Ora passiamo all'autenticazione del nostro passaporto, creiamo un file passport.ts;
-Importiamo dotenv all'interno del nostro passport.ts utilizzando questo comando:

import \* as dotenv from 'dotenv'
dotenv.config() => Configurazione del dotenv;

-Passport è una libreria che viene utilizzata per fare il login ed il logout di uno user fittizio e viene utilizzato spesso;

-installiamo passport e JWT passport con => npm install passport passport-jwt;

-Poi importiamo sia passport che passportJWT dalle relative librerie;

-NB: => Ricordiamoci di importiamo anche i types delle rispettive librerie, in modo tale che vengano letti e processati da node;

-Utilizziamo passport come una middleware, perciò inseriamo il .use come facevamo nell'app del nostro server express;

-All'interno creiamo una new passportJWT.Strategy => La strategy prende due fattori, un oggetto di opzioni ed una callback asincrona che prende come argomenti payload, che sono dei dati che vengono forniti con il token (JWT) e una done callback che dobbiamo utilizzare;

-Nell'oggetto di opzioni, inseriamo la secretOrKey method, che altro non è che la secret creata nel .env, a cui accediamo prima della middleware del passport con

const {SECRET} = process.env;

-Dopo abbiamo bisogno del metodo jwtFromRequest e inseriamo passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken => Questo è un riscontro molto comune per l'identificazione da parte di un server API, se lo scriviamo da soli o lo importiamo, dobbiamo utilizzare un header nella richiesta che di solito autorizza il portatore della richiesta, quando viene autorizzato esso riceve il token; => Questo metodo farà tutto questo per noi, evitandoci il lungo processo;

-Nella funzione async dobbiamo richiamare lo user dal nostro database =>
const user = await db.one(`SELECT * FROM users WHERE id=$1`,payload.id )

Dopo possiamo usiamo il try catch per raccogliere quei dati;

Nel try inseriamo return user ? done(null, user) : done (new Error('user not found'))

Nel catch invece inseriamo l'errore che sarà perciò done(error);

## JWT LOGIN

-In questo video andremo a scrivere la nostra prima autentication route che servirà per l'accesso dell'utente;

-Andiamo a scrivere una route all'interno del nostro server.ts, utilizzando il metodo post con il path ("/aoi/users/login", logIn);

-La logIn sarà una funzione che dovremmo importare dal nostro database e quindi dovremmo farla in un posto diverso rispetto al file dove abbiamo stanziato i planets;

-Creiamo perciò un file con il nome users.ts sempre all'interno della cartella controllers;

- Nella user importiamo la request reponse da Express e importiamo anche il db dal file db;

-Stanziamo poi una const logIn che è una funzione callback asincrona che prende come parametri la repsonse request, e la esportiamo in modo tale da poterla utilizzare nel server;

-Quello che vogliamo che lo user inserisca sono una username ed una password, quindi li destrutturiamo e li poniamo come request.body (ovvero affermiamo che la request di post venga fatta in formato json);

- Infine stanziamo una const user che dobbiamo prendere dal database e che sarà:
  await db.one(`SELECT * FROM users WHERE username=$1 `, username);

-poi facciamo un if,else in modo tale da capire se quell'utente esista o meno;

-Nella condizione dell'if andiamo a porre sia il nostro user che la password dello user, la quale deve essere la stessa della username che riceviamo dall'utente e che abbiamo destrutturato nella request.body;
-Se funziona, vogliamo fare il sign del jwt; Per fare ciò dobbiamo:

1. Installare il pacchetto (npm install jsonwebtoken), ed importarlo (import jwt from 'jsonwebtoken')

2.Creiamo il token => const token = jwt.sign(payload, SECRET) => La funzione sign del pacchetto jwt prende come argomenti il payload, che sono i dati inviati dallo user della richiesta e la SECRET, che è la chiave alfanumerica che viene fuori da quest'azione;

3. Per la secret dovremmo usare il file .env che abbiamo stanziato prima, e dobbiamo importarlo e configurarlo per ogni file a cui vogliamo farlo accedere; =>
   import \* as dotenv from 'dotenv'
   dotenv.config();

-Poi dentro l'if andiamo a prendere la chiave secret => const {SECRET} = process.env;

-Andiamo inoltre a creare il payload =>
const payload = {
id: user.id,
username,
}

-L'id sarà l'id dello user del database assieme allo username

- Ora dovremo collegare il token => facciamo un
  await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);

-Questa await farà in modo di aggiornare il nostro database e la tabella users inserendo come valore di id l'id proveniente dalla richiesta e generando il token, ovviamente le key sono inserite manualmente perciò serviranno i simboli $1 ed $2 (l'ordine indica qual'è la primary key, in questo caso l'id dello user), e per prendere tali valori dovremo ovviamente stanziare un array che al suo interno contiene le due variabili che stiamo cercando di prendere;

-L'ultima cosa che faremo nell'if sarà quella di stanziare un response.status(200).json({id: user.id, username,token}) => Quindi la risposta del nostro server sarà un oggetto contenente l'id dell'utente, il suo username ed il token da lui generato;

-Nell'else inseriamo invece una response.status(400).json({message: 'username or password incorrect'}) => Quindi quando c'è un errore verrà stampato il json che contiene il messaggio;

## JWT SIGNUP

-Impariamo a gestire l'iscrizione di un utente;

-Creiamo una nuova route nel nostro server.ts con un metodo post con il path (/api/users/signup) a cui attacchiamo una funzione che chiamiamo signUp e la importiamo dal file user.ts presente nei controllers;

-Nello user.ts scriviamo questa signUp che è una funzione asincrona, che prende come argomenti request e response, al suo interno andiamo a destrutturare lo username e la password, poiché sono le variabili che riceviamo dalla richiesta, e andiamo successivamente a creare una const user che prende questa operazione :

await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username) => Quindi prenderemo dalla tabella users i campi della tabella quando lo username è lo stesso di quello inserito nel body della richiesta;

-Facciamo un controllo su user:

Se user esiste => Allora manderemo un messaggio risposta di status(400) con un json che al suo interno conferma che l'utente è gia registrato;

-Se non esiste => Andremo a creare una const id che destrutturiamo e poniamo uguale a :

await db.none(`INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id`,
[username, password]) => Quindi andrà ad inserire i nuovi dati (username e password) dentro la tabella users che come valore hanno quello inserito nel body della request, inoltre ritorniamo l'id dell'elemento;

## JWT LOGOUT

- Vediamo ora come crear euna route per il logout di uno user;

-Quello di cui avremo bisogno è una autorizzazione che prendiamo sempre da passport, che ci permette di autorizzare appunto un'azione; => Per il logout ci dev'essere ovviamente una autorizzazione per lo user, ovvero deve essere già loggato all'intenro del server;
