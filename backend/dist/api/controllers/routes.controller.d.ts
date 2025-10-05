import { Request, Response } from "express";
export declare const getAllRoutes: (req: Request, res: Response) => Promise<void>;
export declare const getRouteById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createRoute: (req: Request, res: Response) => Promise<void>;
export declare const updateRoute: (req: Request, res: Response) => Promise<void>;
export declare const deleteRoute: (req: Request, res: Response) => Promise<void>;
export declare const getRoutesByLine: (req: Request, res: Response) => Promise<void>;
export declare const getRouteStops: (req: Request, res: Response) => Promise<void>;
export declare const addStopToRoute: (req: Request, res: Response) => Promise<void>;
export declare const removeStopFromRoute: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=routes.controller.d.ts.map