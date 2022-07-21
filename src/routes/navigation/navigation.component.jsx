import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { signOutUser } from '../../utils/firebase/firebase.utils.js'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context"

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext) //since this is a hook when a value inside this hook is updated, this component will be updated too
    
    const signOutHandler = async () => {
        await signOutUser();
    }
    return (<>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {currentUser ? <span className='nav-link' onClick={signOutHandler}>Sign Out</span> : <Link className="nav-link" to='/auth'>SIGN IN</Link>}
            </div>
        </div>
        <Outlet /> 
    </>)
}
export default Navigation