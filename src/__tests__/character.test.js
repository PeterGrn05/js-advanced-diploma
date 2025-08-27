import Character from "../js/Character";

test('new Character() выбрасывает результат', () => {
    expect(() => new Character(1)).toThrow('Нет смысла создавать нового Character()');
});