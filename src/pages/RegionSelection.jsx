"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCarbonContext } from "../context/CarbonContext"
import { ArrowLeft, ArrowRight } from "lucide-react"
import regionsData from "../data/zonas.json"

const RegionSelection = () => {
  const { setRegion, setCarbonIntensity } = useCarbonContext()
  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setRegions(regionsData)
  }, [])

  const handleRegionChange = (e) => {
    const selected = e.target.value
    setSelectedRegion(selected)

    const regionData = regions.find((r) => r.region === selected)
    if (regionData) {
      setRegion(selected)
      setCarbonIntensity(regionData.eq)
    }
  }

  const handleNext = () => {
    if (selectedRegion) {
      navigate("/device-type")
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
          <h2 className="text-2xl font-bold mb-6 text-center text-green-800">¿De qué zona sos?</h2>
          <p className="mb-4 text-gray-700">
            Selecciona tu región para determinar la intensidad de carbono de la matriz energética.
          </p>

          <div className="mb-6">
            <label htmlFor="region" className="block mb-2 text-sm font-medium text-gray-700">
              Región
            </label>
            <select
              id="region"
              value={selectedRegion}
              onChange={handleRegionChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona una región</option>
              {regions.map((region, index) => (
                <option key={index} value={region.region}>
                  {region.region} (Intensidad: {region.eq} kgCO₂/kWh)
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedRegion}
              className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md ${
                selectedRegion ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
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

export default RegionSelection
