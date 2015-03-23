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

  it('check that the Universe is not populated on the edges', function () {
    var xSize = scope.universe.xSize();
    var ySize = scope.universe.ySize();

    expect(scope.universe.returnCell(0,0).checkIfAtEdgeOfBoard()).toBe(true);
    expect(scope.universe.returnCell(0,ySize-1).checkIfAtEdgeOfBoard()).toBe(true);
    expect(scope.universe.returnCell(xSize-1,0).checkIfAtEdgeOfBoard()).toBe(true);
    expect(scope.universe.returnCell(xSize-1,ySize-1).checkIfAtEdgeOfBoard()).toBe(true);
  });

  /*
  it('check that start cells are alive [5][5],[6][5],[5][6]', function () {
    expect(scope.universe.gameBoard[5][5].isAlive).toBe(true);
    expect(scope.universe.gameBoard[5][6].isAlive).toBe(true);
    expect(scope.universe.gameBoard[6][5].isAlive).toBe(true);
  });
  */

  function returnAmountOfLiveNeighbours (universe, x, y) {
    var amountOfLiveNeighbours = 0;
        if(universe.returnCell(x-1,y-1).isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(universe.returnCell(x-1,y).isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(universe.returnCell(x-1,y+1).isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(universe.returnCell(x+1,y-1).isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(universe.returnCell(x+1,y).isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(universe.returnCell(x+1,y+1).isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(universe.returnCell(x,y+1).isAlive()) {
          amountOfLiveNeighbours++;
        }
        if(universe.returnCell(x,y-1).isAlive()) {
          amountOfLiveNeighbours++;
        }
        return amountOfLiveNeighbours;
  }

  it('Any cell with fewer than two live neighbours is dead', function () {
    var universe = scope.universe;
    var xSize = universe.xSize();
    var ySize = universe.ySize();
    for (var x = 1; x < xSize-1; x++) {
      for (var y = 1; y < ySize-1; y++) {

        var amountOfLiveNeighbours = 
          returnAmountOfLiveNeighbours(universe,x,y);

        if (amountOfLiveNeighbours < 2) {
          expect(universe.returnCell(x,y).isAlive()).toBe(false);
        }
      }
    }    
  });
  
  
  it('Any cell with more than three live neighbours is dead', function () {
    var universe = scope.universe;
    var xSize = universe.xSize();
    var ySize = universe.ySize();
    console.log(xSize + ' ' + ySize);
    console.log('X 1 2 3 4 5 6 7 8 9 10 11 12 13');
    for (var x = 1; x < xSize-1; x++) {
      var out = x + ' ';
      for (var y = 1; y < ySize-1; y++) {

        var amountOfLiveNeighbours = 
          returnAmountOfLiveNeighbours(scope.universe,x,y);

        
            out = out + amountOfLiveNeighbours + ' ';
        

        if (amountOfLiveNeighbours > 3) {
          expect(scope.universe.returnCell(x,y).isAlive()).toBe(false);
        }
      }
      console.log(out);
    } 
  });  
  /*
  it('Any cell with exactly three live neighbours is alive', function () {
    
  });
  */
});
