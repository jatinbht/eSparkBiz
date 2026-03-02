import { States } from '../model/States.js';

export class Traffic {
    states = new States();
    #timerId = null;
    #isRunning = false;

    constructor(render) {
        this.states = new States();
        this.render = render;
    }

    start() {
        if (this.#isRunning === false) {
            this.#isRunning = true;
            this.render(this.states.getState());
            this.#schedule();
        } //do nothing if true
    }

    #schedule() {
        const state = this.states.getState(); //controller querying the model
        const delay = state.delay;

        this.#timerId = setTimeout(() => {
            this.states.nextState();
            this.render(this.states.getState());
            this.#schedule();
        }, delay);

        console.log(delay); //debug
    }
}
