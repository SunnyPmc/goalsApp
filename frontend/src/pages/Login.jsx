import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())

    }, [isError, isSuccess, message, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner/>
    }

  return (
    <>
    <section className="heading">
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Login and set goals</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                
                <input type="email" name='email' id='email' value={email} placeholder='Enter your email' onChange={onChange} />
                <input type="password" name='password' id='password' value={password} placeholder='Enter your password' onChange={onChange} />
                
            </div>
            <div className="form-group">
                <input type="submit" className='btn btn-block' />
            </div>
        </form>
    </section>
    </>
  )
}

export default Login