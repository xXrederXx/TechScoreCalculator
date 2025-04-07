import { strict } from "yargs";
import { NamedValue, Price, PSUSpecs } from "../Types";
import { TryConvert } from "../Util/TryConvert";

export function ConvertToPSU(data: any, price: Price): PSUSpecs {
    return {
        Wattage: TryConvert((d) => new NamedValue<number>(parseWattage(d["Max. Combined Power"].replace("W", "")), d["Max. Combined Power"]), data, new NamedValue<number>(0, "-")),
        EfficiencyRating: TryConvert((d) => new NamedValue<string>(parseEfficency(d["Effizienz"]), d["Effizienz"]), data, new NamedValue<string>("", "-")),
        Modular: TryConvert((d) => new NamedValue<boolean>(d["Kabelmanagement"]?.toLowerCase() === "vollmodular", d["Kabelmanagement"]), data, new NamedValue<boolean>(false, "-")),
        FormFactor: TryConvert((d) => new NamedValue<string>(d["Formfaktor"], d["Formfaktor"]), data, new NamedValue<string>("", "-")),
        Price: new NamedValue<Price>(price, "Low:" + price.min + " Mid:" + price.avg + " High:" + price.max),
    };
}

function parseWattage(data: any): number {
    const regex = /(\d+)\s*W/g;
    const matches = [...data.matchAll(regex)].map(m => parseInt(m[1]));
    return matches.length > 0 ? Math.max(...matches) : 0;
}


function parseEfficency(data: any): string {
    const certSources = [
        data["Zertifikate laut Hersteller"],
        data["Zertifikate laut 80 PLUS"]
    ];

    const efficiencyRegex = /80\s*PLUS\s*(\w+)?/i;
    for (const source of certSources) {
        const match = source?.match(efficiencyRegex);
        if (match) return "80 PLUS " + (match[1] || "").toUpperCase();
    }

    const avgEff = data["Durchschnittliche Effizienz"];
    const percentRegex = /(\d{2,3})%/;
    const percentMatch = avgEff?.match(percentRegex);
    if (percentMatch) return percentMatch[1] + "%";

    return "none";
}
