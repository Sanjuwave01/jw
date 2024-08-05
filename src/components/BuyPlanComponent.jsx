import React, { useEffect, useState } from 'react'
import firstimg from '../admin_assets/assets/img/payment/done.png'
import secondimg from '../admin_assets/assets/img/payment/close.png'
import { format } from 'date-fns';
import { URL } from '../common/Route'
import { user_details_two, user_balance, add_leg_bussiness } from '../common/Api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { TO } from '../common/Route';
import { useNavigate } from 'react-router-dom'

export default function BuyPlanComponent() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const ph = JSON.parse(localStorage.getItem("ph"))
    const [plan, setPlan] = useState({})
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [allPlan, setAllPlan] = useState([])
    const [selectedType, setSelectedType] = useState('');
    const [info, setInfo] = useState({})
    const [balance, setBalance] = useState('')
    const [show, setShow] = useState(false);
    const [modelMessageShow, setModelMessageShow] = useState(false);
    const [paymentModel, setPaymentModel] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({});
    const [usdtBalance, setUsdtBalance] = useState(null)
    const [paymentDone, setPaymentDone] = useState(false);
    const [Premium, setPremium] = useState(0);
    const [chnageurl, setChangeUrl] = useState('');
    const [PageDetail, setPageDetail] = useState('wallet_page')
    const [loading, setLoading] = useState(false)


    const [PaymentProceed, setPaymentProcedd] = useState(false);
    const handleClose = () => {
        setModelMessageShow(false)
        setShow(false)
        setPaymentModel(false)
        setPaymentProcedd(false)
        setPaymentDone(false)
    };
    // o -> pay with usdt 1 -> pay with premium    2 -> pay later

    //const handleShow = () => setShow(true);

    const handleShow = (el) => {
        if (info.isPlanExpired == false) {
            toast.error(`You can't buy plan. Your plan is already active.`)
        } else {


            if (info.plan_support_status == 1) {
                if (!info.userCanRecharge.includes(el.id)) {
                    return toast.error(`You Can buy only ${info.userCanRecharge} Plan`)
                }
                setSelectedPlan(el)
                setShow(false)
                setPaymentModel(true)
            } else {
                setSelectedPlan(el)
                if (info.isPlanExpired == true) {
                    setShow(true)
                } else {
                    setModelMessageShow(true)
                }
            }
        }
        // true = plan expired or false = you cant buy plan
        // console.log(el)



    }
    //console.log(selectedPlan)

    const handlePayment = (el, pre) => {
        //console.log(el)
        //console.log(pre)
        setPremium(pre)
        if (pre == 1) { // pay with premium 
            setSelectedPlan(el)
            setShow(false)
            setPaymentModel(true)
        } else if (pre == 2) { // pay with later
            setSelectedPlan(el)
            setShow(false)
            setPaymentModel(true)
        } else { // pay with usdt


            if (el.annual_support_amount < usdtBalance) {
                const response = fetch(`${URL}/plan_usdt_send_api/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `${user.token}`
                    },
                    body: JSON.stringify({
                        Amount: selectedPlan.monthly_support_amount,
                        from_address: info.wallet_address,
                        to_address: TO,
                        package_type: "4",
                        api: ""

                    })
                }).then((res) => res.json())
                    .then((result) => {
                        console.log(result)
                    }).catch((err) => {
                        console.log(err)
                        toast.error(err)
                    })

                setSelectedPlan(el)
                setShow(false)
                setPaymentModel(true)
            } else {
                toast.error("Insufficent balance")
            }

        }


    }
    const handleConfirmPayment = async (el) => {
        console.log(info)
        setLoading(true)
        // console.log(el)
        let change = 'buy_plan_premium';
        if (Premium == 1) {
            change = 'buy_plan_premium';
            // setChangeUrl('buy_plan_premium')
        } else if (Premium == 2) {
            //setChangeUrl('buy_plan_test')
            change = 'buy_plan_test';
        } else {
            change = 'buy_plan';
            //setChangeUrl('buy_plan')
        }
        // console.log(`${URL}/${change}/`)
        const response = await fetch(`${URL}/${change}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                ID: el.id,
                wallet_type: "4",
                validation_days: "12",
                Hash_data: "",
                selected_market_price: info.market_price_details

            })
        });
        const result = await response.json();
        console.log('result', result)
        const responses = await fetch(`${URL}/add_purchase/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                id: info.user_id,
                Plan: el.id,


            })
        });
        const results = await responses.json();
        console.log('add_purchase', results)

        if (results.message == 'Purchase added successfully') {
            const responsess = await fetch(`${URL}/add_dummy_purchase/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `${user.token}`
                },

            });
            const resultss = await responsess.json();
            console.log('add_dummy_purchase', resultss)
            if ((info.obj_plan_hist) % 5 == 0) {
                const leg = await add_leg_bussiness(info.user_id, selectedPlan.id, info.reff_id)
                console.log('leg', leg)
            }
        }

        setLoading(false)

        setSelectedPlan(el)
        setPaymentProcedd(false)
        setPaymentDone(true)
        setInterval(() => {
            window.location.reload()

        }, 2000);

    }

    const handlePaymentproceed = (el) => {
        if (info.premium_wallet > Number(el.annual_support_amount) + Number(el.id)) {
            setSelectedPlan(el)
            setPaymentModel(false)
            setPaymentProcedd(true)
        } else {
            toast.error(`Insufficent Balance !`)
        }


    }


    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };
    //console.log(selectedType)



    const userPlanDetail = async () => {
        const response = await fetch(`${URL}/User_plan_details/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });
        const data = await response.json();
        //console.log(data)
        const startdate = new Date(data.plan_start_date);
        const enddate = new Date(data.plan_end_date);
        setStart(format(startdate, 'MMMM do, yyyy'));
        setEnd(format(enddate, 'MMMM do, yyyy'));
        setPlan(data)

    }


    const allPlanDetail = async () => {
        const plan = await fetch(`${URL}/all_plan/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                months: "Annual"
            })
        })

        const allplan = await plan.json();
        // console.log(allplan.data)
        setAllPlan(allplan.data)
    }

    const get_user_two = async () => {
        const result = await user_details_two(PageDetail)
        setInfo(result)
    }


    const get_balance = async () => {
        if (info.wallet_address) {
            const balances = await user_balance(info.wallet_address ? info.wallet_address : "0xaee20d609bda8824114a26050c2f52966c40d356")
            // console.log(balances)
            setUsdtBalance(balances)
        } else {
            setUsdtBalance(0)
        }
    }

    useEffect(() => {
        userPlanDetail();
        allPlanDetail();
        get_user_two()
        get_balance();
        if (ph == 1) {
            navigate('/user/import/phrases')
        }
    }, [ph])

    // console.log(info.wallet_address)


    const filteredData = allPlan.filter(item => item.id == selectedType);
    //console.warn(selectedPlan)

    console.log(info)
    console.log('selectedPlan', selectedPlan)


    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <ToastContainer />
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card px-4 pt-3">

                        {
                            info.obj_plan_hist > 0 ? <>

                                {
                                    info.isPlanExpired == false ? (
                                        <>
                                            <h4 className="text-center text-bold">Your Current Plan</h4>
                                            <p className=" text-center"><button type="button"
                                                className="btn btn-primary waves-effect waves-light">{plan.plan_name}</button></p>
                                            <p className="text-center ">Validity <span className="golden_bg">{plan.validation_days} Days</span></p>
                                            <div className="d-flex justify-content-between align-items-center pt-5 mt-2">
                                                <p>Start Data <span className="golden_bg">{start}</span></p>
                                                <p>End Data <span className="golden_bg">{end}</span></p>
                                            </div>
                                        </>
                                    ) : (<>
                                        <h4 className="text-center text-bold">You Plan Has Been Expired !</h4>

                                    </>)
                                }

                            </> : <>
                                <h4 className="text-center text-bold">You Are In A Free Plan</h4>
                            </>
                        }





                    </div>

                </div>
                <div className="col-md-6 mb-4">
                    <div className="card px-4 pt-3 pb-3">
                        <p className="text-center fs-4 text-white fw-medium">Annual Plan</p>
                        {/* <!-- <p className="text-start">Premium Plan</p> --> */}
                        <label for="selectpickerBasic" className="form-label">Premium Plan</label>
                        <div className="dropdown bootstrap-select w-100 dropup">
                            <div className="dropdown bootstrap-select w-100">
                                <select id="selectpickerBasic" className="selectpicker w-100"
                                    data-style="btn-default" tabindex="null" onChange={handleChange} value={selectedType}>
                                    <option>Select Plan</option>
                                    {
                                        allPlan.map((e) => {
                                            return (

                                                <option value={e.id}>{e.plan_name}</option>
                                            )
                                        })
                                    }


                                </select>

                            </div>
                        </div>
                        {
                            filteredData.map((el) => {
                                return (
                                    <>
                                        <div className="py-4">
                                            <p className="text-center mb-0 text-white">Purchase Amount</p>
                                            <p className="text-center"><span className="golden_bg">{el.plan_purchase_amount_annual} USDT</span></p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center pb-3">
                                            <div>
                                                <p className="mb-0 text-white">Minimum Steps</p>
                                                <span className="golden_bg">{el.Min_step_count} Perday</span>
                                            </div>
                                            <div className="text-end">
                                                <p className="mb-0 text-white">Maximum Steps</p>
                                                <span className="golden_bg">{el.Max_step_count} Perday</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center pb-3">
                                            <div>
                                                <p className="mb-0 text-white">Earnings</p>
                                                <span className="golden_bg">{el.reward_amount} USDT</span>
                                            </div>
                                            <div className="text-end">
                                                <p className="mb-0 text-white">Validates</p>
                                                <span className="golden_bg">12 Months</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center pb-1">
                                            <div>
                                                <p className="mb-0 text-white">Health Wallet</p>
                                            </div>
                                            <div className="text-end">
                                                <p className="mb-0 text-white">Referral Wallet</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center pb-3">
                                            <div>
                                                <p className="mb-0 text-white">Min/Max Withdraw</p>
                                                <span className="golden_bg">{el.health_withdraw_minimum_limit} - {el.health_withdraw_maximum_limit}</span><br />
                                                <span className="golden_bg">USDT Perday</span>
                                            </div>
                                            <div className="text-end">
                                                <p className="mb-0 text-white">Min/Max Withdraw</p>
                                                <span className="golden_bg">{el.referral_withdraw_minimum_limit} - {el.referral_withdraw_maximum_limit}</span><br />
                                                <span className="golden_bg">USDT Perday</span>
                                            </div>
                                        </div>
                                        <div className="text-center">


                                            <Button className="btn btn-primary mb-4" onClick={() => handleShow(el)}>
                                                Purchase
                                            </Button>




                                        </div>


                                    </>

                                )
                            })
                        }




                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>App Subscription Fund</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="main_content_fund">
                        <div className="instru_info">
                            <p className="mb-0">Dear user16,</p>
                            <p className="mb-0">Please pay project subscription fund
                                valid
                                till next plan purchase, vital for maintaining and
                                operating our project smoothly.</p>
                        </div>
                        <div
                            className="payment_mode_info d-flex justify-content-between align-items-center py-4">
                            <div>
                                <h6 className="mb-0">Payment mode</h6>
                                <h6 className="mb-0">USDT (BEP20)</h6>
                            </div>
                            <div>
                                <p className="mb-0">Avl Bal: {usdtBalance}</p>
                            </div>
                        </div>
                        <div className="dropdown bootstrap-select w-100 dropup">
                            <div className="dropdown bootstrap-select w-100">
                                <select id="selectpickerBasic"
                                    className="selectpicker w-100"
                                    data-style="btn-default" tabindex="null">
                                    <option>One Year (12 Month)</option>

                                </select>
                            </div>
                        </div>
                        <div
                            className="payment_mode_info d-flex justify-content-between align-items-center pt-4 pb-2">
                            <div>
                                <p className="text-white mb-0">Amount</p>
                            </div>
                            <div>
                                <p className="mb-0 golden_bg">{selectedPlan.annual_support_amount} USDT</p>
                            </div>
                        </div>
                        <div className="row align-items-center pt-3">
                            <div className="col text-end">
                                <button onClick={() => handlePayment(selectedPlan, 0)}
                                    className="btn btn-primary waves-effect waves-light mb-4 d-lg-inline-block "
                                >Pay with USDT</button>
                            </div>

                            {
                                info.isAdminEnablePremiumDeposit === true && selectedPlan.id <= 50 && <div className="col text-start">
                                    <button
                                        className="btn btn-primary waves-effect waves-light mb-4 d-lg-inline-block"
                                        onClick={() => handlePayment(selectedPlan, 1)} >Pay
                                        with premium</button>
                                </div>
                            }
                            {
                                info.isAdminEnablePayLater === true && <div className="col text-end">
                                    <button type="button"
                                        className="btn btn-primary waves-effect waves-light mb-4 d-lg-inline-block "
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal2">Pay Later</button>
                                </div>
                            }




                        </div>
                    </div>
                </Modal.Body>

            </Modal>

            <Modal show={modelMessageShow} onHide={handleClose}>

                <Modal.Body>You can't buy plan. Your plan is already active.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>

            <Modal show={paymentModel} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{Premium == 1 ?
                        Number(selectedPlan.annual_support_amount) + Number(selectedPlan.id) : Number(selectedPlan.id)} USDT (JW)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="main_content_fund">
                        <p className="mb-0">Subscription Amount</p>
                        <p className="mb-0 golden_bg">{
                            Premium == 1 ?
                                Number(selectedPlan.annual_support_amount) + Number(selectedPlan.id) : Number(selectedPlan.id)

                        } USDT / Annual</p>
                        <div
                            className="payment_mode_info d-flex justify-content-between align-items-center py-4">
                            <div>
                                <h6 className="mb-0">Premium Wallet</h6>
                                {/* <!-- <h6 className="mb-0">USDT (BEP20)</h6> --> */}
                            </div>
                            <div>
                                <p className="mb-0 golden_bg fw-bold">{info.premium_wallet} USDT</p>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => handlePaymentproceed(selectedPlan)}>Purchase</button>
                    </div>
                </Modal.Body>

            </Modal>


            <Modal show={PaymentProceed} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do You want to purchase {
                        Premium == 1 ?
                            Number(selectedPlan.annual_support_amount) + Number(selectedPlan.id) : Number(selectedPlan.id)} USDT (JW) Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loading ? <p>Loading ... </p> : <div className="main_content_fund">
                            <button type="button" className="btn btn-primary me-2" onClick={() => handleConfirmPayment(selectedPlan)}>Confirm</button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal5">Reject</button>
                        </div>
                    }

                </Modal.Body>

            </Modal>


            <Modal show={paymentDone} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><img src={firstimg} alt="" className="img-fluid W-25" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="fw-bold">YOU HAVE SUCCESSFULLY PURCHASE</h4>
                </Modal.Body>

            </Modal>

        </div>
    )
}
