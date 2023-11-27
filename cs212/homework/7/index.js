const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
    
    res.sendfile('index.html');
    //res.send('<form id="words" method="POST"> <label>person</label> <input type="text" id="person1"> <br> <label>adjective</label> <input type="text" id="adjective1"> <br> <label>person</label> <input type="text" id="person2"> <br> <label>noun</label> <input type="text" id="noun1"> <br> <label>adverb</label> <input type="text" id="adverb1"> <br> <label>adjective</label> <input type="text" id="adjective2"> <br> <label>exclamation</label><input type="text" id="exclamation1"><br><label>adjective</label><input type="text" id="adjective3"><br> <label>verb</label><input type="text" id="verb1"><br><label>objects (plural)</label> <input type="text" id="objects1"> <br> <input type="submit" value="Submit" id="submit"> </form>');
});

app.post('/', function (req, res){
    const wordData = req.body;
    
    textToUse = '<html><body> '+ wordData.person1 + ' was ' + wordData.verb0 + ' by ' + wordData.person2 + ' at '+wordData.noun1+' where they '+wordData.adverb1+' discovered how '+wordData.adjective2+' it is. "'+wordData.exclamation1+'! it is so '+wordData.adjective3+' too" '+wordData.person1+' said. I think we should '+wordData.verb1+' '+wordData.objects1+' at it. </body></html>';
    console.log(textToUse);
    console.log(req.body);

    res.send(textToUse);
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});