import React from 'react'
import StakeCreditHistory from './StakeCreditHistory'

export default function StakeCreditComponent() {
    return (
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="card pt-4 mb-3">
                <StakeCreditHistory />
            </div>
            <div class="card pt-4 px-3">
                <h5>Stake Credit Wallet</h5>
                <form action="">

                    <div>
                        <label for="stakeamount" class="form-label">Enter Stake Amount</label>
                        <input type="number" class="form-control" id="stakeamount"
                            placeholder="Enter Stake Amount" aria-describedby="defaultFormControlHelp" />
                        <div id="defaultFormControlHelp" class="form-text">

                        </div>
                        <span>Min<span></span>/ Max <span></span></span>
                        <div class=" my-3 d-flex flex-md-row flex-column justify-content-between">
                            <span>Staking Period : 0<span> </span></span>
                            <span>Reward % per Month : 0<span> </span></span>
                            <span>Reward Month : 0<span> </span></span>
                            <span>Max Reward : 0<span> </span></span>
                        </div>

                    </div>

                </form>
                <div class="col-md-3 col-sm-6 col-12 my-3">

                    <button type="button" class="btn btn-primary waves-effect waves-light">Stake
                        Now</button>
                </div>
            </div>


        </div>
    )
}
