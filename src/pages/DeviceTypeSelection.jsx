"use client"

import { useNavigate } from "react-router-dom"
import { useCarbonContext } from "../context/CarbonContext"
import { ArrowLeft, ArrowRight, Laptop, Monitor } from "lucide-react"

const DeviceTypeSelection = () => {
  const { deviceType, setDeviceType } = useCarbonContext()
  const navigate = useNavigate()

  const handleDeviceSelect = (type) => {
    setDeviceType(type)
  }

  const handleNext = () => {
    if (deviceType === "laptop") {
      navigate("/laptop/transformer")
    } else if (deviceType === "desktop") {
      navigate("/desktop/motherboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Calculadora de Emisiones de Carbono</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-800">¿Qué tipo de dispositivo tienes?</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleDeviceSelect("laptop")}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${
                deviceType === "laptop" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
              }`}
            >
              <Laptop className="h-12 w-12 mb-2 text-green-600" />
              <span className="font-medium">Laptop</span>
            </button>

            <button
              onClick={() => handleDeviceSelect("desktop")}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${
                deviceType === "desktop" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
              }`}
            >
              <Monitor className="h-12 w-12 mb-2 text-green-600" />
              <span className="font-medium">PC Desktop</span>
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate("/region")}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </button>
            <button
              onClick={handleNext}
              disabled={!deviceType}
              className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
                deviceType ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DeviceTypeSelection
