import { prisma } from "../../config/prisma";

export const getAllNotifications = async (filters?: {
    is_active?: boolean;
    type?: string;
    priority?: string;
}) => {
    const where: any = {};

    if (filters?.is_active !== undefined) {
        where.isActive = filters.is_active;
    }

    if (filters?.type) {
        where.type = filters.type;
    }

    if (filters?.priority) {
        where.priority = filters.priority;
    }

    return await prisma.notification.findMany({
        where,
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getActiveNotifications = async () => {
    const now = new Date();
    
    return await prisma.notification.findMany({
        where: {
            isActive: true,
            OR: [
                { startDate: null },
                { startDate: { lte: now } }
            ],
            AND: [
                {
                    OR: [
                        { endDate: null },
                        { endDate: { gte: now } }
                    ]
                }
            ]
        },
        orderBy: [
            { priority: 'desc' },
            { createdAt: 'desc' }
        ]
    });
};

export const getNotificationById = async (id: number) => {
    return await prisma.notification.findUnique({
        where: { id }
    });
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
    return await prisma.notification.create({
        data: {
            type: notification.type,
            title: notification.title,
            description: notification.description || null,
            isActive: notification.is_active !== undefined ? notification.is_active : true,
            priority: notification.priority || "media",
            startDate: notification.start_date ? new Date(notification.start_date) : null,
            endDate: notification.end_date ? new Date(notification.end_date) : null,
            affectedLines: notification.affected_lines || null,
            affectedStops: notification.affected_stops || null,
        }
    });
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
    const data: any = {};

    if (notification.type !== undefined) {
        data.type = notification.type;
    }

    if (notification.title !== undefined) {
        data.title = notification.title;
    }

    if (notification.description !== undefined) {
        data.description = notification.description;
    }

    if (notification.is_active !== undefined) {
        data.isActive = notification.is_active;
    }

    if (notification.priority !== undefined) {
        data.priority = notification.priority;
    }

    if (notification.start_date !== undefined) {
        data.startDate = notification.start_date ? new Date(notification.start_date) : null;
    }

    if (notification.end_date !== undefined) {
        data.endDate = notification.end_date ? new Date(notification.end_date) : null;
    }

    if (notification.affected_lines !== undefined) {
        data.affectedLines = notification.affected_lines;
    }

    if (notification.affected_stops !== undefined) {
        data.affectedStops = notification.affected_stops;
    }

    if (Object.keys(data).length === 0) {
        throw new Error("Nenhum campo para atualizar");
    }

    return await prisma.notification.update({
        where: { id },
        data
    });
};

export const deleteNotification = async (id: number) => {
    return await prisma.notification.delete({
        where: { id }
    });
};

export const toggleNotificationStatus = async (id: number) => {
    const notification = await prisma.notification.findUnique({
        where: { id }
    });

    if (!notification) {
        return null;
    }

    return await prisma.notification.update({
        where: { id },
        data: {
            isActive: !notification.isActive
        }
    });
};
