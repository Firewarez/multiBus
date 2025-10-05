import { Request, Response } from "express";
export declare const getAllStops: (req: Request, res: Response) => Promise<void>;
export declare const getStopById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createStop: (req: Request, res: Response) => Promise<void>;
export declare const updateStop: (req: Request, res: Response) => Promise<void>;
export declare const deleteStop: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=stops.controller.d.ts.map