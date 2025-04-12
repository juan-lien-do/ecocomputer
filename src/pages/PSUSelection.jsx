"use client"

const PSUSelection = () => {
  const { psuCertification, setPsuCertification, setPsuEfficiency } = useCarbonContext()
  const navigate = useNavigate()

  const handlePSUSelect = (certification, efficiency) => {
    setPsuCertification(certification)
    // Asegurarse de que la eficiencia se establece como un número entre 0 y 1
    setPsuEfficiency(efficiency)
    console.log(`PSU seleccionada: ${certification}, eficiencia: ${efficiency}`)
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
