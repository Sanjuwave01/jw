import React, { useEffect, useState } from 'react';
import lodinggif from '../admin_assets/assets/gif/loadwalk.gif'
import fisrtimag from '../admin_assets/assets/img/illustrations/man.webp';
import secondimage from '../admin_assets/assets/img/illustrations/target.png';
import thirdimage from '../admin_assets/assets/img/illustrations/premimum.gif';
import { Link, useNavigate } from 'react-router-dom';
import { home_page_content, maximum_target, step_count_status_update, user_details_two, user_target_set } from '../common/Api';
import fetchStepCount from './FetchStepCount';
import GoogleAuth from './GoogleAuth';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from '../common/Loader';

export default function DashboardBodyComponents() {
  const [data, setData] = useState({});
  const [token, setToken] = useState('');
  const [info, setInfo] = useState({});
  const [PageDetail, setPageDetail] = useState('Home_page');
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cdate, setDate] = useState('');
  const [content, setContent] = useState('');
  const [max, setMax] = useState('');
  const [convertedDate, setConvertedDate] = useState('')
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [Number, setNumber] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const get_home_page_detail = async () => {
    
   try {
      const info = await home_page_content();
      setData(info);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load home page content.');
    }
   
  };

  const get_user_detail_two = async () => {
    try {
      const data = await user_details_two(PageDetail)
      //console.log(data)
      setInfo(data)
      const date = data.plan_end_date;
      let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      setConvertedDate(dateMDY)
    } catch (error) {
      toast.error(error)
    }
  }

  const fetchData = async () => {
    try {
      const data = await fetchStepCount(token);
      if (data && data.bucket && data.bucket.length > 0) {
        const totalSteps = data.bucket.reduce((sum, bucket) => {
          const steps = bucket.dataset[0].point.reduce((total, point) => total + point.value[0].intVal, 0);
          return sum + steps;
        }, 0);
        setStepCount(totalSteps);
      }
    } catch (error) {
      toast.error('Failed to fetch step count.');
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.clear();
      navigate('/login');
    }
    get_home_page_detail();
    get_user_detail_two()
    let dt = new Date().toLocaleDateString();
    setDate(dt);
    if (user.token) {

      fetchData();
    }
  }, [user, navigate]);
  

  if (!user) {
    return navigate('/login')
  }






  const handleMaxTarget = async () => {
    try {
      const max = await maximum_target()
      setMax(max)
      setShow(true)
    } catch (error) {
      toast.error(error)
    }
  }



  const handleTargetMaxCount = async () => {
    try {
      const target = document.querySelector("#target").value
      const data = await user_target_set(target)
      toast.success(data.Msg)
      setShow(false)
      await get_user_detail_two()
      console.log(data)
    } catch (error) {
      toast.error(error)
    }
  }

  if(loading){
    return <Loader />
  }

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <ToastContainer />
          <div className="col-lg-6 mb-4 main_bg">
            <div
              className="swiper-container swiper-container-horizontal swiper swiper-card-advance-bg"
              id="swiper-with-pagination-cards"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide pb-5">
                  <div className="row">
                    <div className="col-lg-12 col-md-9 col-12 order-2 order-md-1">
                      <div className="row">
                        <div className="col-12">
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex mb-2 align-items-center justify-content-between">
                              <h5 className="text-white mb-0">We Can Now Convert Indoor Steps</h5>
                              <p className="mb-0 fw-medium website-analytics-text-bg mb-0" role="button">
                                Activate Now
                              </p>
                              {token && <p>Step Count: {stepCount}</p>}
                            </li>
                            <li className="mt-4">
                              <h6 className="text-white mb-1">WALK MORE AND EARN JW TOKENS</h6>
                              <p className="" style={{ whiteSpace: 'wrap' }}>
                                Welcome {user && user.email}, You are in {info.plan_status_data} plan you are eligible to earn
                                {info.Plan_reward} usdt, up to a maximum of {info.target} steps per day.
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>

          {
            convertedDate != cdate && <>
              <div className="col-lg-3 col-sm-6 mb-4 rounded m d-flex align-items-center">
                <div className="card m-0 p-0 h-100">
                  <div className="bg-successs d-flex justify-content-between align-items-center rounded p-4">
                    <div className="card_main_img">
                      <img src={fisrtimag} alt="" className="img-fluid w-50" />
                    </div>
                    <div className="text-center">
                      <h5>{cdate}</h5>
                      <h6>Steps</h6>
                      <p className="lead">0</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 mb-4 rounded d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => handleMaxTarget()}>
                <div className="card m-0 p-0 h-100">
                  <div className="d-flex justify-content-between align-items-center p-4 mt-4">
                    <div className="col card_main_img">
                      <img src={secondimage} alt="" className="img-fluid spx-1" />
                    </div>
                    <div className="col text-center w-100">
                      <h5>Target Steps</h5>
                      <p className="lead">{info.target}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }


          <div className="col-lg-6 mb-4">
            <div className="card px-4 py-5 h-100">
              <p className="lh-lg"> {data.notification_msg && data.notification_msg} </p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100 px-4">
              <span className="text-center">
                <img src={thirdimage} alt="" className="img-fluid gem_img" />
              </span>
              <h4 className="text-center text-bold">Premium</h4>
              <p className="text-center">Get More From your Steps</p>
              <p className="text-center">
                <a href="/user/buy/plan">View More</a>
              </p>
            </div>
          </div>
          <div className="content-backdrop fade"></div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Step Target</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className=''>
              <select className="form-control" name="targetStep" id="target">
                {[...Array(50)].map((_, i) => (
                  <>
                    {
                      info.target == (i + 1) * 1000 ? <option key={i} selected={true} value={(i + 1) * 1000}>{(i + 1) * 1000}</option> : <option key={i} value={(i + 1) * 1000}>{(i + 1) * 1000}</option>
                    }

                  </>

                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleTargetMaxCount}>
              Update
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
