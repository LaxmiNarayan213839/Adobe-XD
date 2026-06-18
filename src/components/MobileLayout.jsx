import './MobileLayout.css'

const MobileLayout = ({ children }) => {
  return (
    <div className="mobile-layout">
      <div className="mobile-container">
        {children}
      </div>
    </div>
  )
}

export default MobileLayout
