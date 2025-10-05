export declare function getDirections(origin: string, destination: string): Promise<{
    summary: string;
    legs: Array<{
        distance: {
            text: string;
            value: number;
        };
        duration: {
            text: string;
            value: number;
        };
        start_address: string;
        end_address: string;
        steps: Array<any>;
    }>;
}>;
export declare function getCoordinates(address: string): Promise<{
    lat: number;
    lng: number;
}>;
//# sourceMappingURL=googleApi.services.d.ts.map