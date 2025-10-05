import { Request, Response } from "express";
export declare const getAllLines: (req: Request, res: Response) => Promise<void>;
export declare const getLineById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createLine: (req: Request, res: Response) => Promise<void>;
export declare const updateLine: (req: Request, res: Response) => Promise<void>;
export declare const deleteLine: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=lines.controller.d.ts.map