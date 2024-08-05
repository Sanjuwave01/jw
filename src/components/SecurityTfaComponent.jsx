import React, { useEffect, useState } from 'react'
import { two_fa_details, two_fa_disable } from '../common/Api'
import { ToastContainer, toast, useToastContainer } from 'react-toastify'


export default function SecurityTfaComponent() {
    const [data, setData] = useState({})
    const [key, setKey] = useState('Test')
    const [otp, setOtp] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    const get_two_fa_details = async (req, res) => {
        const result = await two_fa_details()
        //console.log(data)
        setData(result)
        setKey(result.data.user_secrete_key)
    }
    // console.log(user.token)
    useEffect(() => {
        get_two_fa_details()
    }, [])

    const handleDisableTfa = async () => {
        const result = await two_fa_disable(otp)
        console.log(result)
        toast.success(result.Msg)
        setOtp('')
    }

    //console.log(data)

    return (
        <div>
            {/* <h5 class="text-center">Security</h5> */}
            <div class="qrimg 2fa_img text-center mx-auto" style={{ width: "200px", height: "200px" }}>
                <img src={data.QR} height="200px" />

            </div>
            <ToastContainer />
            <form action="">

                <div class="col-md-12 mb-4 px-3 position-relative">
                    <label for="textcode" class="form-label"></label>
                    <input type="text" class="form-control" id="textcode" placeholder="" value={key && key} aria-describedby="" />
                </div>
                <p class="px-3">
                    You need to enable Two-Factor Authentication [Enable Google 2FA] You can set Two-Factor Authentication ON / OFF, when you Login or Withdraw the funds in [ Account Security Settings]
                </p>
                <h5 class="px-3">
                    You Google Authenticator Code is
                </h5>
                <p class="px-3 ">
                    Take care of this code! To verify, please enter your one-time password from Google Authenticator
                </p>
                <div class="col-md-12 mb-4 px-3 position-relative">

                    <input type="text" class="form-control" id="textcode2" placeholder="Enter 2FA Code" value={otp} aria-describedby="" onChange={(e) => setOtp(e.target.value)} />


                </div>
                <div class="col-md-3 col-sm-6 col-12 mx-3 mb-3">

                    <button type="button" class="btn btn-primary waves-effect waves-light" onClick={handleDisableTfa}>Disable 2FA</button>
                </div>
            </form></div>
    )
}
