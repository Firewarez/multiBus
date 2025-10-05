export declare const getAllRoutes: () => Promise<any[]>;
export declare const getRouteById: (id: number) => Promise<any>;
export declare const createRoute: (route: {
    line_id: number;
    direction: string;
}) => Promise<any>;
export declare const updateRoute: (id: number, route: {
    line_id: number;
    direction: string;
}) => Promise<any>;
export declare const deleteRoute: (id: number) => Promise<void>;
export declare const getRoutesByLine: (lineId: number) => Promise<any[]>;
export declare const getRouteStops: (routeId: number) => Promise<any[]>;
export declare const addStopToRoute: (routeId: number, stopData: {
    stop_id: number;
    stop_order: number;
}) => Promise<any>;
export declare const removeStopFromRoute: (routeId: number, stopId: number) => Promise<void>;
//# sourceMappingURL=routes.services.d.ts.map