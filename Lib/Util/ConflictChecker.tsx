import { PreStyle, theme } from "../theme";
import { PCSpecs } from "../Types";
import { Text, View, StyleSheet } from 'react-native';
import { getInterpolatedColorSlider } from "./ColorLERP";


export function CheckForConflicts(data: PCSpecs): React.JSX.Element[] {
    let conflicts: React.JSX.Element[] = []

    conflicts.push(CheckYesNo(
        data.CPU.Socket.value === data.Motherboard.Socket.value,
        "CPU and Motherboard Socket Fits",
        `CPU Socket (${data.CPU.Socket.UserVersion}) dosnt fit Motherboard Socket (${data.Motherboard.Socket.UserVersion})`
    ))
    conflicts.push(CheckYesNo(
        data.Motherboard.SupportedMemoryTypes.value.includes(data.RAM.DDRVersion.value),
        "Motherboard and RAM have same DDR Version",
        `RAM DDR Version (${data.RAM.DDRVersion.UserVersion}) dosnt fit Motherboard DDR Version (${data.Motherboard.SupportedMemoryTypes.UserVersion})`
    ))
    conflicts.push(CheckYesNo(
        data.CPU.DDRVersions.value.includes(data.RAM.DDRVersion.value),
        "CPU and RAM have same DDR Version",
        `RAM DDR Version (${data.RAM.DDRVersion.UserVersion}) dosnt fit CPU DDR Version (${data.CPU.DDRVersions.UserVersion})`
    ))
    conflicts.push(CheckYesNo(
        data.CPUCooler.SocketCompatibility.value.includes(data.Motherboard.Socket.value),
        "Cooler fits on to motherboard socket",
        `CPU Cooler isnt compatible with the Motherboard.\n\t\t- Motherboard: (${data.Motherboard.Socket.UserVersion})\n\t\t- Cooler: (${data.CPUCooler.SocketCompatibility.UserVersion})`
    ))
    conflicts.push(CheckYesNo(
        data.Case.MaxCPUCoolerHeight.value > data.CPUCooler.Height.value,
        "Cooler fits into Case",
        `CPU Cooler is too big for the Case.\n\t\t- Max Height: (${data.Case.MaxCPUCoolerHeight.UserVersion})\n\t\t- Cooler Height: (${data.CPUCooler.Height.UserVersion})`
    ))
    conflicts.push(CheckYesNo(
        data.Case.MaxGPULength.value > data.GPU.Size.value[0],
        "GPU fits into Case",
        `GPU is too big for the Case.\n\t\t- Max Length: (${data.Case.MaxGPULength.UserVersion})\n\t\t- GPU Size: (${data.GPU.Size.UserVersion})`
    ))
    conflicts.push(StringToTextElement(CheckMotherboardSize(data.Motherboard.FormFactor.value, data.Case.MaxFormFactorSupport.value)))
    conflicts.push(CheckPercentage(data.CPU.TDP.value, data.CPUCooler.TDP.value, "CPU Cooler Load"))
    return conflicts
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
                    {percent > 10 ? <Text style={[PreStyle.text, {alignSelf:"center"}]}>{percent.toFixed(1) + "%"}</Text> : null}
                </View>
                <View style={{ flex: Math.max(100 - percent, 0), backgroundColor: "black", borderRadius: theme.borderRadius.md }}>
                    {percent < 90 ? <Text style={[PreStyle.text, {alignSelf:"center"}]}>{(100 - percent).toFixed(1) + "%"}</Text> : null}
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

