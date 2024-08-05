import React, { useEffect, useState } from 'react'
import firstimage from '../admin_assets/assets/img/illustrations/wallet_new.webp'
import { bnb_balance, get_address, get_profile, jw_balance, jw_transfer, premium_deposit_api, transfer_premium_amount, usdt_transfer, user_balance, user_details_two } from '../common/Api';
import { ToastContainer, toast } from 'react-toastify';
import PremiumTransferHistory from './PremiumTransferHistory';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { URL } from '../common/Route';


export default function PremiumWalletComponent() {
    const [info, setInfo] = useState({})
    const [amount, setAmount] = useState("")
    const [show, setShow] = useState(false);
    const [senderEmail, setSenderEmail] = useState('');
    const [profile, setProfile] = useState({});
    const [isClicked, setIsClicked] = useState(true);
    const [PageDetail, setPageDetail] = useState('wallet_page')
    const [jw, setJw] = useState(0)
    const [disable, setDisable] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const ph = JSON.parse(localStorage.getItem('ph'));


    const handleDeposit = async () => {
        setDisable(true)
        if (ph == 1) {
            
            toast.error('Please Import Your Pharses')
            setDisable(false)
        } else {
            if (amount >= info.premium_min_limit && amount <= info.premium_max_limit) {
                const jwbalance = await jw_balance(info.wallet_address)
                const bnbBalance = await bnb_balance(info.wallet_address)

                if (jw > jwbalance) {
                    toast.error(`Insufficent JW`)
                    setDisable(false)
                } else {
                    if (bnbBalance > info.minimum_BNB_Balance) {
                        const data = await jw_transfer(ph, jw)
                        console.log(data)
                        if (data) {
                            const datas = await premium_deposit_api(amount, jw, data)
                            console.log(datas)
                            toast(datas.msg)
                        } else {
                            toast.error('Insufficent Gas Fees')
                            setDisable(false)
                        }
                    } else {
                        toast.error(`Insufficent BNB`)
                        setDisable(false)
                    }
                }

            } else {
                toast.error(`Min Deposite Amount ${info.premium_min_limit} USDT or Max Deposite Amount ${info.premium_max_limit} USDT`)
                setDisable(false)
            }
        }
        // setTimeout(() => {
        //     document.location.reload();
        //   }, 3000);
    }

    const handleDepositu = async () => {
        setDisable(true)
        if (ph == 1) {
            toast.error('Please Import Your Pharses')
        } else {
            if (amount >= info.premium_min_limit && amount <= info.premium_max_limit) {
                const usdtbalance = await user_balance(info.wallet_address)
                const bnbBalance = await bnb_balance(info.wallet_address)

                if (amount > usdtbalance) {
                    toast.error(`Insufficent USDT`)
                } else {
                    if (bnbBalance > info.minimum_BNB_Balance) {
                        const data = await usdt_transfer(ph, amount)
                        console.log(data)
                        if (data) {
                            const datas = await premium_deposit_api(amount, jw, data)
                            console.log(datas)
                            toast(datas.msg)
                        } else {
                            toast.error('Insufficent Gas Fees')
                        }
                    } else {
                        toast.error(`Insufficent BNB`)
                    }
                }

            } else {
                toast.error(`Min Deposite Amount ${info.premium_min_limit} USDT or Max Deposite Amount ${info.premium_max_limit} USDT`)
            }
        }
        // setTimeout(() => {
        //     document.location.reload();
        //   }, 3000);
    }

    const get_user_detail_two = async () => {
        const data = await user_details_two(PageDetail)
        console.log('user_detail', data)
        setInfo(data)
    }
    const get_user_profile = async () => {
        const data = await get_profile()

        setProfile(data)
    }

    const handleTransfer = async () => {
        setIsClicked(true)
        console.log(profile.Email)
        if (amount >= info.premium_min_limit && amount <= info.premium_max_limit) {
            const result = await transfer_premium_amount(amount, profile.Email, senderEmail)
            toast(result.message)
            setShow(false)
            setSenderEmail("")
            setAmount("")
        } else {
            toast.error(`Min Deposite Amount ${info.premium_min_limit} USDT or Max Deposite Amount${info.premium_max_limit} USDT`)
        }

    }

    const handleAmount = (e) => {
        setAmount(e.target.value)
        const jw = e.target.value / info.market_price_details;
        setJw(jw)

    }

    const get_user_address_detail = async () => {
        const data = await get_address();
        console.log(data)
    }


    useEffect(() => {
        get_user_detail_two()
        get_user_profile()

    }, [])

    const handleTransferAmount = (e) => {
        setAmount(e.target.value)
        setIsClicked(false)
    }



    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
                <ToastContainer />

                <div className="col-lg-12 mb-4">
                    <div className="card px-4 pt-3 h-100">
                        <div className=" d-flex flex-column gap-2">
                            <div className="text-center py-3"><img src={firstimage} alt="" className="img-fluid wallet_new_img" /></div>

                            <div className="d-flex justify-content-between align-items-center pt-2">
                                <p className="">Premium Wallet : {info.premium_wallet} USDT</p>
                                <p className="">Transfer Amount : {info.premium_wallet - info.lockamount} USDT</p>
                            </div>

                        </div>
                        <div className=" mt-3 ">
                            <label for="depositamt" className="form-label">Enter Deposit Amount ( USDT )</label>
                            <input type="number" className="form-control" id="depositamt" placeholder="Enter Deposist Amount" aria-describedby="" value={amount} onChange={(e) => handleAmount(e)} />
                            {
                                jw > 0 && (
                                    <p style={{ color: "green" }}>JW : {jw}</p>
                                )
                            }
                            <div className="d-flex justify-content-between align-items-center pt-2">
                                <p className="">Min Deposit : {info.premium_min_limit} USDT</p>
                                <p className="">Max Deposit : {info.premium_max_limit} USDT</p>
                            </div>

                        </div>

                        <div className="d-flex gap-3 mt-2 mb-4 ">

                            <p className="text-center"><button type="button" className="btn btn-primary waves-effect waves-light" onClick={handleDeposit}
                                disabled={disable}>Deposit with JW</button></p>
                            <p className="text-center"><button type="button" className="btn btn-primary waves-effect waves-light" onClick={handleDepositu}
                            >Deposit with USDT</button></p>
                            {
                                info.isAdminEnablePremiumDeposit == true &&
                                <p className="text-center"><button type="button" className="btn btn-danger waves-effect waves-light" onClick={handleShow}>Transfer Amount</button></p>

                            }
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 mb-4 col-lg-12 col-12">
                    <div className="card h-100 pt-4">
                        <h5 className="text-center">Deposit History</h5>
                        <PremiumTransferHistory />
                    </div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transfer Amount : {info.premium_wallet - info.lockamount} USDT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className=" mt-3 ">
                            <label for="depositamt" className="form-label">Email ID</label>
                            <input type="text" className="form-control" id="depositamt" placeholder="Enter Email ID" aria-describedby="" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />


                        </div>
                        <div className=" mt-3 ">
                            <label for="depositamt" className="form-label">Enter Deposit Amount ( USDT )</label>
                            <input type="number" className="form-control" id="depositamt" placeholder="Enter Deposist Amount" aria-describedby="" value={amount} onChange={(e) => handleTransferAmount(e)} />
                            <div className="d-flex justify-content-between align-items-center pt-2">
                                <p className="">Min Deposit : {info.premium_min_limit} USDT</p>
                                <p className="">Max Deposit : {info.premium_max_limit} USDT</p>
                            </div>

                        </div>
                        <div className="d-flex gap-3 mt-2 mb-4 ">
                            <p className="text-center"><button disabled={isClicked} type="button" className="btn btn-primary waves-effect waves-light" onClick={handleTransfer}>Transfer</button></p>
                        </div>

                    </Modal.Body>

                </Modal>

            </div>

        </div>
    )
}
