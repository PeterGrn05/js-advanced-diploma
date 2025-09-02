import Pose from "./Pose";
import { generateTeam } from "./generators";

export default class GameRule {
  constructor() {
    this.name = 'GameRule';
  }
  
  static generatePlayerTeam() {
    const playerTypes = ['Bowman', 'Swordsman', 'Magician'];
    return generateTeam(playerTypes, 3, 2);
  }

  static generateEnemyTeam() {
    const enemyTypes = ['Vampire', 'Undead', 'Daemon'];
    return generateTeam(enemyTypes, 3, 2);
  }

  static setActiveEnemy(characters, boardSize) {

    let board = Pose.createBoard(boardSize);
    let enemyTypes = ['vampire', 'undead', 'daemon'];

    let players = characters.filter((char) => !enemyTypes.includes(char.character.type));
    let enemies = characters.filter((char) => enemyTypes.includes(char.character.type));

    let playersLocation = players.map((player) => Pose.getLocation(player.position, board));

    let enemiesLocation = enemies.map((enemy) => Pose.getLocation(enemy.position, board));

    let closestEnemy = enemies[Pose.findClosest(enemiesLocation, Pose.getAverage(playersLocation))];

    localStorage.setItem('activeEnemy', closestEnemy.position)
    return closestEnemy;
  }

  static chooseEnemy(characters) {
    let activeEnemy = characters.filter((char) => char.position === Number(localStorage.activeEnemy));
    return activeEnemy;
  }

  static movementRadius(character, boardSize) {
    let radius = new Map([
      ['swordsman', 4],
      ['undead' , 4],
      ['bowman' , 2],
      ['vampire', 2],
      ['magician', 1],
      ['daemon' , 1]
    ])

    let movements = Pose.neighboringPositions(character.position, boardSize, radius.get(character.character.type));
    return movements;
  }

  static attackRadius(character, boardSize) {
    let radius = new Map([
      ['swordsman', 1],
      ['undead' , 1],
      ['bowman' , 2],
      ['vampire', 2],
      ['magician', 4],
      ['daemon' , 4]
    ])

    let attacks = Pose.neighboringPositions(character.position, boardSize, radius.get(character.character.type));
    return attacks;
  }

  static checkEnemyMoves(character, boardSize, characters) {
    let availableCells = GameRule.movementRadius(character, boardSize);
    let characterCells = characters.map((char) => char.position);
    let availableLocations = []
    availableCells.forEach((cell) => {
      if (!characterCells.includes(cell)) {
        availableLocations.push(Pose.getLocation(cell, Pose.createBoard(boardSize)));
      }
    })

    let playerLocation = Pose.getLocation(Number(localStorage.activePlayer), Pose.createBoard(boardSize));
    let closest = Pose.findClosest(availableLocations, playerLocation);
    return availableCells[closest];
  }

  static checkEnemyAttack(activeEnemy, players, boardSize) {
    let availableAttack = GameRule.attackRadius(activeEnemy, boardSize);
    let availableforAttack = [];
    players.forEach((char) => {
      if (availableAttack.includes(char.position)) {
        availableforAttack.push(char.position);
      }
    })
    return availableforAttack;
  }

  static calculateDamage(attacker, target) {
    let demage = Math.floor(Math.max(attacker.character.attack - target.character.defence, attacker.character.attack * 0.1));
    target.character.health -= demage;
    return demage;
  }

  static getPlayerCharacters(characters) {
    let gamerCharacters = ['bowman', 'swordsman', 'magician'];
    return characters.filter((char) => gamerCharacters.includes(char.character.type));
  }

  static getEnemyCharacters(characters) {
    let enemyCharacters = ['vampire', 'undead', 'daemon'];
    return characters.filter((char) => enemyCharacters.includes(char.character.type));
  }

  static getCharacterByIndex(index, characters) {
    return characters.filter((char) => char.position === index)[0];
  }
}