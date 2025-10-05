declare const CITY_CONFIG: {
    name: string;
    state: string;
    centerCoordinates: {
        lat: number;
        lng: number;
    };
};
declare const CITY_STOPS: {
    name: string;
    address: string;
    lat: number | null;
    lng: number | null;
}[];
declare const CITY_LINES: {
    code: string;
    name: string;
    stops: string[];
}[];
declare function seedBrazilianCity(): Promise<void>;
export { seedBrazilianCity, CITY_CONFIG, CITY_STOPS, CITY_LINES };
//# sourceMappingURL=seedCityData.d.ts.map