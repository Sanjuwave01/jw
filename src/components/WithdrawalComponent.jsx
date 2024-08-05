import React, { useEffect, useState } from 'react'
import { get_withdraw_fees, resend_otp, update_plan_end_date, user_details_two, withdraw_request } from '../common/Api'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function WithdrawalComponent() {
    const ph = JSON.parse(localStorage.getItem('ph'));
    const navigation = useNavigate();

    const [email, setEmail] = useState(false)
    const [tfa, setTfa] = useState(false)
    const [info, setInfo] = useState({})
    const [pageDetail, setPageDetail] = useState('Withdraw_page')
    const [userEmail, setUserEmail] = useState('')
    const [balance, setBalance] = useState(0)
    const [userReward, setUserRewards] = useState(0)
    const [amount, setAmount] = useState('')
    const [address, setAddress] = useState('')
    const [pin, setPin] = useState('')
    const [twoCode, setTwoFA] = useState('')
    const [emailOtp, setEmailOtp] = useState('')
    const [version, setVersion] = useState(0)
    const [fee, setFee] = useState(0)
    const [received, setReceived] = useState(0)
    const [message, setmessage] = useState(null)
    const [directCount, setDirectCount] = useState(3)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const get_user_detail_two = async () => {
        const data = await user_details_two(pageDetail)
        setInfo(data)
        setVersion(data.AppVersion)
        setUserEmail(data.Email)
        setAddress(data.wallet_address)
        setBalance(Number(data.principle_amount) - Number(data.withdraw_per_mont_val))
        if (data.direct_referrals_RollOn == 3) {
            console.log(data.Referral_balance)
            setUserRewards(data.Referral_balance)
        } else {
            console.log(data.Referral_balance - Number(data.Roll_On_Reward))
            setUserRewards(data.Referral_balance - Number(data.Roll_On_Reward))
        }
    }

    const handleChecked = () => {
        const tfa = document.getElementById("customRadioTemp1")
        const email = document.getElementById("customRadioTemp2")
        if (tfa.checked) {
            console.log(tfa.value)
            setTfa(true)
            setEmail(false)
        } else {
            console.log(email.value)
            setEmail(true)
            setTfa(false)
        }
    }

    const get_community_fee = async () => {
        const result = await get_withdraw_fees()
        setFee(result.Withdraw_fee)
    }

    useEffect(() => {
        get_user_detail_two()
        get_community_fee()
        setShow(true)

    }, [])

    useEffect(() => {
        if (ph == 1) {
            navigation('/user/import/phrases')
        }

    }, [ph])

    console.log(version)

    console.log(info)

    const handleSendOtp = async () => {
        const result = await resend_otp()
        console.log(result)
        toast(result.Msg)
    }

    // admin_stop_withdraw1 ==1 means withdrawal stop
    //admin_stop_withdraw1 ==0 means withdrawal Open

    const handleWidthdrawal = async () => {
        if (amount < 0) {
            return toast.error(`Please enter greater than 0`)
        }
        if (tfa) {
            if (info.twofa_status == 'disable') {
                toast.error('Two Factor Authentication Disable! Please Select Email OTP Verifications')
            } else {
                if (info.admin_stop_withdraw1 == 1) {
                    toast.error('Withdrawal Under Maintance')
                } else {
                    if (info.healthreward > amount) {
                        const walletType = document.querySelector("#selectpickerBasic").value;
                        const data = {
                            Address: address,
                            Amount: amount,
                            Two_Fa: emailOtp,
                            User_PK: ph,
                            Wei_amount: fee,
                            pin: pin,
                            premium_transfer_amt: info.principle_amount,
                            price: received,
                            security_type: "EMAIL",
                            stake_credit_converted: "0.0",
                            user_withdraw_request: "0.0",
                            wallet_type: walletType,
                            AppVersion: version
                        }
                        console.log(data)
                        const result = await withdraw_request(data)
                        toast(result.Msg)
                        await update_plan_end_date(info.user_id)

                        console.log(result);
                    } else {
                        toast.error(`Insufficient Balance`)
                    }

                }
            }
        } else {
            if (info.admin_stop_withdraw1 == 1) {
                toast.error('Withdrawal Under Maintance')
            } else {
                if (userReward > amount) {
                    const walletType = document.querySelector("#selectpickerBasic").value;
                    const data = {
                        Address: address,
                        Amount: amount,
                        Two_Fa: emailOtp,
                        User_PK: ph,
                        Wei_amount: fee,
                        pin: pin,
                        premium_transfer_amt: info.principle_amount,
                        price: received,
                        security_type: "EMAIL",
                        stake_credit_converted: "0.0",
                        user_withdraw_request: "0.0",
                        wallet_type: walletType,
                        AppVersion: version
                    }
                    console.log(data)
                    const result = await withdraw_request(data)
                    await update_plan_end_date(info.user_id)
                    toast(result.Msg)
                    console.log(result);
                } else {
                    toast.error(`Insufficient Balance`)
                }

            }
        }
    }

    const handleAmount = (e) => {
        console.log(e.target.value)
        const value = e.target.value * fee / 100;
        setReceived(e.target.value - value)
        setAmount(e.target.value)

    }

    const handleAllmessage = (message) => {
        toast(`${message}`)
    }

    const handleActiveMessage = () => {
        let message = 'user remain to activate Roll On Rewards.'
        if (info.principle_amount < 550) {
            const userCount = 3 - info.direct_referrals_RollOn;

            if (userCount >= 0) {
                message = `${userCount} user remain to activate Roll On Rewards.`
            } else {
                message = '0 user remain to activate Roll On Rewards.'
            }
        } else if (info.principle_amount < 1100 && info.principle_amount > 800) {
            const userCount = 3 - info.direct_referrals_RollOn100;
            if (userCount >= 0) {
                message = `${userCount} user remain to activate Roll On Rewards.`
            } else {
                message = '0 user remain to activate Roll On Rewards.'
            }
        } else {
            const userCount = 3 - info.direct_referrals_RollOn200;
            if (userCount >= 0) {
                message = `${userCount} user remain to activate Roll On Rewards.`
            } else {
                message = '0 user remain to activate Roll On Rewards.'
            }
        }
        toast(`${message}`)
    }



    return (
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="row">
                <ToastContainer />

                <div class="col-lg-6 mb-4" >
                    <div class="card px-5 py-4 h-100">
                        <div class="content_internal_transfer">
                            <h5 class="text-center mb-0">WITHDRAWAL</h5>
                            <div class="d-flex justify-content-between align-items-center pt-4">
                                <div class="text-center">
                                    <p class="mb-2">Health Reward</p>
                                    <h6>{info.healthreward} USDT</h6>
                                </div>
                                <div class="text-center">
                                    <p class="mb-2">User Reward</p>
                                    <h6>{userReward > 0 ? userReward : 0} USDT</h6>
                                </div>
                            </div>
                            <div class="text-center">
                                <p class="mb-2">Roll On Reward</p>
                                <h6 class="mb-2">{info.Roll_On_Reward} USDT</h6>
                                <div class="day_count ">
                                    <span class="mb-0 fw-bold text-danger">
                                        {
                                            info.direct_referrals_RollOn > 2 && info.principle_amount <= 550 ? <> Completed </> : info.direct_referrals_RollOn100 > 2 && info.principle_amount > 900 && info.principle_amount < 1100 ? <> Completed </> :
                                                info.direct_referrals_RollOn200 > 2 && info.principle_amount > 1800 && info.principle_amount < 2100 ? <> Completed </> : info.how_many_days > 0 ?
                                                    <>  Eligibility: {info.how_many_days} Day's left </> : <>  Eligibility Expired </>
                                        }


                                    </span>

                                    <i class="fa-solid fa-circle-exclamation text-white"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="3 user remain to activate Roll On Rewards. (Level 1)" onClick={() => handleActiveMessage()}></i>
                                </div>
                                <div class="d-flex justify-content-between align-items-center pt-4">
                                    <div class="text-center">
                                        <div class="day_count mb-2">
                                            <span>TWA</span>
                                            <i class="fa-solid fa-circle-exclamation text-white"
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title="3 user remain to activate Roll On Rewards. (Level 1)" onClick={() => handleAllmessage(`Total amount available to withdrawal`)}></i>
                                        </div>
                                        <h6>{info.principle_amount} USDT</h6>
                                    </div>
                                    <div class="text-center">
                                        <div class="day_count mb-2">
                                            <span>BWA</span>
                                            <i class="fa-solid fa-circle-exclamation text-white"
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title="3 user remain to activate Roll On Rewards. (Level 1)" onClick={() => handleAllmessage(`Balance amount available to withdrawal`)}></i>
                                        </div>
                                        <h6>{balance} USDT</h6>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-4">
                    <div class="card h-100 px-4 pt-3">
                        <div class="row justify-content-between align-items-center">
                            <div>

                                <p class="text-end"><a href="/user/withdrawal/history">View History</a></p>
                                <div class="mb-3">
                                    <label for="selectpickerBasic" class="form-label">Select Wallet</label>
                                    <div class="dropdown bootstrap-select w-100 dropup">
                                        <div class="dropdown bootstrap-select w-100">
                                            <select id="selectpickerBasic" class="selectpicker w-100" data-style="btn-default"
                                                tabindex="null">
                                                <option value="1">Health Reward</option>
                                                <option value="2">User Reward</option>
                                            </select>

                                        </div>

                                    </div>


                                </div>

                                <div class="">
                                    <label for="amount" class="form-label">Amount(USDT)</label>
                                    <input type="number" class="form-control" id="fiat_value" placeholder="0.00"
                                        aria-describedby="" value={amount} onChange={(e) => handleAmount(e)} />
                                    {
                                        received > 0 &&

                                        <span style={{ color: "green" }}>You Have To Recieved Amount {received}</span>
                                    }
                                </div>




                            </div>
                        </div>

                        <div class="content-backdrop fade"></div>
                    </div>

                </div>
                <div class="col-12 mb-4">
                    <div class="card h-100 px-4 pt-3">
                        <div class="row justify-content-between align-items-center">
                            <div>

                                <p class="mt-2">Community support : {fee} %
                                </p>
                                <div class="col-md-12 my-3">
                                    <label for="address" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="address" placeholder=""
                                        value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="" readOnly={true} />

                                </div>
                                <div class="col-md-12 my-3">
                                    <label for="pin" class="form-label">Enter Pin</label>
                                    <input type="password" class="form-control" id="address" placeholder="Enter Your Pin" value={pin} onChange={(e) => setPin(e.target.value)}
                                        aria-describedby="" />

                                </div>
                                <div class="row mb-4">
                                    <div class="col-md">
                                        <div class="form-check custom-option custom-option-basic">
                                            <label class="form-check-label custom-option-content" for="customRadioTemp2">
                                                <input name="customRadioTemp" class="form-check-input" type="radio" value="email"
                                                    id="customRadioTemp2" onClick={handleChecked} />
                                                <span class="custom-option-header">
                                                    <span class="h6 mb-0">Email</span>

                                                </span>

                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-md mb-md-0 mb-2">
                                        <div class="form-check custom-option custom-option-basic">
                                            <label class="form-check-label custom-option-content" for="customRadioTemp1">
                                                <input name="customRadioTemp" class="form-check-input" type="radio" value="tfa"
                                                    id="customRadioTemp1" onClick={handleChecked} />
                                                <span class="custom-option-header">
                                                    <span class="h6 mb-0">TFA</span>

                                                </span>

                                            </label>
                                        </div>
                                    </div>

                                    {
                                        tfa && <div class="col-12 mb-4 mt-3 position-relative">
                                            <label for="2fa" class="form-label">2FA</label>
                                            <input type="text" class="form-control" id="2fa" placeholder="Enter 2FA Code" value={twoCode}
                                                aria-describedby="" onChange={(e) => setTwoFA(e.target.value)} />


                                        </div>
                                    }

                                    {
                                        email && <>
                                            <div class="col-12 mb-4 mt-3 position-relative">
                                                <label for="2fa" class="form-label">Email</label>
                                                <input type="text" class="form-control" id="email" value={userEmail} aria-describedby="" onChange={(e) => setUserEmail(e.target.value)} readOnly={true} />
                                                <p style={{ cursor: "pointer", color: 'red' }} onClick={handleSendOtp}>Send OTP</p>

                                            </div>
                                            <div class="col-12 mb-4 mt-3 position-relative">
                                                <label for="2fa" class="form-label">Email OTP</label>
                                                <input type="number" class="form-control" id="emailOtp" placeholder="OTP" aria-describedby="" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} />


                                            </div>
                                        </>
                                    }


                                </div>





                                <button type="button" class="btn btn-primary waves-effect waves-light mb-4" onClick={handleWidthdrawal}>Withdraw</button>
                            </div>
                        </div>


                        <div class="mt-3">


                            <div class="modal fade" id="modalScrollable" tabindex="-1" style={{ display: "none" }}
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">

                                        </div>
                                        <div class="modal-body">
                                            <p class="text-center fs-5 ">
                                                You Should have BNB Balance to Withdraw, Minimum balance of 0.00100000
                                            </p>
                                            <div class="row">
                                                <div class="col-6 golden_bg fs-6">
                                                    <div class="">
                                                        Heath Monthly Withdraw limit
                                                    </div>
                                                    <div class="">
                                                        600 - 750 USDT Per Month

                                                    </div>
                                                </div>
                                                <div class="col-6 golden_bg fs-6">
                                                    <div>
                                                        Referral Monthly Withdraw limit
                                                    </div>
                                                    <div class="">
                                                        1 - 800 USDT Per Month
                                                    </div>
                                                </div>
                                                <div class="col-12 text-center my-3">
                                                    <button type="button" class="btn btn-dark waves-effect waves-light"
                                                        data-bs-dismiss="modal">Understood</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div class="content-backdrop fade"></div>
                        </div>

                    </div>

                </div>

            </div>


            <div class="layout-overlay layout-menu-toggle"></div>


            <div class="drag-target"></div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 style={{ textAlign: "center" }}>You should have BNB Balance to withdraw, Minimum balance of 0.00100000</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='tab-bor'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Health Monthly</td>
                                    <td>Referral Monthly</td>
                                </tr>
                                <tr>
                                    <td>Withdraw limit</td>
                                    <td>Withdraw limit</td>
                                </tr>
                                <tr>
                                    <td>8 - 100</td>
                                    <td>10 - 100</td>
                                </tr>
                                <tr>
                                    <td>USDT Per Month</td>
                                    <td>USDT Per Month</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Understood
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
