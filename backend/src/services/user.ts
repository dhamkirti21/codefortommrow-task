import pool from "../db";

const getUsers = async () => {  
    const [rows] = await pool.query("SELECT * FROM user");
    return rows;
}

const insertUser = async (username: string, email: string, password: string) => {
    try {
        const res = await pool.query(
        "INSERT INTO user (username, email, password) VALUES (?, ?, ?)", 
        [username, email, password]
        );
        const result = JSON.parse(JSON.stringify(res)); 
        return result;
    } catch (error) {
        throw error
    }
}

const getUserByEmail = async (email: string) => {
    try {
        const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
        const result = JSON.parse(JSON.stringify(rows));
        return result;
    } catch (error) {
        throw error;
    }
}

const setUserPassword = async (userid: number, newPassword: string) => {
    try {
        const [rows] = await pool.query("UPDATE user SET password = ? WHERE id = ?", [newPassword, userid]);  
        const result = JSON.parse(JSON.stringify(rows));
        return result;
        
    } catch (error) {
        throw error;
    }

}
export {
    getUsers,
    insertUser,
    getUserByEmail,
    setUserPassword
}