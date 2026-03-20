import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Content from './content/Content'
import './index.css'
import FinancialBlueprint from './pages/FinancialBlueprint'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Register from './pages/Register'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './providers/ProtectedRoute'

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path='/financial-blueprint' element={<FinancialBlueprint />} />

            <Route
              path="*"
              element={
                <ProtectedRoute
                  element={
                    <div className="flex bg-[#F8FAFC]">
                      <div className="">
                        <div className="">
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