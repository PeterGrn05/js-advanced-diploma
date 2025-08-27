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
}