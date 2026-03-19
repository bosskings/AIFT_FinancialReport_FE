import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/Questionaire/Profile'
import Income from '../pages/Questionaire/Income'
import Plans from '../pages/Questionaire/Plans'
import IRAs from '../pages/Questionaire/IRAs'
import Goals from '../pages/Questionaire/Goals'
import Review from '../pages/Questionaire/Review'
import RetirementPlan from '../pages/RetirementPlan'

const Content = () => {
  return (
    <div className='main-content h-[98vh] w-full overflow-y-scroll'>
        <Routes>
            <Route path='/' element={<Navigate to={'/retirement-plan'}/>}/>
            <Route path='/retirement-plan' element={<RetirementPlan />}/>
        </Routes>
      
    </div>
  )
}

export default Content
