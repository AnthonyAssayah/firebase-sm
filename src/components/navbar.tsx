import {Link} from 'react-router-dom'
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const signUserOut = () => {
        signOut(auth);
    }

    return ( 
        <div className='navbar'>
            <div className='links'>
                <Link to="/">Main</Link>
                {!user ?<Link to="/login">Login</Link>
                 : <Link to="/createPost">Post</Link> }
            </div>
            <div className='user'>
                {user && (
                <>
                    <p style={{ marginRight: '10px' }}>{user?.displayName}</p>
                    <img src={user?.photoURL || ''} width="30" height="30" />
                    <button onClick={signUserOut}>Log Out</button>
                </>
                )}
            </div>
        </div>
    )
}