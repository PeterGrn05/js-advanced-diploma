import Daemon from "../../js/characters/Daemon";

test('new Character() выдаёт персонажа', () => {
    const character = new Daemon(1);
    const stats = {attack: 10, defence: 10, health: 50, level: 1, type: 'daemon'};
    expect(character).toEqual(stats)
});