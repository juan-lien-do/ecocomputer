"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCarbonContext } from "../context/CarbonContext"
import { ArrowLeft, TreePine, Leaf, Save, BarChart3 } from "lucide-react"

const Results = () => {
  const {
    region,
    deviceType,
    annualEmissions,
    treesNeeded,
    selectedCPU,
    selectedGPU,
    motherboardType,
    ramSticks,
    ssdCount,
    hddCount,
    opticalDriveCount,
    psuCertification,
    transformerWatts,
    chargingHours,
    batteryDays,
    saveCurrentConfig,
    savedConfigs,
    calculateLaptopEmissions,
    calculateDesktopEmissions,
  } = useCarbonContext()

  const navigate = useNavigate()
  const [configName, setConfigName] = useState(
    `${deviceType === "laptop" ? "Laptop" : "PC"} - ${new Date().toLocaleDateString()}`,
  )
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [isCalculated, setIsCalculated] = useState(false)

  // Verificar que los resultados son válidos
  useEffect(() => {
    // Si no hay emisiones calculadas, recalcular
    if (annualEmissions <= 0) {
      console.log("Recalculando emisiones...")
      if (deviceType === "laptop") {
        if (transformerWatts > 0 && chargingHours > 0 && batteryDays > 0) {
          calculateLaptopEmissions()
          setIsCalculated(true)
        }
      } else if (deviceType === "desktop") {
        calculateDesktopEmissions()
        setIsCalculated(true)
      }
    } else {
      setIsCalculated(true)
    }
  }, [annualEmissions, deviceType])

  const formatNumber = (num) => {
    return num.toFixed(2).replace(".", ",")
  }

  const handleSaveConfig = () => {
    saveCurrentConfig(configName)
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  // Si no hay datos válidos, redirigir al inicio
  if (!deviceType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">No hay datos para mostrar</h2>
          <p className="mb-6">No se han encontrado datos válidos para calcular las emisiones.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Resultados</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Resultados del cálculo</h2>

            {!isCalculated ? (
              <div className="text-center py-4">
                <p>Calculando resultados...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2 text-green-800">Emisiones anuales de CO₂</h3>
                    <p className="text-4xl font-bold text-green-700 mb-1">{formatNumber(annualEmissions)} kg</p>
                    <p className="text-sm text-gray-600">Basado en la matriz energética de {region}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2 text-green-800">Árboles necesarios para compensar</h3>
                    <div className="flex justify-center items-center mb-2">
                      <p className="text-4xl font-bold text-green-700">{formatNumber(treesNeeded)}</p>
                      <TreePine className="h-8 w-8 ml-2 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">Árboles necesarios para absorber el CO₂ emitido anualmente</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">
                    Detalles de tu {deviceType === "laptop" ? "laptop" : "PC"}
                  </h3>

                  {deviceType === "laptop" ? (
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Potencia del transformador:</span>
                        <span className="font-medium">{transformerWatts} W</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tiempo de carga:</span>
                        <span className="font-medium">{chargingHours} horas</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Duración de batería:</span>
                        <span className="font-medium">{batteryDays} días</span>
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Motherboard:</span>
                        <span className="font-medium">{motherboardType}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>CPU:</span>
                        <span className="font-medium">
                          {selectedCPU?.NAME} ({selectedCPU?.TDP}W)
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>GPU:</span>
                        <span className="font-medium">
                          {selectedGPU?.NOMBRE} ({selectedGPU?.TDP}W)
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>RAM:</span>
                        <span className="font-medium">
                          {ramSticks} sticks ({ramSticks * 3}W)
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Almacenamiento:</span>
                        <span className="font-medium">
                          {ssdCount} SSD, {hddCount} HDD
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Lectores ópticos:</span>
                        <span className="font-medium">{opticalDriveCount}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Certificación PSU:</span>
                        <span className="font-medium">{psuCertification}</span>
                      </li>
                    </ul>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">Guardar esta configuración</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={configName}
                      onChange={(e) => setConfigName(e.target.value)}
                      placeholder="Nombre de la configuración"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={handleSaveConfig}
                      className="flex items-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Guardar
                    </button>
                  </div>
                  {showSaveSuccess && <p className="mt-2 text-sm text-green-600">¡Configuración guardada con éxito!</p>}
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-green-800">Consejos para reducir tu huella de carbono</h3>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <Leaf className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Apaga tu computadora cuando no la estés usando, especialmente durante la noche.</span>
              </li>
              <li className="flex items-start">
                <Leaf className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Configura la gestión de energía para que tu dispositivo entre en modo de suspensión después de un
                  período de inactividad.
                </span>
              </li>
              <li className="flex items-start">
                <Leaf className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Reduce el brillo de la pantalla para disminuir el consumo energético.</span>
              </li>
              <li className="flex items-start">
                <Leaf className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Desconecta los periféricos que no estés utilizando.</span>
              </li>
              <li className="flex items-start">
                <Leaf className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Considera actualizar a componentes más eficientes energéticamente en tu próxima actualización.
                </span>
              </li>
              <li className="flex items-start">
                <Leaf className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Utiliza una fuente de alimentación con certificación 80 Plus Gold o superior para mejorar la
                  eficiencia.
                </span>
              </li>
              <li className="flex items-start">
                <Leaf className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Mantén tu equipo limpio de polvo para mejorar la ventilación y reducir el consumo energético.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-md"
            >
              Imprimir resultados
            </button>

            <button
              onClick={() => navigate("/comparison")}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              {savedConfigs.length > 0 ? "Ver comparación" : "Comparar dispositivos"}
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

export default Results
