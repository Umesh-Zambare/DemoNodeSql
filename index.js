var express = require('express');
var app = express();
var sql = require("mssql");
var config = {
    user: 'sa',
    password: 'sa123',
    server: 'localhost',
    database: 'NewEthosDB'
};

sql.connect(config, function (err) {
    if (err) console.log(err);

});

app.get('/getEmployees', function (req, res) {

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from EmpMaster', function (err, recordset) {

        if (err) console.log(err);

        res.send(recordset);

    });
});

app.get('/getEmployee/:id', function (req, res) {
    var request = new sql.Request();
    request.query("select * from EmpMaster where EmpId='" + req.params.id + "'", function (err, recordset) {

        if (err) console.log(err);

        res.send(recordset);

    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});