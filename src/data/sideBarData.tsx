import { IoSettingsOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { TbLayoutDashboard } from "react-icons/tb";


export const navigationLink = [
    {
        id: 1,
        name: 'Overview',
        path: '/overview',
        icon: <TbLayoutDashboard />
    },
    
    {
        id: 3,
        name: 'Students',
        path: '/students',
        icon: <PiStudent />
    }, 
    {
        id: 4,
        name: 'Settings',
        path: '/settings',
        icon: <IoSettingsOutline />
    },
]


