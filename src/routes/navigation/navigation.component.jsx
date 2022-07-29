import {Outlet , Link} from 'react-router-dom'
import {Fragment }from'react'
import {ReactComponent as CrwnLogo} from'../../assests/crown.svg'
import './navigation.style.scss'
const Navigation=()=>{
    return (
    <Fragment>
    <div className='navigation'>
        <Link className='logo-container' to=''>
        <CrwnLogo/>
        </Link>
        <div className='nav-links-container'>
           <Link to='/shop' className='nav-link'>
            SHOP
           </Link>
          <Link to='/sign-in' className='nav-link'>
          Sign In 
          </Link>
        </div>

    </div>

      <Outlet/>
      <div style={{fontSize:"52px"}} >I am the footer</div>
    </Fragment>
    )
  }

export default Navigation