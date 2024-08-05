import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import lodinggif from '../admin_assets/assets/gif/loadwalk.gif'
import firstimg from '../admin_assets/assets/img/illustrations/card-advance-sale.png'
import ReferalHistoryComponent from './ReferalHistoryComponent'
import ReferalCommisionHistory from './ReferalCommisionHistory'
import { referral_details } from '../common/Api'
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify'
import { FacebookShareCount } from 'react-share'

export default function ReferalComponent() {
    const [loading, setLoading] = useState(true);
    const [info, setinfo] = useState({})
    const [referal, setReferal] = useState('1VG3FG')
    const get_referral_details = async () => {
        try {
            const data = await referral_details()
            setReferal(data.referral_code)
            setinfo(data)
        } catch (error) {
            toast.error(`Api not load!`)
        }

        setLoading(false)
    }
    useEffect(() => {
        get_referral_details();
    }, [])

    const handleCopyCodes = () => {
        copy(`https://keepwalkking.io/referalcode/${info.referral_code}`);
        toast(`You have copied https://keepwalkking.io/referalcode/${info.referral_code}`)
    }
    return (
        <>
            {
                loading ? <div className='container-xxl flex-grow-1 container-p-y'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='loading'>
                                <img src={`${lodinggif}`} />
                            </div>

                        </div>
                    </div>
                </div> : <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"

                        />

                        <div className="col-xl-4 mb-4 col-lg-5 col-12">
                            <div className="card">
                                <div className="d-flex align-items-end row">
                                    <div className="col-7">
                                        <div className="card-body text-nowrap">
                                            <h5 className="card-title mb-0">Share Your Code</h5>
                                            <p className="mb-3 " style={{ whiteSpace: "wrap" }}>Share this code {referal && referal} with your friends and earn JW Tokens</p>

                                            <Link to="javascript:;" className="btn btn-sm btn-primary waves-effect waves-light me-2" onClick={handleCopyCodes}>Copy</Link>
                                            <FacebookShareCount url={`https://keepwalkking.io/referalcode/${referal}`} />

                                        </div>
                                    </div>
                                    <div className="col-5 text-center text-sm-left">
                                        <div className="card-body pb-0 px-0 px-md-4">
                                            <img src={firstimg} height="140" alt="view sales" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8 mb-4 col-lg-7 col-12">
                            <div className="card pt-4 mb-3">
                                <div className="nav-align-top mb-4">
                                    <ul className="nav nav-pills mb-3 d-flex justify-content-center" role="tablist">
                                        {/* <li className="nav-item" role="presentation">
                                    <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-home" aria-controls="navs-pills-top-home" aria-selected="true">
                                        Referral Commission
                                    </button>
                                </li> */}
                                        <li className="nav-item" role="presentation">
                                            <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-profile" aria-controls="navs-pills-top-profile" aria-selected="false" tabindex="-1">
                                                Referral History
                                            </button>
                                        </li>

                                    </ul>
                                    <div className="tab-content px-0 shadow-none">
                                        {/* <div className="tab-pane fade active show" id="navs-pills-top-home" role="tabpanel">

                                    <div className="table-responsive">
                                        <ReferalCommisionHistory />
                                    </div>
                                </div> */}
                                        <div className="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                                            <div className="table-responsive">
                                                <ReferalHistoryComponent />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>




                    </div>
                </div>
            }
        </>

    )
}
