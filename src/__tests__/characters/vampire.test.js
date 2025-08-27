import Vampire from "../../js/characters/Vampire";

test('new Character() выдаёт персонажа', () => {
    const character = new Vampire(1);
    const stats = {attack: 25, defence: 25, health: 50, level: 1, type: 'vampire'};
    expect(character).toEqual(stats)
});