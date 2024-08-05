import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { get_user_address, plan_static_content, set_user_pharses_in_loalhost, user_address_trust_live_edit, user_details_two } from '../common/Api'
import { ethers } from 'ethers'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function PharsesComponent() {
    const [pharses, setPharses] = useState('')
    const [pin, setPin] = useState('')
    const [confirmpin, setConfirmPin] = useState('')
    const [modelMessageShow, setModelMessageShow] = useState(false);
    const [contentModel, setContentModel] = useState(false);
    const [content, setContent] = useState([]);
    const [agree, setAgree] = useState('');

    const [readOnly, setreadOnly] = useState(false)
    const [disable, setDisable] = useState(true)

    const [info, setInfo] = useState({})
    const [PageDetail, setPageDetail] = useState('wallet_page')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()

    const ph = JSON.parse(localStorage.getItem('ph'))
    const phn = JSON.parse(localStorage.getItem('phn'))
    const pass = JSON.parse(localStorage.getItem('pass'))


    const handleImportPharses = async () => {
        //setModelMessageShow(true)
        // if (pass) {
        const data = await get_user_address(pharses)
        console.log(data.address)
        if (data.address) {
            if (data.address.toLowerCase() == address.toLowerCase()) {
                setAddress(data.address)

                localStorage.removeItem('ph')
                localStorage.setItem('ph', JSON.stringify(pharses))
                setModelMessageShow(true)
                //toast('Wallet Import Succesffuly!')
            } else {
                toast.error('Incorrect Phrases !')
            }
        } else {
            toast.error('Phrases does not exist!')
        }


    }

    const handleCreatePharses = async () => {
        setContentModel(true)
    }

    const get_user_detail_two = async () => {
        const userdetail = await user_details_two(PageDetail)
        setInfo(userdetail)
        setAddress(userdetail.wallet_address ? userdetail.wallet_address : "")
    }

    const get_plan_static_content = async () => {
        const data = await plan_static_content()
        console.log(data)
        setContent(data.Data)
    }


    useEffect(() => {
        if (ph != 1) {
            setPharses(ph)
            setreadOnly(true)
        }
        if (!pass) {
            setModelMessageShow(false)
        }
    }, [ph, pass])

    useEffect(() => {
        if (ph != 1) {
            setModelMessageShow(true)
        }
        get_user_detail_two()
        get_plan_static_content()
    }, [ph])



    const handleClose = () => {
        setModelMessageShow(false)
        localStorage.removeItem('ph')
        localStorage.removeItem('pass')
        localStorage.setItem('ph', 1)
        navigate('/user/dashboard')

    };

    const handlePin = async () => {
        if (pin.length < 6) {
            return toast.error(`Minimum 6 digits Pin is required`)
        }
        if (!pin && !confirmpin) {
            return toast.error(`Please Enter Pin!`)
        }
        if (pin == confirmpin) {
            setModelMessageShow(false)
            const wallet = await ethers.Wallet.fromMnemonic(
                ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16))
            )
            try {
                const data = await user_address_trust_live_edit(wallet.address)
                console.log(data)

                if (data.status == true) {
                    // toast(data.Msg)
                    localStorage.removeItem('ph')
                    localStorage.setItem('pass', JSON.stringify(pin))
                    localStorage.setItem('ph', JSON.stringify(wallet.mnemonic.phrase))
                    setModelMessageShow(false)
                    toast.success(`Successfully Import`)
                }
            } catch (error) {
                return toast.error(`${error}`)
            }

            setModelMessageShow(false)
            //toast('Wallet Import Succesffuly!')
        } else {
            toast.error('Pin and confirm pin is not matched')
        }
    }

    const handlePinVerify = () => {
        if (pin == confirmpin) {
            if (pin == pass) {
                setModelMessageShow(false)
            } else {
                toast.error('Pin not match')
            }
        } else {
            toast.error('Please Check Your Pin !')
        }
    }

    const handleagree = () => {
        setDisable(!disable)

    }

    const handleCloses = () => {
        setContentModel(false)
    }

    const handleCreatePharase = async () => {
        setContentModel(false)
        setModelMessageShow(true)


    }

    const handlePharsePin = async() => {
        try {
            if (pin.length < 6) {
                return toast.error(`Minimum 6 digits Pin is required`)
            }
            if (!pin && !confirmpin) {
                return toast.error(`Please Enter Pin!`)
            }
            if (pin == confirmpin) {
                setModelMessageShow(false)
                localStorage.removeItem('ph')
                localStorage.setItem('pass', JSON.stringify(pin))
                localStorage.setItem('ph', JSON.stringify(pharses))
                toast('Wallet Import Succesffuly!')
            } else {
                toast.error('Pin and confirm pin is not matched')
            }
        } catch(error) {

        }
    }

    return (
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="card pt-4 mb-3 px-3">
                <div class="row">
                    <div class="col-12  mb-4 ">
                        <h5>Import Phrases {address || address != 0 && (address)} </h5>
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
                                <label for="address" class="form-label">Phrases</label>
                                <input type="text" class="form-control" id="address" placeholder="" value={pharses} onChange={(e) => setPharses(e.target.value)} aria-describedby="" readOnly={readOnly} autoComplete={false}/>

                            </div>
                            <div class="col-md-3 col-sm-6 col-12 mt-2 mb-3">
                                {
                                    ph == 1 && (
                                        <>
                                            <button type="button" class="btn btn-primary waves-effect waves-light me-3" onClick={handleImportPharses}>Import</button>
                                            {
                                                !address || address == 0 && <button type="button" class="btn btn-primary waves-effect waves-light me-3" onClick={handleCreatePharses}>Create</button>
                                            }

                                        </>

                                    )


                                }


                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <Modal size="lg" show={modelMessageShow} onHide={handleClose} backdrop="static">

                <Modal.Body>
                    <div class="col-md-12 mb-2 px-3">
                        <label for="address" class="form-label">Pin</label>
                        <input type="password" class="form-control" id="address" placeholder="" value={pin} onChange={(e) => setPin(e.target.value)} aria-describedby="" minLength={6} maxLength={6} />

                    </div>

                    <div class="col-md-12 mb-2 px-3">
                        <label for="address" class="form-label">Confirm Pin</label>
                        <input type="password" class="form-control" id="address" placeholder="" value={confirmpin} onChange={(e) => setConfirmPin(e.target.value)} aria-describedby="" minLength={6} maxLength={6} />

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    {
                        pass ? <button type="button" class="btn btn-primary waves-effect waves-light me-3" onClick={handlePinVerify}>Verify</button> :
                            pharses ? <button type="button" class="btn btn-primary waves-effect waves-light me-3" onClick={handlePharsePin}>Create</button> :
                                <button type="button" class="btn btn-primary waves-effect waves-light me-3" onClick={handlePin}>Create</button>

                    }
                    <button type="button" class="btn btn-danger waves-effect waves-light me-3" onClick={handleClose}>Cancel</button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={contentModel} onHide={handleClose} backdrop="static">

                <Modal.Body>
                    {
                        content.map((item, i) => {
                            return (
                                <div key={i}>
                                    <h4>
                                        {item.title}
                                    </h4>

                                    <div
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />

                                </div>
                            )
                        })
                    }

                    <div class="checkBox_notification d-flex justify-content-center py-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={agree} onChange={handleagree} id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                I have read and agree to all of the above.
                            </label>
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button type="button" class="btn btn-success waves-effect waves-light me-3" onClick={handleCreatePharase} disabled={disable}>Create</button>
                    <button type="button" class="btn btn-danger waves-effect waves-light me-3" onClick={handleCloses}>Cancel</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
