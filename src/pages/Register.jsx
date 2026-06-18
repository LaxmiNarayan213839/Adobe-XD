import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'
import '../styles/pages.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false
  })
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }

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
      localStorage.setItem('user', JSON.stringify(formData))
      navigate('/profile')
    }
  }

  return (
    <div className="register-page">
      <h1 className="page-title">Create your PopX account</h1>
      <p className="page-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          placeholder="Marry Doe"
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
          error={errors.fullName}
          required
        />
        <InputField
          label="Phone Number"
          placeholder="Marry Doe"
          value={formData.phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          error={errors.phoneNumber}
          required
        />
        <InputField
          label="Email Address"
          placeholder="Marry Doe"
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
          error={errors.email}
          required
        />
        <InputField
          label="Password"
          placeholder="Marry Doe"
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          error={errors.password}
          required
        />
        <InputField
          label="Company Name"
          placeholder="Marry Doe"
          value={formData.companyName}
          onChange={handleChange}
          name="companyName"
        />
        <div className="form-group">
          <label className="form-label required">Are you an Agency?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                className="radio-input"
                checked={formData.isAgency === true}
                onChange={() => setFormData(prev => ({ ...prev, isAgency: true }))}
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                className="radio-input"
                checked={formData.isAgency === false}
                onChange={() => setFormData(prev => ({ ...prev, isAgency: false }))}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-button">
          <Button type="submit">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Register
