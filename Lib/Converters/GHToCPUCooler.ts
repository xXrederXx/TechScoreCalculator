import { NamedValue, Price, CPUCoolerSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCPUCooler(data: any, price: Price): CPUCoolerSpecs {
    return {
        Height: TryConvert((d) => new NamedValue<number>(parseHeight(d["Höhe"].replace("mm", "")), d["Höhe"]), data, new NamedValue<number>(0, "-")),
        TDP: TryConvert((d) => new NamedValue<number>(parseInt(d["TDP-Klassifizierung"].replace("W", "")), d["TDP-Klassifizierung"]), data, new NamedValue<number>(0, "-")),
        SocketCompatibility: TryConvert((d) => new NamedValue<string[]>(parseSocket(d), parseSocket(d).join(", ")), data, new NamedValue<string[]>([], "-")),
        RadiatorSize: TryConvert((d) => new NamedValue<string | null>(d["Radiator"] || null, d["Radiator"]), data, new NamedValue<string | null>(null, "-")),
        Type: TryConvert((d) => new NamedValue<string>(d["Typ"], d["Typ"]), data, new NamedValue<string>("", "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg + " High:" + price.max),
    };
}

function parseSocket(data: any): string[] {
    const intel = data["Sockel Intel"]?.split(/,|\//).map((s:any) => s.trim()) || [];
    const amd = data["Sockel AMD"]?.split(/,|\//).map((s:any) => s.trim()) || [];
    const compat = data["Kompatibilität"]?.split(/,|\//).map((s:any) => s.trim()) || [];

    const all = [...intel, ...amd, ...compat];
    const unique = [...new Set(all)].filter(s => s.length > 0);

    const hints = [
        data["Hinweis Sockel AMD"] || "",
        data["Hinweis Sockel Intel"] || ""
    ].join(" ");

    return unique.map(sock => hints.includes(sock) ? `?${sock}` : sock);
}


function parseHeight(data: any): number {
    const regex = /\d+x(\d+)x\d+mm/;
    const match = data.match(regex);
    return match ? parseInt(match[1]) : 0;
}
