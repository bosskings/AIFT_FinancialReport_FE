import { Navigate, Route, Routes } from 'react-router-dom'
import Onboarding from '../pages/Onboarding/Onboarding'

const Content = () => {
  return (
    <div className='main-content h-[98vh] w-full overflow-y-scroll'>
        <Routes>
            <Route path='/' element={<Navigate to={'/onboarding'}/>}/>
            <Route path='/onboarding' element={<Onboarding />}/>
        </Routes>
      
    </div>
  )
}

export default Content
