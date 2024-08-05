import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../front/css/style.css'
import '../front/css/bootstrap.min.css'
import '../front/vendor/css/aos.css'
import '../front/vendor/css/animate.min.css'
import bgvideo from '../front/video/bgvideo.mp4'

import banner from '../front/images/banner.png'
import log from '../front/images/log.png'
import ftpvideo from '../front/video/ftvideo.mp4'
import FrontHeader from './common/FrontHeader'



export default function HomeComponents() {
    const videoEl = useRef(null);
    const videoEls = useRef(null);
    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };
    const attemptPlaya = () => {
        videoEls &&
            videoEls.current &&
            videoEls.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };




    useEffect(() => {
        attemptPlay();
        attemptPlaya();
        localStorage.clear()
    }, []);


    return (
        <>
            <FrontHeader />
            <section className="banner-wrapper">
                <div className="bannerbg">

                    <video width="100%"

                        playsInline
                        loop
                        muted
                        controls
                        alt="All the devices"
                        src={bgvideo}
                        ref={videoEl}
                    />
                </div>
                <div className="container">
                    <div className="row min-524 align-items-center justify-content-between">
                        <div className="background">
                            <img src={banner} alt="" />
                        </div>
                        <div className="col-lg-6 align-self-baseline">
                            <h1 className="max-w"> Inspire the
                                World to Move</h1>
                            <h6>Healthier planet</h6>
                        </div>
                        <div className="col-lg-6 align-self-end">
                            <h1 className="text-right"> It pays to walk.</h1>
                            <h6 className="text-right">Healthier, wealthier you.</h6>
                        </div>
                    </div>

                </div>
            </section>


            <section className="jasonvision">
                <div className="container">
                    <div className="row my-5">
                        <div className="col-lg-7 col-sm-12">
                            <h4>Our VIsIon</h4>
                            <p className="mt-3">Our vision is to motivate individuals and families to adopt an active & healthy lifestyle by incentivizing them through a robust Blockchain, web3.0  and AI technology solution. Developing games for children to educate them about the side effects of junk food and the value of nutrition in life. Which in turn will make society aware of nutrition and wellness. Via this initiative, we introduced a tangible concept on the Blockchain of successful social-focused fitness motivation and reward incentive with JW token.</p>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <div className="visonbg">
                                <div className="d-flex align-items-center justify-content-start mb-4">
                                    <div className="reg-user">
                                        <h3>185795</h3>
                                        <h5>REGISTERED USERS</h5>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end">
                                    <div className="reg-user">
                                        <h3>1BN</h3>
                                        <h5>USERS TO COME</h5>
                                    </div>
                                </div>
                                <br />
                                <div className="d-flex align-items-center justify-content-start mb-4">
                                    <div className="reg-user">
                                        <h3>34284563481</h3>
                                        <h5>TOTAL STEPS</h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="container">
                    <div className="steps-wrapper">
                        <div className="heading">
                            <h1>
                                A few simple steps
                            </h1>
                            <p>
                                Walk. Earn
                            </p>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <div className="step-heading">
                                    <h1>
                                        Earn JW Token by
                                        <span>
                                            Walking
                                        </span>
                                    </h1>
                                    <p>Convert Your Step's Into JW Token And Start Your Web3 Journey </p>
                                    <Link to="https://play.google.com/store/apps/details?id=com.application.jasanwellness">

                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 align-self-center">
                                <div className="log-img text-center">
                                    <img src={log} className="img-fluid" alt="" />
                                </div>

                            </div>
                            <div className="col-lg-4">
                                <div className="step-heading rt-l">
                                    <h1>
                                        Earn JW Token Daily

                                        <span>
                                            2x boost</span></h1>
                                    <p>For 25 Minutes EveryDay you can earn double JW from the steps Lets GO</p>
                                    <Link to="https://play.google.com/store/apps/details?id=com.application.jasanwellness">

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="jasonvision my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="jasonhlt text-center">



                                <video width="100%" id="myVideo" className="bgvideo"

                                    playsInline
                                    loop="true"
                                    muted
                                    controls
                                    alt="All the devices"
                                    src={ftpvideo}
                                    ref={videoEls}
                                />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div>
                                <h4>HEALTHY INCENTIVE DECATHLON WEB 3</h4>

                                <p className="jasonpara">It does
                                    monitor your daily progress, and awards you for reaching specific goals.
                                    So, for example, if you reach the goal for the number of walks in a
                                    ay, you will be given rewards in JW token .In addition, it can reduce
                                    your risk of developing conditions such as heart disease, type 2 diabetes,</p>

                                <p className="jasonpara">addition, walking is also a great form of physical activity for the
                                    overweight, the elderly, or who haven’t exercised in a long time. To get the health
                                    benefits, try walking for at least 30 minutes as briskly as possible on most days of the
                                    week.‘Brisk’ means you can still talk but not sing and may puff slightly.Moderate activities
                                    such as walking pose a
                                    small health risk</p>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container">
                    <div className="footer-wrapper">
                        <div>
                            <Link to="https://www.facebook.com/web3wellness/">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 7.54584C15 3.37838 11.6421 0 7.5 0C3.35786 0 0 3.37838 0 7.54584C0 11.3121 2.74263 14.4339 6.32812 15V9.72705H4.42383V7.54584H6.32812V5.88339C6.32812 3.99222 7.44785 2.94759 9.16099 2.94759C9.9813 2.94759 10.8398 3.09497 10.8398 3.09497V4.95195H9.89414C8.9625 4.95195 8.67188 5.53366 8.67188 6.13099V7.54584H10.752L10.4194 9.72705H8.67188V15C12.2574 14.4339 15 11.3121 15 7.54584Z"
                                        fill="#A9A9A9" />
                                </svg>
                            </Link>
                            <Link to="https://twitter.com/JWSocial1">
                                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.71885 12C10.3778 12 13.4739 7.38277 13.4739 3.37993C13.4739 3.25013 13.471 3.11744 13.4651 2.98764C14.0674 2.55879 14.5872 2.02761 15 1.41904C14.4391 1.66476 13.8435 1.82523 13.2337 1.89499C13.8758 1.51603 14.3566 0.920707 14.5869 0.219376C13.9828 0.57185 13.3222 0.820489 12.6334 0.954637C12.1693 0.469086 11.5556 0.147594 10.8873 0.0398653C10.219 -0.0678633 9.53324 0.0441724 8.93609 0.358651C8.33893 0.673129 7.86362 1.17253 7.58365 1.77965C7.30368 2.38677 7.23464 3.06779 7.38721 3.71742C6.16406 3.65699 4.96746 3.34415 3.87499 2.79918C2.78252 2.25421 1.81856 1.48928 1.04561 0.553979C0.65275 1.22086 0.532535 2.01 0.709394 2.76102C0.886253 3.51204 1.34691 4.16857 1.99775 4.5972C1.50914 4.58192 1.03123 4.4524 0.603516 4.21932V4.25682C0.603078 4.95667 0.848811 5.63507 1.29894 6.1767C1.74908 6.71833 2.37583 7.08977 3.07266 7.22787C2.62003 7.3498 2.14499 7.36756 1.68428 7.27979C1.88091 7.88166 2.26348 8.40807 2.77861 8.78556C3.29373 9.16305 3.9157 9.37278 4.55771 9.38548C3.46777 10.2284 2.12136 10.6857 0.735352 10.6835C0.489554 10.6831 0.243999 10.6683 0 10.6391C1.40804 11.5285 3.04596 12.0009 4.71885 12Z"
                                        fill="#A9A9A9" />
                                </svg>
                            </Link>
                            <Link to="https://www.instagram.com/jwsocialtoken/">
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.44625 1.3424C10.438 1.3424 10.6739 1.35114 11.4572 1.38608C12.1852 1.41811 12.5783 1.54041 12.8404 1.64233C13.1869 1.77628 13.4373 1.93935 13.6965 2.19851C13.9585 2.46058 14.1187 2.7081 14.2526 3.05462C14.3546 3.31669 14.4769 3.71271 14.5089 4.43778C14.5438 5.22401 14.5526 5.45987 14.5526 7.44872C14.5526 9.44049 14.5438 9.67635 14.5089 10.4597C14.4769 11.1876 14.3546 11.5808 14.2526 11.8428C14.1187 12.1894 13.9556 12.4398 13.6965 12.6989C13.4344 12.961 13.1869 13.1212 12.8404 13.2551C12.5783 13.357 12.1823 13.4793 11.4572 13.5114C10.671 13.5463 10.4351 13.555 8.44625 13.555C6.45448 13.555 6.21862 13.5463 5.43531 13.5114C4.70732 13.4793 4.31421 13.357 4.05214 13.2551C3.70562 13.1212 3.45519 12.9581 3.19603 12.6989C2.93396 12.4369 2.7738 12.1894 2.63985 11.8428C2.53794 11.5808 2.41563 11.1847 2.3836 10.4597C2.34866 9.67344 2.33992 9.43757 2.33992 7.44872C2.33992 5.45696 2.34866 5.22109 2.3836 4.43778C2.41563 3.7098 2.53794 3.31669 2.63985 3.05462C2.7738 2.7081 2.93687 2.45767 3.19603 2.19851C3.45811 1.93643 3.70562 1.77628 4.05214 1.64233C4.31421 1.54041 4.71024 1.41811 5.43531 1.38608C6.21862 1.35114 6.45448 1.3424 8.44625 1.3424ZM8.44625 0C6.42245 0 6.16912 0.0087358 5.37416 0.043679C4.58211 0.0786222 4.03758 0.206747 3.56585 0.390199C3.07373 0.582386 2.65732 0.835725 2.24383 1.25213C1.82742 1.66563 1.57409 2.08203 1.3819 2.57124C1.19845 3.04588 1.07032 3.5875 1.03538 4.37955C1.00044 5.17742 0.991699 5.43075 0.991699 7.45455C0.991699 9.47834 1.00044 9.73168 1.03538 10.5266C1.07032 11.3187 1.19845 11.8632 1.3819 12.3349C1.57409 12.8271 1.82742 13.2435 2.24383 13.657C2.65732 14.0705 3.07373 14.3267 3.56294 14.516C4.03758 14.6994 4.5792 14.8276 5.37125 14.8625C6.1662 14.8974 6.41954 14.9062 8.44333 14.9062C10.4671 14.9062 10.7205 14.8974 11.5154 14.8625C12.3075 14.8276 12.852 14.6994 13.3237 14.516C13.8129 14.3267 14.2293 14.0705 14.6428 13.657C15.0563 13.2435 15.3126 12.8271 15.5019 12.3379C15.6853 11.8632 15.8134 11.3216 15.8484 10.5295C15.8833 9.73459 15.8921 9.48125 15.8921 7.45746C15.8921 5.43367 15.8833 5.18033 15.8484 4.38537C15.8134 3.59332 15.6853 3.04879 15.5019 2.57706C15.3184 2.08203 15.0651 1.66563 14.6487 1.25213C14.2352 0.838637 13.8188 0.582386 13.3296 0.393111C12.8549 0.209659 12.3133 0.0815341 11.5212 0.0465909C10.7234 0.0087358 10.47 0 8.44625 0Z"
                                        fill="#A9A9A9" />
                                    <path
                                        d="M8.44626 3.62524C6.33219 3.62524 4.61707 5.34037 4.61707 7.45443C4.61707 9.5685 6.33219 11.2836 8.44626 11.2836C10.5603 11.2836 12.2754 9.5685 12.2754 7.45443C12.2754 5.34037 10.5603 3.62524 8.44626 3.62524ZM8.44626 9.93831C7.07474 9.93831 5.96238 8.82595 5.96238 7.45443C5.96238 6.08291 7.07474 4.97056 8.44626 4.97056C9.81778 4.97056 10.9301 6.08291 10.9301 7.45443C10.9301 8.82595 9.81778 9.93831 8.44626 9.93831Z"
                                        fill="#A9A9A9" />
                                    <path
                                        d="M13.3208 3.4738C13.3208 3.96883 12.9189 4.36776 12.4268 4.36776C11.9318 4.36776 11.5328 3.96591 11.5328 3.4738C11.5328 2.97877 11.9347 2.57983 12.4268 2.57983C12.9189 2.57983 13.3208 2.98168 13.3208 3.4738Z"
                                        fill="#A9A9A9" />
                                </svg>
                            </Link>

                            <Link to="https://t.me/web3wellness">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M16 7.51145C16 11.6599 12.637 15.0229 8.4885 15.0229C4.34004 15.0229 0.977051 11.6599 0.977051 7.51145C0.977051 3.36299 4.34004 0 8.4885 0C12.637 0 16 3.36299 16 7.51145ZM8.75764 5.54532C8.02704 5.8492 6.56687 6.47816 4.37713 7.4322C4.02155 7.5736 3.83528 7.71193 3.81833 7.84719C3.78967 8.07579 4.07594 8.1658 4.46576 8.28838C4.51878 8.30505 4.57372 8.32233 4.63004 8.34064C5.01357 8.4653 5.52947 8.61115 5.79767 8.61695C6.04095 8.6222 6.31248 8.5219 6.61226 8.31606C8.6582 6.93499 9.71432 6.23693 9.78063 6.22188C9.82741 6.21126 9.89223 6.19791 9.93615 6.23695C9.98007 6.27599 9.97575 6.34992 9.9711 6.36975C9.94274 6.49065 8.81904 7.53534 8.23753 8.07597C8.05625 8.2445 7.92766 8.36405 7.90137 8.39135C7.84248 8.45252 7.78247 8.51037 7.72479 8.56598C7.36849 8.90945 7.1013 9.16703 7.73958 9.58765C8.04631 9.78978 8.29176 9.95693 8.53663 10.1237C8.80405 10.3058 9.07078 10.4874 9.41589 10.7137C9.50381 10.7713 9.58778 10.8312 9.66957 10.8895C9.98079 11.1113 10.2604 11.3107 10.6058 11.2789C10.8065 11.2604 11.0139 11.0717 11.1191 10.5088C11.368 9.1785 11.8571 6.29617 11.9702 5.10844C11.9801 5.00437 11.9676 4.8712 11.9576 4.81274C11.9476 4.75427 11.9267 4.67098 11.8507 4.60932C11.7607 4.53629 11.6218 4.52089 11.5596 4.52199C11.2771 4.52696 10.8437 4.67768 8.75764 5.54532Z"
                                        fill="#A9A9A9" />
                                </svg>

                            </Link>
                        </div>
                        <div className="terms-wrapper">
                            <Link to="/terms-and-conditions" target="_blank">
                                Terms & Condition
                            </Link>
                            <Link to="/privacy" target="_blank">
                                Privacy Policy
                            </Link>

                        </div>
                    </div>
                </div>
                <div className="cpr-text">
                    Copyright © 2022 Web 3 wellness All Rights Reserved
                </div>
            </footer>
        </>
    )
}
