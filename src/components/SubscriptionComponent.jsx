import React from 'react'
import premiumgif from '../admin_assets/assets/img/illustrations/premimum.gif'
import { Link } from 'react-router-dom'

export default function SubscriptionComponent() {
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">

                <div className="col-md-6 mb-4">
                    <div className="card h-100 px-4 pt-3">
                        <h4 className="text-center text-bold">Subscription</h4>
                        <span className="text-center"><img src={premiumgif} alt="" className="img-fluid gem_img" /></span>
                        <h4 className="text-center text-bold">Premium</h4>
                        <p className="text-center">Get More From your Steps</p>
                        <p className="text-center"><Link to="#">View History</Link></p>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card h-100 px-4 pt-3">
                        <h4 className="text-center text-bold">Your Current Plan</h4>
                        <p className=" text-center"><button type="button" className="btn btn-primary waves-effect waves-light">50 USDT</button></p>

                        <p className="text-center ">Validity <span className="golden_bg">365 Days</span></p>
                        <div className="d-flex justify-content-between align-items-center pt-5 mt-5">
                            <p>Start Data <span className="golden_bg">Mar 14, 2024</span></p>
                            <p>End Data <span className="golden_bg">Mar 14, 2025</span></p>
                        </div>
                    </div>
                </div>


                <div className="card pt-3">
                    <ul className="nav nav-tabs bg-transparent d-flex justify-content-center border-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="#all" data-bs-toggle="tab">Monthly</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#Quarterly" data-bs-toggle="tab">Quarterly</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#Annual" data-bs-toggle="tab">Annual</Link>
                        </li>
                    </ul>

                    <div className="tab-content py-5 bg-transparent">
                        <div id="all" className="active tab-pane fade in show">
                            <div className="text-center">
                                <h4>Monthly plan</h4>
                                <p>No Plans Avaiable</p>
                            </div>
                        </div>
                        <div id="Quarterly" className="tab-pane fade">
                            <div className="text-center">
                                <h4>Quarterly plan</h4>
                                <p>No Plans Avaiable</p>
                            </div>
                        </div>
                        <div id="Annual" className="tab-pane fade">
                            <div className="text-center">
                                <h4>Annual plan</h4>
                                <p>No Plans Avaiable</p>
                            </div>
                        </div>
                    </div>
                </div>





            </div>

        </div>
    )
}
