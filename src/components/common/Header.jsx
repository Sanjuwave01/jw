import React, { useEffect, useState } from 'react'
import logo from '../../admin_assets/assets/img/branding/new_applogo.webp'
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
    const [main , setMain] = useState([])
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const handleLogout = () => {
        localStorage.clear();
        localStorage.setItem('phn', 1);
        navigate('/')
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


   

  console.log(main)


    return (
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0">
                <button className="nav-item nav-link px-0 me-xl-4" onClick={toggleSidebar}>
                    <i className="ti ti-menu-2 ti-sm"></i>
                </button>
            </div>
            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <div className="navbar-nav align-items-center">
                    <div className="nav-item navbar-search-wrapper mb-0">

                    </div>
                </div>


                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <Link className="nav-link dropdown-toggle hide-arrow" to="javascript:void(0);" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img src={logo} alt className="h-auto rounded-circle" />
                            </div>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" to="pages-account-settings-account.html">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src={logo} alt className="h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-medium d-block">{user && user.email}</span>
                                            <small className="text-muted">User</small>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/user/profile">
                                    <i className="ti ti-user-check me-2 ti-sm"></i>
                                    <span className="align-middle">My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="pages-account-settings-account.html">
                                    <i className="ti ti-settings me-2 ti-sm"></i>
                                    <span className="align-middle">Settings</span>
                                </Link>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <Link className="dropdown-item" onClick={handleLogout} target="_blank">
                                    <i className="ti ti-logout me-2 ti-sm"></i>
                                    <span className="align-middle">Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>


            <div className="navbar-search-wrapper search-input-wrapper d-none">
                <input type="text" className="form-control search-input container-xxl border-0" placeholder="Search..."
                    aria-label="Search..." />
                <i className="ti ti-x ti-sm search-toggler cursor-pointer"></i>
            </div>
        </nav>
    )
}
