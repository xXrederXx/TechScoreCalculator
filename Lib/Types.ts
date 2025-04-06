export interface CPUSpecs{
    Cores : NamedValue<number>,
    Threads: NamedValue<number>,
    BoostClock: NamedValue<number>,
    BaseClock: NamedValue<number>,
    TDP: NamedValue<number>,
    Architecture: NamedValue<string>,
    Chipsets: NamedValue<string[]>,
    HasIntegratedGraphic: NamedValue<boolean>,
    L2Cache: NamedValue<number>,
    L3Cache: NamedValue<number>,
    Socket: NamedValue<string>,
    DDRVersions: NamedValue<number[]>,
}

export interface SSDSpecs{
    Capacity: NamedValue<number>,
    ReadSpeed: NamedValue<number>,
    WriteSpeed: NamedValue<number>,
    IOPS4KRead: NamedValue<number>,
    IOPS4KWrite: NamedValue<number>,
}

export interface RAMSpecs {
    Speed: NamedValue<number>,
    DDRVersion: NamedValue<number>,
    CL: NamedValue<number>,
    tRCD: NamedValue<number>,
    tRP: NamedValue<number>,
    tRAS: NamedValue<number>
}

export class NamedValue<T>
{
    value: T;
    UserVersion: string;

    constructor(value:T, UserVersion:string) {
        this.value = value;
        this.UserVersion = UserVersion;
    }
}