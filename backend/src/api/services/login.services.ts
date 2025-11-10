import db from "../../config/db";


export const updateUser = async (userId: string, username: string, email: string, cpf: string, telefone: string, passwordHash: string) => {
    const result = await db.query(
        "UPDATE users SET username = $1, email = $2, cpf = $3, telefone = $4, password_hash = $5 WHERE id = $6 RETURNING *",
        [username, email, cpf, telefone, passwordHash, userId]
    );
    return result.rows[0];
}

export const registerUser = async (username: string,email: string, cpf: string, telefone: string, passwordHash: string) => {
    const result = await db.query(
        "INSERT INTO users (username, email, cpf, telefone, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, email, cpf, telefone, passwordHash]
    );
    return result.rows[0];
}