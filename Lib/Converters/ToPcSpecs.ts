import { PCSpecs, Price, CPUSpecs, GPUSpecs, RAMSpecs, SSDSpecs, MotherboardSpecs, PSUSpecs, CaseSpecs, CPUCoolerSpecs, NamedValue } from "../Types";

export function ConvertToPC(
    cpu: CPUSpecs,
    gpu: GPUSpecs,
    ram: RAMSpecs,
    ssd: SSDSpecs,
    motherboard: MotherboardSpecs,
    psu: PSUSpecs,
    pcCase: CaseSpecs,
    cooler: CPUCoolerSpecs
): PCSpecs {
    const totalPriceMIN = cpu.Price.value.min + gpu.Price.value.min + ram.Price.value.min + ssd.Price.value.min + motherboard.Price.value.min + psu.Price.value.min + pcCase.Price.value.min + cooler.Price.value.min;
    const totalPriceAVG = cpu.Price.value.avg + gpu.Price.value.avg + ram.Price.value.avg + ssd.Price.value.avg + motherboard.Price.value.avg + psu.Price.value.avg + pcCase.Price.value.avg + cooler.Price.value.avg;
    const totalPriceMAX = cpu.Price.value.max + gpu.Price.value.max + ram.Price.value.max + ssd.Price.value.max + motherboard.Price.value.max + psu.Price.value.max + pcCase.Price.value.max + cooler.Price.value.max;
    const price = new Price(totalPriceMIN, totalPriceMAX, totalPriceAVG); // placeholder; min/max logic can be improved if needed
    return {
        CPU: cpu,
        GPU: gpu,
        RAM: ram,
        SSD: ssd,
        Motherboard: motherboard,
        PSU: psu,
        Case: pcCase,
        CPUCooler: cooler,
        Price: new NamedValue<Price>(price, `Estimated Total: ${price.avg}€`)
    };
}
