import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/Questionaire/Profile'

const Content = () => {
  return (
    <div className='main-content h-[98vh] w-full overflow-y-scroll'>
        <Routes>
            <Route path='/' element={<Navigate to={'/profile'}/>}/>
            <Route path='/profile' element={<Profile />}/>
        </Routes>
      
    </div>
  )
}

export default Content
