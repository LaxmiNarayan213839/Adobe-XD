import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import '../styles/pages.css'

const Profile = () => {
  const navigate = useNavigate()
  const [user] = useState(() => {
    const userData = localStorage.getItem('user')

    if (!userData) {
      return null
    }

    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [navigate, user])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return null
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image">
          {getInitials(user.fullName)}
        </div>
        <h2 className="profile-name">{user.fullName}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Full Name</span>
          <span className="detail-value">{user.fullName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone Number</span>
          <span className="detail-value">{user.phoneNumber}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email Address</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Company Name</span>
          <span className="detail-value">{user.companyName || 'Not specified'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Agency</span>
          <span className="detail-value">{user.isAgency ? 'Yes' : 'No'}</span>
        </div>
      </div>
      <div className="logout-button">
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Profile
