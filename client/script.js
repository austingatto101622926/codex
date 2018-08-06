//MODEL OBJECTS
function Entry(type, head, body){
    this.type = type;
    this.head = head;
    this.body = body;
}
function Topic(title, entries){
    this.title = title;
    this.entries = entries;
}

//START
const title = document.getElementsByTagName('title')[0].innerHTML.replace('codex.','');
//const baseUrl = 'http://codex.eu-4.evennode.com/'
const baseUrl = 'https://codex101622926.herokuapp.com/'
const apiUrl = baseUrl+'api/';
let topic;

//REQUEST FUNCTIONS
function GET(url, callback){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){  
            callback(this);
        }
    };
    xhttp.open('GET',url,true);
    xhttp.send();
}

function POSTasJSON(url, object, callback, ){
    
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){  
            callback(this);
        }
    };
    xhttp.open('POST',url,true);
    xhttp.setRequestHeader('Content-type','application/json')
    xhttp.send(JSON.stringify(object));
}

//HOME  VS TOPIC PAGE
GET(apiUrl+title, (xhttp) => {
    if (title != '') //I.E Home Page
    {
        document.getElementsByTagName('main')[0].removeAttribute('hidden')
        topic = JSON.parse(xhttp.responseText);
        document.getElementById('search').value = topic.title;
        document.getElementsByClassName('entry')[0].innerText = topic.entries[0].body;
    }else{
        document.getElementById('index').removeAttribute('hidden')
        index = JSON.parse(xhttp.responseText);    
        for (let i = 0; i < index.length; i++) {
            index[i] = index[i].replace('.json','');
            html = '<a href="'+baseUrl+index[i]+'">'+index[i]+'</a><br>'
            document.getElementById('index').innerHTML += html;
        }
    }
})


//EVENT FUNCTIONS
function entryChange(){
    let entries = document.getElementsByClassName('entry');

    for (let i = 0; i < entries.length; i++) {
        entry = new Entry('text','',entries[i].innerText);
        topic.entries[i] = entry;
    } 
    POSTasJSON(apiUrl+title, topic, null);
}

function searchEnter(event){
    //IF KEY PRESSED IS 'ENTER'
    if (event.keycode == 13 || event.which == 13){
        url = baseUrl+document.getElementById('search').value;
        window.location.assign(url);
    }
}

