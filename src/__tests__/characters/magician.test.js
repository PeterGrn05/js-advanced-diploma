import Magician from "../../js/characters/Magician";

test('new Character() выдаёт персонажа', () => {
    const character = new Magician(1);
    const stats = {attack: 10, defence: 40, health: 50, level: 1, type: 'magician'};
    expect(character).toEqual(stats)
});