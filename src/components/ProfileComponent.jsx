import React, { useEffect, useState } from 'react';
import { get_profile, set_profile } from '../common/Api';
import logo from '../admin_assets/assets/img/branding/new_applogo.webp';
import { ToastContainer, toast } from 'react-toastify';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: atob('QUtJQVlEWDU2Wkw3S1JWNFMyWEU='), // Decode base64
  secretAccessKey: atob('OFR3UU4vdDVDY0xyRVV5a044a3F4dDJhUnRvQWNQSTJmc1QzcDVCSw==') // Decode base64
});

const s3 = new AWS.S3();

export default function ProfileComponent() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [disable, setDisable] = useState(false);

  const get_user_profile = async () => {
    const data = await get_profile();
    setUserName(data.name);
    setName(data.user_name);
    setEmail(data.Email);
    setPhone(data.user_phone_number);
    setImage(data.user_profile);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const params = {
        Bucket: atob('YW1GYXphdm9uZXM='), // Decode base64
        Key: `jasanwellness/${selectedFile.name}`,
        Body: selectedFile,
        ContentType: selectedFile.type,
      };
      s3.upload(params, function (err, data) {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
          // Update the profile with the new image URL
          setImage(data.Location);
        
        }
      });
    } else {
        setImage('');
     
    }
    const data = await set_profile(name, email, phone, userName ,image);
    toast(data.Msg);
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    get_user_profile();
  }, []);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <ToastContainer />
        <div className="card h-100 pt-4">
          <div>
            <h5 className="text-center">My Profile</h5>
            <form className="my-3" onSubmit={handleSaveProfile}>
              <div className="qrimg 2fa_img text-center mx-auto" style={{ width: '200px' }}>
                {image ? (
                  <img src={image} width="50px" alt="2FA QR Image" className="mb-3" />
                ) : (
                  <img src={logo} width="50px" alt="2FA QR Image" className="mb-3" />
                )}
                <input className="form-control" type="file" onChange={handleFileInput} />
              </div>
              <div className="col-12">
                <label htmlFor="uname" className="col-md-2 col-form-label">
                  User Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  id="uname"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="Email" className="col-md-2 col-form-label">
                  Email Id
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  id="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={true}
                />
              </div>
              <div className="col-12">
                <label htmlFor="Phone" className="col-md-2 col-form-label">
                  Phone Number
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="Phone"
                  readOnly={phone && true}
                />
              </div>
              <div className="col-md-3 col-sm-6 col-12 mb-3 my-3">
                <button type="Submit" className="btn btn-primary waves-effect waves-light" disabled={disable}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
