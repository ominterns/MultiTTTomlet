//Tic Tac Toe 2P 
//Designed and Implemented by Evan Zhao

//Global Variables

//Array defining board positions. Also accessed to save the gamestate
var moving = [0,0,0,0,0,0,0,0,0];
//miscellaneous variables
var restart = false;
var win1 = 0;
var win2 = 0;
var tie = 0;

//Shared Document API

function Initialize(old, params) {
	return params;
}

function Update(old, params) {
	old.moving = params["moving"];
	return old;
	console.log("Updating!");
}

function InitialDocument() {
	var initValues = {
		'moving' : "",
	};
	return initValues;
}

function DocumentCreated(doc) {
  	console.log("Document has been created.");
}

function ReceiveUpdate(doc) {
	myDoc = doc;
	for( key in myDoc)
	{
		console.log(key);
	}

	console.log("moving: " + myDoc["moving"]);
	moving = JSON.parse(myDoc["moving"]);

	LoadGame();
	console.log("I received an update!");
}

function DidNotReceiveUpdate(doc) {
	console.log("I did not receive an update");
}

//////////////////////////////
///// Framework Code   ///////
//////////////////////////////

var documentApi;
var myDoc;
var myDocId;

function watchDocument(docref, OnUpdate) {
documentApi.watch(docref, function(updatedDocRef) {
if (docref != myDocId) {
console.log("Wrong document!!");
} else {
      	documentApi.get(docref, OnUpdate);
    	}
}, function(result) {
var timestamp = result.Expires;
   	var expires = timestamp - new Date().getTime();
    	var timeout = 0.8 * expires;
    	setTimeout(function() {
      	watchDocument(docref, OnUpdate);
    	}, timeout);
}, Error);
}

function initDocument() {
if (Omlet.isInstalled()) {
    		documentApi = Omlet.document;
    		_loadDocument();
  	}
}

function hasDocument() {
var docIdParam = window.location.hash.indexOf("/docId/");
    	return (docIdParam != -1);
}

function getDocumentReference() {
    	var docIdParam = window.location.hash.indexOf("/docId/");
    	if (docIdParam == -1) return false;
    	var docId = window.location.hash.substring(docIdParam+7);
    	var end = docId.indexOf("/");
    	if (end != -1) {
      	docId = docId.substring(0, end);
    	}
    	return docId;
}

function _loadDocument() {
  	if (hasDocument()) {
    	myDocId = getDocumentReference();
    		documentApi.get(myDocId, ReceiveUpdate);
watchDocument(myDocId, ReceiveUpdate);
} else {
    		documentApi.create(function(d) {
      	myDocId = d.Document;
      	location.hash = "#/docId/" + myDocId;
      	documentApi.update(myDocId, Initialize, InitialDocument(), 
function() {
      	documentApi.get(myDocId, DocumentCreated);
}, function(e) {
      alert("error: " + JSON.stringify(e));
      });
      watchDocument(myDocId, ReceiveUpdate);
    		}, function(e) {
      		alert("error: " + JSON.stringify(e));
    		});
  	}
}


//Load the game from old data. 
function LoadGame()
{
	var squares = document.querySelectorAll("#board button");
	for( var i = 0, len = squares.length; i < len; ++i )
	{
		if( moving[i] )
		{
			squares[i].innerHTML = moving[i];
		}
	}
}

function LoadGame()
{
	var squares = document.querySelectorAll("#board button")
	for( var i = 0, len = squares.length; i <len; ++i)
	{
		if(moving[i])
		{
			if(moving[i] ==1)
			{
				squares[i].innerHTML = "<img src='https://mobi-summer-evan.s3.amazonaws.com/Tic%20Tac%20Toe/X.png' width = '50' height = '50'>";
			}
			else if(moving[i]==3)
			{
				squares[i].innerHTML = "<img src='https://mobi-summer-evan.s3.amazonaws.com/Tic%20Tac%20Toe/O.png' width = '60' height = '60'>";
			}
		}
	}
}

//Sharing RDL Function
	
function setUpShare() 
{
	$("#Share").click(function(){
		ShareGame();
		console.log("shared clicked");
	});
}

function ShareGame(event)
{
	console.log("Sharing game!");

	if( Omlet.isInstalled() )
	{
		var rdl = Omlet.createRDL({
                noun: "game",
                displayTitle: "Tic Tac Toe",
                displayThumbnailUrl: "https://mobi-summer-evan.s3.amazonaws.com/Tic%20Tac%20Toe/Z.jpg",
                displayText: "Nobody can beat me at Tic Tac Toe! I dare you to challenge to a local game of Tic Tac Toe!",  
                webCallback: "https://mobi-summer-evan.s3.amazonaws.com/Tic%20Tac%20Toe/tictactoe.html",
				//json: moving,
                callback: (window.location.href),
            });
      	Omlet.exit(rdl);
	}
	else
	{
		console.log("Omlet not properly set up.");
	}
}



/*------------------------------
	changes the message displayed by the game
------------------------------*/
function setMessage( msgTxt )
{
	var msgDiv = document.getElementById('logger');
	msgDiv.innerHTML = msgTxt;
}

var sumx = function()
{
	return ( moving[0] + moving[1] + moving[2] + moving[3] + moving[4] + moving[5] + moving[6] + moving[7] + moving[8] );
};

function setUpSquares() 
{
	var squares = document.querySelectorAll("#board button");
	
	for(var i = 0, leng = squares.length; i < leng; i++)
	{
		squares[i].addEventListener("click",createClickHandler(i));
		}

}

