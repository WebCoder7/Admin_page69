import Navbar from './components/Navbar'
import CustomRoutes from './routes'
import './App.css'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <div className='flex justify-between'>
        <Navbar />
        <div className='w-[80%] h-[100vh] overflow-y-auto'>
          <CustomRoutes />
        </div>
      </div>
    </>
  )
}

export default App