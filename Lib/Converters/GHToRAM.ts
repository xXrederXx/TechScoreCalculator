import { NamedValue, Price, RAMSpecs } from "../Types";
import { isNaNOrZero } from "../Util/Is";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToRAM(data: any, price: Price): RAMSpecs {
    let ret = {
        Speed: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d.Übertragung), d.Übertragung), data, new NamedValue<number>(0, "-")),
        DDRVersion: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseDDRVersion(d.Typ), d.Typ), data, new NamedValue<number>(0, "-")),
        CL: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["CAS Latency CL"]), d["CAS Latency CL"]), data, new NamedValue<number>(0, "-")),
        tRCD: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["Row-to-Column Delay tRCD"]), d["Row-to-Column Delay tRCD"]), data, new NamedValue<number>(0, "-")),
        tRP: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["Row Precharge Time tRP"]), d["Row Precharge Time tRP"]), data, new NamedValue<number>(0, "-")),
        tRAS: TryConvert<NamedValue<number>>((d) => new NamedValue<number>(parseInt(d["Active-to-Precharge Time tRAS"]), d["Active-to-Precharge Time tRAS"]), data, new NamedValue<number>(0, "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg + " High:" + price.max)

    };
    return ret;
}
export function CalculateRAMScores(data: RAMSpecs): string {
    const speed = 1000 / data.Speed.value
    const delay = (data.CL.value + data.tRCD.value + data.tRP.value)
    const totalDelay = delay + (speed * 1000)
    const score = 1_000_000 * Math.pow(totalDelay, -2)
    if (isNaNOrZero(score)) {
        return "Cant Calculate Score"
    }
    return "Score: " + score.toFixed(2)
}

function parseDDRVersion(data: string) {
    const regex = /DDR(\d)/g.exec(data)
    if (regex !== null) {
        return parseInt(regex[1])
    }
    return 0
}
