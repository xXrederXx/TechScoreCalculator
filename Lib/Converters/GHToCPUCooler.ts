import { NamedValue, Price, CPUCoolerSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToCPUCooler(data: any, price: Price): CPUCoolerSpecs {    
    return {
        Height: TryConvert((d) => new NamedValue<number>(parseHeight(d["Abmessungen mit Lüfter"].replace("mm", "")), d["Abmessungen mit Lüfter"]), data, new NamedValue<number>(0, "-")),
        TDP: TryConvert((d) => new NamedValue<number>(parseInt(d["TDP-Klassifizierung"].replace("W", "")), d["TDP-Klassifizierung"]), data, new NamedValue<number>(0, "-")),
        SocketCompatibility: TryConvert((d) => new NamedValue<string[]>(parseSocket(d), parseSocket(d).join(", ")), data, new NamedValue<string[]>([], "-")),
        RadiatorSize: TryConvert((d) => new NamedValue<string | null>(d["Radiator"] || null, d["Radiator"]), data, new NamedValue<string | null>(null, "-")),
        Type: TryConvert((d) => new NamedValue<string>(d["Typ"] || d["Bauart"], d["Typ"] || d["Bauart"]), data, new NamedValue<string>("", "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg.toFixed(2) + " High:" + price.max),
    };
}

function parseSocket(data: any): string[] {
    const regex = /AM\d|\d{4}/gm
    const intel = [...(data["Sockel Intel"]?.matchAll(regex) || [])].map(m => m[0]) || [];
    const amd = [...(data["Sockel AMD"]?.matchAll(regex) || [])].map(m => m[0]) || [];
    const compat = [...(data["Kompatibilität"]?.matchAll(regex) || [])].map(m => m[0]) || [];

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
