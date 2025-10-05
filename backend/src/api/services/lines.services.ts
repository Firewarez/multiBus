import db from "../../config/db";

export const getAllLines = async () => {
    const result = await db.query("SELECT * FROM lines ORDER BY id");
    return result.rows;
};

export const getLineById = async (id: number) => {
    const result = await db.query("SELECT * FROM lines WHERE id = $1", [id]);
    return result.rows[0];
};

export const createLine = async (line: { code: string; name: string }) => {
    const result = await db.query(
        "INSERT INTO lines (code, name) VALUES ($1, $2) RETURNING *",
        [line.code, line.name]
    );
    return result.rows[0];
};

export const updateLine = async (id: number, line: { code: string; name: string }) => {
    const result = await db.query(
        "UPDATE lines SET code = $1, name = $2 WHERE id = $3 RETURNING *",
        [line.code, line.name, id]
    );
    return result.rows[0];
};

export const deleteLine = async (id: number) => {
    await db.query("DELETE FROM lines WHERE id = $1", [id]);
};