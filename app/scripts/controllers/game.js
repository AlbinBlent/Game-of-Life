'use strict';

var Cell = function () {
	var isAlive = false;
	var amountOfLiveNeighbours = 0;

	this.setAmountOfLiveNeighbours = function (amount) {
		amountOfLiveNeighbours = amount;
	};

	this.getAmountOfLiveNeighbours = function () {
		return amountOfLiveNeighbours;
	};

	this.spawn = function () {
		isAlive = true;
	};

	this.kill = function () {
		isAlive = false;
	};

	this.isAlive = function () {
		return isAlive;
	};
};

function cellInRange (x,y,xSize,ySize) {
    if (x < 0 || x > xSize-1 || y < 0 || y > ySize-1) {
      return false;
    } else {
      return true;
    }
}

function returnAmountOfLiveNeighbours(universe, x, y) {
	var xSize = universe.xSize();
    var ySize = universe.ySize();
    var amountOfLiveNeighbours = 0;
        
	if(cellInRange(x-1,y-1,xSize,ySize)) {
       	if(universe.returnCell(x-1,y-1).isAlive()) {
       		amountOfLiveNeighbours++;
       	}
    }  
        
    if(cellInRange(x-1,y,xSize,ySize)) {
       	if(universe.returnCell(x-1,y).isAlive()) {
       		amountOfLiveNeighbours++;
       	}
    }

    if(cellInRange(x-1,y+1,xSize,ySize)) { 
		if(universe.returnCell(x-1,y+1).isAlive()) {
       		amountOfLiveNeighbours++;
      	}
    }

    if(cellInRange(x+1,y-1,xSize,ySize)) { 
      	if(universe.returnCell(x+1,y-1).isAlive()) {
       		amountOfLiveNeighbours++;
       	}
    }

    if(cellInRange(x+1,y,xSize,ySize)) { 
      	if(universe.returnCell(x+1,y).isAlive()) {
       		amountOfLiveNeighbours++;
       	}
	}
        
    if(cellInRange(x+1,y+1,xSize,ySize)) {
       	if(universe.returnCell(x+1,y+1).isAlive()) {
       		amountOfLiveNeighbours++;
       	}
    }

    if(cellInRange(x,y+1,xSize,ySize)) { 
        if(universe.returnCell(x,y+1).isAlive()) {
        	amountOfLiveNeighbours++;
        }
	}
    
    if(cellInRange(x,y-1,xSize,ySize)) { 
        if(universe.returnCell(x,y-1).isAlive()) {
          	amountOfLiveNeighbours++;
        }
    }
    return amountOfLiveNeighbours;
}

function updateCellsAmountOfLiveNeighbours(universe) {
	var xSize = universe.xSize();
	var ySize = universe.ySize();

	for (var x = 0; x < xSize; x++) {
      	for (var y = 0; y < ySize; y++) {
	   		var amountOfLiveNeighbours = returnAmountOfLiveNeighbours(universe, x, y);
	   		universe.returnCell(x,y).setAmountOfLiveNeighbours(amountOfLiveNeighbours);     
	   	}
	}
}

// Cell alive
var cellAliveReady = false;
var cellAliveImage = new Image();
cellAliveImage.onload = function () {
	cellAliveReady = true;
};
cellAliveImage.src = 'images/monster-sad.png';

// Cell alive
var cellDeadReady = false;
var cellDeadImage = new Image();
cellAliveImage.onload = function () {
	cellDeadReady = true;
};
cellDeadImage.src = 'images/monster-mad.png';

// The main game loop
function mainGameLoop(universe) {
	var xSize = universe.xSize();
	var ySize = universe.ySize();

	// Create the canvas
	var canvas = document.getElementById('gameBoard');
	var ctx = canvas.getContext('2d');
	canvas.width = xSize*30;
	canvas.height = ySize*30;

	
		for (var x = 0; x < xSize; x++) {
			for (var y = 0; y < ySize; y++) {
		
			    if (universe.returnCell(x,y).isAlive()) {
					ctx.drawImage(cellAliveImage, x*30, y*30);      	
			    } else {
					ctx.drawImage(cellDeadImage, x*30, y*30);
			    }   
			}
	    }
	    
	setTimeout(function(){
    	universe.update();
    	mainGameLoop(universe);
	}, 2000);
}

var Universe = function (xSizeIn,ySizeIn) {
	
	var xSize = xSizeIn;
	var ySize = ySizeIn;

	var gameBoard = new Array(xSize);
	
	for (var x = 0; x < xSize; x++){
		gameBoard[x] = new Array(ySize);

		for (var y = 0; y < ySize; y++){
			gameBoard[x][y] = new Cell();
		}
	}

	this.returnCell = function (x,y) {
		return gameBoard[x][y];
	};

	this.xSize = function () {
		return xSize;
	};

	this.ySize = function () {
		return ySize;
	};

	this.update = function () {

	    updateCellsAmountOfLiveNeighbours(this);

		for (var x2 = 0; x2 < xSize; x2++) {
	    	for (var y2 = 0; y2 < ySize; y2++) {	
	    		
	    		var cell = this.returnCell(x2,y2);
	    		var amountOfLiveNeighbours = cell.getAmountOfLiveNeighbours();

	    		if (amountOfLiveNeighbours < 2) {
	    			cell.kill();
	    		}

	    		if (amountOfLiveNeighbours > 3) {
	    			cell.kill();
	    		}

	    		if (amountOfLiveNeighbours === 3) {
	    			cell.spawn();
	    		}
	    	}
		}
	};

	this.printToConsole = function () {
		var xSize = this.xSize();
		var ySize = this.ySize();
		console.log('------------------------------------');
		console.log('0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 X');
		console.log('------------------------------------');
		for (var x = 0; x < xSize; x++) {
			var out = '';   	
			for (var y = 0; y < ySize; y++) {

				var amountOfLiveNeighbours = returnAmountOfLiveNeighbours(this, x, y);
			     		
			    if (this.returnCell(x,y).isAlive()) {
			       	out = out + 'A ';
			      	
			    } else {
			       	out = out + amountOfLiveNeighbours + ' ';
			       	//out = out + '  ';
			    }   
			}
			out = out + ':' + x;
	        console.log(out);
	    }
	};

	this.start = function () {
		mainGameLoop(this);
	};
};

/**
 * @ngdoc function
 * @name gameoflifeApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the gameoflifeApp
 */
angular.module('gameoflifeApp')
  .controller('GameCtrl', function ($scope) {
    
    $scope.cell = new Cell();
    $scope.cell.spawn();
    $scope.universe = new Universe(15,15);
    $scope.universe.returnCell(4,4).spawn();
    $scope.universe.returnCell(4,5).spawn();

    $scope.universe.returnCell(7,3).spawn();
    $scope.universe.returnCell(7,4).spawn();
    $scope.universe.returnCell(7,5).spawn();
    $scope.universe.returnCell(7,6).spawn();
    $scope.universe.returnCell(7,7).spawn();

    $scope.universe.returnCell(10,9).spawn();
    $scope.universe.returnCell(10,10).spawn();
    $scope.universe.returnCell(10,11).spawn();
    $scope.universe.returnCell(11,10).spawn();
    $scope.universe.returnCell(11,11).spawn();

    $scope.universe.returnCell(14,14).spawn();
    $scope.universe.returnCell(13,14).spawn();
    $scope.universe.returnCell(14,13).spawn();
    
    $scope.universe.start();
  });