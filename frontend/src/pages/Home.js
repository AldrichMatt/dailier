import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react"
import { useAuthGuard } from "../auth"
import { Nav } from '../component/Navbar'
import { Row } from '../component/Row'
import { Card } from '../component/Card'
import { Form, useLocation } from 'react-router-dom'
import { ToastSuccess } from '../component/ToastSuccess'
import { ToastContainer } from 'react-toastify'
import { useHabitStore } from '../middleware/useHabitStore'
import FormModal from '../component/FormModal'
import InputGroup from '../component/InputGroup'
import SelectInput from '../component/SelectInput'
import { BASE_URL } from '../auth'
import axios from 'axios'
import { ToastWarning } from '../component/ToastWarning'
import { useHabitStore } from '../middleware/useHabitStore'
import FormModal from '../component/FormModal'
import InputGroup from '../component/InputGroup'
import ReactDOM from 'react-dom/client';
import SelectInput from '../component/SelectInput'
import { BASE_URL } from '../auth'
import axios from 'axios'


const Home = () => {
  
  const habits = useHabitStore(state => state.habits)
  const location = useLocation()
  const success = location.state?.success
  
  useAuthGuard();
  
  const [showModal, setShowModal] = useState(false)

  const [title, setTitle] = useState('')
  const [frequency, setFrequency] = useState('')
  const [description, setDescription] = useState('')

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const addHabit = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${BASE_URL}/api/v1/habits`,
        {
          title, frequency, description
        },{
          headers : {
            "Content-Type" : 'application/json'
          }
        }
      )
    closeModal();
    setTitle("")
    setFrequency("Daily")
    setDescription("")
    ToastSuccess("Habit created successfully!")
    } catch (error) {
    ToastWarning(error)
    console.log(error);  
    }
  }


  useEffect(() => {
    if(success){
        ToastSuccess("Logged In!")
        window.history.replaceState({}, '');
    }
  },[])
  
  return (
    <>
    <div id="modalPlace"></div>
    {
      showModal && (
        <FormModal
          title={"Create new habit"}
          onClose = {closeModal}
          handleSubmit={addHabit}
        >
          <InputGroup label={"Title"}>
            <input className='outline-none' name='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
          </InputGroup>
          <SelectInput label={"Frequency"}>
            <select 
            name="frequency"
            className="outline-none w-full"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </SelectInput>
          <InputGroup label={"Description"}>
            <textarea className='w-full outline-none' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </InputGroup>
        </FormModal>
      )
    }
    <div className='h-screen bg-slate-300'>
    <ToastContainer theme='colored' autoClose='3500'></ToastContainer>
    <Nav></Nav>
      <div className="relative isolate px-6 py-10 lg:px-8">
      <Row> 
        <Card title={"Checkin"} description={"Your checkin list(s) of the day"}></Card>
        <Card title={"Chart"} description={"See your performance"}></Card>
      </Row>
      <Row>
        <Card 
        title={"Habits"}
        description={"Manage your habit(s) here"}
        action={<a onClick={openModal}><PlusCircleIcon className='size-5'></PlusCircleIcon></a>}
        >
          <table className='relative table-auto'>
            <thead className='border-b border-gray-600'>
              <tr className='text-left'>
                <th>#</th>
                <th>Name</th>
                <th>Frequency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.frequency}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card title={"Badges"}
        description={"See your achievement(s) here!"}>
        </Card>
      </Row>
      <Row> 
        <Card title={"Checkin"} description={"Your checkin list(s) of the day"}></Card>
        <Card title={"Chart"} description={"See your performance"}></Card>
      </Row>
      <Row>
        <Card 
        title={"Habits"}
        description={"Manage your habit(s) here"}
        action={<a onClick={openModal}><PlusCircleIcon className='size-5'></PlusCircleIcon></a>}
        >
          <table className='relative table-auto'>
            <thead className='border-b border-gray-600'>
              <tr className='text-left'>
                <th>#</th>
                <th>Name</th>
                <th>Frequency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.frequency}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card title={"Badges"}
        description={"See your achievement(s) here!"}>
        </Card>
      </Row>
      </div>
    </div>
    </>
  )
}


export default Home