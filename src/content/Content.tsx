import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/Questionaire/Profile'
import Income from '../pages/Questionaire/Income'
import Plans from '../pages/Questionaire/Plans'
import IRAs from '../pages/Questionaire/IRAs'
import Goals from '../pages/Questionaire/Goals'
import Review from '../pages/Questionaire/Review'

const Content = () => {
  return (
    <div className='main-content h-[98vh] w-full overflow-y-scroll'>
        <Routes>
            <Route path='/' element={<Navigate to={'/profile'}/>}/>
            <Route path='/questionnaire/profile' element={<Profile />}/>
            <Route path='/questionnaire/income' element={<Income />}/>
            <Route path='/questionnaire/plans' element={<Plans />}/>
            <Route path='/questionnaire/iras' element={<IRAs />}/>
            <Route path='/questionnaire/goals' element={<Goals />}/>
            <Route path='/questionnaire/review' element={<Review />}/>
        </Routes>
      
    </div>
  )
}

export default Content
