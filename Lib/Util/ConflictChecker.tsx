import { PreStyle, theme } from "../theme";
import { PCSpecs } from "../Types";
import { Text, View, StyleSheet } from 'react-native';
import { getInterpolatedColorSlider } from "./ColorLERP";


type Severity = "info" | "warning" | "error";

const severityRank: Record<Severity, number> = {
    error: 0,
    warning: 1,
    info: 2
};


interface Conflict {
    severity: Severity;
    message: string;
}


function RenderConflict({ severity, message }: { severity: Severity, message: string }): React.JSX.Element {
    let emoji = severity === "error" ? "❌" : severity === "warning" ? "⚠️" : "ℹ️";
    let color = severity === "error" ? "red" : severity === "warning" ? "orange" : "gray";

    return (
        <Text style={[PreStyle.text, { padding: theme.spacing.sm, color }]}>{`${emoji} ${message}`}</Text>
    );
}

export function CheckForConflicts(data: PCSpecs): React.JSX.Element[] {
    const rawConflicts: Conflict[] = [];

    // Basic checks
    rawConflicts.push(CheckYesNo(
        data.CPU.Socket.value === data.Motherboard.Socket.value,
        "CPU and Motherboard Socket Matches",
        `CPU Socket (${data.CPU.Socket.UserVersion}) doesn't match Motherboard Socket (${data.Motherboard.Socket.UserVersion})`,
        "error"
    ));
    rawConflicts.push(CheckYesNo(
        data.Motherboard.SupportedMemoryTypes.value.includes(data.RAM.DDRVersion.value),
        "Motherboard supports selected RAM DDR Version",
        `Motherboard doesn't support RAM DDR Version (${data.RAM.DDRVersion.UserVersion})`,
        "error"
    ));
    rawConflicts.push(CheckYesNo(
        data.CPU.DDRVersions.value.includes(data.RAM.DDRVersion.value),
        "CPU supports selected RAM DDR Version",
        `CPU doesn't support RAM DDR Version (${data.RAM.DDRVersion.UserVersion})`,
        "error"
    ));
    rawConflicts.push(CheckYesNo(
        data.CPUCooler.SocketCompatibility.value.includes(data.Motherboard.Socket.value),
        "Cooler supports motherboard socket",
        `Cooler incompatible with motherboard socket.\n\t- Cooler: ${data.CPUCooler.SocketCompatibility.UserVersion}\n\t- Motherboard: ${data.Motherboard.Socket.UserVersion}`,
        "error"
    ));
    rawConflicts.push(CheckYesNo(
        data.CPUCooler.Height.value <= data.Case.MaxCPUCoolerHeight.value,
        "Cooler fits in the case",
        `Cooler too tall for the case.`,
        "error"
    ));
    rawConflicts.push(CheckYesNo(
        data.GPU.Size.value[0] <= data.Case.MaxGPULength.value,
        "GPU fits in the case",
        `GPU is too long for the case.`,
        "error"
    ));
    rawConflicts.push(CheckYesNo(
        data.PSU.Modular.value,
        "PSU is modular",
        `PSU is not modular. Consider using a modular one if possible`,
        "warning"
    ));

    // Motherboard size
    rawConflicts.push(CheckMotherboardSize(
        data.Motherboard.FormFactor.value,
        data.Case.MaxFormFactorSupport.value
    ));

    // PSU Power
    const estimatedPowerDraw = data.CPU.TDP.value + data.GPU.TDP.value + 100;
    rawConflicts.push(CheckYesNo(
        data.PSU.Wattage.value >= estimatedPowerDraw,
        "PSU can handle power requirements",
        `PSU may be underpowered. Estimated need: ~${estimatedPowerDraw}W`,
        "error"
    ));

    // PSU Form Factor
    const caseSupportsATXPSU = data.Case.MaxFormFactorSupport.value.includes("ATX");
    rawConflicts.push(CheckYesNo(
        caseSupportsATXPSU || data.PSU.FormFactor.value === "SFX",
        "PSU form factor likely fits",
        `Case may not support PSU form factor: ${data.PSU.FormFactor.UserVersion}`,
        "warning"
    ));

    // RAM slots
    rawConflicts.push(CheckYesNo(
        data.Motherboard.MemorySlots.value >= 1,
        "Motherboard has enough RAM slots",
        `Motherboard RAM slots too few: ${data.Motherboard.MemorySlots.UserVersion}`,
        "error"
    ));

    // Integrated GPU
    if (data.GPU.TDP.value === 0) {
        rawConflicts.push(CheckYesNo(
            data.CPU.HasIntegratedGraphic.value,
            "CPU has integrated graphics",
            "No GPU selected and CPU lacks integrated graphics",
            "error"
        ));
    }

    // SSD speed checks
    if (data.SSD.ReadSpeed.value < 300 || data.SSD.WriteSpeed.value < 300) {
        rawConflicts.push({
            severity: "warning",
            message: `SSD read/write speeds are low — consider upgrading.\n\t- Read: ${data.SSD.ReadSpeed.UserVersion}\n\t- Write: ${data.SSD.WriteSpeed.UserVersion}`
        });
    }

    // RAM latency
    if (data.RAM.CL.value > 30) {
        rawConflicts.push({
            severity: "warning",
            message: `Unusually high RAM CAS Latency (CL): ${data.RAM.CL.UserVersion}`
        });
    }

    // High GPU power
    if (data.GPU.TDP.value > 300) {
        rawConflicts.push({
            severity: "warning",
            message: `High GPU power draw (${data.GPU.TDP.UserVersion}) — ensure PSU & airflow are adequate.`
        });
    }

    // Total price range check
    if (data.Price.value.avg > 4000) {
        rawConflicts.push({
            severity: "info",
            message: `Build price seems very high — is this intentional? $${data.Price.value.avg}`
        });
    } else if (data.Price.value.avg < 500) {
        rawConflicts.push({
            severity: "warning",
            message: `Build cost is very low — some parts might be missing or budget-tier.`
        });
    }

    const conflicts = rawConflicts.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]).map((c) => RenderConflict(c));

    // CPU Cooler TDP
    conflicts.push(CheckPercentage(data.CPU.TDP.value, data.CPUCooler.TDP.value, "CPU Cooler Load"));

    return conflicts;
}

