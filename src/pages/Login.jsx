import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'
import '../styles/pages.css'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/profile')
    }
  }, [navigate])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        if (userData.email === formData.email && userData.password === formData.password) {
          navigate('/profile')
        } else {
          setErrors({ email: 'Invalid credentials' })
        }
      } else {
        setErrors({ email: 'No account found. Please register first.' })
      }
    }
  }

  return (
    <div className="login-page">
      <h1 className="page-title">Welcome back!</h1>
      <p className="page-description">
        Enter your credentials to access your account.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <InputField
          label="Email Address"
          placeholder="Marry Doe"
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
          error={errors.email}
        />
        <InputField
          label="Password"
          placeholder="Marry Doe"
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          error={errors.password}
        />
        <div className="form-button">
          <Button type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
