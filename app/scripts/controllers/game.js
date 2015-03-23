'use strict';

var Cell = function () {
	var isAlive = false;
	var isAtEdgeOfBoard = false;

	this.spawn = function () {
		isAlive = true;
	};

	this.kill = function () {
		isAlive = false;
	};

	this.isAlive = function () {
		return isAlive;
	};

	this.setAtEdgeOfBoard = function () {
		isAtEdgeOfBoard = true;
	};

	this.checkIfAtEdgeOfBoard = function () {
		return isAtEdgeOfBoard;
	};
};

function returnAmountOfLiveNeighbours(gameBoard, x, y) {
	var amountOfLiveNeighbours = 0;
	

		if(gameBoard[x-1][y-1].isAlive()) {
        amountOfLiveNeighbours++;
    	}
    	if(gameBoard[x-1][y].isAlive()) {
   		amountOfLiveNeighbours++;
        }
        if(gameBoard[x-1][y+1].isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(gameBoard[x+1][y-1].isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(gameBoard[x+1][y].isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(gameBoard[x+1][y+1].isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(gameBoard[x][y+1].isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(gameBoard[x][y-1].isAlive()) {
          amountOfLiveNeighbours++;
        }
        return amountOfLiveNeighbours;
}

var Universe = function (xSizeIn,ySizeIn) {
	
	var gameBoard = new Array(xSizeIn);
	var xSize = xSizeIn;
	var ySize = ySizeIn;
	
	for (var x = 0; x < xSize; x++){
		gameBoard[x] = new Array(ySize);

		for (var y = 0; y < ySize; y++){
			gameBoard[x][y] = new Cell();
			if (x === 0 || y === 0 || x === xSize-1 || 
				y === ySize-1) {
				gameBoard[x][y].setAtEdgeOfBoard();			
			}
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
		//console.log('X 1 2 3 4 5 6 7 8 9 10 11 12 13');
	    for (var x = 1; x < xSize-1; x++) {
	    	var out = x+ ' ';
	      for (var y = 1; y < ySize-1; y++) {

	        var amountOfLiveNeighbours = 
	        	returnAmountOfLiveNeighbours(gameBoard, x, y);

	        if (gameBoard[x][y].isAlive()) {
	        	out = out + 'A ';
	        	
	        } else {
	        	out = out + amountOfLiveNeighbours + ' ';
	        }
	        /*
	        if (amountOfLiveNeighbours < 2) {
	        	gameBoard[x][y].kill();
	        }
	        */
	      }

        //console.log(out);

	    }
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
    

    $scope.universe.update();
  });