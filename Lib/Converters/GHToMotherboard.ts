import { NamedValue, Price, MotherboardSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToMotherboard(data: any, price: Price): MotherboardSpecs {
    return {
        Socket: TryConvert((d) => new NamedValue<string>(d["Sockel"], d["Sockel"]), data, new NamedValue<string>("", "-")),
        Chipset: TryConvert((d) => new NamedValue<string>(d["Chipsatz"], d["Chipsatz"]), data, new NamedValue<string>("", "-")),
        FormFactor: TryConvert((d) => new NamedValue<string>(d["Formfaktor"], d["Formfaktor"]), data, new NamedValue<string>("", "-")),
        MemorySlots: TryConvert((d) => new NamedValue<number>(parseInt(d["RAM-Slots"]), d["RAM-Slots"]), data, new NamedValue<number>(0, "-")),
        SupportedMemoryTypes: TryConvert((d) => new NamedValue<number[]>(parseDDRArray(d["RAM-Slots"]), d["RAM-Slots"]), data, new NamedValue<number[]>([], "-")),
        USBPorts: TryConvert((d) => new NamedValue<number>(parseUSBPart(d["Anschlüsse extern"]), d["Anschlüsse extern"]), data, new NamedValue<number>(0, "-")),
        WIFISupport: TryConvert((d) => new NamedValue<boolean>(d["Wireless"]?.toLowerCase() !== "n/a", d["Wireless"]), data, new NamedValue<boolean>(false, "-")),
        BluetoothSupport: TryConvert((d) => new NamedValue<boolean>(d["Wireless"]?.toLowerCase() !== "n/a", d["Wireless"]), data, new NamedValue<boolean>(false, "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg.toFixed(2) + " High:" + price.max),
    };
}

function parseDDRArray(data: string): number[] {
    const matches = [...data.matchAll(/DDR(\d)/g)].map(m => parseInt(m[1]));
    return Array.from(new Set(matches));
}

function parseUSBPart(data: any): number {
    const regex = /\d+x\s+USB-[AC]\s+\d\.\d/g;
    const matches = data.match(regex);
    if (!matches) return 0;

    return matches.reduce((sum:any, part:any) => {
        const count = parseInt(part.split('x')[0].trim());
        return sum + (isNaN(count) ? 0 : count);
    }, 0);
}

