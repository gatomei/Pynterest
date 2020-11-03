export class KeyNotFoundException extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, KeyNotFoundException.prototype);
    }
}
