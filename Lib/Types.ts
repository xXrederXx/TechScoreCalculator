export interface CPUSpecs{
    Cores : number,
    Threads: number,
    BoostClock: number,
    BaseClock: number,
    TDP: number,
    Architecture: string,
    Chipsets: string[],
    HasIntegratedGraphic: boolean,
    L2Cache: number,
    L3Cache: number,
    Socket: string,
    DDRVersions: number[],
}

export interface SSDSpecs{
    Capacity: number,
    ReadSpeed: number,
    WriteSpeed: number,
    IOPS4KRead: number,
    IOPS4KWrite: number,
}