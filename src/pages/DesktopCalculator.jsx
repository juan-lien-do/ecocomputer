"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useCarbonContext } from "../context/CarbonContext"
import { ArrowLeft, ArrowRight, Search } from "lucide-react"
import cpusData from "../data/cpus.json"
import gpusData from "../data/gpus.json"

const MotherboardSelection = () => {
  const { motherboardType, setMotherboardType, setMotherboardWatts } = useCarbonContext()
  const navigate = useNavigate()

  const handleMotherboardSelect = (type, watts) => {
    setMotherboardType(type)
    setMotherboardWatts(watts)
  }

  const handleNext = () => {
    if (motherboardType) {
      navigate("/desktop/cpu")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Tipo de Motherboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleMotherboardSelect("ITX", 40)}
          className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${
            motherboardType === "ITX" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
          }`}
        >
          <span className="font-medium mb-2">ITX</span>
          <span className="text-sm text-gray-600">40W</span>
        </button>

        <button
          onClick={() => handleMotherboardSelect("ATX", 70)}
          className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${
            motherboardType === "ATX" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
          }`}
        >
          <span className="font-medium mb-2">ATX</span>
          <span className="text-sm text-gray-600">70W</span>
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/device-type")}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </button>
        <button
          onClick={handleNext}
          disabled={!motherboardType}
          className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
            motherboardType ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const CPUSelection = () => {
  const { selectedCPU, setSelectedCPU } = useCarbonContext()
  const [cpus, setCpus] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCpus, setFilteredCpus] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setCpus(cpusData)
    setFilteredCpus(cpusData)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = cpus.filter((cpu) => cpu.NAME.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredCpus(filtered)
    } else {
      setFilteredCpus(cpus)
    }
  }, [searchTerm, cpus])

  const handleCPUSelect = (cpu) => {
    setSelectedCPU(cpu)
    navigate("/desktop/gpu")
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Selección de CPU</h2>

      <div className="mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar CPU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mb-6 max-h-60 overflow-y-auto border border-gray-200 rounded-md">
        {filteredCpus.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredCpus.map((cpu, index) => (
              <li key={index}>
                <button
                  onClick={() => handleCPUSelect(cpu)}
                  className="w-full text-left px-4 py-3 hover:bg-green-50 flex justify-between items-center"
                >
                  <span>{cpu.NAME}</span>
                  <span className="text-gray-600">{cpu.TDP}W</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-center text-gray-500">No se encontraron CPUs</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/desktop/motherboard")}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </button>
      </div>
    </div>
  )
}

const GPUSelection = () => {
  const { selectedGPU, setSelectedGPU } = useCarbonContext()
  const [gpus, setGpus] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGpus, setFilteredGpus] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setGpus(gpusData)
    setFilteredGpus(gpusData)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = gpus.filter((gpu) => gpu.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredGpus(filtered)
    } else {
      setFilteredGpus(gpus)
    }
  }, [searchTerm, gpus])

  const handleGPUSelect = (gpu) => {
    setSelectedGPU(gpu)
    navigate("/desktop/ram")
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Selección de GPU</h2>

      <div className="mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar GPU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mb-6 max-h-60 overflow-y-auto border border-gray-200 rounded-md">
        {filteredGpus.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredGpus.map((gpu, index) => (
              <li key={index}>
                <button
                  onClick={() => handleGPUSelect(gpu)}
                  className="w-full text-left px-4 py-3 hover:bg-green-50 flex justify-between items-center"
                >
                  <span>{gpu.NOMBRE}</span>
                  <span className="text-gray-600">{gpu.TDP}W</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-center text-gray-500">No se encontraron GPUs</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/desktop/cpu")}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </button>
      </div>
    </div>
  )
}

