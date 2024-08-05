import React, { useEffect, useState } from 'react'
import { user_details_two } from '../common/Api'

export default function LeaderShipComponent() {
    const [PageDetail, setPageDetail] = useState('wallet_page')
    const [info, setInfo] = useState({})
    const [rank, setRank] = useState(0)
    const [Achieved, setAchieved] = useState('')
    const rank_criteria = [
        { 'ranks': 1, 'rank': '1 Star', 'my_business': 1500, 'rewards': '$10 USDT(JW) * 7 Weeks', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 2, 'rank': '2 Star', 'my_business': 7000, 'rewards': '$10 USDT(JW) * 10 Weeks', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 3, 'rank': '3 Star', 'my_business': 18000, 'rewards': '$15 USDT(JW) * 12 Weeks', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 4, 'rank': '4 Star', 'my_business': 35000, 'rewards': '$20 USDT(JW) * 15 Weeks', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 5, 'rank': '5 Star', 'my_business': 65000, 'rewards': '$25 USDT(JW) * 20 Weeks', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 6, 'rank': '6 Star', 'my_business': 100000, 'rewards': '$30 USDT(JW) * 48 Weeks', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 7, 'rank': '7 Gold', 'my_business': 400000, 'rewards': 'Hyundai Creta Fully Paid', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 8, 'rank': '8 Platinum', 'my_business': 1200000, 'rewards': 'Mahindra XUV700 Fully Paid', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 9, 'rank': '9 Diamond', 'my_business': 3600000, 'rewards': 'Jeep Meridian Fully Paid', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 10, 'rank': '10 Double Diamond', 'my_business': 10800000, 'rewards': 'Volvo XC90', 'leg1': 50, 'leg2': 50, 'leg3': 50 },
        { 'ranks': 11, 'rank': '11 Crown Diamond', 'my_business': 35000000, 'rewards': 'Range Rover', 'leg1': 50, 'leg2': 50, 'leg3': 50 },

    ]

    const get_user_detail = async () => {
        try {
            const data = await user_details_two(PageDetail)
            console.log(data)
            setInfo(data.legs_business)
            setRank(data.legs_business.rank + 1)
            const rankDetails = rank_criteria.find(item => item.ranks === data.legs_business.rank + 1);
            if (rankDetails) {
                setAchieved(rankDetails.rank);
                console.log(rankDetails);
            } else {
                console.log('Rank not found in criteria');
            }
            console.log(rankDetails)
           } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        get_user_detail()

    }, [])


    console.log('Achieved', Achieved)
 

    return (
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card pt-4 mb-3 px-3">
                        <div class="card-header">
                            <h4>Leadership Bonus</h4>
                            <p>Current running rank : {Achieved}</p>
                        </div>

                        <div className="table-responsive text-center">
                            <table className="table table-borderless border-top text-center">
                                <thead className="border-bottom text-center">
                                    <tr>
                                        <th>Rank</th>
                                        <th>Business(USDT)</th>
                                        <th>Reward</th>
                                        <th>Single Team Qualifier</th>
                                        <th>Single Team Achived</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rank_criteria.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.rank}</td>
                                                    <td>{item.my_business}</td>
                                                    <td>{item.rewards}</td>
                                                    <td>{item.leg1} : {item.leg3}</td>
                                                    <td>{info.rank + 1 > item.ranks ? 'Achieved' : info.rank + 1 == item.ranks ? `${info.leg1_business} : ${info.leg3_business}` : '  '} </td>
                                                    <td>{info.rank + 1 > item.ranks ? <>Complete <i class="ti ti-check" style={{ background: "green", borderRadius: "50%" }}></i></> : info.rank + 1 == item.ranks ? `Pending` : ''}</td>

                                                </tr>
                                            )
                                        })
                                    }



                                </tbody>
                            </table>



                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
