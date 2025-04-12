"use client"

import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useCarbonContext } from "../context/CarbonContext"
import { ArrowLeft, ArrowRight } from "lucide-react"

const TransformerWatts = () => {
  const { transformerWatts, setTransformerWatts } = useCarbonContext()
  const [value, setValue] = useState(transformerWatts || "")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value > 0) {
      setTransformerWatts(Number(value))
      navigate("/laptop/charging-hours")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Potencia del transformador</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="watts" className="block mb-2 text-sm font-medium text-gray-700">
            ¿De cuántos watts (W) es el transformador del cargador?
          </label>
          <div className="flex">
            <input
              type="number"
              id="watts"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="1"
              required
              className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
              W
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/device-type")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </button>
          <button
            type="submit"
            disabled={!value || value <= 0}
            className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
              value && value > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
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

const ChargingHours = () => {
  const { chargingHours, setChargingHours } = useCarbonContext()
  const [value, setValue] = useState(chargingHours || "")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value > 0) {
      setChargingHours(Number(value))
      navigate("/laptop/battery-days")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Tiempo de carga</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="hours" className="block mb-2 text-sm font-medium text-gray-700">
            ¿Cuántas horas demora en cargar completamente?
          </label>
          <div className="flex">
            <input
              type="number"
              id="hours"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="0.1"
              step="0.1"
              required
              className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
              horas
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/laptop/transformer")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </button>
          <button
            type="submit"
            disabled={!value || value <= 0}
            className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
              value && value > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
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

const BatteryDays = () => {
  const { batteryDays, setBatteryDays, calculateLaptopEmissions, transformerWatts, chargingHours } = useCarbonContext()
  const [value, setValue] = useState(batteryDays || "")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value > 0) {
      setBatteryDays(Number(value))

      // Verificar que tenemos todos los datos necesarios antes de calcular
      if (transformerWatts > 0 && chargingHours > 0 && value > 0) {
        // Usar setTimeout para asegurar que el estado se ha actualizado
        setTimeout(() => {
          calculateLaptopEmissions()
          navigate("/results")
        }, 0)
      } else {
        // Si falta algún dato, mostrar un mensaje o manejar el error
        alert("Faltan datos para realizar el cálculo. Por favor, completa todos los campos.")
      }
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Duración de la batería</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="days" className="block mb-2 text-sm font-medium text-gray-700">
            ¿Cuántos días dura la batería con uso normal?
          </label>
          <div className="flex">
            <input
              type="number"
              id="days"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="0.1"
              step="0.1"
              required
              className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
              días
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/laptop/charging-hours")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </button>
          <button
            type="submit"
            disabled={!value || value <= 0}
            className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
              value && value > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
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

const LaptopCalculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Calculadora de Emisiones - Laptop</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="transformer" element={<TransformerWatts />} />
          <Route path="charging-hours" element={<ChargingHours />} />
          <Route path="battery-days" element={<BatteryDays />} />
        </Routes>
      </main>
    </div>
  )
}

export default LaptopCalculator
