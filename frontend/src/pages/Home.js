import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react"
import { fetchCheckins, fetchHabits, useAuthGuard } from "../auth"
import { Nav } from '../component/Navbar'
import { Row } from '../component/Row'
import { Card } from '../component/Card'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastSuccess } from '../component/ToastSuccess'
import { ToastContainer } from 'react-toastify'
import { useHabitStore } from '../middleware/useHabitStore'
import FormModal from '../component/FormModal'
import InputGroup from '../component/InputGroup'
import SelectInput from '../component/SelectInput'
import { BASE_URL } from '../auth'
import axios from 'axios'
import { ToastWarning } from '../component/ToastWarning'
import ModalConfirm from '../component/ModalConfirm'
import { useUserStore } from '../middleware/useUserStore'
import useWebSocket from '../middleware/webSocketHook.js'
import { useCheckinStore } from '../middleware/useCheckinStore.js'
import { formatDate } from '../middleware/DateFormat.js'
import { ButtonType } from '../component/Button.js'


const Home = () => {
  const habits = useHabitStore(state => state.habits)
  const user = useUserStore(state => state.user)
  const checkins = useCheckinStore(state => state.checkins)

  const user_id = user.id
  const location = useLocation()
  const success = location.state?.success
  const setHabits = useHabitStore(state => state.setHabits)
  const setCheckins = useCheckinStore(state => state.setCheckins)
  const navigate = useNavigate();
  
  useAuthGuard();
  
  const [modalState, setModalState] = useState('add')
  const [habit_id, setHabitId] = useState('')
  const [addConfirmModal, showConfirmModal] = useState(false)
  const [addHabitModal, showHabitModal] = useState(false)
  const [key, setKey] = useState(0)
  

  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [frequency, setFrequency] = useState('Daily')
  const [description, setDescription] = useState('')

  const habitModal = () => addHabitModal ? showHabitModal(false) : showHabitModal(true)
  const confirmModal = () => addConfirmModal ? showConfirmModal(false) : showConfirmModal(true)

  const clearForm = () => {
    setTitle('')
    setTime('')
    setFrequency('Daily')
    setDescription('')
  }

  const addHabit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post(`${BASE_URL}/api/v1/habits`,
        {
          title : title, 
          frequency : frequency.toUpperCase(), 
          time : time, 
          description : description
        },{
          headers : {
            "Content-Type" : 'application/json'
          },
          withCredentials : true
        }
      )
      if ((await res).data.id) {
        habitModal();
        clearForm();
        ToastSuccess("Habit created successfully!");
        setKey(key + 1);
        await fetchHabits(setHabits);
      }else{
        ToastWarning((await res).data.message)
        navigate('/',{
          state : {
            warning : "Please login first"
          }
        })  
      }
    } catch (error) {
      console.log(error);  
    }
  }

  const findHabit = (habit_id) => {
    for (let i = 0; i < habits.length; i++) {
      const id = habits[i]["id"];
      if (id === habit_id) {
        return habits[i]
      }
    }
  }

  const setEdit = (id) => {
    const habit = findHabit(id)
    if(habit){
      setTitle(habit.title)
      setTime(habit.time)
      setFrequency(habit.frequency)
      setDescription(habit.description)
    }
  }

  const editHabit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.put(`${BASE_URL}/api/v1/habits`,{
        habit_id : habit_id,
        user_id : user_id,
        title : title,
        description : description,
        frequency : frequency,
        time : time
      })
      if ((await res).data.id) {
        habitModal();
        ToastSuccess("Habit edited successfully!");
        setKey(key + 1);
        await fetchHabits(setHabits);
      }else{
        ToastWarning((await res).data.message)
        navigate('/',{
          state : {
            warning : "Please login first"
          }
        })  
      }
    } catch (error) {
      
    }
  }

  const handleDelete = async (id) => {
    try{
      const res = axios.delete(`${BASE_URL}/api/v1/habits`,{
        data :{
          habit_id : id
        },
        withCredentials : true
      })
      if((await res).data.code){
        (await res).data.code === 401 ?
        navigate('/',{
          state : {
            warning : (await res).data.message
          }
        })  :
        ToastWarning(`${(await res).data.message.cause} please try again`)
      }else{
        ToastSuccess((await res).data.message)
        confirmModal()
      }
      await fetchCheckins(setCheckins)
      await fetchHabits(setHabits)
      setKey(key + 1)
    }catch(error){
      console.log(error);
    }
    
  }

  const ws = useWebSocket({
      socketUrl : `ws://localhost:5000`
  });
  useEffect(() => {
    if(success){
        ToastSuccess("Logged In!")
        window.history.replaceState({}, '');
    } 
  },[])
  
  return (
    <>
    {
      addHabitModal && (
        <FormModal
          title={modalState === "add" ? "Create new habit" : "Edit habit"}
          onClose = {() => {
            setModalState("")
            habitModal()}}
          handleSubmit={modalState === "add" ? addHabit : editHabit}
        >
          <InputGroup label={"Title"}>
            <input className='outline-none' name='title' value={title} onChange={(e) => setTitle(e.target.value)} required></input>
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
          <InputGroup label={"Time"}>
            <input className='outline-none' name='time' type='time' value={time} onChange={(e) => setTime(e.target.value)} required></input>
          </InputGroup>
          <InputGroup label={"Description"}>
            <textarea className='w-full outline-none' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </InputGroup>
        </FormModal>
      )
    }
    {
      addConfirmModal && (
        <ModalConfirm message={`Delete habit ${findHabit(habit_id).title} ?`} state={"danger"} onClose={confirmModal} onConfirm={() => handleDelete(habit_id)}></ModalConfirm>
      )
    }
    <div className='min-h-screen h-full bg-slate-300'>
    <ToastContainer theme='colored' autoClose='3500'></ToastContainer>
    <Nav></Nav>
      <div className="relative isolate px-6 py-10 lg:px-8">
      <Row> 
        <Card title={"Checkin"} 
        description={"Your habit checkin of the day"}>
          <table className='relative table-auto'>
            <thead className='border-b border-gray-600'>
              <tr className='text-left'>
                <th>#</th>
                <th>Habit Name</th>
                <th>Time</th>
                <th>Time</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody key={key}>
              {checkins.map((item, count) => (
                <tr className='border-b-2 border-violet-400'>
                  <td>{count+1}</td>
                  <td>{findHabit(item.habit_id).title}</td>
                  <td>{formatDate(item.checkin_datetime)}</td>
                  <td>{item.completed}</td>
                  <td className='text-center py-2'>
                    <div className='
                    flex
                    flex-row
                    flex-shrink
                    flex-grow
                    justify-center
                    h-full
                    align-middle
                    '>
                    <ButtonType type={"confirm"} onClick={() => {
                      setHabitId(item.id)
                      confirmModal()
                      }}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card title={"Chart"} description={"See your performance"}></Card>
      </Row>
      <Row>
        <Card title={"Habits"}
        description={"Manage your habit(s) here"}
        action={
        <button 
        className='rounded-xl
        shadow-md
        hover:bg-gray-400'
        onClick={() => {
          setModalState("add")
          clearForm()
          habitModal()
        }}><PlusCircleIcon className='size-5'></PlusCircleIcon></button>
      }
        >
          {/* HABIT TABLE */}
          <table className='relative table-auto'>
            <thead className='border-b border-gray-600'>
              <tr className='text-left'>
                <th>#</th>
                <th>Name</th>
                <th>Frequency</th>
                <th>Time</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody key={key}>
              {habits.map((item, count) => (
                <tr className='border-b-2 border-violet-400'>
                  <td>{count+1}</td>
                  <td>{item.title}</td>
                  <td>{item.frequency}</td>
                  <td>{item.time}</td>
                  <td className='text-center py-2'>
                    <div className='
                    flex
                    flex-row
                    flex-shrink
                    flex-grow
                    justify-center
                    h-full
                    align-middle
                    '>
                    <ButtonType type="delete" onClick={() => {
                      setHabitId(item.id)
                      confirmModal()
                      }}/>
                    <ButtonType type="edit" onClick={() => {
                      setHabitId(item.id)
                      setModalState("edit")
                      setEdit(item.id)
                      habitModal()
                    }}/>
                    </div>
                  </td>
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