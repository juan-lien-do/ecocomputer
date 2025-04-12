"use client"

import { createContext, useState, useContext } from "react"

const CarbonContext = createContext()

export const useCarbonContext = () => useContext(CarbonContext)

export const CarbonProvider = ({ children }) => {
  const [region, setRegion] = useState("")
  const [carbonIntensity, setCarbonIntensity] = useState(0)
  const [deviceType, setDeviceType] = useState("")

  // Laptop specific data
  const [transformerWatts, setTransformerWatts] = useState(0)
  const [chargingHours, setChargingHours] = useState(0)
  const [batteryDays, setBatteryDays] = useState(0)

  // Desktop specific data
  const [motherboardType, setMotherboardType] = useState("")
  const [motherboardWatts, setMotherboardWatts] = useState(0)
  const [selectedCPU, setSelectedCPU] = useState(null)
  const [selectedGPU, setSelectedGPU] = useState(null)
  const [ramSticks, setRamSticks] = useState(1)
  const [ssdCount, setSsdCount] = useState(0)
  const [hddCount, setHddCount] = useState(0)
  const [opticalDriveCount, setOpticalDriveCount] = useState(0)
  const [psuCertification, setPsuCertification] = useState("")
  const [psuEfficiency, setPsuEfficiency] = useState(0)
  const [usageHours, setUsageHours] = useState({
    editing: 0,
    heavyGaming: 0,
    lightGaming: 0,
    programming: 0,
    office: 0,
    idle: 0,
  })

  // Results
  const [annualEmissions, setAnnualEmissions] = useState(0)
  const [treesNeeded, setTreesNeeded] = useState(0)

  // Comparison feature
  const [savedConfigs, setSavedConfigs] = useState([])

  const calculateLaptopEmissions = () => {
    // Asegurarnos de usar los valores actuales del estado
    // Emisiones anuales = (Watts * horas * 365 * intensidad de carbono) / (1000 * diasUso)
    if (!transformerWatts || !chargingHours || !batteryDays || !carbonIntensity) {
      return 0
    }

    const emissions = (transformerWatts * chargingHours * 365 * carbonIntensity) / (batteryDays * 1000 * 1000)
    setAnnualEmissions(emissions)
    calculateTrees(emissions)
    return emissions
  }

  const calculateDesktopEmissions = () => {
    // Verificar que tenemos todos los datos necesarios
    if (!motherboardWatts || !psuEfficiency || carbonIntensity === 0) {
      return 0
    }

    // Calcular consumo total
    const ramWatts = ramSticks * 3
    const additionalWatts = ssdCount * 10 + hddCount * 15 + opticalDriveCount * 10
    const cpuWatts = selectedCPU?.TDP || 0
    const gpuWatts = selectedGPU?.TDP || 0

    const maxConsumption = motherboardWatts + cpuWatts + gpuWatts + ramWatts + additionalWatts

    // Calcular consumo real basado en la eficiencia de la fuente
    // Si la eficiencia es 0, usamos 1 para evitar división por cero
    const realConsumption = maxConsumption / (psuEfficiency || 1)

    // Calcular horas ponderadas
    const weightedHours =
      usageHours.editing * 0.95 +
      usageHours.heavyGaming * 0.85 +
      usageHours.lightGaming * 0.6 +
      usageHours.programming * 0.6 +
      usageHours.office * 0.35 +
      usageHours.idle * 0.2

    // Si no hay horas de uso, no hay emisiones
    if (weightedHours <= 0) {
      return 0
    }

    // Calcular consumo diario
    const dailyConsumption = realConsumption * weightedHours

    // Emisiones anuales = Consumo real diario * 365 * intensidad de carbono / 1000
    const emissions = (dailyConsumption * 365 * carbonIntensity) / (1000 * 1000)

    setAnnualEmissions(emissions)
    calculateTrees(emissions)
    return emissions
  }

  const calculateTrees = (emissions) => {
    // Arboles = emisiones anuales * 340 / 1000
    if (!emissions || emissions <= 0) {
      setTreesNeeded(0)
      return 0
    }

    const trees = emissions / 340
    setTreesNeeded(trees)
    return trees
  }

  const saveCurrentConfig = (configName) => {
    // Crear el objeto de configuración según el tipo de dispositivo
    let config = {
      id: Date.now().toString(),
      name: configName,
      region,
      carbonIntensity,
      deviceType,
      annualEmissions,
      treesNeeded,
    }

    if (deviceType === "laptop") {
      config = {
        ...config,
        transformerWatts,
        chargingHours,
        batteryDays,
      }
    } else if (deviceType === "desktop") {
      config = {
        ...config,
        motherboardType,
        motherboardWatts,
        cpu: selectedCPU ? { ...selectedCPU } : null,
        gpu: selectedGPU ? { ...selectedGPU } : null,
        ramSticks,
        ssdCount,
        hddCount,
        opticalDriveCount,
        psuCertification,
        psuEfficiency,
        usageHours: { ...usageHours },
      }
    }

    setSavedConfigs((prev) => [...prev, config])
    return config
  }

  const deleteConfig = (configId) => {
    setSavedConfigs((prev) => prev.filter((config) => config.id !== configId))
  }

  const resetCalculator = () => {
    setDeviceType("")
    // Reiniciar variables de laptop
    setTransformerWatts(0)
    setChargingHours(0)
    setBatteryDays(0)

    // Reiniciar variables de desktop
    setMotherboardType("")
    setMotherboardWatts(0)
    setSelectedCPU(null)
    setSelectedGPU(null)
    setRamSticks(1)
    setSsdCount(0)
    setHddCount(0)
    setOpticalDriveCount(0)
    setPsuCertification("")
    setPsuEfficiency(0)
    setUsageHours({
      editing: 0,
      heavyGaming: 0,
      lightGaming: 0,
      programming: 0,
      office: 0,
      idle: 0,
    })

    // Reiniciar resultados
    setAnnualEmissions(0)
    setTreesNeeded(0)
  }

  return (
    <CarbonContext.Provider
      value={{
        region,
        setRegion,
        carbonIntensity,
        setCarbonIntensity,
        deviceType,
        setDeviceType,
        transformerWatts,
        setTransformerWatts,
        chargingHours,
        setChargingHours,
        batteryDays,
        setBatteryDays,
        motherboardType,
        setMotherboardType,
        motherboardWatts,
        setMotherboardWatts,
        selectedCPU,
        setSelectedCPU,
        selectedGPU,
        setSelectedGPU,
        ramSticks,
        setRamSticks,
        ssdCount,
        setSsdCount,
        hddCount,
        setHddCount,
        opticalDriveCount,
        setOpticalDriveCount,
        psuCertification,
        setPsuCertification,
        psuEfficiency,
        setPsuEfficiency,
        usageHours,
        setUsageHours,
        annualEmissions,
        setAnnualEmissions,
        treesNeeded,
        setTreesNeeded,
        calculateLaptopEmissions,
        calculateDesktopEmissions,
        // Nuevas funciones para la comparación
        savedConfigs,
        saveCurrentConfig,
        deleteConfig,
        resetCalculator,
      }}
    >
      {children}
    </CarbonContext.Provider>
  )
}