function CheckYesNo(condition: boolean, yesText: string, noText: string, severity: Severity): { message: string, severity: Severity } {
    return {
        message: condition ? yesText : noText,
        severity: condition ? "info" : severity
    }
}

function CheckPercentage(value: number, max: number, text: string): React.JSX.Element {
    const percent = 100 / max * value || 0

    return (
        <View style={{ height: 48 }}>
            <Text style={PreStyle.text}>{text}</Text>
            <View style={{ flex: 1, height: 36, flexDirection: "row", borderRadius: theme.borderRadius.md }}>
                <View style={{ flex: Math.min(percent, 100), backgroundColor: getInterpolatedColorSlider(percent), borderRadius: theme.borderRadius.md }}>
                    {percent > 10 ? <Text style={[PreStyle.text, { alignSelf: "center" }]}>{percent.toFixed(1) + "%"}</Text> : null}
                </View>
                <View style={{ flex: Math.max(100 - percent, 0), backgroundColor: "black", borderRadius: theme.borderRadius.md }}>
                    {percent < 90 ? <Text style={[PreStyle.text, { alignSelf: "center" }]}>{(100 - percent).toFixed(1) + "%"}</Text> : null}
                </View>
            </View>
        </View>
    )
}
function CheckMotherboardSize(motherboard: string, caseSize: string): { severity: Severity, message: string } {
    const eatxRegex = /E-ATX/g // 304.8x276.9mm
    if (eatxRegex.test(motherboard) && eatxRegex.test(caseSize)) {
        return { message: `Motherboard and case are same size (E-ATX) (${motherboard})`, severity: "info" }
    }
    const atxRegex = /ATX/g
    if (atxRegex.test(motherboard) && atxRegex.test(caseSize)) {
        return { message: `Motherboard and case are same size (ATX) (${motherboard})`, severity: "info" }
    }
    const matxRegex = /µATX/g
    if (matxRegex.test(motherboard) && matxRegex.test(caseSize)) {
        return { message: `Motherboard and case are same size (µATX) (${motherboard})`, severity: "info" }
    }
    return {
        message: `Motherboard and case might not match — double-check form factors.\n\t- Mobo: ${motherboard}\n\t- Case: ${caseSize}`,
        severity: "warning"
    }

}

