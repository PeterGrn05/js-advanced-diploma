export default class Pose {
    static playerPosition(size) {
    let playerIndexes = [];
    let first = 0;
    let second = 1;

    for (let i = 0; i < size - 1 ; i++) {
      playerIndexes.push(first);
      playerIndexes.push(second);
      first += size;
      second += size;
    }
    return playerIndexes;
  }

  static enemyPosition(size) {
    let enemyIndexes = [];
    let third = size - 2;
    let fourth = size - 1;

    for (let i = 0; i < size - 1 ; i++) {
      enemyIndexes.push(third);
      enemyIndexes.push(fourth);
      third += size;
      fourth += size;
    }
    return enemyIndexes;
  }
  
  static createLine(index, size) {
    let line = [];
    for (let i = 0; i < size; i++) {
      line.push(index);
      index++;
    }
    return line;
  }

  static createBoard(size) {
    let board = [];
    let index = 0;

    for (let i = 0; i < size ; i++) {
      board.push(Pose.createLine(index, size));
      index += size; 
    }
    return board;
  }

  static getLocation(current, board) {
    let line = undefined;
    let column = undefined;
    let location = [];

    board.forEach((item, index) => {
      if (item.indexOf(current) !== -1) {
        column = item.indexOf(current);
        line = index;
      }
    })
    location.push(line);
    location.push(column);
    return location;
  }

  static neighboringPositions(current, size, radius) {
    let board = Pose.createBoard(size);
    let location = Pose.getLocation(current, board);

    let line = location[0];
    let column = location[1];
    let neighbors = [];

    let neighborLines = [line];
    for (let i = 1; (i <= radius); i++) {
      let next = line + i;
      if (next > -1 && next < size) {
        neighborLines.push(next);
      }

      let previous = line - i;
      if (previous > -1 && previous < size) {
        neighborLines.push(previous);
      }
    }

    let neighborCulumns = [column];
    for (let i = 1; i <= radius; i++) {
      let next = column + i;

      if (next > -1 && next < size) {
        neighborCulumns.push(next);
      }
      let previous = column - i;

      if (previous > -1 && previous < size) {
        neighborCulumns.push(previous);
      }
    }

    neighborLines = neighborLines.sort((a,b) => a - b );
    neighborCulumns = neighborCulumns.sort((a,b) => a - b );

    for (let i = 0; i < neighborLines.length; i++) {
      for (let j = 0; j < neighborCulumns.length; j++) {
        neighbors.push((board[neighborLines[i]][neighborCulumns[j]]))
      }
    }
    return neighbors;
  }

  static getAverage(array) {
    let line = 0;
    let column = 0;
    for (let i = 0; i < array.length; i++) {
      line +=array[i][0];
      column +=array[i][1];
    }

    let average = [Math.floor(line/array.length), Math.floor(column/array.length)];
    return average; 
  }

  static findClosest(enemies, average) {
    let distance = [];
    enemies.forEach(enemy => {
      let a = Math.abs(enemy[0] - average[0]);
      let b = Math.abs(enemy[1] - average[1]);
      distance.push(Math.sqrt(a^2 + b^2));
      }
    );
    const min = (values) => values.reduce((x, y) => Math.min(x, y));
    return distance.indexOf(min(distance)); 
  }

  static generateRandom(array) {
    return Math.floor(Math.random() * array.length);
  }
}