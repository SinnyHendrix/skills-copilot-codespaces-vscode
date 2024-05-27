//create webserver
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');

//create server
var server = http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	if(pathname === '/'){
		fs.readFile('./index.html',function(err,data){
			if(err){
				console.log(err);
				res.writeHead(404,{'Content-Type':'text/html'});
				res.end('404 Not Found');
				return;
			}
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data);
		});
	}else if(pathname === '/comment'){
		var query = url.parse(req.url,true).query;
		var name = query.name;
		var comment = query.comment;
		comments.addComment(name,comment    );          
    }else if(pathname === '/getComments'){
        comments.getComments(function(data){
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end(data);
        }); 