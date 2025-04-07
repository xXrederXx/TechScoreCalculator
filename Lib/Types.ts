import { number } from "yargs";

export interface CPUSpecs{
    Price: NamedValue<Price>,
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
    Price: NamedValue<Price>,
    Capacity: NamedValue<number>,
    ReadSpeed: NamedValue<number>,
    WriteSpeed: NamedValue<number>,
    IOPS4KRead: NamedValue<number>,
    IOPS4KWrite: NamedValue<number>,
}

export interface RAMSpecs {
    Price: NamedValue<Price>,
    Speed: NamedValue<number>,
    DDRVersion: NamedValue<number>,
    CL: NamedValue<number>,
    tRCD: NamedValue<number>,
    tRP: NamedValue<number>,
    tRAS: NamedValue<number>
}

export interface GPUSpecs {
    Price: NamedValue<Price>,
    VRAM: NamedValue<number>, // in GB
    BaseClock: NamedValue<number>, // in MHz
    BoostClock: NamedValue<number>, // in MHz
    TDP: NamedValue<number>, // in Watts
    Size: NamedValue<number[]>, // x, y, z bzw. L B H
    AIInt8: NamedValue<number> // in TOPS
}

export interface MotherboardSpecs {
    Price: NamedValue<Price>,
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
    Price: NamedValue<Price>,
    Wattage: NamedValue<number>, // in Watts
    EfficiencyRating: NamedValue<string>, // e.g., "80+ Gold"
    Modular: NamedValue<boolean>,
    FormFactor: NamedValue<string>, // e.g., "ATX", "SFX"
}

export interface CaseSpecs {
    Price: NamedValue<Price>,
    MaxFormFactorSupport: NamedValue<string>, // e.g., ["ATX", "Micro-ATX"]
    MaxGPULength: NamedValue<number>, // in mm
    MaxCPUCoolerHeight: NamedValue<number>, // in mm
}

export interface CPUCoolerSpecs {
    Price: NamedValue<Price>,
    Height: NamedValue<number>, // in mm
    TDP: NamedValue<number>, // Cooling capacity in Watts
    SocketCompatibility: NamedValue<string[]>, // e.g., ["AM4", "LGA1700"]
    RadiatorSize: NamedValue<string | null>, // e.g., "240mm" for AIOs or null for air coolers
    Type: NamedValue<string>, // "Air" or "Liquid"
}

export interface PCSpecs{
    Price: NamedValue<Price>,
    CPU: CPUSpecs,
    GPU: GPUSpecs,
    RAM: RAMSpecs,
    SSD: SSDSpecs,
    Motherboard: MotherboardSpecs,
    PSU: PSUSpecs,
    Case: CaseSpecs,
    CPUCooler: CPUCoolerSpecs
}
export class Price
{
    min:number;
    max:number;
    avg:number;

    constructor(min: number, max: number, avg?: number) {
        this.min = min;
        this.max = max;
        this.avg = avg !== undefined ? avg : (min + max) / 2;
    }
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

export const defaultPcSpecs : PCSpecs = {
    Price: new NamedValue(new Price(0, 0), ""),
    CPU: {
        Price: new NamedValue(new Price(0, 0), ""),
        Cores: new NamedValue(0, ""),
        Threads: new NamedValue(0, ""),
        BoostClock: new NamedValue(0, ""),
        BaseClock: new NamedValue(0, ""),
        TDP: new NamedValue(0, ""),
        Architecture: new NamedValue("", ""),
        Chipsets: new NamedValue([], ""),
        HasIntegratedGraphic: new NamedValue(false, ""),
        L2Cache: new NamedValue(0, ""),
        L3Cache: new NamedValue(0, ""),
        Socket: new NamedValue("", ""),
        DDRVersions: new NamedValue([], "")
    },
    GPU: {
        Price: new NamedValue(new Price(0, 0), ""),
        VRAM: new NamedValue(0, ""),
        BaseClock: new NamedValue(0, ""),
        BoostClock: new NamedValue(0, ""),
        TDP: new NamedValue(0, ""),
        Size: new NamedValue([0, 0, 0], ""),
        AIInt8: new NamedValue(0, "")
    },
    RAM: {
        Price: new NamedValue(new Price(0, 0), ""),
        Speed: new NamedValue(0, ""),
        DDRVersion: new NamedValue(0, ""),
        CL: new NamedValue(0, ""),
        tRCD: new NamedValue(0, ""),
        tRP: new NamedValue(0, ""),
        tRAS: new NamedValue(0, "")
    },
    SSD: {
        Price: new NamedValue(new Price(0, 0), ""),
        Capacity: new NamedValue(0, ""),
        ReadSpeed: new NamedValue(0, ""),
        WriteSpeed: new NamedValue(0, ""),
        IOPS4KRead: new NamedValue(0, ""),
        IOPS4KWrite: new NamedValue(0, "")
    },
    Motherboard: {
        Price: new NamedValue(new Price(0, 0), ""),
        Socket: new NamedValue("", ""),
        Chipset: new NamedValue("", ""),
        FormFactor: new NamedValue("", ""),
        MemorySlots: new NamedValue(0, ""),
        SupportedMemoryTypes: new NamedValue([], ""),
        USBPorts: new NamedValue(0, ""),
        WIFISupport: new NamedValue(false, ""),
        BluetoothSupport: new NamedValue(false, "")
    },
    PSU: {
        Price: new NamedValue(new Price(0, 0), ""),
        Wattage: new NamedValue(0, ""),
        EfficiencyRating: new NamedValue("", ""),
        Modular: new NamedValue(false, ""),
        FormFactor: new NamedValue("", "")
    },
    Case: {
        Price: new NamedValue(new Price(0, 0), ""),
        MaxFormFactorSupport: new NamedValue("", ""),
        MaxGPULength: new NamedValue(0, ""),
        MaxCPUCoolerHeight: new NamedValue(0, "")
    },
    CPUCooler: {
        Price: new NamedValue(new Price(0, 0), ""),
        Height: new NamedValue(0, ""),
        TDP: new NamedValue(0, ""),
        SocketCompatibility: new NamedValue([], ""),
        RadiatorSize: new NamedValue(null, ""),
        Type: new NamedValue("", "")
    }
}