import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import Login from './pages/Login'
import ProtectedRoute from './providers/ProtectedRoute'
import SideBar from './component/SideBar'
import Content from './content/Content'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/onboarding' element={<Onboarding />}/>
            
            <Route
              path="*"
              element={
                <ProtectedRoute
                  element={
                    <div className="flex min-h-screen bg-[#F8FAFC]">
                      <SideBar />
                      <div className="flex-1 ml-60">
                        <div className="mt-24 px-6">
                          <Content />
                        </div>
                      </div>
                    </div>
                  }
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App