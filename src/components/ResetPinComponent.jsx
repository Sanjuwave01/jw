import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Pin_set } from '../common/Api';
import { useNavigate } from 'react-router-dom';

export default function ResetPinComponent() {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [type, setType] = useState('pinset');
    const [loading, setLoading] = useState(false)

    const handleResetPin = async () => {
        console.log(pin);
        console.log(confirmPin);
        setLoading(true)
        if (pin === confirmPin) {
            const data = await Pin_set(pin, confirmPin, type);
            console.log(data);
            toast(data.Msg);
            navigate('/set/pin', { state: { login: true } });
        } else {
            toast.error('Pin did not match');
        }
        setLoading(false)
    };

    useEffect(() => {
        const hasRefreshed = localStorage.getItem('hasRefreshed');
        if (!hasRefreshed) {
            localStorage.setItem('hasRefreshed', 'true');
            window.location.reload();
        }
    }, []);

    return (
        <section className="otp_main_div singup_div bg-image">
            <div className="container">
                <ToastContainer />
                <div className="otp_all_info">
                    <div className="logo_img_otp pb-4">
                        <img src="../img/brand/logo.webp" alt="" />
                    </div>
                    <div className="varify_content">
                        <div className="otp-title">
                            <h2 className="mb-0">Set <span className="otp_code mb-0">Up a Pin</span></h2>
                        </div>
                        <div className="email_verify py-3">
                            <p className="mb-0 pb-3">Create a PIN to use piece of passwords. Having a PIN makes it easier to sign in to your device, apps, and services.</p>
                        </div>
                        <div className="Pin_set_form">
                            <form action="" className="">
                                <div className="d-flex flex-column gap-2">
                                    <label htmlFor="new pin">New Pin</label>
                                    <input type="text" placeholder="Enter Your New Pin" value={pin} onChange={(e) => setPin(e.target.value)} />
                                </div>
                                <div className="d-flex flex-column gap-2 pt-4">
                                    <label htmlFor="">Confirm Pin</label>
                                    <input type="text" placeholder="Enter Your Confirm Pin" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        {
                            loading == true ? <>
                                <div className='load' style={{ textAlign: "center" }}>
                                    <div className="loader"></div>
                                </div>
                            </> : <>

                                <div className="submit_btn text-center mt-5">
                                    <button onClick={handleResetPin} className="submit_button">Submit</button>
                                </div>

                            </>}

                    </div>
                </div>
            </div>
        </section>
    );
}
