import pool from "../../config/db";

export const getAllNotifications = async (filters?: {
    is_active?: boolean;
    type?: string;
    priority?: string;
}) => {
    let query = "SELECT * FROM notifications WHERE 1=1";
    const params: any[] = [];
    let paramCount = 1;

    if (filters?.is_active !== undefined) {
        query += ` AND is_active = $${paramCount}`;
        params.push(filters.is_active);
        paramCount++;
    }

    if (filters?.type) {
        query += ` AND type = $${paramCount}`;
        params.push(filters.type);
        paramCount++;
    }

    if (filters?.priority) {
        query += ` AND priority = $${paramCount}`;
        params.push(filters.priority);
        paramCount++;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    return result.rows;
};

export const getActiveNotifications = async () => {
    const query = `
    SELECT * FROM notifications 
    WHERE is_active = true 
    AND (start_date IS NULL OR start_date <= NOW())
    AND (end_date IS NULL OR end_date >= NOW())
    ORDER BY priority DESC, created_at DESC
  `;
    const result = await pool.query(query);
    return result.rows;
};

export const getNotificationById = async (id: number) => {
    const result = await pool.query("SELECT * FROM notifications WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

export const createNotification = async (notification: {
    type: string;
    title: string;
    description?: string;
    is_active?: boolean;
    priority?: string;
    start_date?: string;
    end_date?: string;
    affected_lines?: string;
    affected_stops?: string;
}) => {
    const query = `
    INSERT INTO notifications (
      type, title, description, is_active, priority, 
      start_date, end_date, affected_lines, affected_stops
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
    const values = [
        notification.type,
        notification.title,
        notification.description || null,
        notification.is_active !== undefined ? notification.is_active : true,
        notification.priority || "media",
        notification.start_date || null,
        notification.end_date || null,
        notification.affected_lines || null,
        notification.affected_stops || null,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const updateNotification = async (
    id: number,
    notification: {
        type?: string;
        title?: string;
        description?: string;
        is_active?: boolean;
        priority?: string;
        start_date?: string;
        end_date?: string;
        affected_lines?: string;
        affected_stops?: string;
    }
) => {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (notification.type !== undefined) {
        fields.push(`type = $${paramCount}`);
        values.push(notification.type);
        paramCount++;
    }

    if (notification.title !== undefined) {
        fields.push(`title = $${paramCount}`);
        values.push(notification.title);
        paramCount++;
    }

    if (notification.description !== undefined) {
        fields.push(`description = $${paramCount}`);
        values.push(notification.description);
        paramCount++;
    }

    if (notification.is_active !== undefined) {
        fields.push(`is_active = $${paramCount}`);
        values.push(notification.is_active);
        paramCount++;
    }

    if (notification.priority !== undefined) {
        fields.push(`priority = $${paramCount}`);
        values.push(notification.priority);
        paramCount++;
    }

    if (notification.start_date !== undefined) {
        fields.push(`start_date = $${paramCount}`);
        values.push(notification.start_date);
        paramCount++;
    }

    if (notification.end_date !== undefined) {
        fields.push(`end_date = $${paramCount}`);
        values.push(notification.end_date);
        paramCount++;
    }

    if (notification.affected_lines !== undefined) {
        fields.push(`affected_lines = $${paramCount}`);
        values.push(notification.affected_lines);
        paramCount++;
    }

    if (notification.affected_stops !== undefined) {
        fields.push(`affected_stops = $${paramCount}`);
        values.push(notification.affected_stops);
        paramCount++;
    }

    fields.push(`updated_at = NOW()`);

    if (fields.length === 1) {
        // Apenas updated_at foi adicionado
        throw new Error("Nenhum campo para atualizar");
    }

    const query = `
    UPDATE notifications 
    SET ${fields.join(", ")}
    WHERE id = $${paramCount}
    RETURNING *
  `;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const deleteNotification = async (id: number) => {
    const result = await pool.query(
        "DELETE FROM notifications WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

export const toggleNotificationStatus = async (id: number) => {
    const query = `
    UPDATE notifications 
    SET is_active = NOT is_active, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};
