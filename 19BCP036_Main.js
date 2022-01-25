var express = require('express');
var fs = require('fs');
const { fileURLToPath } = require('url');

var app = express();

app.get('/',function(req, res){
    res.send("Hello World, Here you can perform various operation on files")
});

app.get('/19BCP036',function(req, res){
    fs.readFile("19BCP036_Display.html",function(err, data){
        res.writeHead(200, {"Content-Type":"text/html"});
        res.write(data);
        res.end();
    })
});

app.get('/19BCP036_Read.html', function(req, res){
    var f1 = req.query.file_one;
    fs.readFile(f1,function(err, data){
        res.write(data);
        res.end();
    })
});

app.get('/19BCP036_Write.html', function(req, res){
    var f1 = req.query.file_one;
    var f2 = req.query.file_two;
    fs.readFile(f1,function(err, data){
        fs.writeFile(f2, data, function(err, data){
            res.send("Contents in file "+f1+" copied to file "+f2);
        })
    })
});

app.get('/19BCP036_Append.html', function(req, res){
    var f1 = req.query.file_one;
    var f2 = req.query.file_two;
    fs.readFile(f1,function(err, data){
        fs.appendFile(f2,data, 'utf8',function(err) {		
            res.send("Data is appended to file successfully.")
        });
    })
});

app.get('/19BCP036_Delete.html', function(req, res){
    var f1 = req.query.file_one;
    fs.unlink(f1, function(err){
        res.send("File "+f1+" is deleted.");
    });
});

app.listen(8080)