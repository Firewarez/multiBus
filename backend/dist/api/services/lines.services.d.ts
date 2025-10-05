export declare const getAllLines: () => Promise<any[]>;
export declare const getLineById: (id: number) => Promise<any>;
export declare const createLine: (line: {
    code: string;
    name: string;
}) => Promise<any>;
export declare const updateLine: (id: number, line: {
    code: string;
    name: string;
}) => Promise<any>;
export declare const deleteLine: (id: number) => Promise<void>;
//# sourceMappingURL=lines.services.d.ts.map