import { CPUSpecs } from "../Types";
import { isChar, isNumber } from "../Util/Is";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCPU(data: any) : CPUSpecs {
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
        DDRVersion: TryConvert<number>((d) => parseInt(d.Speicherkompatibilität.match(/DDR(\d+)/)?.[1] || '4'), data, 0),
    };
    return ret;
}


function parseChipset(data:string) {
    let arr : string[] = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(isChar(element))
        {
            let name = element
            for (let j = 1; j < 4; j++) {
                const letter = data[i + j];
                if(isNumber(letter))
                {
                    name += letter;
                }
                if(j === 3 && name.length === 4) {
                    arr.push(name)
                }
            }
        }
    }
    return arr;
}


  