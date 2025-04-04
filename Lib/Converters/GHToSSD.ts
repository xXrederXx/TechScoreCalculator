import { SSDSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCPU(data: any): SSDSpecs {
    let ret = {
        Capacity: TryConvert<number>((d) => parseInt(d.Kapazität), data, 0),
        ReadSpeed: TryConvert<number>((d) => parseInt(d.Lesen), data, 0),
        WriteSpeed: TryConvert<number>((d) => parseInt(d.Schreiben), data, 0),
        IOPS4KRead: TryConvert<number>((d) => parseIOPSRead(d.Kerne), data, 0),
        IOPS4KWrite: TryConvert<number>((d) => parseIOPSWrite(d.Kerne), data, 0),
    };
    return ret;
}

function parseIOPSRead(data: string):number {
    const regex: RegExp = /(\d+)k lesend/g;
    let match;

    if ((match = regex.exec(data)) !== null) {
        return parseInt(match[1])
    }
    return 0
}


function parseIOPSWrite(data: string):number {
    const regex: RegExp = /(\d+)k schreibend/g;
    let match;

    if ((match = regex.exec(data)) !== null) {
        return parseInt(match[1])
    }
    return 0
}