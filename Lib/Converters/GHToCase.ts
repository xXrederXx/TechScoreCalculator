import { NamedValue, Price, CaseSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCase(data: any, price: Price): CaseSpecs {
    return {
        MaxFormFactorSupport: TryConvert((d) => new NamedValue<string>(d["Mainboard max."], d["Mainboard max."]), data, new NamedValue<string>("", "-")),
        MaxGPULength: TryConvert((d) => new NamedValue<number>(parseGPU(d["Grafikkarten"]), d["Grafikkarten"]), data, new NamedValue<number>(0, "-")),
        MaxCPUCoolerHeight: TryConvert((d) => new NamedValue<number>(parseCooler(d["CPU-Kühler"]), d["CPU-Kühler"]), data, new NamedValue<number>(0, "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg.toFixed(2) + " High:" + price.max),
    };
}

function parseGPU(data: any): number {
    const regex = /(\d+)mm/g;
    const matches = [...data.matchAll(regex)].map(m => parseInt(m[1]));
    return matches.length > 0 ? Math.min(...matches) : 0;
}

function parseCooler(data: any): number {
    const regex = /(\d+)mm\s+Höhe/;
    const match = data.match(regex);
    return match ? parseInt(match[1]) : 0;
}
