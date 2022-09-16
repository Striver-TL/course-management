
import Validator from "./Validator";

class Select extends Validator {
    constructor(option) {
        super()
        this.sno = option.sno
        this.aid = option.aid
    }
}

export default Select
