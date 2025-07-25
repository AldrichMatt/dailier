import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react"
import { useAuthGuard } from "../auth"
import { Nav } from '../component/Navbar'
import { Row } from '../component/Row'
import { Card } from '../component/Card'
import { useLocation } from 'react-router-dom'
import { ToastSuccess } from '../component/ToastSuccess'
import { ToastContainer } from 'react-toastify'
import { useHabitStore } from '../middleware/useHabitStore'
import FormModal from '../component/FormModal'
import InputGroup from '../component/InputGroup'
import ReactDOM from 'react-dom/client';
import SelectInput from '../component/SelectInput'
import { BASE_URL } from '../auth'
import axios from 'axios'


const Home = () => {

  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');
  const habits = useHabitStore(state => state.habits)
  const location = useLocation()
  const success = location.state?.success

  const addHabit = async (e) => {
    e.preventDefault();
    try {
    axios.post(`${BASE_URL}/api/v1/habits`,
      {
        title, description, frequency
      },{
        headers : {
          "Content-Type" : 'application/json'
        }
      }
    )
    } catch (error) {
      
    }
  }
  useAuthGuard();

  useEffect(() => {
    if(success){
        ToastSuccess("Logged In!")
        window.history.replaceState({}, '');
    }
  },[])
  
  const openModal = () => {
    const root = ReactDOM.createRoot(document.getElementById('modalPlace'));
      root.render(
      <FormModal title={"Add Habit"} handleSubmit={addHabit}>
        <InputGroup label={"Habit Name"} name={"title"} type={"text"}></InputGroup>
        <SelectInput label={"Frequency"} name={"frequency"}>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </SelectInput>
        <InputGroup label={"Description"} name={"description"} type={"text"}></InputGroup>
      </FormModal>
    )
  }
  return (
    <>
    <div id="modalPlace"></div>
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
      </div>
    </div>
    </>
  )
}


export default Home