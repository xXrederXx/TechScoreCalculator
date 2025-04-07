import { NamedValue, Price, GPUSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToGPU(data: any, price: Price): GPUSpecs {
    const ret = {
        VRAM: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["Speicher"].replace("GB", "")), d["Speicher"]), data, new NamedValue<number>(0, "-")),
        BaseClock: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["Takt Basis"].replace("MHz", "")), d["Takt Basis"]), data, new NamedValue<number>(0, "-")),
        BoostClock: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["Takt Boost"].replace("MHz", "")), d["Takt Boost"]), data, new NamedValue<number>(0, "-")),
        TDP: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["TDP/TGP"].replace("W", "")), d["TDP/TGP"]), data, new NamedValue<number>(0, "-")),
        Size: TryConvert<NamedValue<number[]>>((d) => new NamedValue<number[]>(parseSize(d["Abmessungen"]), d["Abmessungen"]), data, new NamedValue<number[]>([], "-")),
        AIInt8: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseFloat(d["AI-Rechenleistung (INT8)"].replace("TOPS", "")), d["AI-Rechenleistung (INT8)"]), data, new NamedValue<number>(0, "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg + " High:" + price.max),
    };
    return ret;
}

function parseSize(data: string): number[] {
    const match = data.match(/(\d+)\s*x\s*(\d+)\s*x\s*(\d+)/);
    if (match) return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    return [];
}
