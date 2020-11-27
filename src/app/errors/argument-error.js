export class ArgumentError extends Error {
    constructor() {
        super(`Параметр не определен!`);
    }
}
