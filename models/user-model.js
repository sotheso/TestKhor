const pool = require("../utilities/mysql_database");

class UsersModel{
    static insertUser = async(name, email, password ) =>{
        const [result] = await pool.query(`insert into users
            (id, name, email, password)
            values( uuid(), ?, ?, ?)`, [name, email, password])
        return result
    }

    // تست اینکه یوزر تکراری نده
    static getUserByEmail = async (email) => {
        const [result] = await pool.query("select * from users where email = ?", [email])
        return result[0]
    }
}

module.exports = UsersModel