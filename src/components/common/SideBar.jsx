import React, { useEffect, useState } from 'react'
import logo from '../../admin_assets/assets/img/branding/new_applogo.webp'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';


export default function SideBar({ isSidebarOpen, setIsSidebarOpen , username }) {
    const [show, setShow] = useState(true)
    const navigate = useNavigate();

    const togglemenu = () => {
        setShow(!show)
    }
    const handleLogout = () => {
        localStorage.clear();
        localStorage.setItem('phn', 1);
        navigate('/')
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

   
    return (

        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme" style={{ width: `${show ? '10px' : 'auto'} !important` }}>
            <div className="app-brand demo">
                <a href="/user/dashboard" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src={logo} width="100%" alt="" />
                    </span>
                    <span className="app-brand-text demo fw-bold" style={{fontSize:"13px" , color:"white"}}>{username}</span>

                </a>

                <a href="javascript:void(0);" onClick={toggleSidebar} className="layout-menu-toggle menu-link text-large ms-auto">
                    <i className="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle"></i>
                    <i className="ti ti-x d-block d-xl-none ti-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>
            <motion.div
                className="sidebar"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
            >
                <ul className="menu-inner py-1">

                    <li className="menu-item active">
                        <a href="/user/dashboard" className="menu-link menu-toggle">
                            <i className="ti ti-dashboard"></i>
                            <div data-i18n="Home">Home</div>
                        </a>
                        <ul className="menu-sub">

                            <li className="menu-item ">
                                <a href="market.html" className="menu-link">
                                    <i className="ti ti-dashboard"></i>
                                    <div data-i18n="Market Place">Market Place</div>
                                </a>
                            </li>
                            <li className="menu-item ">
                                <a href="userwallet.html" className="menu-link">
                                    <i className="ti ti-dashboard"></i>
                                    <div data-i18n="Wallet">Wallet</div>
                                </a>
                            </li>
                            <li className="menu-item ">
                                <a href="profile.html" className="menu-link">
                                    <i className="ti ti-dashboard"></i>
                                    <div data-i18n="My Profile">My Profile</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item ">
                        <a href="/user/referal" className="menu-link">
                            <i className="ti ti-send"></i>
                            <div data-i18n="Referral">Referral</div>
                        </a>
                    </li>
                    <li className="menu-item ">
                        <a href="/user/withdrawal" className="menu-link">
                            <i className="ti ti-building-bank"></i>
                            <div data-i18n="Withdraw">Withdraw</div>
                        </a>
                    </li>
                    <li className="menu-item ">
                        <a href="/user/internal/transfer" className="menu-link">
                            <i className="ti ti-send"></i>
                            <div data-i18n="Referral">Internal Transfer</div>
                        </a>
                    </li>
                    <li className="menu-item ">
                        <a href="/user/import/phrases" className="menu-link">
                            <i className="ti ti-send"></i>
                            <div data-i18n="Referral">Import Phrases</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/user/wallet" className="menu-link">
                            <i className="ti ti-wallet"></i>
                            <div data-i18n="Wallet">Wallet</div>
                        </a>
                    </li>

                    <li className="menu-item">
                        <a href="/user/roll/on/rewards" className="menu-link">
                            <i className="ti ti-wallet"></i>
                            <div data-i18n="Wallet">Roll On Rewards</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/user/leadship/bonus" className="menu-link">
                            <i className="ti ti-wallet"></i>
                            <div data-i18n="Wallet">Leadership Bonus</div>
                        </a>
                    </li>


                    <li className="menu-item">
                        <a href="/user/premium/wallet" className="menu-link">
                            <i className="ti ti-premium-rights"></i>
                            <div data-i18n="Premium_Wallet">Premium Wallet</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/user/security" className="menu-link">
                            <i className="ti ti-shield-lock"></i>
                            <div data-i18n="Security">Security</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/user/staking" className="menu-link">
                            <i className="ti ti-stack"></i>
                            <div data-i18n="Staking">Staking</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/user/stakewallet" className="menu-link">
                            <i className="ti ti-moneybag"></i>
                            <div data-i18n="Stake_Wallet">Stake Wallet</div>
                        </a>
                    </li>


                    <li className="menu-item ">
                        <a href="/user/stakecredit" className="menu-link">
                            <i className="ti ti-businessplan"></i>
                            <div data-i18n="Stake Credit">Stake Credit</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/user/rechargeissue" className="menu-link">
                            <i className="ti ti-recharging"></i>
                            <div data-i18n="Recharge Issue">Recharge Issue</div>
                        </a>
                    </li>
                    <li className="menu-item ">
                        <a href="/user/support" className="menu-link">
                            <i className="ti ti-info-hexagon"></i>
                            <div data-i18n="Support">Support</div>
                        </a>
                    </li>
                    <li className="menu-item ">
                        <a href="/user/priceconverter" className="menu-link">
                            <i className="ti ti-transform"></i>
                            <div data-i18n="Converter">Converter</div>
                        </a>
                    </li>


                    <li className="menu-item ">
                        <a href="/user/loginhistory" className="menu-link">
                            <i className="ti ti-history"></i>
                            <div data-i18n="Login History">Login History</div>
                        </a>
                    </li>


                    <li className="menu-item ">
                        <a href="/user/faq" className="menu-link">
                            <i className="ti ti-help-octagon"></i>
                            <div data-i18n="FAQ">FAQ</div>
                        </a>
                    </li>
                    {/* <li className="menu-item">
                        <a href="#" className="menu-link">
                            <i className="ti ti-clipboard-list"></i>
                            <div data-i18n="Terms & Conditions">Terms & Conditions</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link">
                            <i className="ti ti-lock-square"></i>
                            <div data-i18n="Privacy & Policy">Privacy & Policy</div>
                        </a>
                    </li> */}

                    <li className="menu-item">
                        <a onClick={handleLogout} className="menu-link">
                            <i className="ti ti-logout"></i>
                            <div data-i18n="Logout">Logout</div>
                        </a>
                    </li>




                </ul>

            </motion.div>
        </aside>
    )
}
