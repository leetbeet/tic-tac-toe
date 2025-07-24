const createPlayer = (name, markType) => {
    return {
        getName() {
            return name;
        },
        getMarkType() {
            return markType;
        }
    }
}