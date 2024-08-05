import React, { useEffect, useState } from 'react'
import { Internal_Transfer_premium, stake_internal_transfer, user_details_two } from '../common/Api'
import { ToastContainer, toast } from 'react-toastify'

export default function InternalTransferComponent() {
    const [PageDetail, setPageDetail] = useState('Withdraw_page')
    const [PageDetail2, setPageDetail2] = useState('wallet_page')
    const [info, setInfo] = useState({})
    const [info2, setInfo2] = useState({})
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState(0)
    const [userReward, setUserRewards] = useState(0)

    const get_user_detail = async () => {
        const data = await user_details_two(PageDetail)
        setInfo(data)
        console.log('info', data)
        setBalance(Number(data.principle_amount) - Number(data.withdraw_per_mont_val))
        if (data.direct_referrals_RollOn == 3) {
            console.log(data.Referral_balance)
            setUserRewards(data.Referral_balance)
        } else {
            console.log(data.Referral_balance - Number(data.Roll_On_Reward))
            setUserRewards(data.Referral_balance - Number(data.Roll_On_Reward))
        }
    }

    const get_user_detail_two = async () => {
        const datas = await user_details_two(PageDetail2)
        console.log(datas)
        setInfo2(datas)
    }


    const handleInternalTransfer = async (e) => {
        e.preventDefault()
        
        if (amount > 0) {
            const from = document.querySelector("#from_wallet").value
            const to = document.querySelector("#to_wallet").value
            console.log(from, to, amount)
            if (from == 'null') {
                toast.error("Please Select On Wallet Type")
            } else {
                if (to == 'null') {
                    toast.error("Please Select On Wallet Type")
                } else {
                    if (amount > balance) {
                        toast.error(`You Can Withdrawal only ${balance} USDT`)
                    } else {
                        if (from == 'Reward_wallet') {
                            if (info.healthreward < amount) {
                                return toast.error(`Insufficent Balance!`)
                            }
                        } else {
                            if (userReward < amount) {
                                return toast.error(`Insufficent Balance!`)
                            }
                        }



                        if (to == 'stake_wallet') {
                            const data = await stake_internal_transfer(from, to, amount)
                            console.log(data)
                            toast(data.msg)
                            setAmount('')
                        } else {

                            const data = await Internal_Transfer_premium(from, to, amount)
                            await Internal_Transfer_premium(info2.user_id)
                            console.log(data)
                            setAmount('')
                            toast(data.msg)

                        }
                    }

                }

            }

        } else {
            toast.error("Please Transfer Greater Than 0 USDT")
        }

    }
    const handleAllmessage = (message) => {
        toast(`${message}`)
    }

    useEffect(() => {
        get_user_detail()
        get_user_detail_two()
    }, [PageDetail, PageDetail2])

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
                <div class="col-lg-6">
                    <div class="card px-5 py-4 h-100">
                        <div class="content_internal_transfer">
                            <h5 class="text-center mb-0">INTERNAL TRANSFER</h5>
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
                                             <>  Eligibility: {info.how_many_days} Day's left </> :  <>  Eligibility Expired </>
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
                <div class="col-lg-6 mt-4 mt-lg-0 mt-md-0">
                    <div class="card px-5 py-4 h-100">
                        <form onSubmit={handleInternalTransfer}>
                            <div class="d-flex justify-content-between align-items-center gap-4">
                                <div class="w-100">
                                    <label for="">From</label>
                                    <select class="form-select mb-4 mt-2" aria-label="Large select example" id='from_wallet' required>
                                        <option value="null" selected>Select Wallet</option>
                                        <option value="Reward_wallet">Health Reward</option>
                                        <option value="Referral_wallet">User Reward</option>
                                    </select>
                                </div>
                                <div class="interchange waves-effect waves-light btn-primary d-flex justify-content-center align-items-center" style={{ borderRadius: "3rem", height: "3rem", width: "7rem" }}>
                                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                                </div>
                                <div class="w-100">
                                    <label for="">To</label>
                                    <select class="form-select mb-4 mt-2" aria-label="Large select example" id='to_wallet' required>
                                        <option value="null" selected>Select Wallet</option>
                                        {info2.isPremiumEnable == true &&
                                            <option value="premium_wallet">Premium Wallet</option>
                                        }
                                        {info2.isStakeEnable == true &&
                                            <option value="stake_wallet">Stake Wallet</option>
                                        }



                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="">Current Amount (USDT)</label>
                                <input type="text" class="form-control mt-2" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} max={balance} />
                            </div>
                            <div class="text-center mt-4">
                                <button type="submit" class="btn btn-primary waves-effect waves-light">Transfer</button>
                            </div>
                        </form>
                    </div>
                </div>



            </div>

        </div>
    )
}
