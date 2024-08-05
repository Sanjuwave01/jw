import React, { useEffect, useState } from 'react'
import { premium_transfer_history, withdrawal_history } from '../common/Api'
import { Link } from 'react-router-dom'
import Pagination from "react-js-pagination";

export default function WithdrawalHistoryComponent() {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [count, setCount] = useState(null)
    const [activePage, setActivePage] = useState(1);


    const get_withdrawal_history = async () => {

        const data = await withdrawal_history(page)
        setData(data.Data)
        setCount(data.count)
    }

    useEffect(() => {
        get_withdrawal_history()
    }, [])



    console.log(data)

    return (

        <div className="table-responsive text-center">
            <table className="table table-borderless border-top text-center">
                <thead className="border-bottom text-center">
                    <tr>
                        <th>Sr no.</th>
                        <th>Amount</th>
                        <th>Hash</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e, index) => {
                            return (
                                <tr key={e.id}>
                                    <td>{index + 1}</td>

                                    <td>{parseFloat(e.Withdraw_JW).toFixed(2)} JW</td>


                                    <td>
                                        {e.Transaction_Hash.slice(0, 20)} .......
                                    </td>
                                    <td><Link to={`https://bscscan.com/tx/${e.Hash}`}>Go</Link></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>



        </div>
    )
}
