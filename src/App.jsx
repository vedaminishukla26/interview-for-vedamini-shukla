import LaunchTable from "./components/LaunchTable"
import Navbar from "./components/Navbar"
import CalendarDropdown from "./components/CalendarDropdown"
import StatusFilter from "./components/StatusFilter";
function App() {
  
  return (
    <>
      <div className="bg-white w-full min-h-screen">
        <Navbar />
        <main className="pt-20 px-4 md:px-13">
          <div className="flex flex-wrap gap-4 items-center mb-4 md:px-11 w-full">
            <CalendarDropdown />
            <StatusFilter />
          </div>
          <LaunchTable />
        </main>
      </div>
    </>
  )
}

export default App
