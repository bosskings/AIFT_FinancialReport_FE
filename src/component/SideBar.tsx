import { FcSettings } from 'react-icons/fc';
import { FiHelpCircle } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { navigationLink } from '../data/sideBarData';

const SideBar = () => {
  const location = useLocation();

  return (
    <div className='bg-white h-screen w-60 pt-6 flex flex-col fixed left-0 top-0 overflow-y-auto'>

      {/* Logo/Brand Area */}
      <div className='px-5 mb-3 pt-5'>
        <h2 className='text-[#0f1f3d] text-xl font-semibold'>Retirement Planner</h2>
        <p className='text-gray-500 text-xs font-medium mb-3 tracking-wider'>ENTERPRISE FINANCIAL TOOL</p>
      </div>

      {/* Main Menu Section */}
      <div className='mb-10'>
        <nav>
          <ul className='p-4 space-y-2'>
            {navigationLink.map((link) => (
              <li key={link.id}>
                <p
                  className={`${location.pathname === link.path
                    ? 'bg-none text-blue-900 font-medium bg-blue-50 border-l-4 border-blue-800 rounded-lg'
                    : 'text-gray-800  hover:bg-gray-200'
                    } py-3 px-5 flex items-center gap-3 transition-colors`}
                >
                  <span className='text-xl'>{link.icon}</span>
                  <span className='text-sm'>{link.name}</span>
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>


      {/* Spacer to push logout to bottom */}
      <div className='grow'></div>

      <div className='px-5 pb-8 mt-auto gap-4 flex flex-col text-gray-600'>
        <button className='cursor-pointer flex items-center gap-2'>
          <FiHelpCircle className='w-4 h-4' />
          <span className='font-medium text-sm'>Help Center</span>
        </button>

        <button className='cursor-pointer flex items-center gap-2'>
          <FcSettings className='w-4 h-4' />
          <span className='font-medium text-sm'>Settings</span>
        </button>
      </div>
    </div>
  )
}

export default SideBar