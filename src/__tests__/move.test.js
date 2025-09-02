import GameRule from "../js/Rules";
import PositionedCharacter from "../js/PositionedCharacter";
import Daemon from "../js/characters/Daemon";

test('Проверка движения', () => {
    let daemon = new Daemon(1);
    let positionedChatacter = new PositionedCharacter(daemon, 32)
    let expectedMove = [24, 25, 32, 33, 40, 41,]
    let result = GameRule.movementRadius(positionedChatacter, 8)
    expect(expectedMove).toEqual(result)
})