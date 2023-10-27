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
