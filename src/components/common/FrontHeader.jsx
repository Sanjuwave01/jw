import React from 'react'
import logonew from '../../front/images/logonew.png'
import { Link } from 'react-router-dom'

export default function FrontHeader() {
    return (
        <header className="jasonhead fixed-top">
            <div className="container">
                <div className="">
                    <nav className="navbar navbar-expand-xl d-flex align-items-center justify-content-between ">
                        <Link className="navbar-brand" to="/"> <img src={logonew} alt="" /></Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span ></span>
                            {/* <svg  fill="#D0A54F" height="30" viewBox="0 0 64 64" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="#D0A54F"><path d="m2 14c0-3.3137 2.68629-6 6-6h36c3.3137 0 6 2.6863 6 6s-2.6863 6-6 6h-36c-3.31371 0-6-2.6863-6-6z"/><path d="m8 32c0-3.3137 2.6863-6 6-6h36c3.3137 0 6 2.6863 6 6s-2.6863 6-6 6h-36c-3.3137 0-6-2.6863-6-6z"/><path d="m14 50c0-3.3137 2.6863-6 6-6h36c3.3137 0 6 2.6863 6 6s-2.6863 6-6 6h-36c-3.3137 0-6-2.6863-6-6z"/></g></svg> */}
                            <svg fill="#D0A54F" height="35" viewBox="0 0 64 64" width="35" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m10 2c-4.41828 0-8 3.58172-8 8v44c0 4.4183 3.58172 8 8 8h44c4.4183 0 8-3.5817 8-8v-44c0-4.41828-3.5817-8-8-8zm8 18c-1.1046 0-2 .8954-2 2s.8954 2 2 2h28c1.1046 0 2-.8954 2-2s-.8954-2-2-2zm-2 12c0-1.1046.8954-2 2-2h28c1.1046 0 2 .8954 2 2s-.8954 2-2 2h-28c-1.1046 0-2-.8954-2-2zm0 10c0-1.1046.8954-2 2-2h28c1.1046 0 2 .8954 2 2s-.8954 2-2 2h-28c-1.1046 0-2-.8954-2-2z" fill="#D0A54F" fill-rule="evenodd" /></svg>
                        </button>
                        <div class="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav  localmenu ms-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/help/center">Help Center</Link>
                                </li>

                                <li className="nav-item active CustmLng" id="google_translate_element">

                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
