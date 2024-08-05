import React, { useEffect, useState } from 'react'
import { referral_system } from '../common/Api'

export default function ReferalCommisionHistory() {
    const [data, setData] = useState([])
    const get_user_referal_commison_history = async () => {
        const data = await referral_system()
        setData(data)
    }
    useEffect(() => {
        get_user_referal_commison_history()
    }, [])
    return (
        <table className="table table-borderless border-top">
            <thead className="border-bottom">
                <tr>
                    <th>Level 1</th>
                    <th>First Percent</th>
                    <th>Second Percent</th>
                    <th>Plan Required</th>

                </tr>
            </thead>
            <tbody>
                {
                    data.map((el) => {
                        return (
                            <tr key={el.plan}>
                                <td>{el.name}</td>
                                <td> {el.commission_amount}</td>
                                <td> {el.second_commission_amount}</td>
                                <td>{el.plan}</td>
                            </tr>
                        )
                    })
                }



            </tbody>
        </table>
    )
}
