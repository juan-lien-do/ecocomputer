import { Link } from "react-router-dom"
import { BarChart3 } from "lucide-react"
import { useCarbonContext } from "../context/CarbonContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

const LandingPage = () => {
  const { savedConfigs } = useCarbonContext()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">Calculadora de Emisiones de Carbono</h2>
          <p className="text-lg mb-8 text-gray-700">
            Descubre el impacto ambiental de tu computadora y aprende cómo reducir tu huella de carbono digital.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/region"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
            >
              Calcular mis emisiones
            </Link>

            {savedConfigs.length > 0 && (
              <Link
                to="/comparison"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Ver comparativa ({savedConfigs.length})
              </Link>
            )}
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 text-green-800">¿Por qué es importante?</h3>
          <p className="mb-4 text-gray-700">
            Las computadoras personales consumen una cantidad significativa de energía, contribuyendo a las emisiones de
            gases de efecto invernadero. Conocer el impacto ambiental de nuestros dispositivos es el primer paso para
            tomar decisiones más sostenibles.
          </p>
          <p className="text-gray-700">
            Esta calculadora te ayuda a estimar las emisiones de carbono anuales de tu computadora basándose en su
            consumo energético y la matriz energética de tu región.
          </p>
        </section>

        <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-green-800">Fuentes de información</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Datos de intensidad de carbono por región</li>
              <li>Consumo energético de componentes de PC</li>
              <li>Factores de eficiencia energética</li>
              <li>Capacidad de absorción de CO₂ de los árboles</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-green-800">Sobre los autores</h3>
            <p className="text-gray-700">
              Este proyecto fue desarrollado por un equipo comprometido con la sostenibilidad ambiental y la tecnología
              responsable. Nuestro objetivo es crear conciencia sobre el impacto ambiental de nuestros dispositivos
              electrónicos y promover prácticas más sostenibles.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
