import Validator from "./Validator";

const validator = {
    label(value) {
        return +value > 2000 && +value <= new Date().getFullYear()
    }
}

class Grade extends Validator {
    constructor(option) {
        super(validator)
        this.label = option.label
    }
}

export default Grade