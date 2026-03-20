import { Navigate, Route, Routes } from 'react-router-dom'
import RetirementPlan from '../pages/RetirementPlan'

const Content = () => {
  return (
    <div className='main-content h-[98vh] w-full overflow-y-scroll'>
      <Routes>
        <Route path='/' element={<Navigate to={'/retirement-plan'} />} />
        <Route path='/retirement-plan' element={<RetirementPlan />} />
      </Routes>

    </div>
  )
}

export default Content
