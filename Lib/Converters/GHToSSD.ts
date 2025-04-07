import { NamedValue, Price, SSDSpecs } from "../Types";
import { isNaNOrZero } from "../Util/Is";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToSSD(data: any, price:Price): SSDSpecs {
    let ret = {
        Capacity: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d.Kapazität), d.Kapazität), data, new NamedValue<number>(0, "-")),
        ReadSpeed: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d.Lesen), d.Lesen), data, new NamedValue<number>(0, "-")),
        WriteSpeed: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d.Schreiben), d.Schreiben), data, new NamedValue<number>(0, "-")),
        IOPS4KRead: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseIOPSRead(d["IOPS 4K"]), d["IOPS 4K"]), data, new NamedValue<number>(0, "-")),
        IOPS4KWrite: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseIOPSWrite(d["IOPS 4K"]), d["IOPS 4K"]), data, new NamedValue<number>(0, "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg + "High:" + price.max)

    };
    return ret;
}
export function CalculateSSDScores(data: SSDSpecs): string {
    const score = (data.ReadSpeed.value + data.WriteSpeed.value) * (data.IOPS4KRead.value + data.IOPS4KWrite.value) / 100000;
    if (isNaNOrZero(score)) {
        return "Cant Calculate Score"
    }
    return "Score: " + score.toFixed(2)
}

function parseIOPSRead(data: string): number {
    const regex: RegExp = /(\d+)k lesend/g;
    let match;

    if ((match = regex.exec(data)) !== null) {
        return parseInt(match[1])
    }
    return 0
}


function parseIOPSWrite(data: string): number {
    const regex: RegExp = /(\d+)k schreibend/g;
    let match;

    if ((match = regex.exec(data)) !== null) {
        return parseInt(match[1])
    }
    return 0
}