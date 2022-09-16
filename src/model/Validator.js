/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-24 17:43:07
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-11 17:00:31
 * @FilePath: \student-performance\src\model\Validator.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import validator from "@/utils/validator"

// 验证数据的类
class Validator {
    /**
     * 用于验证类的数据
     * @returns { Object } 验证的结果
     */
    toValid() {
        // 处理验证结果
        const validResult = {
            // 是否有错误
            err: false
        }
        // 遍历对象中的所有私有属性
        Reflect.ownKeys(this).forEach(
            key => {
                // 先判断是否有对该属性的验证
                // 然后进行验证 
                if (!validator[key] || !validator[key](this[key])) {
                    // 标记错误
                    validResult.err = true
                    // 存储错误的属性
                    validResult.key = key
                    // 存储错误的值
                    validResult.value = this[key]
                }
            }
        )
        // 返回验证的结果
        return validResult
    }

    /**
     * 用于返回通过验证的数据
     * @returns { Object } 通过验证的数据
     */
    getValidValues() {
        const result = {}
        // 遍历对象中的所有私有属性
        Reflect.ownKeys(this).forEach(
            key => (
                // 短路与
                // 先判断是否有对该属性的验证
                // 再进行验证
                // 前者条件都达到了进行数据保存
                !validator[key] || (validator[key](this[key]) && (result[key] = this[key]))
            )
        )
        // 返回数据
        return result
    }
}

export default Validator