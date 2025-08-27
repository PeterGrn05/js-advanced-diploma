import Bowman from "../../js/characters/Bowman";

test('new Character() выдаёт персонажа', () => {
    const character = new Bowman(1);
    const stats = {attack: 25, defence: 25, health: 50, level: 1, type: 'bowman'};
    expect(character).toEqual(stats)
});