import { Link } from "react-router";
import logo from '../assets/images/d-logo.jpg'

function Header(){
    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-md-5 mb-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>
                        <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarMenu">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to={'/search-users'}>Search Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/guess-number'}>Guess Number</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/auto-focus'}>Auto Focus</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    </>)
}

export default Header;