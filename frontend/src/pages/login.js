import {useState} from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import ModalSuccess from "../component/ModalSuccess";
import ModalWarning from "../component/ModalWarning";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await 
    axios.post('http://localhost:5000/api/v1/login', 
      { 
        email,
        password
      },{
        headers : {
          "Content-Type" : 'application/json'
        },
        withCredentials : true
      });
      //status validasi login

      const root = ReactDOM.createRoot(document.getElementById('modal'));
      const message = response.data.message
      const user_id = response.data.active_user
      if (user_id != null) {
        root.render(<ModalSuccess message={message}/>);
        navigate('/home');
      }else{
        root.render(<ModalWarning message={message}/>);
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
    <div id="modal"></div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log In to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create account
            </a>
          </p>
        </div>
      </div>
    </>
  )
};

export default Login;