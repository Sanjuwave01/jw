import React from 'react'
import lodinggif from '../admin_assets/assets/gif/loadwalk.gif'

export default function Loader() {
    return (
        <div className='container-xxl flex-grow-1 container-p-y'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='loading'>
                        <img src={`${lodinggif}`} />
                    </div>

                </div>
            </div>
        </div>
    )
}
