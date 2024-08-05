import React, { useEffect, useState, useRef } from 'react';
import img from '../assets/img/brand/logo.webp';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../common/Route';
import { step_count_status_update } from '../common/Api';
import lodinggif from '../admin_assets/assets/gif/loadwalk.gif'

export default function SetPinComponents() {
    const location = useLocation();
    const { state } = location;
    console.log(state)
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [forth, setForth] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);
    const forthRef = useRef(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        firstRef.current.focus();
    }, []);

    useEffect(() => {
        if (state.login == true) {
            navigate('/set/pin')
        } else {
            navigate('/reset/pin')
        }
    }, [])

    const handleOtp = async (e) => {
        e.preventDefault();
        setLoading(true)
        const pin = `${first}${second}${third}${forth}`;
        try {
            const response = await fetch(`${URL}/Verify_pin/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `${user.token}`
                },
                body: JSON.stringify({
                    "pin": pin,
                    "device_unique_id": pin,
                    "device_ip_address": "192:168:1:0"
                }),
            });

            const data = await response.json();
            console.log(data);

            if (data.status == "false") {
                toast.error(data.Msg);

            } else {
                localStorage.setItem('pin', "true")
                await step_count_status_update()
                navigate('/user/dashboard');
            }

        } catch (error) {
            console.error("There was an error with the fetch request:", error);
            toast.error("An error occurred while verifying the OTP. Please try again.");
        }
        setLoading(false)
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

    return (
        <section className="otp_main_div bg-image">
            <div className="container item-center">
                <div className="otp_all_info">
                    <div className="logo_img_otp pb-4">
                        <img src={img} alt="" />
                    </div>
                    <div className="varify_content">
                        <div className="otp-title">
                            <p className="mb-0 user_email pb-2">{user && user.email}</p>
                            <h2 className="mb-0">Verify With Your</h2>
                            <h2 className="otp_code mb-0 ">PIN</h2>
                        </div>

                        <div className="otp-field2 mb-5 d-flex justify-content-center gap-3 align-items-center">
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
                                onChange={(e) => handleInputChange(e, setForth, null, thirdRef)}
                                onKeyDown={(e) => handleKeyDown(e, setForth, thirdRef)}
                                ref={forthRef}
                            />
                        </div>
                        {
                            loading == true ? <>
                                <div className='load' style={{ textAlign: "center" }}>
                                    <div className="loader"></div>
                                </div>
                            </> : <><div className="submit_btn text-center mb-4">
                                <button onClick={handleOtp} className="submit_button">Verify</button>
                            </div>
                            </>
                        }

                        <div className="reset_pin text-end">
                            <Link to="/reset/pin" className="fw-bold text-white">Update PIN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
