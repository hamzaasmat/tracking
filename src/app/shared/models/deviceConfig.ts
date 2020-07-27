export interface DeviceConfig {
    id?: any;
    name?: string;
    from: string;
    to: string;
}
export interface Device {
    id: number,
    attributes: {},
    groupId: string,
    name: string,
    uniqueId: number,
    status: string,
    lastUpdate: string,
    positionId: number,
    geofenceIds: any[],
    phone: number,
    model: number,
    contact: string,
    category: string,
    disabled: boolean
}
export interface DeviceRouute {
    valid: boolean;
    latitude: number;
    longitude: number;
    altitude: number;
    speed: number;
    course: number;
    address: string;
    attributes: [{
        distance: number;
        totalDistance: number;
    }]
}

export interface DeviceEvents {
    id: number;
    attributes: {};
    deviceId: number;
    type: string;
    serverTime: string;
    positionId: number;
    geofenceId: number;
    maintenanceId: number;
}
export interface DeviceTrips {
    deviceId: number;
    deviceName: string;
    maxSpeed: number;
    averageSpeed: number;
    distance: number;
    spentFuel: number;
    duration: number;
    startTime: string;
    startAddress: string;
    startLat: number;
    startLon: number;
    endTime: string;
    endAddress: string;
    endLat: number;
    endLon: number;
    driverUniqueId: number
    driverName: string;
}
export interface DevicePositions {
    deviceId: number;
    latitude: number;
    longitude: number;
    totalDistance: number;
    address: string;
}

export interface DeviceCoordinates {
    id: number;
    lat: number;
    lng: number;
    name?: any;
    course?: number;
    category?: any;
    speed?: number;
}