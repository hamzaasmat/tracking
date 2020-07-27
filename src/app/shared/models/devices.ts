export interface Device {
    id?: number;
    attributes?: any[];
    groupId?: number;
    name: string;
    uniqueId?: number;
    status: string;
    lastUpdate: string;
    positionId?: number;
    geofenceIds?: any[];
    phone?: string;
    model?: string;
    contact?: string;
    category: string;
    disabled: boolean;
}