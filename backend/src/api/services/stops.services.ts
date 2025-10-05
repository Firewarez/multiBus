import db from "../../config/db";

export const getAllStops = async () => {
    const result = await db.query("SELECT * FROM stops ORDER BY id");
    return result.rows;
};

export const getStopById = async (id: number) => {
    const result = await db.query("SELECT * FROM stops WHERE id = $1", [id]);
    return result.rows[0];
};

export const createStop = async (stop: { name: string; latitude: number; longitude: number }) => {
    const result = await db.query(
        "INSERT INTO stops (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *",
        [stop.name, stop.latitude, stop.longitude]
    );
    return result.rows[0];
};

export const updateStop = async (id: number, stop: { name: string; latitude: number; longitude: number }) => {
    const result = await db.query(
        "UPDATE stops SET name = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *",
        [stop.name, stop.latitude, stop.longitude, id]
    );
    return result.rows[0];
};

export const deleteStop = async (id: number) => {
    await db.query("DELETE FROM stops WHERE id = $1", [id]);
};