"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCarbonContext } from "../context/CarbonContext"
import { ArrowLeft, Plus, Trash2, PlusCircle } from "lucide-react"

const ComparisonPage = () => {
  const { savedConfigs, deleteConfig, resetCalculator } = useCarbonContext()
  const navigate = useNavigate()
  const [highlightedConfig, setHighlightedConfig] = useState(null)

  // Ordenar configuraciones por emisiones (de menor a mayor)
  const sortedConfigs = [...savedConfigs].sort((a, b) => a.annualEmissions - b.annualEmissions)

  const formatNumber = (num) => {
    return num.toFixed(2).replace(".", ",")
  }

  const handleAddNewConfig = () => {
    resetCalculator()
    navigate("/region")
  }

  const getEmissionColor = (emissions) => {
    // Escala de colores basada en las emisiones
    if (emissions < 50) return "text-green-600"
    if (emissions < 100) return "text-lime-600"
    if (emissions < 200) return "text-yellow-600"
    if (emissions < 400) return "text-amber-600"
    return "text-red-600"
  }

  const getBarWidth = (emissions) => {
    // Si no hay configuraciones, devolver 0%
    if (savedConfigs.length === 0) return "0%"

    // Encuentra el valor máximo para escalar las barras
    const maxEmission = Math.max(...savedConfigs.map((c) => c.annualEmissions))
    // Calcular el porcentaje basado en el máximo
    return `${(emissions / maxEmission) * 90}%` // 90% para dejar espacio para el texto
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Comparación de Dispositivos</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Comparativa de Emisiones de Carbono</h2>

            {savedConfigs.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600 mb-6">No tienes configuraciones guardadas para comparar.</p>
                <button
                  onClick={handleAddNewConfig}
                  className="flex items-center mx-auto px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Crear nueva configuración
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-800">Dispositivos guardados</h3>
                    <button
                      onClick={handleAddNewConfig}
                      className="flex items-center px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md"
                    >
                      <PlusCircle className="mr-1 h-4 w-4" />
                      Nuevo dispositivo
                    </button>
                  </div>

                  <div className="space-y-6">
                    {sortedConfigs.map((config) => (
                      <div
                        key={config.id}
                        className={`border rounded-lg p-4 transition-all ${
                          highlightedConfig === config.id ? "border-green-500 bg-green-50 shadow-md" : "border-gray-200"
                        }`}
                        onMouseEnter={() => setHighlightedConfig(config.id)}
                        onMouseLeave={() => setHighlightedConfig(null)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-lg">
                            {config.name} ({config.deviceType === "laptop" ? "Laptop" : "PC Desktop"})
                          </h4>
                          <button
                            onClick={() => deleteConfig(config.id)}
                            className="text-gray-400 hover:text-red-600"
                            aria-label="Delete configuration"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">Región: {config.region}</p>

                        <div className="mb-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Emisiones anuales:</span>
                            <span className={`font-bold ${getEmissionColor(config.annualEmissions)}`}>
                              {formatNumber(config.annualEmissions)} kg CO₂
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`${getEmissionColor(config.annualEmissions).replace("text-", "bg-")} h-2.5 rounded-full`}
                              style={{ width: getBarWidth(config.annualEmissions) }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Árboles necesarios:</span>
                            <span className="font-bold text-green-700">{formatNumber(config.treesNeeded)}</span>
                          </div>
                        </div>

                        {highlightedConfig === config.id && (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <h5 className="font-medium mb-2">Detalles del dispositivo:</h5>
                            {config.deviceType === "laptop" ? (
                              <ul className="text-sm space-y-1">
                                <li>Transformador: {config.transformerWatts}W</li>
                                <li>Tiempo de carga: {config.chargingHours} horas</li>
                                <li>Duración de batería: {config.batteryDays} días</li>
                              </ul>
                            ) : (
                              <ul className="text-sm space-y-1">
                                <li>Motherboard: {config.motherboardType}</li>
                                <li>CPU: {config.cpu?.NAME || "No especificado"}</li>
                                <li>GPU: {config.gpu?.NOMBRE || "No especificado"}</li>
                                <li>RAM: {config.ramSticks} sticks</li>
                                <li>
                                  Almacenamiento: {config.ssdCount} SSD, {config.hddCount} HDD
                                </li>
                                <li>PSU: {config.psuCertification}</li>
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">Análisis comparativo</h3>

                  {savedConfigs.length > 1 && (
                    <div className="space-y-4">
                      <p>
                        <span className="font-medium">Dispositivo más eficiente: </span>
                        <span className="text-green-700 font-bold">{sortedConfigs[0].name}</span> con{" "}
                        {formatNumber(sortedConfigs[0].annualEmissions)} kg CO₂ anuales
                      </p>

                      <p>
                        <span className="font-medium">Diferencia entre el más y menos eficiente: </span>
                        <span className="font-bold">
                          {formatNumber(
                            sortedConfigs[sortedConfigs.length - 1].annualEmissions - sortedConfigs[0].annualEmissions,
                          )}
                        </span>{" "}
                        kg CO₂ anuales
                      </p>

                      <p>
                        <span className="font-medium">Árboles salvados al elegir la opción más eficiente: </span>
                        <span className="font-bold">
                          {formatNumber(
                            sortedConfigs[sortedConfigs.length - 1].treesNeeded - sortedConfigs[0].treesNeeded,
                          )}
                        </span>{" "}
                        árboles
                      </p>

                      <div className="mt-4 py-3 border-t border-green-200">
                        <p className="text-green-800 font-medium">
                          Eligiendo el dispositivo más eficiente podrías reducir significativamente tu huella de carbono
                          digital y contribuir a la lucha contra el cambio climático.
                        </p>
                      </div>
                    </div>
                  )}

                  {savedConfigs.length === 1 && (
                    <p>
                      Necesitas al menos dos configuraciones para realizar un análisis comparativo. Agrega otro
                      dispositivo para comparar.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate("/results")}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a resultados
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} EcoComputer - Calculadora de Emisiones de Carbono</p>
        </div>
      </footer>
    </div>
  )
}

export default ComparisonPage
