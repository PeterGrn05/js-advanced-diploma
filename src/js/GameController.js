import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import { generateTeam } from "./generators";
import Pose from "./Pose";
import GameState from "./GameState";
import GameStateService from "./GameStateService";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.characters = [];
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    this.playerTeam = this.generatePlayerTeam();
    this.enemyTeam = this.generateenemyTeam();

    let indexesList = [];

    this.gamePlay.addNewGameListener(() => this.onNewGameClick());
    this.gamePlay.addSaveGameListener(() => this.onSaveGameClick());
    this.gamePlay.addLoadGameListener(() => this.onLoadGameClick());

    this.playerTeam.characters.forEach(element => {
      this.renderTeam(Pose.playerPosition(8), element, indexesList);
    });

    this.enemyTeam.characters.forEach(element => {
      this.renderTeam(Pose.enemyPosition(8), element, indexesList);
    });

    this.gamePlay.redrawPositions(this.characters);

    // Подписки на события
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  getCharacterInfo(character) {
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    const character = this.characters.find(ch => ch.position === index);
    if (character) {
      const message = this.getCharacterInfo(character.character);
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
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
  
  renderTeam(positions, element, indexesList) {
      let index = this.generateRandom(positions);
      if (!indexesList.includes(positions[index])) {
        indexesList.push(positions[index]);
        this.characters.push(new PositionedCharacter(element, positions[index]));
      } else {
        index = this.generateRandom(positions);
        indexesList.push(positions[index]);
        this.characters.push(new PositionedCharacter(element, positions[index]));
      }
  }


  onNewGameClick() {
    this.level = 1;
    this.characters = [];
    this.init();
  }

  onSaveGameClick() {
    GameState.from(this);
  }

  onLoadGameClick() {
    if (localStorage.state) {
      this.characters.forEach((char) => {
        this.gamePlay.deselectCell(char.position);
      })
      this.gamePlay.setCursor('default');
      let gameStateService = new GameStateService(localStorage);
      let gameState = gameStateService.load();
      this.characters = gameState.characters;
      this.level = gameState.level;
      this.status = gameState.status;
      this.gamePlay.redrawPositions(this.characters);
    }
  }
}
