import React from 'react'
import FrontHeader from '../components/common/FrontHeader'

export default function Privacy() {
    return (
        <>
            <FrontHeader />
            <h1>PDF Example with iframe</h1>
            <iframe src="https://fit.keepwalkking.io/static/front_design/assets/doc/privacypolicy.pdf" width="100%" height="760">
            </iframe>
        </>
    )
}
