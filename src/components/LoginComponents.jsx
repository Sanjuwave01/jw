import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import { URL } from '../common/Route';
import { getTestApi, loginApi } from '../common/Api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




export default function LoginComponents() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [user, setUser] = useState([])
  const [userType, setType] = useState('normaluser')
  const [show, setShow] = useState(false)
  const [check, setCheck] = useState(false)
  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)

  const handlelogin = async (em) => {
    setLoading(true)
    try {
      if (!em) {
        toast.error(`Please Enter Email`)
      } else {
        const { data } = await axios.post(`${URL}/user_login/`, {
          Email: em, User_type: userType, setType: "", device_unique_id: ""
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
            state: { isTfaEnable: false, login: true }
          })
        }
      }



    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleEmaillogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {

      if (user.access_token) {
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
            handlelogin(res.data.email)

          })
          .catch((err) => console.log(err));
      }
    },
    [user.access_token]
  );

  useEffect(() => {
    setShow(true)
    if (JSON.parse(localStorage.getItem('user'))) {
      localStorage.clear()
    }
  }, [])



  const handleClose = () => setShow(false);

  const handlecheck = (e) => {
    setDisable(!disable)
    setCheck(e.target.value)
  }

  const handleGoogleAuthetication = async (req, res) => {
    try {
      if (!email) {
        toast.error(`Please Enter Email`)
      } else {
        const { data } = await axios.post(`${URL}/user_login/`, {
          Email: email, User_type: userType, setType: "", device_unique_id: "", login_type: "google_authetication"
        })
        console.log(data.isTfaEnable)
        if (data.status == "false") {
          localStorage.clear();
          toast(data.Msg)
        } else {
          console.log(data.isTfaEnable)
          if (data.isTfaEnable == disable) {
            toast.error(`You nee to enable authetication first`)
          } else {
            if (JSON.parse(localStorage.setItem('phn'))) {
              localStorage.setItem('user', JSON.stringify(data))
              localStorage.setItem('ph', 1)

            } else {
              localStorage.clear();
              toast(data.Msg)
              localStorage.setItem('user', JSON.stringify(data))

              localStorage.setItem('ph', 1)
            }


            navigate('/otp/verify', {
              state: { isTfaEnable: true, login: true }
            })
          }

        }
      }



    } catch (error) {
      toast.error(error)
    }
  }


  return (

    <section className="singup_div bg-image">
      <div className="container item-center">
        <div className="otp_all_info">
          <div>
            <h2></h2>
          </div>
          <div className="varify_content">
            <div className="otp-title text-center">

              <h2 className="mb-0">Login To Your Account</h2>
            </div>
            <div className="social-container d-flex justify-content-center align-items-center gap-4 py-3 text-white pb-3">

              <Link onClick={() => handleEmaillogin()} style={{ color: "white" }}><i className="fa-brands fa-google text-white border rounded-pill p-2" > </i> Login With Google </Link>

            </div>
            <div className="text-center pt-3">
              <p>Login In with your Account</p>
            </div>
            <ToastContainer />
            <div className="Pin_set_form">
              <div className="" >
                <div className="d-flex flex-column gap-2">
                  <label for="">Email</label>
                  <input type="email" placeholder="Enter Your Email Id" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                </div>
                {
                  loading == true ? <>
                    <div className='load' style={{ textAlign: "center" }}>
                      <div className="loader"></div>
                    </div>
                  </> : <>
                    <div className="submit_btn text-center pt-4">
                      <button className="submit_button" onClick={() => handlelogin(email)}>Login</button>
                    </div>
                    <div className="submit_btn text-center pt-4">
                      <p>Or</p>
                      <button className="google_athetication" onClick={handleGoogleAuthetication}>Login With Google Authenticator</button>
                    </div>
                  </>
                }



              </div>
            </div>

          </div>
        </div>
      </div>

      <Modal size="lg" backdrop={"static"} keyboard={false} show={show} onHide={handleClose}>

        <Modal.Body>
          <iframe src="https://fit.keepwalkking.io/static/front_design/assets/doc/Disclaimer.pdf" width="100%" height="600px" />
          <input type="checkbox" value={check} onChange={(e) => handlecheck(e)} /> I hereby acknowledge and accept this Disclaimer.<br />
          <Button variant="primary" onClick={handleClose} disabled={disable} className='mt-3'>
            Continue
          </Button>
        </Modal.Body>


      </Modal>
    </section>
  )
}
