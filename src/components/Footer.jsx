const Footer = () => {
  return (
    <footer className="bg-green-800 text-white p-4 mt-12">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} EcoComputer - Calculadora de Emisiones de Carbono</p>
      </div>
    </footer>
  )
}

export default Footer
