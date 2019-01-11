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

app.get('/getEmployee/:empId', function (request, response) {
    try {
        new sql.Request().query("select * from EmpMaster where EmpId='" + req.params.id + "'", function (error, recordset) {
            if (error) {
                console.error(error);
                response.send({
                    status: 404,
                    error: error
                });
            } else {
                response.send({
                    status: 200,
                    result: recordset.recordset
                });
            }
        });
    } catch (error) {
        response.send({
            status: 500,
            error: error
        });
    }
});

app.post('/addEmployee', function (request, response) {
    try {
        let employee = request.body.employee;

        let transaction = new sql.Transaction();

        transaction.begin().then(function () {
            let request = new sql.Request(transaction);
            request.query("insert into EmpMaster(EmpId, Name, Gender, Age, Salary, City) values('" + employee.EmpId + "','" + employee.Name + "','" + employee.Gender + "','" + employee.Age + "','" + employee.Salary + "','" + employee.City + "')").then(function () {
                transaction.commit().then(function (recordSet) {
                    console.log("Added to DB ", recordSet);
                    response.send({
                        status: 200,
                        result: recordset.recordset
                    });
                }).catch(function (error) {
                    console.error("Error in Transaction Commit " + error);
                    response.send({
                        status: 500,
                        error: error
                    });
                });
            }).catch(function (error) {
                console.error("Error in Request Query " + error);
                response.send({
                    status: 500,
                    error: error
                });
            });
        }).catch(function (error) {
            console.error("Error in Transaction Begin " + error);
            response.send({
                status: 500,
                error: error
            });
        });
    } catch (error) {
        response.send({
            status: 500,
            error: error
        });
    }
});

app.put('/updateEmployee', function (request, response) {
});

app.delete('/removeEmployee', function (request, response) {
});

app.listen(5000, function () {
    console.log('Server is running..');
});