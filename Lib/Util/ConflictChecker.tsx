import { PreStyle, theme } from "../theme";
import { PCSpecs } from "../Types";
import { Text, View, StyleSheet } from 'react-native';
import { getInterpolatedColorSlider } from "./ColorLERP";


export function CheckForConflicts(data: PCSpecs): React.JSX.Element[] {
    let conflicts: React.JSX.Element[] = [];

    // CPU ↔ Motherboard
    conflicts.push(CheckYesNo(
        data.CPU.Socket.value === data.Motherboard.Socket.value,
        "CPU and Motherboard Socket Matches",
        `CPU Socket (${data.CPU.Socket.UserVersion}) doesn't match Motherboard Socket (${data.Motherboard.Socket.UserVersion})`
    ));

    // RAM ↔ Motherboard
    conflicts.push(CheckYesNo(
        data.Motherboard.SupportedMemoryTypes.value.includes(data.RAM.DDRVersion.value),
        "Motherboard supports selected RAM DDR Version",
        `Motherboard doesn't support RAM DDR Version (${data.RAM.DDRVersion.UserVersion})`
    ));

    // RAM ↔ CPU
    conflicts.push(CheckYesNo(
        data.CPU.DDRVersions.value.includes(data.RAM.DDRVersion.value),
        "CPU supports selected RAM DDR Version",
        `CPU doesn't support RAM DDR Version (${data.RAM.DDRVersion.UserVersion})`
    ));

    // CPU Cooler ↔ Motherboard
    conflicts.push(CheckYesNo(
        data.CPUCooler.SocketCompatibility.value.includes(data.Motherboard.Socket.value),
        "Cooler supports motherboard socket",
        `Cooler incompatible with motherboard socket.\n\t- Cooler: ${data.CPUCooler.SocketCompatibility.UserVersion}\n\t- Motherboard: ${data.Motherboard.Socket.UserVersion}`
    ));

    // CPU Cooler ↔ Case
    conflicts.push(CheckYesNo(
        data.CPUCooler.Height.value <= data.Case.MaxCPUCoolerHeight.value,
        "Cooler fits in the case",
        `Cooler too tall for the case.\n\t- Cooler Height: ${data.CPUCooler.Height.UserVersion}\n\t- Max Allowed: ${data.Case.MaxCPUCoolerHeight.UserVersion}`
    ));

    // GPU ↔ Case
    conflicts.push(CheckYesNo(
        data.GPU.Size.value[0] <= data.Case.MaxGPULength.value,
        "GPU fits in the case",
        `GPU is too long for the case.\n\t- GPU Length: ${data.GPU.Size.UserVersion}\n\t- Max Allowed: ${data.Case.MaxGPULength.UserVersion}`
    ));

    // Motherboard Form Factor ↔ Case
    conflicts.push(StringToTextElement(CheckMotherboardSize(
        data.Motherboard.FormFactor.value,
        data.Case.MaxFormFactorSupport.value
    )));

    // CPU TDP ↔ Cooler TDP
    conflicts.push(CheckPercentage(data.CPU.TDP.value, data.CPUCooler.TDP.value, "CPU Cooler Load"));

    // PSU Wattage ↔ Combined TDP
    const estimatedPowerDraw = data.CPU.TDP.value + data.GPU.TDP.value + 100; // estimate 100W for board + drives
    conflicts.push(CheckYesNo(
        data.PSU.Wattage.value >= estimatedPowerDraw,
        "PSU can handle power requirements",
        `PSU may be underpowered.\n\t- PSU Wattage: ${data.PSU.Wattage.UserVersion}\n\t- Estimated Need: ~${estimatedPowerDraw}W`
    ));

    // RAM Slot Limit
    conflicts.push(CheckYesNo(
        2 <= data.Motherboard.MemorySlots.value, // Assume 2 stick for now
        "Motherboard has at least 2 RAM slots",
        `Motherboard has too few RAM slots.\n\t- Required: 2\n\t- Available: ${data.Motherboard.MemorySlots.UserVersion}`
    ));

    // Integrated Graphics availability if no GPU
    if (data.GPU.TDP.value === 0) {
        conflicts.push(CheckYesNo(
            data.CPU.HasIntegratedGraphic.value,
            "CPU has integrated graphics",
            "No GPU selected and CPU lacks integrated graphics"
        ));
    }

    // Optional: Cooler Type ↔ Case Support (e.g., radiator check)
    if (data.CPUCooler.Type.value === "Liquid" && data.CPUCooler.RadiatorSize.value) {
        // Simulate case support check here if you have radiator support data
        // Otherwise just notify
        conflicts.push(StringToTextElement(
            `ℹ️ Liquid cooler with ${data.CPUCooler.RadiatorSize.value} radiator — check case compatibility manually.`
        ));
    }

    // Optional: Bluetooth/WiFi support on motherboard
    if (!data.Motherboard.WIFISupport.value) {
        conflicts.push(StringToTextElement("ℹ️ Motherboard lacks Wi-Fi — consider adding a Wi-Fi card or using Ethernet."));
    }
    if (!data.Motherboard.BluetoothSupport.value) {
        conflicts.push(StringToTextElement("ℹ️ Motherboard lacks Bluetooth — consider a USB Bluetooth dongle."));
    }

    return conflicts;
}


function StringToTextElement(str: string): React.JSX.Element {
    return (<Text style={[PreStyle.text, { padding: theme.spacing.sm }]}>{str}</Text>)
}
function CheckYesNo(condition: boolean, yesText: string, noText: string): React.JSX.Element {
    return StringToTextElement(condition ? "✅ " + yesText : "❌ " + noText)
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
function CheckMotherboardSize(motherboard: string, caseSize: string) {
    const eatxRegex = /E-ATX/g // 304.8x276.9mm
    if (eatxRegex.test(motherboard) && eatxRegex.test(caseSize)) {
        return "✅ Motherboard and case are same size (E-ATX)"
    }
    const atxRegex = /ATX/g
    if (atxRegex.test(motherboard) && atxRegex.test(caseSize)) {
        return "✅ Motherboard and case are same size (ATX)"
    }
    const matxRegex = /µATX/g
    if (matxRegex.test(motherboard) && matxRegex.test(caseSize)) {
        return "✅ Motherboard and case are same size (µATX)"
    }
    return `❓ Not the same but could fit. Check your self.\n\t\t- Motherboard: ${motherboard}\n\t\t- Case: ${caseSize}`
}

