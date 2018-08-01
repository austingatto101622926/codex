const fs = require('fs');
const express = require('express');

const app = express();

//USE FILES IN 'client' DIRECTORY
app.use(express.static('client'));
//PARSE JSON REQUESTS
app.use(express.json());

//MODEL OBJECTS
function Entry(type, body, content){
    this.type = type;
    this.head = head;
    this.body = body;
}
function Topic(title, entries){
    this.title = title.toString().toLowerCase();
    this.entries = entries;
}

//API ROUTES
app.get('/api/', (request, response) => 
{
    fs.readdir('codex', (error, data) =>
    {
        response.send(data);
        response.end();
    })
})
app.get('/api/:topic', (request, response) => 
{
    path = 'codex/'+request.params.topic.toString().toLowerCase()+'.json';
    fs.readFile(path, (error, data) => 
    {
        if (error){
            topic = new Topic(request.params.topic,new Array());
            topicJSON = JSON.stringify(topic)
            fs.writeFile(path,topicJSON, null)
            response.send(topicJSON)
        }else{
            response.send(data)
        }
        response.end();
    })
})
app.post('/api/:topic', (request, response) => 
{
    path = 'codex/'+request.params.topic+'.json';
    topicJSON = JSON.stringify(request.body)
    fs.writeFile(path,topicJSON, null)
    console.log('POST to '+request.params.topic+' with body: '+ topicJSON);
})



//BROWSING ROUTES
app.get('/', (request, response) => 
{
    fs.readFile('client.html', (error, data) => 
    {
        data = data.toString().replace('#TOPIC#','');
        response.write(data);
        response.end();
    })
})

app.get('/:topic', (request, response) => 
{
    fs.readFile('client.html', (error, data) => 
    {
        data = data.toString().replace('#TOPIC#',request.params.topic.toString().toLowerCase());
        response.write(data);
        response.end();
    })
})

//LISTEN
PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('listening on port '+PORT+'...'));