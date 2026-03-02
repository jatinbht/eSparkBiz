class Game {
    static level = 0
    static dimension = ++this.level

    static getDimension(){
        return this.dimension;
    }

    static incrementDimension(){
        return ++this.dimension;
    }
}
