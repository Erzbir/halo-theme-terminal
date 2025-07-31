export class Terminal {
    constructor() {
        this._refreshFunctions = [];
        this._initFunctions = [];
        this.initialized = false;
    }

    registerRefresh(func) {
        this._refreshFunctions.push(func);
    }

    registerInitFunc(func) {
        this._initFunctions.push(func);
    }

    refresh() {
        if (!this.initialized) {
            this._initFunctions.forEach(func => func());
            this.initialized = true;
        }
        this._refreshFunctions.forEach(func => func());
    }
}

export var terminal = new Terminal();
window.terminal = terminal;