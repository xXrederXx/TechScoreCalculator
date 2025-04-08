import { CPUSpecs, NamedValue, Price } from "../Types";
import { isNaNOrZero } from "../Util/Is";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCPU(data: any, price: Price): CPUSpecs {
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
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg.toFixed(2) + " High:" + price.max)
    };
    return ret;
}

export function CalculateCPUScores(data: CPUSpecs): string {
    const speedScore = data.Threads.value * ((data.BaseClock.value + (2 * data.BoostClock.value)) / 3);
    const memScore = (data.L2Cache.value * 3 + data.L3Cache.value) / 4;
    if (isNaNOrZero(speedScore) && isNaNOrZero(memScore)) {
        return "Cant Calculate Scores"
    }
    if (isNaNOrZero(speedScore)) {
        return "Cant Calculate Speed Score - Memory Score: " + memScore.toFixed(2)
    }
    if (isNaNOrZero(memScore)) {
        return "Speed Score: " + speedScore.toFixed(2) + " - Cant Calculate Memory Score"
    }
    return "Speed Score: " + speedScore.toFixed(2) + " - Memory Score: " + memScore.toFixed(2)
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