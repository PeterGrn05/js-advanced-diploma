import Undead from "../../js/characters/Undead";

test('new Character() выдаёт персонажа', () => {
    const character = new Undead(1);
    const stats = {attack: 40, defence: 10, health: 50, level: 1, type: 'undead'};
    expect(character).toEqual(stats)
});