export class States {
    // #roads = ['north', 'east', 'south', 'west']; //this belongs to ui
    #roadNumber = 4 //hardcoded temporarily can be made to be configured using constructor
    #phase = 'green';
    #activeIndex = 0;

    getPhase(){
        return this.#phase
    }

    nextState() {
        // const state = this.states.getStates();
    
        if (this.#phase === 'green') {
            this.#phase='yellow'
        } else { 
            this.#activeIndex = (this.#activeIndex + 1) % this.#roadNumber;
            this.#phase='green';
        }
        console.log(this.#activeIndex, this.#phase); //debug
        
        // renderOrEmitState(state); //this would be in this file (the model)
    }

    getState(){
        return {
            phase: this.#phase,
            activeIndex: this.#activeIndex,
            delay: this.#phase === 'green' ? 5000 : 2000
        };
    }

    

}
