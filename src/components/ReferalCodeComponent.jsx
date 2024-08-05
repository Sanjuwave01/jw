import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate, useParams } from 'react-router-dom'
import { URL } from '../common/Route';
import { getTestApi, loginApi } from '../common/Api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';


export default function ReferalCodeComponent() {
    const params = useParams()
    const { ref } = params;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [user, setUser] = useState([]);
    const [buttonType, setButtonType] = useState(false);
    const [userType, setType] = useState('normaluser');
    const [loading, setLoading] = useState(false)
    const handlelogin = async () => {
        setLoading(true)
        // console.log(email)
        try {
            if (email == '') {
                toast.error('Email Required')
            } else {

                const { data } = await axios.post(`${URL}/adduser/`, {
                    Email: email,
                    Phone_Number: phone,
                    User_Device_id: "",
                    User_type: userType,
                    device_unique_id: "",
                    referal_code: code ? code : 'U8DECP',
                    user_name: name
                })
                if (data.status == "false") {
                    localStorage.clear();
                    toast(data.Msg)
                } else {
                    localStorage.clear();
                    toast(data.Msg)
                    localStorage.setItem('user', JSON.stringify(data))
                    localStorage.setItem('ph', 1)
                    navigate('/otp/verify', {
                        state: { isTfaEnable: false, login: false }
                    })
                }
            }



        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const handleGlogin = async () => {

        // console.log(email)
        try {
            if (email == '') {
                toast('Email Required')
            } else {

                const { data } = await axios.post(`${URL}/adduser/`, {
                    Email: email,
                    Phone_Number: phone,
                    User_Device_id: "",
                    User_type: userType,
                    device_unique_id: "",
                    referal_code: code ? code : 'U8DECP',
                    user_name: name
                })
                if (data.status == "false") {
                    localStorage.clear();
                    toast(data.Msg)
                } else {
                    localStorage.clear();
                    toast(data.Msg)
                    localStorage.setItem('user', JSON.stringify(data))
                    localStorage.setItem('ph', 1)
                    localStorage.setItem('otp', "true")
                    navigate('/set/pin')
                }
            }



        } catch (error) {
            console.log(error)
        }
    }

    const handleEmaillogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res)
                        setEmail(res.data.email);
                        setType('Email')

                        setType('normaluser')
                        setName(res.data.name)
                        setButtonType(true)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    useEffect(() => {
        if (ref) {
            setCode(ref)
        }
    }, [ref])


    return (
        <section className="singup_div bg-image">
            <div className="container item-center">
                <div className="otp_all_info">
                    <div>
                        <h2></h2>
                    </div>
                    <div className="varify_content">
                        <div className="otp-title text-center">

                            <h2 className="mb-0">Register To Your Account</h2>
                        </div>
                        <div className="social-container d-flex justify-content-center align-items-center gap-4 py-3 text-white pb-3">
                            {/* <Link to="#"><i className="fa-brands fa-facebook text-white border rounded-pill p-2"></i></Link> */}
                            <Link onClick={() => handleEmaillogin()} style={{ color: "white" }}><i className="fa-brands fa-google text-white border rounded-pill p-2"></i> Register With Google</Link>
                            {/* <Link to="#"><i className="fa-brands fa-github text-white border rounded-pill p-2"></i></Link> */}
                        </div>

                        <ToastContainer />
                        <div className="Pin_set_form">
                            <div className="">
                                <div className="d-flex flex-column gap-2">
                                    <label for="">UserName</label>
                                    <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <label for="">Email</label>
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <label for="">Phone Number</label>
                                    <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <label for="">Referal Code</label>
                                    <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                                </div>
                                {
                                    loading == true ? <>
                                        <div className='load' style={{ textAlign: "center" }}>
                                            <div className="loader"></div>
                                        </div>
                                    </> : <>
                                        <div className="submit_btn text-center pt-4">
                                            <button className="submit_button" onClick={buttonType ? handleGlogin : handlelogin}>Register</button>
                                        </div>
                                    </>
                                }

                            </div>
                        </div>



                        {/* <div className="forgot_password text-center pt-2">
                        <p className="mb-0">Already account? <Link to="/" className="fw-semibold text-white"> Sign In </Link></p>
                    </div> */}



                    </div>
                </div>
            </div>
        </section>
    )
}
