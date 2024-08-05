import React from 'react'
import { Link } from 'react-router-dom'

export default function StakingSub() {
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="modal fade show" id="modalToggle" aria-labelledby="modalToggleLabel" tabindex="-1" style={{display:"block"}} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">

                        </div>
                        <div className="modal-body text-center">Minimum eligibility 126 USDT (JW) permium plan and above
                        </div>
                        <div className="modal-footer text-center">
                            <Link to="/user/subscription" className="text-white w-100"><button className="btn btn-primary waves-effect waves-light ">
                                Upgrade Plan
                            </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
