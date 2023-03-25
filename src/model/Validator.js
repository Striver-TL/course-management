/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-20 14:43:40
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-19 16:42:11
 * @FilePath: \student-performance-server\model\Validator.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const validators = {}

class Validator {

    constructor(validator) {
        const name = this.constructor.name
        !validators[name] && (validators[name] = validator)
    }

    validValue(key, value) {
        return validators[this.constructor.name][key] && validators[this.constructor.name][key](value)
    }

    // 验证信息
    toValid(errMessages) {
        // 遍历所有私有属性
        const ownKeys = Reflect.ownKeys(this)
        for (let key of ownKeys) {
            // 先判断有没有该属性的验证器
            // 有的话在验证是否通过
            if (validators[this.constructor.name].hasOwnProperty(key) && !validators[this.constructor.name][key].call(validators[this.constructor.name], this[key])) return {
                err: true,
                key,
                message: errMessages && errMessages[key]
            }
        }
        this.afterValid && this.afterValid()
        return {
            err: false
        }
    }

    // 获取有效值，就是包含通过验证后的值的对象
    getValidValues() {
        // 创建对象
        // 存储有效的数据
        const result = {}
        // 对私有属性进行遍历
        Reflect.ownKeys(this).forEach(
            // 判断验证器是否有对于该属性的验证
            // 并且通过验证器
            // 最后将该属性值保存在对象中
            key => validators[this.constructor.name].hasOwnProperty(key) && validators[this.constructor.name][key](this[key]) && (result[key] = this[key])
        )
        return result
    }

    validData(errMessage) {
        // 获取验证结果
        const validResult = this.toValid()
        // 先判断是否包含违法数据
        if (validResult.err) {
            // 根据不同的key返回对应的错误信息
            const message = errMessage[validResult.key] || "未知错误"

            return {
                success: false,
                message
            }
        }
        return {
            success: true
        }
    }
}

export default Validator