import GamePlay from "./GamePlay";
import Bowman from "./characters/Bowman";
import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import { generateTeam } from "./generators";
import Pose from "./Pose";
export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    this.playerTeam = this.generatePlayerTeam();
    this.enemyTeam = this.generateenemyTeam();

    let positionedList = [];
    let indexesList = [];

    this.playerTeam.characters.forEach(element => {
      let playerPositions = Pose.playerPosition(8);
      let index = this.generateRandom(playerPositions);

      if (!indexesList.includes(index)) {
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, playerPositions[index]));
      } else {
        index = this.generateRandom(playerPositions);
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, playerPositions[index]));
      }
    });

    this.enemyTeam.characters.forEach(element => {
      let enemyPositions = Pose.enemyPosition(8);
      let index = this.generateRandom(enemyPositions);

      if (!indexesList.includes(index)) {
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, enemyPositions[index]));
      } else {
        index = this.generateRandom(enemyPositions);
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, enemyPositions[index]));
      }
    });

    this.gamePlay.redrawPositions(positionedList);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }

  generatePlayerTeam() {
    const playerTypes = ['Bowman', 'Swordsman', 'Magician'];
    return generateTeam(playerTypes, 3, 2);
  }

  generateenemyTeam() {
    const enemyTypes = ['Vampire', 'Undead', 'Daemon'];
    return generateTeam(enemyTypes, 3, 2);
  }

  generateRandom(array) {
    return Math.floor(Math.random() * array.length);
  }
}
