import Swordsman from "../../js/characters/Swordsman";

test('new Character() выдаёт персонажа', () => {
    const character = new Swordsman(1);
    const stats = {attack: 40, defence: 10, health: 50, level: 1, type: 'swordsman'};
    expect(character).toEqual(stats)
});