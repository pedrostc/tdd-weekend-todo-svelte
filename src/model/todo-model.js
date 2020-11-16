export class TodoModel {

    get id() {
        return this._id;
    }
    
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
    }

    get done() {
        return this._done;
    }
    set done(value) {
        this._done = value;
    }

    constructor(id, text) {
        this._id = id;
        this._text = text;
        this._done = false;
    }
}

export default TodoModel;