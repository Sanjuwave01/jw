import React, { useEffect, useState } from 'react'
import { premium_transfer_history } from '../common/Api'
import { Link } from 'react-router-dom'
import Pagination from "react-js-pagination";


export default function PremiumTransferHistory() {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [count, setCount] = useState(null)
    const [activePage, setActivePage] = useState(1);
    

    const get_premium_transfer_history = async () => {
        const data = await premium_transfer_history(page)
        setData(data.Data)
        setCount(data.count)
    }

    useEffect(() => {
        get_premium_transfer_history()
    }, [page])

    const handlePageChange = async (pageNumber) => {
        setActivePage(pageNumber)
        console.log(`active page is ${pageNumber}`);
        const data = await premium_transfer_history(pageNumber)
        setData(data.Data)
        setCount(data.count)
    }

    console.log(data)
    return (
        <div className="table-responsive text-center">
            <table className="table table-borderless border-top text-center">
                <thead className="border-bottom text-center">
                    <tr>
                        <th>S.No</th>
                        <th>Amount</th>
                        <th>Hash</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e) => {
                            return (
                                <tr key={e.sno}>
                                    <td>{e.sno}</td>
                                    <td>{parseFloat(e.amount_usdt).toFixed(2)}</td>
                                   

                                    <td>
                                        {
                                           e.Hash ==  '0x1468a5baaaca8d5e927ce129fd3c' ? <>
                                               <p>Internal Transfer</p>
                                              </> : <>{e.Hash.slice(0, 10)}
                                              </>
                                        }
                                  </td>
                                    <td><Link to={`https://bscscan.com/tx/${e.Hash}`}>Go</Link></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={count}
                pageRangeDisplayed={count / 10}
                onChange={handlePageChange}
            />

            
        </div>
    )
}
