import { CPUSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCPU(data: any): CPUSpecs {
    let ret = {
        Cores: TryConvert<number>((d) => parseInt(d.Kerne), data, 0),
        Threads: TryConvert<number>((d) => parseInt(d.Threads), data, 0),
        BoostClock: TryConvert<number>((d) => parseFloat(d.Turbotakt.replace('GHz', '')), data, 0),
        BaseClock: TryConvert<number>((d) => parseFloat(d.Basistakt.replace('GHz', '')), data, 0),
        TDP: TryConvert<number>((d) => parseInt(d.TDP.replace('W', '')), data, 0),
        Architecture: TryConvert<string>((d) => d.Architektur, data, "-"),
        Chipsets: TryConvert<string[]>((d) => parseChipset(d["Chipsatz-Eignung"]), data, ["-"]),
        HasIntegratedGraphic: TryConvert<boolean>((d) => d.Grafik.toLowerCase() !== "nein", data, false),
        L2Cache: TryConvert<number>((d) => parseFloat(d["L2-Cache"].replace('MiB', '')), data, 0),
        L3Cache: TryConvert<number>((d) => parseFloat(d["L3-Cache"].replace('MiB', '')), data, 0),
        Socket: TryConvert<string>((d) => d.Sockel, data, "-"),
        DDRVersions: TryConvert<number[]>((d) => parseDDRVersion(d.Speicherkompatibilität), data, [0]),
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