const RAMSelection = () => {
  const { ramSticks, setRamSticks } = useCarbonContext()
  const [value, setValue] = useState(ramSticks || 1)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value >= 1) {
      setRamSticks(Number(value))
      navigate("/desktop/additional")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Memoria RAM</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="ramSticks" className="block mb-2 text-sm font-medium text-gray-700">
            ¿Cuántos sticks de RAM tiene tu PC?
          </label>
          <div className="flex">
            <input
              type="number"
              id="ramSticks"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="1"
              required
              className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
              sticks
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Cada stick consume aproximadamente 3W.</p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/desktop/gpu")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </button>
          <button
            type="submit"
            disabled={!value || value < 1}
            className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
              value && value >= 1 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Siguiente
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

const AdditionalDevices = () => {
  const { ssdCount, setSsdCount, hddCount, setHddCount, opticalDriveCount, setOpticalDriveCount } = useCarbonContext()
  const [ssd, setSsd] = useState(ssdCount || 0)
  const [hdd, setHdd] = useState(hddCount || 0)
  const [optical, setOptical] = useState(opticalDriveCount || 0)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSsdCount(Number(ssd))
    setHddCount(Number(hdd))
    setOpticalDriveCount(Number(optical))
    navigate("/desktop/psu")
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Dispositivos adicionales</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="ssd" className="block mb-2 text-sm font-medium text-gray-700">
              Cantidad de SSDs
            </label>
            <div className="flex">
              <input
                type="number"
                id="ssd"
                value={ssd}
                onChange={(e) => setSsd(e.target.value)}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Cada SSD consume aproximadamente 10W.</p>
          </div>

          <div>
            <label htmlFor="hdd" className="block mb-2 text-sm font-medium text-gray-700">
              Cantidad de HDDs
            </label>
            <div className="flex">
              <input
                type="number"
                id="hdd"
                value={hdd}
                onChange={(e) => setHdd(e.target.value)}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Cada HDD consume aproximadamente 15W.</p>
          </div>

          <div>
            <label htmlFor="optical" className="block mb-2 text-sm font-medium text-gray-700">
              Cantidad de lectores de discos
            </label>
            <div className="flex">
              <input
                type="number"
                id="optical"
                value={optical}
                onChange={(e) => setOptical(e.target.value)}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Cada lector consume aproximadamente 10W.</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/desktop/ram")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
          >
            Siguiente
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

const PSUSelection = () => {
  const { psuCertification, setPsuCertification, setPsuEfficiency } = useCarbonContext()
  const navigate = useNavigate()

  const handlePSUSelect = (certification, efficiency) => {
    setPsuCertification(certification)
    setPsuEfficiency(efficiency)
  }

  const handleNext = () => {
    if (psuCertification) {
      navigate("/desktop/usage")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Fuente de poder</h2>

      <div className="space-y-3 mb-6">
        <p className="text-sm text-gray-700 mb-4">Selecciona la certificación de tu fuente de poder:</p>

        <button
          onClick={() => handlePSUSelect("80 Plus Gold", 0.9)}
          className={`w-full flex justify-between items-center p-4 border-2 rounded-lg transition-colors ${
            psuCertification === "80 Plus Gold"
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-300"
          }`}
        >
          <span className="font-medium">80 Plus Gold</span>
          <span className="text-gray-600">90% eficiencia</span>
        </button>

        <button
          onClick={() => handlePSUSelect("80 Plus Bronze", 0.8)}
          className={`w-full flex justify-between items-center p-4 border-2 rounded-lg transition-colors ${
            psuCertification === "80 Plus Bronze"
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-300"
          }`}
        >
          <span className="font-medium">80 Plus Bronze</span>
          <span className="text-gray-600">80% eficiencia</span>
        </button>

        <button
          onClick={() => handlePSUSelect("Sin certificación", 0.5)}
          className={`w-full flex justify-between items-center p-4 border-2 rounded-lg transition-colors ${
            psuCertification === "Sin certificación"
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-300"
          }`}
        >
          <span className="font-medium">Sin certificación</span>
          <span className="text-gray-600">50% eficiencia</span>
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/desktop/additional")}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </button>
        <button
          onClick={handleNext}
          disabled={!psuCertification}
          className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
            psuCertification ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const UsageHabits = () => {
  const {
    usageHours,
    setUsageHours,
    calculateDesktopEmissions,
    motherboardType,
    selectedCPU,
    selectedGPU,
    psuEfficiency,
  } = useCarbonContext()

  const [hours, setHours] = useState({
    editing: usageHours.editing || 0,
    heavyGaming: usageHours.heavyGaming || 0,
    lightGaming: usageHours.lightGaming || 0,
    programming: usageHours.programming || 0,
    office: usageHours.office || 0,
    idle: usageHours.idle || 0,
  })
  const navigate = useNavigate()

  const handleChange = (activity, value) => {
    setHours((prev) => ({
      ...prev,
      [activity]: Number(value),
    }))
  }

  const totalHours = Object.values(hours).reduce((sum, val) => sum + Number(val), 0)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Actualizar el estado con las horas de uso
    setUsageHours(hours)

    // Verificar que tenemos todos los datos necesarios antes de calcular
    if (motherboardType && psuEfficiency > 0 && selectedCPU && selectedGPU && totalHours > 0) {
      // Usar setTimeout para asegurar que el estado se ha actualizado
      setTimeout(() => {
        calculateDesktopEmissions()
        navigate("/results")
      }, 0)
    } else {
      // Si falta algún dato, mostrar un mensaje o manejar el error
      alert("Faltan datos para realizar el cálculo. Por favor, completa todos los campos necesarios.")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Hábitos de uso</h2>

      <form onSubmit={handleSubmit}>
        <p className="text-sm text-gray-700 mb-4">Indica cuántas horas al día dedicas a cada actividad:</p>

        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="editing" className="block mb-2 text-sm font-medium text-gray-700">
              Edición/Rendering (95% carga)
            </label>
            <input
              type="number"
              id="editing"
              value={hours.editing}
              onChange={(e) => handleChange("editing", e.target.value)}
              min="0"
              max="24"
              step="0.5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="heavyGaming" className="block mb-2 text-sm font-medium text-gray-700">
              Juegos pesados (85% carga)
            </label>
            <input
              type="number"
              id="heavyGaming"
              value={hours.heavyGaming}
              onChange={(e) => handleChange("heavyGaming", e.target.value)}
              min="0"
              max="24"
              step="0.5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="lightGaming" className="block mb-2 text-sm font-medium text-gray-700">
              Juegos ligeros (60% carga)
            </label>
            <input
              type="number"
              id="lightGaming"
              value={hours.lightGaming}
              onChange={(e) => handleChange("lightGaming", e.target.value)}
              min="0"
              max="24"
              step="0.5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="programming" className="block mb-2 text-sm font-medium text-gray-700">
              Programar (60% carga)
            </label>
            <input
              type="number"
              id="programming"
              value={hours.programming}
              onChange={(e) => handleChange("programming", e.target.value)}
              min="0"
              max="24"
              step="0.5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="office" className="block mb-2 text-sm font-medium text-gray-700">
              Ofimática (35% carga)
            </label>
            <input
              type="number"
              id="office"
              value={hours.office}
              onChange={(e) => handleChange("office", e.target.value)}
              min="0"
              max="24"
              step="0.5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="idle" className="block mb-2 text-sm font-medium text-gray-700">
              Prendida sin usar (20% carga)
            </label>
            <input
              type="number"
              id="idle"
              value={hours.idle}
              onChange={(e) => handleChange("idle", e.target.value)}
              min="0"
              max="24"
              step="0.5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="mb-6 p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-700">
            Total de horas: <span className={totalHours > 24 ? "text-red-500 font-bold" : ""}>{totalHours}</span>/24
          </p>
          {totalHours > 24 && (
            <p className="text-xs text-red-500 mt-1">El total de horas no puede superar las 24 horas diarias.</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/desktop/psu")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </button>
          <button
            type="submit"
            disabled={totalHours <= 0 || totalHours > 24}
            className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
              totalHours > 0 && totalHours <= 24 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Calcular
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

const DesktopCalculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Calculadora de Emisiones - PC Desktop</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="motherboard" element={<MotherboardSelection />} />
          <Route path="cpu" element={<CPUSelection />} />
          <Route path="gpu" element={<GPUSelection />} />
          <Route path="ram" element={<RAMSelection />} />
          <Route path="additional" element={<AdditionalDevices />} />
          <Route path="psu" element={<PSUSelection />} />
          <Route path="usage" element={<UsageHabits />} />
        </Routes>
      </main>
    </div>
  )
}

export default DesktopCalculator
