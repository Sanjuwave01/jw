
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SideBar from './components/common/SideBar';
import Header from './components/common/Header';
import './assets/css/style.css'
import './assets/css/responsive.css'
import OtpPage from './pages/OtpPage';
import SetPinPage from './pages/SetPinPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect, useState } from 'react';
import ReferalPage from './pages/ReferalPage';
import WithdrawalPage from './pages/WithdrawalPage';
import WalletPage from './pages/WalletPage';
import BuyPlanBuy from './pages/BuyPlanBuy';
import PremiumWallet from './pages/PremiumWallet';
import InternalTransfer from './pages/InternalTransfer';
import RollRewards from './pages/RollRewards';
import Pharses from './pages/Pharses';
import LoginPage from './pages/LoginPage'
import ResetPin from './pages/ResetPin'
import ComingSoonPage from './pages/ComingSoonPage'
import ProfilePage from './pages/ProfilePage'
import StakingPage from './pages/StakingPage';
import Stakecedit from './pages/Stakecedit';
import RechargeIssue from './pages/RechargeIssue';
import SupportPage from './pages/SupportPage';
import PriceConvertPage from './pages/PriceConvertPage';
import LoginHistory from './pages/LoginHistory';
import SecurityPage from './pages/SecurityPage';
import FaqPage from './pages/FaqPage';
import Staking from './pages/Staking';
import SubscriptionPage from './pages/SubscriptionPage';
import HelpCenter from './components/HelpCenter';
import LeaderShipBonus from './pages/LeaderShipBonus';
import Maintenance from './pages/Maintenance';
import { URL } from './common/Route';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ReferalCodePage from './pages/ReferalCodePage';
import WithdrawalHistoryPage from './pages/WithdrawalHistoryPage';
import InternalTransferHistoryPage from './pages/InternalTransferHistoryPage';
import { get_profile } from './common/Api';



function App() {
  const [main, setMain] = useState('')

  const maintainance = async () => {
    try {
      const response = await fetch(`${URL}/maintanance/`, {
        method: "GET",

      })

      const result = await response.json();
      if (result.Data && result.Data.length > 0) {
        console.log(result.Data[0].site_maintenance_status);
        setMain(result.Data[0].site_maintenance_status);
      } else {
        console.error('No data found in the response');
      }
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    maintainance();

  }, [])



  const Layout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const otp = JSON.parse(localStorage.getItem('otp'));
    const pin = JSON.parse(localStorage.getItem('pin'));

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [username, setUserName] = useState('');

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    const get_user_profile = async () => {
      try {
        const data = await get_profile();
        console.log('profile', data)
        setUserName(data.user_name)
      } catch (error) {
        console.log(error)
      }
    };



    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        navigate('/');
      }
      if (!otp) {
        navigate('/otp/verify');
      }
      if (!pin) {
        navigate('/set/pin');
      }
      if (main === 1) {
        navigate('/maintenance');
      }
      get_user_profile()
      const handleKeyDown = (event) => {
        if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
          event.preventDefault();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };

    }, [user, otp, pin, main, navigate]);

    return (
      <>

        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">

            {isSidebarOpen && <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} username={username} />}

            <div className="layout-page">
              <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
              <div className="content-wrapper">
                <Outlet />
              </div>
            </div>
          </div>


          <div className="layout-overlay layout-menu-toggle"></div>
          <div className="drag-target"></div>
        </div>

      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {

      path: "user",
      element: <Layout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardPage />
        },
        {
          path: 'referal',
          element: <ReferalPage />
        },
        {
          path: 'withdrawal',
          element: <WithdrawalPage />
        },
        {
          path: 'withdrawal/history',
          element: <WithdrawalHistoryPage />
        },
        {
          path: 'internaltransfer/history',
          element: <InternalTransferHistoryPage />
        },
        {
          path: 'wallet',
          element: <WalletPage />
        },
        {
          path: 'buy/plan',
          element: <BuyPlanBuy />
        },
        {
          path: 'premium/wallet',
          element: <PremiumWallet />
        },
        {
          path: 'internal/transfer',
          element: <InternalTransfer />
        },
        {
          path: 'roll/on/rewards',
          element: <RollRewards />
        },
        {
          path: 'import/phrases',
          element: <Pharses />
        },
        {
          path: 'profile',
          element: <ProfilePage />
        },
        {
          path: 'leadship/bonus',
          element: <LeaderShipBonus />
        },
        // {
        //   path: 'stakewallet',
        //   element: <StakingPage />
        // },
        // {
        //   path: 'staking',
        //   element: <Staking />
        // },
        // {
        //   path: 'subscription',
        //   element: <SubscriptionPage />
        // },
        // {
        //   path: 'stakecredit',
        //   element: <Stakecedit />
        // },
        // {
        //   path: 'rechargeissue',
        //   element: <RechargeIssue />
        // },
        // {
        //   path: 'support',
        //   element: <SupportPage />
        // },
        // {
        //   path: 'priceconverter',
        //   element: <PriceConvertPage />
        // },
        // {
        //   path: 'loginhistory',
        //   element: <LoginHistory />
        // },
        {
          path: 'security',
          element: <SecurityPage />
        },
        // {
        //   path: 'faq',
        //   element: <FaqPage />
        // },
        {
          path: "*",
          element: <ComingSoonPage />
        }
      ]
    },

    {
      path: "/help/center",
      element: <HelpCenter />
    },
    {
      path: "/Login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/referalcode/:ref",
      element: <ReferalCodePage />
    },
    {
      path: "/otp/verify",
      element: <OtpPage />
    },
    {
      path: "/set/pin",
      element: <SetPinPage />
    },
    {
      path: "/reset/pin",
      element: <ResetPin />
    },
    {
      path: "/privacy",
      element: <Privacy />
    },
    {
      path: "/terms-and-conditions",
      element: <Terms />
    },
    {
      path: "/maintenance",
      element: <Maintenance />
    },





  ]);



  return (
    <RouterProvider router={router} />
  );
}

export default App;
