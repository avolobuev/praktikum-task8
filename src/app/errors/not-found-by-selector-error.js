export class NotFoundBySelectorError extends Error {
    constructor(elementSelector) {
        super(`Элемент по селектору ${elementSelector} не найден`);
    }
}
