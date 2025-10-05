export declare const getAllStops: () => Promise<any[]>;
export declare const getStopById: (id: number) => Promise<any>;
export declare const createStop: (stop: {
    name: string;
    latitude: number;
    longitude: number;
}) => Promise<any>;
export declare const updateStop: (id: number, stop: {
    name: string;
    latitude: number;
    longitude: number;
}) => Promise<any>;
export declare const deleteStop: (id: number) => Promise<void>;
//# sourceMappingURL=stops.services.d.ts.map