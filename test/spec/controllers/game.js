'use strict';

describe('Controller: GameCtrl', function () {

  // load the controller's module
  beforeEach(module('gameoflifeApp'));

  var GameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameCtrl = $controller('GameCtrl', {
      $scope: scope
    });
  }));

  it('spawn a cell', function () {
    expect(scope.cell.isAlive()).toBe(true);
  });

  it('check Universe X size to be 15', function () {
    expect(scope.universe.xSize()).toBe(15);
  });

  it('check Universe Y size to be 15', function () {
    expect(scope.universe.ySize()).toBe(15);
  });

  /*
  it('check that the Universe is populated', function () {
    expect(scope.universe.gameBoard[2][2] instanceof Cell).toBeTruthy();
  });
*/
  it('check that the Universe is populated', function () {
    expect(scope.universe.returnCell(2,2)).not.toBeNull();
  });

  /*
  it('check that start cells are alive [5][5],[6][5],[5][6]', function () {
    expect(scope.universe.gameBoard[5][5].isAlive).toBe(true);
    expect(scope.universe.gameBoard[5][6].isAlive).toBe(true);
    expect(scope.universe.gameBoard[6][5].isAlive).toBe(true);
  });
  */
  /*
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
  */
  it('Any live cell with fewer than two live neighbours dies', function () {
    var universe = scope.universe;
    
    expect(universe.returnCell(4,4).isAlive()).toBe(false);
    expect(universe.returnCell(4,5).isAlive()).toBe(false);
         
  });
  
  
  it('Any live cell with more than three live neighbours dies', function () {
    var universe = scope.universe;
  
    expect(universe.returnCell(11,10).isAlive()).toBe(false);
     
  });  

  it('Any live cell with two or three live neighbours lives on', function () {
    var universe = scope.universe;
  
    expect(universe.returnCell(10,10).isAlive()).toBe(false);     
  });
  
  it('Any dead cell with exactly three live neighbours becomes a live cell', function () {
    var universe = scope.universe;
  
    expect(universe.returnCell(9,10).isAlive()).toBe(true);     
  }); 
});
