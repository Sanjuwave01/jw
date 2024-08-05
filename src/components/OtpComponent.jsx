import React, { useEffect, useState, useRef } from 'react';
import img from '../assets/img/brand/logo.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../common/Route';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import lodinggif from '../admin_assets/assets/gif/loadwalk.gif'


export default function OtpComponent() {

    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [forth, setForth] = useState('');
    const [fifth, setFifth] = useState('');
    const [sixth, setSixth] = useState('');
    const [timer, setTimer] = useState(50);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);
    const forthRef = useRef(null);
    const fifthRef = useRef(null);
    const sixRef = useRef(null);
    const location = useLocation();
    const { state } = location;
    console.log(state)


    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prevTimer => prevTimer > 1 ? prevTimer - 1 : 1);
        }, 1500);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        firstRef.current.focus();
    }, []);

    const handleOtp = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (state.isTfaEnable == true) {
            const otp = `${first}${second}${third}${forth}${fifth}${sixth}`;
            try {
                const response = await fetch(`${URL}/otp_verification/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `${user.token}`
                    },
                    body: JSON.stringify({
                        Two_Fa: otp,
                        setType: "otpset"
                    }),
                });

                const data = await response.json();
                console.log(data);

                if (data.status === "false") {
                    toast.error(data.Msg);
                } else {
                    localStorage.setItem('otp', "true")
                    navigate('/set/pin', { state: { login: state.login } });
                }

            } catch (error) {
                console.error("There was an error with the fetch request:", error);
                toast.error("An error occurred while verifying the OTP. Please try again.");
            }
            setLoading(false)
        } else {
            setLoading(true)
            const otp = `${first}${second}${third}${forth}`;
            try {
                const response = await fetch(`${URL}/otp_verification/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `${user.token}`
                    },
                    body: JSON.stringify({
                        email_otp: otp,
                        setType: "otpset"
                    }),
                });

                const data = await response.json();
                console.log(data);

                if (data.status === "false") {
                    toast.error(data.Msg);
                } else {
                    localStorage.setItem('otp', "true")
                    navigate('/set/pin', { state: { login: state.login } });
                }

            } catch (error) {
                console.error("There was an error with the fetch request:", error);
                toast.error("An error occurred while verifying the OTP. Please try again.");
            }
            setLoading(false)
        }




    };

    const handleInputChange = (e, setValue, nextRef, prevRef) => {
        const { value } = e.target;
        if (value.length <= 1) {
            setValue(value);
            if (value.length === 1 && nextRef) {
                nextRef.current.focus();
            }
        }
    };

    const handleKeyDown = (e, setValue, prevRef) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            if (prevRef) {
                prevRef.current.focus();
            }
        }
    };

    const handleResendOtp = async () => {
        const response = await fetch(`${URL}/resend_otp/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });
        const data = await response.json();
        toast(data.Msg);
    };

    return (
        <section className="otp_main_div bg-image">
            <div className="container item-center">
                <div className="otp_all_info">
                    <div className="logo_img_otp">
                        <img src={img} alt="Logo" />
                    </div>
                    <div className="varify_content">
                        <div className="otp-title py-4">
                            <ToastContainer />
                            <h2 className="mb-0">Verify With Your</h2>
                            <h2 className="otp_code mb-0 pt-3">OTP Code</h2>
                        </div>
                        <div className="email_verify pb-4">
                            <p className="mb-0">Send Verification code to</p>
                            <p className="mb-0">{user && user.email}</p>
                        </div>
                        <div className="otp-field mb-5 d-flex justify-content-center gap-3 align-items-center">
                            <input
                                type="text"
                                maxLength="1"
                                value={first}
                                onChange={(e) => handleInputChange(e, setFirst, secondRef, null)}
                                onKeyDown={(e) => handleKeyDown(e, setFirst, null)}
                                ref={firstRef}
                            />
                            <input
                                type="text"
                                maxLength="1"
                                value={second}
                                onChange={(e) => handleInputChange(e, setSecond, thirdRef, firstRef)}
                                onKeyDown={(e) => handleKeyDown(e, setSecond, firstRef)}
                                ref={secondRef}
                            />
                            <input
                                type="text"
                                maxLength="1"
                                value={third}
                                onChange={(e) => handleInputChange(e, setThird, forthRef, secondRef)}
                                onKeyDown={(e) => handleKeyDown(e, setThird, secondRef)}
                                ref={thirdRef}
                            />
                            <input
                                type="text"
                                maxLength="1"
                                value={forth}


                                onChange={(e) => state.isTfaEnable == true ? handleInputChange(e, setForth, fifthRef, thirdRef) : handleInputChange(e, setForth, null, thirdRef)}
                                onKeyDown={(e) => handleKeyDown(e, setForth, thirdRef)}
                                ref={forthRef}
                            />

                            {
                                state.isTfaEnable && <>
                                    <input
                                        type="text"
                                        maxLength="1"
                                        value={fifth}

                                        onChange={(e) => handleInputChange(e, setFifth, sixRef, forthRef)}

                                        onKeyDown={(e) => handleKeyDown(e, setFifth, forthRef)}
                                        ref={fifthRef}
                                    />
                                    <input
                                        type="text"
                                        maxLength="1"
                                        value={sixth}
                                        onChange={(e) => handleInputChange(e, setSixth, null, fifthRef)}
                                        onKeyDown={(e) => handleKeyDown(e, setSixth, fifthRef)}
                                        ref={sixRef}
                                    />
                                </>
                            }




                        </div>
                        {
                            loading == true ? <>
                                <div className='load' style={{ textAlign: "center" }}>
                                    <div className="loader"></div>
                                </div>
                            </> : <>
                                <div className="submit_btn text-center mb-4">
                                    <button onClick={handleOtp} className="submit_button">Submit</button>
                                </div>
                            </>

                        }
                        {
                            state.isTfaEnable == false && <div className="resend_code text-end">
                                {
                                    timer > 1 ? <p className="fw-bold">Resend in <span>{timer}</span></p> : <p className="fw-bold" style={{ cursor: "pointer" }} onClick={handleResendOtp}>Resend</p>
                                }
                            </div>
                        }

                    </div>
                </div>
            </div>
            <div className="message_box">
                <i className="fa-regular fa-comment-dots"></i>
            </div>
        </section>
    );
}
