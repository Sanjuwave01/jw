import React, { useEffect, useState } from 'react'
import { company_raferral } from '../common/Api'
import image20 from '../assets/img/20.jpg'
import image21 from '../assets/img/21.jpg'
import image22 from '../assets/img/22.jpg'

export default function RollRewardsComponent() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const [rorno, setRorno] = useState(0)
    const [filling, setFilling] = useState(0)
    const get_company_profile = async () => {
        setLoading(true)
        const data = await company_raferral()
        setRorno(data.ROR_NO)
        setFilling(data.filling_no)
        setData(data)
        setLoading(false)
    }
    console.log('data', data)
    useEffect(() => {
        get_company_profile()

    }, [])
    return (
        <>
            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card px-5 py-4 h-100">
                            <div class="content_internal_transfer">
                                <h5 class="text-center mb-0">ROLL ON REWARD</h5>
                                <div class="text-center">
                                    <div class="d-flex justify-content-between align-items-center pt-4">
                                        <div class="text-center">
                                            <div class="day_count mb-2">
                                                <span>ROR ID</span>
                                                {/* <i class="fa-solid fa-circle-exclamation text-white"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="3 user remain to activate Roll On Rewards. (Level 1)"></i> */}
                                            </div>
                                            <h6>{rorno}</h6>
                                        </div>
                                        <div class="text-center">
                                            <div class="day_count mb-2">
                                                <span>Current Filling</span>
                                                {/* <i class="fa-solid fa-circle-exclamation text-white"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="3 user remain to activate Roll On Rewards. (Level 1)"></i> */}
                                            </div>
                                            <h6>{filling}</h6>
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <p class="mb-0">Running ROR</p>
                                        <p class="mb-0">{data.UserPoolCount}</p>
                                    </div>
                                    <p class="mb-2">Roll On Reward</p>
                                    <h6 class="mb-2">{data.roll_supp} USDT</h6>
                                    <div class="day_count ">
                                        <span class="mb-0 fw-bold text-danger">
                                            {
                                                data.direct_referrals_50 > 2 && data.principle_amount <= 550 ? <> Completed </> : data.direct_referrals_100 > 2 && data.principle_amount > 900 && data.principle_amount < 1100 ? <> Completed </> :
                                                    data.direct_referrals_200 > 2 && data.principle_amount > 1800 && data.principle_amount < 2100 ? <> Completed </> : data.how_many > 0 ?
                                                        <>  Eligibility: {data.how_many} Day's left </> : <>  Eligibility Expired </>
                                            }



                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 mt-4 mt-lg-0 mt-md-0">
                        <div class="card  h-100">
                            <img src={image20} />
                        </div>
                    </div>

                    <div class="col-lg-6 mt-4 mt-4">
                        <div class="card  h-100">
                            <img src={image21} />
                        </div>
                    </div>
                    <div class="col-lg-6 mt-4 mt-4">
                        <div class="card  h-100">
                            <img src={image22} />
                        </div>
                    </div>



                    <div class="content-backdrop fade"></div>
                    <div class="col-lg-12">
                        <div class="card px-5 py-4 mt-4">
                            <div class="d-flex justify-content-between align-items-center pt-4">

                                <div class="tree text-center">
                                    <h4>ROLL ON REWARD TREE</h4>
                                    <ul>
                                        <li>
                                            <a href="#">ROR ID {data.ROR_NO}</a>
                                            {
                                                data.related_ids && <ul>
                                                    {
                                                        data.related_ids[0] && <li>
                                                            <a href="#"> ROR ID {data.related_ids[0]}</a>
                                                            <ul>
                                                                {
                                                                    data.related_ids[3] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[3]}</a>
                                                                    </li>
                                                                }

                                                                {
                                                                    data.related_ids[4] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[4]}</a>
                                                                    </li>
                                                                }
                                                                {
                                                                    data.related_ids[5] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[5]}</a>
                                                                    </li>
                                                                }


                                                            </ul>
                                                        </li>
                                                    }
                                                    {
                                                        data.related_ids[1] && <li>
                                                            <a href="#">ROR ID {data.related_ids[1]}</a>
                                                            <ul>
                                                                {
                                                                    data.related_ids[6] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[6]}</a>
                                                                    </li>
                                                                }
                                                                {
                                                                    data.related_ids[7] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[7]}</a>
                                                                    </li>
                                                                }
                                                                {
                                                                    data.related_ids[8] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[8]}</a>
                                                                    </li>
                                                                }
                                                            </ul>
                                                        </li>
                                                    }

                                                    {
                                                        data.related_ids[2] && <li>
                                                            <a href="#">ROR ID {data.related_ids[2]}</a>
                                                            <ul>
                                                                {
                                                                    data.related_ids[9] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[9]}</a>
                                                                    </li>
                                                                }
                                                                {
                                                                    data.related_ids[10] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[10]}</a>
                                                                    </li>
                                                                }
                                                                {
                                                                    data.related_ids[11] && <li>
                                                                        <a href="#">ROR ID {data.related_ids[11]}</a>
                                                                    </li>
                                                                }
                                                            </ul>
                                                        </li>
                                                    }



                                                </ul>
                                            }

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}
