const pool = require('../utilities/mysql_database')

class PapersModel {
    // یرای نشون دادن تیبل ها از تابع async 
    // استفاده میکنیم
    // await : صبر کن کوئری اجرا بشه

    static getPapers = async()=>{
        const [result] = await pool.query('select * from papers') 
        return result
    }

    static getPaper = async(id)=>{
        const [result] = await pool.query(`select * from papers where id = ?`, [id]) 
        return result[0]
    }

    static insertPapers = async(title) =>{
        const [result] = await pool.query(`insert into papers(title) value (?)`, [title])
        // return { id : result.insertId, title : title}
        return getPaper(result.insertId)
    }

    static updatePaper = async(id, title) =>{
        const [result] = await pool.query(`update papers set title = ? where id =?`, [title, id])
        return getPaper(id)
    }

    static deletePaper = async(id)=>{
        const [result] = await pool.query(`delete from papers where id =?`, [id])
        return id
    }

    // Run Stored Procedures
    // این استور میاد ایدی های قبل اون ایدی ای که بهش دادیم رو نشون میده
    static callStoredProcedures = async(id)=>{
        const [result] = await pool.query(`call new_procedure (?)`, [id])
        return result[0]
    }
}

module.exports = PapersModel