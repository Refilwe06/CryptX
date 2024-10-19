import Menu from '../Menu/Menu';
import './Sidenav.css';

const Sidenav = () => {
  return (
    <div className="sidenav full-height">
        <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="CryptX Logo" />
        </div>
        <Menu />
    </div>

  )
}

export default Sidenav