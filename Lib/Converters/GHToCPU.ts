import { CPUSpecs, NamedValue } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCPU(data: any): CPUSpecs {
    let ret = {
        Cores: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d.Kerne), d.Kerne), data, new NamedValue<number>(0, "-")),
        Threads: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d.Threads), d.Threads), data, new NamedValue<number>(0, "-")),
        BoostClock: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseFloat(d.Turbotakt.replace('GHz', '')), d.Turbotakt), data, new NamedValue<number>(0, "-")),
        BaseClock: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseFloat(d.Basistakt.replace('GHz', '')), d.Basistakt), data, new NamedValue<number>(0, "-")),
        TDP: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d.TDP.replace('W', '')), d.TDP), data, new NamedValue<number>(0, "-")),
        Architecture: TryConvert<NamedValue<string>>((d) => new NamedValue<string>(d.Architektur, d.Architektur), data, new NamedValue<string>("", "-")),
        Chipsets: TryConvert<NamedValue<string[]>>((d) => new NamedValue<string[]>(parseChipset(d["Chipsatz-Eignung"]), d["Chipsatz-Eignung"]), data, new NamedValue<string[]>([], "-")),
        HasIntegratedGraphic: TryConvert<NamedValue<boolean>>((d) => new NamedValue<boolean>(d.Grafik.toLowerCase() !== "nein", d.Grafik), data, new NamedValue<boolean>(false, "-")),
        L2Cache: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseFloat(d["L2-Cache"].replace('MiB', '')), d["L2-Cache"]), data, new NamedValue<number>(0, "-")),
        L3Cache: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseFloat(d["L3-Cache"].replace('MiB', '')), d["L3-Cache"]), data, new NamedValue<number>(0, "-")),
        Socket: TryConvert<NamedValue<string>>((d) => new NamedValue<string>(d.Sockel, d.Sockel), data, new NamedValue<string>("", "-")),
        DDRVersions: TryConvert<NamedValue<number[]>>((d) => new NamedValue<number[]>(parseDDRVersion(d.Speicherkompatibilität), d.Speicherkompatibilität), data, new NamedValue<number[]>([0], "-")),
        
    };
    return ret;
}

function parseDDRVersion(data: string) {
    const arr: number[] = [];
    const regex: RegExp = /DDR(\d)/g;
    let match;

    while ((match = regex.exec(data)) !== null) {
        const ver = parseInt(match[1]);
        if (!arr.includes(ver)) {
            arr.push(ver);
        }
    }
    return arr;
}


function parseChipset(data: string) {
    const arr: string[] = [];
    const regex: RegExp = /[A-Za-z][0-9]+[A-Z]?/g;
    let match;

    while ((match = regex.exec(data)) !== null) {
        const ver = match[0];
        if (!arr.includes(ver)) {
            arr.push(ver);
        }
    }
    return arr;
}