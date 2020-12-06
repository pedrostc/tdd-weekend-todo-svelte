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

    with(pred) {
        const newModel = new TodoModel(this.id, this.text);
        newModel.done = this.done;
        
        pred(newModel);

        return newModel;
    }
}

export default TodoModel;