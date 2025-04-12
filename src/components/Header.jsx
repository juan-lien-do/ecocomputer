import { Leaf } from "lucide-react"
import { Link } from "react-router-dom"

const Header = ({ title }) => {
  return (
    <header className="bg-green-700 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6" />
            <h1 className="text-xl font-bold">EcoComputer</h1>
          </Link>
        </div>
        {title && <h2 className="text-xl hidden md:block">{title}</h2>}
      </div>
    </header>
  )
}

export default Header
