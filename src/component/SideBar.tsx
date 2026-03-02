import { navigationLink } from '../data/sideBarData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  return (
    <div className='bg-white h-screen w-60 pt-6 flex flex-col fixed left-0 top-0 overflow-y-auto'>
      
      {/* Logo/Brand Area */}
      <div className='px-5 mb-8'>
        <h2 className='text-[#0f1f3d] text-xl font-semibold'>Retirement Planner</h2>
        <p className='text-blue-200 text-xs font-medium mb-3 tracking-wider'>ENTERPRISE FINANCIAL TOOL</p>
      </div>

      {/* Main Menu Section */}
      <div className='mb-10'>
        <p className='text-gray-500 text-xs font-medium px-5 mb-3 tracking-wider'>Main Menu</p>
        <nav>
          <ul className='p-4'>
            {navigationLink.map((link) => (
              <li key={link.id}>
                <Link 
                  to={link.path}
                  className={`${
                    location.pathname === link.path 
                      ? 'bg-none text-blue-900 font-medium bg-blue-50 border-l-4 border-blue-800 rounded-lg' 
                      : 'text-gray-800  hover:bg-gray-200'
                  } py-3 px-5 flex items-center gap-3 transition-colors`}
                >
                  <span className='text-xl'>{link.icon}</span>
                  <span className='text-sm'>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>


      {/* Spacer to push logout to bottom */}
      <div className='grow'></div>

      {/* Logout Button */}
      <div className='px-5 pb-8 mt-auto'>
        <button onClick={handleLogout} className='bg-white cursor-pointer text-[#1E6FFF] w-full py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-sm'>
          <FiLogOut className='w-5 h-5' />
          <span className='font-medium text-sm'>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default SideBar