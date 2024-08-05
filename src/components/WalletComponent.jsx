import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import { bnb_balance, jw_balance, user_balance, user_details_two } from '../common/Api';
import { useNavigate } from 'react-router-dom';
import { transactionBuilder } from 'web3-eth';

export default function WalletComponent() {
  const user = JSON.parse(localStorage.getItem('user'));
  const ph = JSON.parse(localStorage.getItem('ph'));
  const phn = JSON.parse(localStorage.getItem('phn'));
  const [info, setInfo] = useState({})
  const [jwBalance, setJwBalance] = useState(0)
  const [bnbBalance, setBnbBalance] = useState(0)
  const [usdtBalance, setUsdtBalance] = useState(0)
  const [PageDetail, setPageDetail] = useState('wallet_page')
  const [showBalance, setShowBalance] = useState(false)
  const navigate = useNavigate();


  const [address, setAddress] = useState('')
  const get_user_detail_two = async () => {
    const userdetail = await user_details_two(PageDetail)
    setInfo(userdetail)
    setAddress(userdetail.wallet_address)
  }


  // const get_jw_balance = async () => {
  //   const jwbalance = await jw_balance(address)
  //   console.log('jwbalance', jwbalance)
  //   if (jwbalance) {
  //     setJwBalance(jwbalance);
  //   }

  // }


  // const get_bnb_balance = async () => {
  //   const bnb_balances = await bnb_balance(address)
  //   if (bnb_balances) {
  //     setBnbBalance(bnb_balances);
  //   }

  // }
  // const get_usdt_balance = async () => {
  //   const bnb_balancess = await user_balance(address)
  //   if (bnb_balancess) {
  //     setUsdtBalance(bnb_balancess);
  //   }

  // }

  const handlebalances = async () => {
    setShowBalance(!showBalance)
    const jwbalance = await jw_balance(address)
    console.log('jwbalance', jwbalance)
    if (jwbalance) {
      setJwBalance(jwbalance);
    }
    const bnb_balances = await bnb_balance(address)
    if (bnb_balances) {
      setBnbBalance(bnb_balances);
    }
    const bnb_balancess = await user_balance(address)
    if (bnb_balancess) {
      setUsdtBalance(bnb_balancess);
    }
  }



  useEffect(() => {
    get_user_detail_two()
    if (ph == 1) {
      navigate('/user/import/phrases')
    }
  }, [ph])
  //console.log(info)



  const handleCopyAddress = () => {
    copy(address);
    toast(`You have copied "${address}"`)
  }

  console.log('new', jwBalance)

  return (
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card pt-4 mb-3 px-3">
        <div class="row">
          <div class="col-12  mb-4 ">
            <h5>Wallet</h5>
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
            <div class="row">
              <div class="col-md-12 mb-2 px-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" placeholder="" value={address} aria-describedby="" readOnly="true" />

              </div>
              <div class="col-md-3 col-sm-6 col-12 mt-2 mb-3">

                <button type="button" class="btn btn-primary waves-effect waves-light me-3" onClick={handleCopyAddress}>Copy</button>
                <button type="button" class="btn btn-primary waves-effect waves-light me-3" data-bs-toggle="modal" data-bs-target="#modalCenter">Show QR</button>
                <div class="mt-3">



                  <div class="modal fade" id="modalCenter" tabindex="-1" style={{ display: " none" }} aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">

                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <div class="qrimg 2fa_img text-center mx-auto" style={{ width: " 200px" }}>

                              <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={address}
                                viewBox={`0 0 256 256`}
                              />
                              <p class="lead">
                                QR code img will be shown here
                              </p>

                            </div>
                            <div class="col-md-12 mb-2 px-3">
                              <label for="address" class="form-label">Address</label>
                              <input type="text" class="form-control" id="address" placeholder="" value={address} aria-describedby="" />

                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-2">

                <div class="table-responsive">
                  <button class="btn btn-primary waves-effect waves-light me-3 mb-2" onClick={handlebalances}>Check Balance</button>

                  {
                    showBalance && <table class="table table-borderless border-top">
                      {/* <!-- <thead class="border-bottom">
                    <tr>
                      <th>S.No.</th>
                      <th>Login At</th>
                      <th>Last Login</th>
                 
                    </tr>
                  </thead> --> */}
                      <tbody>
                        <tr>
                          <td>
                            <div class="d-flex justify-content-start align-items-center">
                              <img src="https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850" width="35px" alt="" style={{ backgroundColor: " white", bordeRadius: "50%;" }} />
                            </div>
                          </td>
                          <td>
                            <div class="d-flex flex-column">
                              <p class="mb-0 fw-medium">BNB</p>

                            </div>
                          </td>
                          <td>
                            <p class="mb-0 fw-medium"> {bnbBalance}</p>

                          </td>

                        </tr>
                        <tr>
                          <td>
                            <div class="d-flex justify-content-start align-items-center">
                              <img src="https://assets.coingecko.com/coins/images/26143/small/jw.png?1656039344" width="35px" alt="" />
                            </div>
                          </td>
                          <td>
                            <div class="d-flex flex-column">
                              <p class="mb-0 fw-medium">JW</p>

                            </div>
                          </td>
                          <td>
                            <p class="mb-0 fw-medium">{jwBalance}</p>

                          </td>

                        </tr>
                        <tr>
                          <td>
                            <div class="d-flex justify-content-start align-items-center">
                              <img src="https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661" width="35px" alt="" />
                            </div>
                          </td>
                          <td>
                            <div class="d-flex flex-column">
                              <p class="mb-0 fw-medium">USDT</p>

                            </div>
                          </td>
                          <td>
                            <p class="mb-0 fw-medium">{usdtBalance}</p>

                          </td>

                        </tr>

                      </tbody>
                    </table>
                  }


                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