var checkWin = function()
{	
	//Checking Win Conditions for Player 1
	if( (moving[0] ===1 && moving[1] === 1 && moving[2] ===1) )
	{
		theend(1);
		restart = true;
	}
	
	if( (moving[3] ===1 && moving[4] === 1 && moving[5] ===1) )
	{
		theend(1);
		restart = true;
	}
	
	if( (moving[6] ===1 && moving[7] === 1 && moving[8] ===1) )
	{
		theend(1);
		restart = true;
	}
	
	if( (moving[0] ===1 && moving[3] === 1 && moving[6] ===1) )
	{
		theend(1);
		restart = true;
	}

	if( (moving[1] ===1 && moving[4] === 1 && moving[7] ===1) )
	{
		theend(1);
		restart = true;
	}
	
	if( (moving[2] ===1 && moving[5] === 1 && moving[8] ===1) )
	{
		theend(1);
		restart = true;
	}
	
	if( (moving[0] ===1 && moving[4] === 1 && moving[8] ===1) )
	{
		theend(1);
		restart = true;
	}
	
	if( (moving[2] ===1 && moving[4] === 1 && moving[6] ===1) )
	{
		theend(1);
		restart = true;
	}


//Checking Win Conditions for Player 2
	if( (moving[0] ===3 && moving[1] === 3 && moving[2] ===3) )

	{
		theend(0);
		restart = true;
	}
	
	if( (moving[3] ===3 && moving[4] === 3 && moving[5] ===3) )
	{
		theend(0);
		restart = true;
	}
	
	if( (moving[6] ===3 && moving[7] === 3 && moving[8] ===3) )
	{
		theend(0);
		restart = true;
	}
	
	if( (moving[0] ===3 && moving[3] === 3 && moving[6] ===3) )
	{
		theend(0);
		restart = true;
	}

	if( (moving[1] ===3 && moving[4] === 3 && moving[7] ===3) )
	{
		theend(0);
		restart = true;
	}
	
	if( (moving[2] ===3 && moving[5] === 3 && moving[8] ===3) )
	{
		theend(0);
		restart = true;
	}
	
	if( (moving[0] ===3 && moving[4] === 3 && moving[8] ===3) )
	{
		theend(0);
		restart = true;
	}
	
	if( (moving[2] ===3 && moving[4] === 3 && moving[6] ===3) )
	{
		theend(0);
		restart = true;
	}

}

var theend = function(a)
{
	if ( a === 1)
	{
		setMessage("Player 1 Wins! Play Again?");
		++win1;
	}
	else if(a ===0)
	{
		setMessage("Player 2 Wins! Play Again?");
		++win2;
	}
	else if(a ===3)
	{
		setMessage("It's a Tie! Play Again?");
		++tie;
	}
}

					

/*------------------------------
	handleClick will fill the square in with a letter
------------------------------*/
//Global Variables
var currentPlayer = 1;

function handleClick(squareID)
{
	var squares = document.querySelectorAll("#board button");
	
	if(currentPlayer===1 && moving[squareID] == 0)
	{		
		if(restart == false){
			squares[squareID].innerHTML = "<img src='https://mobi-summer-evan.s3.amazonaws.com/Tic%20Tac%20Toe/X.png' width = '50' height = '50'>";
			document.getElementById("P2Stats").style.opacity=1.0;
			document.getElementById("P1Stats").style.opacity=0.5;
			currentPlayer = 2;
			moving[squareID] = 1;
			setMessage("Player 2\'s move!");
		}
	}
	else if(currentPlayer ===2  && moving[squareID] == 0)
	{
		if(restart == false){
			squares[squareID].innerHTML = "<img src='https://mobi-summer-evan.s3.amazonaws.com/Tic%20Tac%20Toe/O.png' width = '60' height = '60'>";
			document.getElementById("P1Stats").style.opacity=1.0;
			document.getElementById("P2Stats").style.opacity=0.5;
			currentPlayer = 1;
			moving[squareID]=3;
			setMessage("Player 1\'s move!");
		}
	}

		if(sumx() ==17)
		{
			checkWin();
			if(restart == false)
			{
				restart = true;
				theend(3);
			}
		}
		else
		{
			checkWin();
		}
		
//reset button
	if(restart)
		{
		$('#reset').click(function()
		{
			moving = [0,0,0,0,0,0,0,0,0];
			restart = false;
			for( i = 0, len=squares.length; i<len; i++)
			{
				squares[i].innerHTML="";
			}
			setMessage("Player 1\'s move!");
			currentPlayer = 1;
			
		});
		}
		
		var movingText = JSON.stringify(moving);

		documentApi.update(myDocId,Update, {"moving" : movingText} , ReceiveUpdate, DidNotReceiveUpdate);
	
	}


function createClickHandler(squareID)
{
	return function()
	{
		handleClick(squareID);
	}
}
	
Omlet.ready(function() {

	var omletPackage = Omlet.getPasteboard();
	if(omletPackage)
	{
		moving = omletPackage.json;
		setMessage(moving);
		LoadGame();
		initDocument();
	}
	else{
			initDocument();
		}
});
	

	

/*------------------------------
	This will be called when the js file loads
------------------------------*/
$(document).ready(function(){
	setUpSquares();
	document.getElementById("P2Stats").style.opacity=0.5;
	setUpShare();
	
});