## INTRODUCITON TO NODE.JS

- Node js è un runtime di JS che ci permettere di runnare il codice JS al di fuori del web browser;

## INSTALL NVM

- NVM => Node version manager, che ti permette di cambiare le versioni di node tra loro per approvare anche progetti che usano una versione di node diversa dalla nostra;

nvm ls-remote => Una lista di tutte le versioni scaricabili di Node.

-Per installare l'ultima versione di node ci basterà runnare il comando:

nvm install node;

## RUN A SCRPIT WITH NODE.JS

-Creiamo un nuovo file che chiameremo hello.js (l'estensione JS farà capire a VSCode che si tratta di un file javascript);

-All'interno del file scriviamo un console.log, dove andremo a salutare l'utente di sistema:

console.log(`Hello there, ${process.env.USER}!`);

-Ora per runnare lo script basterà aprire il terminale e scrivere il comando node, seguito dal nome del file;

## RUN THE NODE JS REPL

-REPL => Feature di node che ci permette di provare dei pezzi di codice JS all'interno del runtime Node;

- Se scriviamo all'interno del runtime Node un codice JS (come una somma di numeri), ci darà come output il risultto di quell'operazione;

-La sequenza di Node è la seguente :

-Read, evaluate, print and loop (Legge il codice, lo compila, lo printa in console epoi torna alla situazione di partenza);

-Se utilizziamo l'underscore (\_) e inseriamo del nuovo codice, Node unirà il nuovo codice con quello vecchio;

> const total = 5+5
> undefined
> total + 6
> 16
> function doSomething(){
> ...console.log('Hello');
> ...}
> undefined
> doSomething()
> Hello there

-Possiamo anche vedere i metodi e le proprietà di un particolare oggetto JS.

> Array.

Ci da una lista completa di metodi e proprietà della classe JS Array;

> global.

-Tutti i metodi che sono all'interno di questo oggetto global che possiamo utilizzare nella nostra REPL;

> os.type()
> -Ci dirà il nome del sistema operativo.

> os.cpus()
> -Ci darà una lista di tutte le CPUS che ci sono all'interno del nostro PC;

-Per uscire dalla REPL ci basterà utilizzare il comando:

> .exit => Usciamo dalla REPL e torniamo nel terminale;

## VERSIONS OF NODE

- LTS (ci dà info sulle feature e sulle versioni di Node che sono state create o stanno per essere implementate)

-Utilizziamo versioni di node che sono active o nella maintenance phase, poiché sono quelle più controllate e sicure;

## INSTALL THE ACTIVE LTS VERSION OF NODE.JS

- Vediamo come utilizzare la versione più stabile di Node (LTS active), per sviluppare un app che sia disponibile per i customers;

Terminale:

nvm ls => Ci dà la lista di tutte le versioni di Node;

-Per installare la versione stable LTS utilizziamo questo comando:

nvm install --lts --default => Questo comando installerà nel nostro sistema la versione da noi richiesta;

-Se vogliamo poi tornare alla versione più recente di node dobbiamo inserire questo codice:

nvm alias default node => Questo riporterà Node all'ultima versione;

## MODULES IN NODE JS

- Vedremo i due tipi di moduli che node js supporta nel suo sistema;

-Common.js modules:
Il sistema di default di node.js;
Per rendere un modulo disponibile ad un altro bisogna utilizzare il metodo : module.exports = (nome del codice che vogliamo esportare);

-Se vogliamo poi utilizzare un module.exports in un altro file JS dobbiamo utilizzare la require function all'inizio del file:

const outputMessage = require('./ouput-message.js');

-ECMAScript modules:

Noti anche come ES modules o JS modules, sono un nuovo tipo di moduli creati per esportare funzioni o codice da un modulo ad un altro:

I due metodi utilizzati sono i seguenti:

-Per il file che va esportato utilizziamo il metodo:

- export default (nome del codice che vogliamo esportare)

-Per il file che importa il codice dall'esterno utilizziamo il metodo:

- import (nome codice da importare) from 'directory del modulo importato';

NB: Per utilizzare gli Es modules dobbiamo specificare a Node che i file accettano i nuovi tipi di moduli e perciò il formato del file sarà : 'mjs';

-Questo perché di dafault i file js utilizzano il common js modules;

IMPORTANTE: Per dire al nostro progetto che tutti i file utilzzano gli ES modules dobbiamo andare all'interno del package.json ed inserire questo codice:

"type": "module";

-In questo modo i file utilizzeranno il metodo ES module anche se sono in formato JS e non devono più usare il formato MJS;
