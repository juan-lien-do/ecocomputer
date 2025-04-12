import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import RegionSelection from "./pages/RegionSelection"
import DeviceTypeSelection from "./pages/DeviceTypeSelection"
import LaptopCalculator from "./pages/LaptopCalculator"
import DesktopCalculator from "./pages/DesktopCalculator"
import Results from "./pages/Results"
import ComparisonPage from "./pages/ComparisonPage"
import { CarbonProvider } from "./context/CarbonContext"

function App() {
  return (
    <CarbonProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/region" element={<RegionSelection />} />
            <Route path="/device-type" element={<DeviceTypeSelection />} />
            <Route path="/laptop/*" element={<LaptopCalculator />} />
            <Route path="/desktop/*" element={<DesktopCalculator />} />
            <Route path="/results" element={<Results />} />
            <Route path="/comparison" element={<ComparisonPage />} />
          </Routes>
        </div>
      </Router>
    </CarbonProvider>
  )
}

export default App
