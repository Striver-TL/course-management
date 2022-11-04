
import Validator from "./Validator"

const validator = {
    username(username) {
        return typeof username === "string" && username.length >= 5 && username.length <= 16 && /^[\dA-Za-z]{5,16}$/g.test(username)
    },
    password(password) {
        return typeof password === "string" && password.length >= 6 && password.length <= 18 && /^[A-Za-z][\w~`!@#$%^&*()_+=-|\\\][:";'?/><,.]/g.test(password)
    },
    type(type) {
        return ["1", "2"].indexOf(type) !== -1
    }
}

class User extends Validator {
    constructor({ username, password, type }) {
        super(validator)
        this.username = username
        this.password = password
        this.type = type
    }
}

export default User
