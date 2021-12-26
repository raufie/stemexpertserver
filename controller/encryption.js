const bcrypt = require("bcrypt")
//encrypt password
const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash

        console.log(hash)
    } catch (e) {
        console.log(e)
    }
}
//decrypt password
const comparePassord = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash)
        return result
    } catch (e) {
        console.log(e)
    }

}

exports.encryptPassword = encryptPassword
exports.comparePassword = comparePassord