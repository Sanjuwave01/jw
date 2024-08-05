import React, { useEffect, useState } from 'react'
import { Direct_referral_list } from '../common/Api'

export default function ReferalHistoryComponent() {
    const [data, setData] = useState([])
    const get_user_referal_history = async () => {
        const data = await Direct_referral_list()
        setData(data)
    }
    useEffect(() => {
        get_user_referal_history()
    }, [])
    return (
        <table className="table table-borderless border-top">
            <thead className="border-bottom">
                <tr>
                    <th>Name</th>
                    <th>Plan</th>
                    <th>Start Date</th>
                    <th>End date</th>

                </tr>
            </thead>
            <tbody>
                {
                    data.map((el) => {
                        return (
                            <tr key={el.plan}>
                                <td>{el.user_name}</td>
                                <td>{el.Plan}</td>
                                <td>{el.Date}</td>
                                <td>{el.Plan_end_date}</td>
                            </tr>
                        )
                    })
                }



            </tbody>
        </table>
    )
}
