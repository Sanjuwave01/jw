import React from 'react'
import walletnew from '../admin_assets/assets/img/illustrations/wallet_new.webp'
import { Link } from 'react-router-dom'

export default function StakingComponent() {
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
                <div className="col-lg-6 mb-4">
                    <div className="card px-4 pt-3 h-100">
                        <div className=" d-flex flex-column gap-2">
                            <h4 className="text-center">STAKE WALLET</h4>
                            <div className="text-center "><img src={walletnew} alt="" className="img-fluid wallet_new_img" /></div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-center mb-3">

                                    <h5>Stake Rewards</h5>
                                    <span>560.00</span>
                                </div>
                                <div className="text-center">

                                    <h5>Stake Referral</h5>
                                    <span>15215.940</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 mb-4">
                    <div className="card px-4 pt-3 h-100">
                        <ul className="nav nav-tabs bg-transparent d-flex justify-content-center border-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="#all" data-bs-toggle="tab">Stake Reward</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#Quarterly" data-bs-toggle="tab">Stake Referral</Link>
                            </li>
                        </ul>

                        <div className="tab-content bg-transparent">
                            <div id="all" className="active tab-pane fade in show">
                                <div className="text-center">
                                    <div className="d-flex justify-content-between align-items-center pb-5 mb-4 pt-3">
                                        <h6>Reward Recieved From <br />(Stake Plan)</h6>
                                        <h6>Amount <br />(USDT)</h6>
                                    </div>
                                    <p className="pt-4">No Stale Withdraw History Found</p>
                                </div>
                            </div>
                            <div id="Quarterly" className="tab-pane fade">
                                <div className="text-center">
                                    <div className="d-flex justify-content-between align-items-center pb-5 mb-4 pt-3">
                                        <h6>Reward Recieved From <br />(Stake Plan)</h6>
                                        <h6>Amount <br />(USDT)</h6>
                                    </div>
                                    <p className="pt-4">No Stale Withdraw History Found</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
