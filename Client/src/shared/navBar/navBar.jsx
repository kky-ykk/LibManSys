
import { Link, useNavigate } from 'react-router-dom';
import './navBar.css';
import { useEffect } from 'react';
const NavBar = () => {

    const navigate = useNavigate();
    let token = null;
    let fullname = null, role = "user";

    function checLocalStorage() {
        const session = localStorage.getItem("session");

        if (session) {
            fullname = JSON.parse(session).name;
            role = JSON.parse(session).role;
            token = JSON.parse(session).token;
            // console.log("JSON.parse(session):", JSON.parse(session));

        }


    }

    checLocalStorage();

    return (

        <>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3  border-bottom bg-dark
">
                <div className="col-md-3  ">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <h3 className='mx-3 text-warning'>
                            Bookiz
                        </h3>
                    </a>
                </div>
                        {/* {localStorage.getItem("session") ? "/bookavailable" : "/signup"} */}
                {
                    (role == "admin") ? (
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-light">
                            <li><Link to="/" className="nav-link px-2  text-light menu">Book</Link></li>
                            {/* <li><Link to="/" className="nav-link px-2 text-light menu">Memberships</Link></li> */}
                            <li><Link to="/usermanage" className="nav-link px-2 text-light menu">User management</Link></li>
                        </ul>
                    ) : (
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-light">

                            <li><Link to="/" className="nav-link px-2  text-light menu">Home</Link></li>
                            <li><Link to={localStorage.getItem("session") ? "/bookavailable" : "/signup"} className="nav-link px-2 text-light menu">Books</Link></li>
                            <li><Link to={localStorage.getItem("session") ? "/mybooks" : "/signup"} className="nav-link px-2 text-light menu">My Books</Link></li>
                            {/* <li><Link href="#" className="nav-link px-2 text-light menu">About</Link></li>
                            <li><Link href="#" className="nav-link px-2 text-light menu">Contacts</Link></li> */}
                        </ul>
                    )
                }


                {
                    (token) ? (
                        <div>
                            <span style={{ color: 'white', fontWeight: 'bold', paddingRight: '5px' }}>{fullname}</span>
                            <button type="button" className="btn btn-outline-primary mx-2" onClick={() => { localStorage.clear(); navigate("/") }} >Log Out</button>
                        </div>
                    ) : (<div className="col-md-3 text-end">
                        <button type="button" className="btn btn-outline-primary mx-2" onClick={() => navigate("/login")}>Login</button>

                        <button type="button" className="btn btn-primary" onClick={() => navigate("/signup")}>Sign-up</button>
                    </div>)
                }
            </header>

        </>

    )

}


export default NavBar;