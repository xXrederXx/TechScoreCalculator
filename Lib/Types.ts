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

export interface GPUSpecs {
    VRAM: NamedValue<number>, // in GB
    BaseClock: NamedValue<number>, // in MHz
    BoostClock: NamedValue<number>, // in MHz
    TDP: NamedValue<number>, // in Watts
    Size: NamedValue<number[]>, // x, y, z bzw. L B H
    AIInt8: NamedValue<number> // in TOPS
}

export interface MotherboardSpecs {
    Socket: NamedValue<string>,
    Chipset: NamedValue<string>,
    FormFactor: NamedValue<string>, // e.g., "ATX", "mATX"
    MemorySlots: NamedValue<number>,
    SupportedMemoryTypes: NamedValue<number[]>, // DDR versions
    USBPorts: NamedValue<number>, // total count
    WIFISupport: NamedValue<boolean>,
    BluetoothSupport: NamedValue<boolean>,
}

export interface PSUSpecs {
    Wattage: NamedValue<number>, // in Watts
    EfficiencyRating: NamedValue<string>, // e.g., "80+ Gold"
    Modular: NamedValue<boolean>,
    FormFactor: NamedValue<string>, // e.g., "ATX", "SFX"
}

export interface CaseSpecs {
    FormFactorSupport: NamedValue<string[]>, // e.g., ["ATX", "Micro-ATX"]
    MaxGPULength: NamedValue<number>, // in mm
    MaxCPUCoolerHeight: NamedValue<number>, // in mm
}

export interface CPUCoolerSpecs {
    Height: NamedValue<number>, // in mm
    TDP: NamedValue<number>, // Cooling capacity in Watts
    SocketCompatibility: NamedValue<string[]>, // e.g., ["AM4", "LGA1700"]
    RadiatorSize: NamedValue<string | null>, // e.g., "240mm" for AIOs or null for air coolers
    Type: NamedValue<string>, // "Air" or "Liquid"
}

export interface PCSpecs{
    CPU: CPUSpecs,
    GPU: GPUSpecs,
    RAM: RAMSpecs,
    SSD: SSDSpecs,
    Motherboard: MotherboardSpecs,
    PSU: PSUSpecs,
    Case: CaseSpecs,
    CPUCooler: CPUCoolerSpecs
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