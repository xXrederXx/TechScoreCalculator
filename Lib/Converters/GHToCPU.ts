import { CPUSpecs } from "../Types";
import { isChar, isNumber } from "../Util/Is";

export function ConvertToCPU(data: any) : CPUSpecs {
    return {
        Cores: parseInt(data.Kerne),
        Threads: parseInt(data.Threads),
        BoostClock: parseFloat(data.Turbotakt.replace('GHz', '')),
        BaseClock: parseFloat(data.Basistakt.replace('GHz', '')),
        TDP: parseInt(data.TDP.replace('W', '')),
        Architecture: data.Architektur,
        Chipsets: parseChipset(data["Chipsatz-Eignung"]),
        HasIntegratedGraphic: data.Grafik.toLowerCase() !== "nein",
        L2Cache: parseFloat(data["L2-Cache"].replace('MiB', '')),
        L3Cache: parseFloat(data["L3-Cache"].replace('MiB', '')),
        Socket: data.Sockel,
        DDRVersion: parseInt(data.Speicherkompatibilität.match(/DDR(\d+)/)?.[1] || '4'),
    };
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


  