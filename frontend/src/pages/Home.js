import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from "react"
import { Auth } from "../auth"
import { Nav } from '../component/Navbar'
import { Row } from '../component/Row'
import { Card } from '../component/Card'
import { useLocation } from 'react-router-dom'
import { ToastSuccess } from '../component/ToastSuccess'
import { ToastContainer } from 'react-toastify'



const Home = () => {
  Auth();
  const location = useLocation()
  const success = location.state?.success
  useEffect(() => {
    if(success){
        ToastSuccess("Logged In!")
        window.history.replaceState({}, '');
    }
  },[])
  return (
    <div className='h-screen bg-gray-200'>
    <ToastContainer theme='colored' autoClose='3500'></ToastContainer>
    <Nav></Nav>
      <div className="relative isolate px-6 py-10 lg:px-8">
        <Row>
          <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, blanditiis.</Card>
          <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, blanditiis.</Card>
        </Row>
      </div>
    </div>
  )
}


export default Home