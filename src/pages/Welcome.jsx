import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import '../styles/pages.css'

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      <h1 className="welcome-title">Welcome to PopX</h1>
      <p className="welcome-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="welcome-buttons">
        <Button onClick={() => navigate('/register')}>
          Create Account
        </Button>
        <Button variant="secondary" onClick={() => navigate('/login')}>
          Already Registered? Login
        </Button>
      </div>
    </div>
  )
}

export default Welcome
