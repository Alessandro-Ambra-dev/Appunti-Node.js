## INTRODUCTION ON NPM

Ci sono due feature di NPM:

-regestry => disponibile su npmjs.con dove possiamo trovare dei pacchetti crrati da altri developers in modo tale che anche noi possiamo utilizzarlo, nella pagina del pacchetto che vogliamo installare troveremo delle info su come avviarlo, come utilizzarlo, come è stato sviluppato etc. etc.

-command line tool => Questo è il modo in cui installiamo i nostri pacchetti, tramite il comando nel terminale.

Npm viene installato di default grazie a Node.JS

## NPM INSTALL AND PACKAGE

- Come installare un pachetto con npm;

npm init => è un "manifesto" del nostro pacchetto, che ci dirà quali dependencies e pacchetti sono installati nel nostro progetto;

Dopo aver creato il package json con le info principali sul nostro pacchetto, possiamo passare a scaricare altri pacchetti all'interno del package.json tramite npm;

-La maggior parte dei pacchetti che si trovano utilizzano il comando:

npm install (nome pacchetto) => Questo comando installerà il pacchetto da noi selezionato nel workspace e finirà all'interno del file package.json come dependecy installata;

-Infatti il pacchetto che abbiamo installato andrà all'interno dell'oggetto dependencies dove racchiudiamo tutti i pacchetti installati;

-Nella directory node modules invece troviamo tutti i pacchetti collegati a quello che abbiamo installato, quelli utilizzati per far runnare il pacchetto;

-Quando degli sviluppatori rilasciano un pacchetto all'interno di npm, se la versione sviluppata ha delle differenze sostanziali con la versione attuale e quindi incompatibili aumenteranno il primo membro della versione (quindi si passa ad 1.0.0 a 2.0.0);

-Se invece ci sono delle modifiche che integrano delle feature che sono compatibili con la versione corrente allora verrà modificato il minor della versione (si passa da 1.20.0 a 1.21.0);

-Se invece le modifiche sono atte a risolvere dei bug si modificherà l'indicatore della patch (si passa da 1.20.3 a 1.20.4);

-package-lock.json => File creato dalla npm command line interface e non va MAI toccato o modificato e viene gestito da NPM, poiché è molto specifico e verboso e contiene le informazioni su i pacchetti installati nella node modules e sulle versioni di questi;

-Se lavoriamo ad in un team questo pacchetto può essere commitato, in modo tale che i nostri coworkers possano installare tutte le dependencies necessarie per far avviare al meglio il progetto => così lavoriamo tutti con le stesse versioni dei pacchetti;

-Se abbiamo il packege-lock.json file nel nostro workspace e runniamo il comando:

npm install => Questo installerà tutte le dependencies presenti all'interno del nostro progetto, con le versioni aggiornate;

-Come poter installare un pacchetto a livello globale?

npm install --global (nome pacchetto) => Usiamo questo comando quando magari vogliamo runnare un command line tool e non per pacchetti che servono solo per uno specifico progetto;

Per vedere i pacchetti installati globalmente utilizziamo il comando:

npm -ls --global;

## USING PACKAGES

-Come utilizzare un pacchetto che abbiamo installato con NPM;

-File di prova (message.js) nel quale inseriamo una funzione, per utilizzare un pacchetto dobbiamo:

-utilizzare il comando npm init per inizializzare il progetto;

-scaricare il pacchetto da noi desiderato con il comando npm install;

-importare il pacchetto nel file in cui vogliamo utilizzarlo ed usarne i metodi che ci servono;

-Ci sono 2 modi per importare un pacchetto in un file:

-COMMON.JS MODULES => Questo modo prende ovviamente il metodo require dei moduli js comuni, perciò nel file dovremmo creare una variabile con il nome del pacchetto ed utilizzare il metodo require per importarcelo:

ES: const clc = require("cli-color");

-ECMASCRIPT MODULES => Questo modo invece viene supportato dai file in formato MJS ed utilizza il metodo import:

ES: import clc from "cli-color";

## DEVELOPMENT DEPENDENCIES

-Installare i pacchetti come development dependencies, che di norma sono librerie o command line tools che utilizziamo solo in development, non ne abbiamo bisogno quando invece rendiamo l'app pubblica per gli users;

-Dobbiamo perciò installarli in un modo diverso;

-Code formatter come Prettier sevono solo nel development environment perché serve a formattare il codice e renderlo più flessibile, come facciamo a installarlo solo per il dev environent?

-Andiamo nel terminale e runniamo il comando:

npm install --save-dev prettier => Quelle due flags (--save-dev) faranno capire a npm che il pacchetto andrà installato solo nel dev environment e che verrà accantonato una volta che l'app è accessibile al pubblico;

-Ora prettier sarà sotto il valore devDependencies;
