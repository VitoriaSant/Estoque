const Firebird = require("node-firebird");

const options = {
    host: "DESKTOP-OTFSD0S",
    port: 3050,
    database: "C:/Users/Vitoria/Desktop/Tek/DADOSMC.FDB",
    user: "SYSDBA",
    password: "masterkey"
};

Firebird.attach(options, function (err, db) {
    if (err) return console.log(err);

    db.query("SELECT * FROM USUARIO", function (err, result) {
        if (err) return console.log(err);

        console.log(result);

        db.detach();
    });
});