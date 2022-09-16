import Validator from "./Validator";

class Building extends Validator {
    constructor(option) {
        super()
        this.building_code = option.building_code
        this.building_name = option.building_name
    }
}

export default Building
