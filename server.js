var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'add')
    {
      console.log("Handling a request");
      console.log(query);
      var sum = 0;
      for (var i in query['num'])
      {
        sum = sum + parseInt(query['num'][i]);
      }
      
      res.write('<pre>'+sum+'</pre>');
      res.end('');
    }
    else if(query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      var length = query['word'].length;
      for (var i = 0; i < length; i++)
      {
        res.write('<pre>'+query['word']+'</pre>');
      }
      res.end('');
      
    }
    else if(query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      var length1 = query['word1'].length;
      var length2 = query['word2'].length;
      var cLength = 30- length1 - length2;
      res.write('<pre>'+query['word1']);
      for(var i = 0; i < cLength; i++)
      {
        res.write(".");
      }
      res.write(query['word2']+'</pre>');
      res.end('');
    }
    else if(query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var sum = 0;
      var min = query['grades'][0];
      var max = query['grades'][0];
      for(var i in query['grades'])
      {
        sum = sum+parseInt(query['grades'][i]);
        if(query['grades'][i] < min)
        {
          min = query['grades'][i];
        }
        if(query['grades'][i] > max)
        {
          max = query['grades'][i];
        }
      }
      res.write('<pre> Ave: '+(sum/query['grades'].length)+' Min: '+min+' Max: '+max+'</pre>');
      res.end('');
      
    }
    else
    {
      res.end('');
    }
}