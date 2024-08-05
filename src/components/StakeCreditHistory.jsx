import React from 'react'

export default function StakeCreditHistory() {
    return (
        <>
            <div class="nav-align-top mb-4">
                <ul class="nav nav-pills mb-3 d-flex justify-content-center" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                            data-bs-target="#navs-pills-top-home" aria-controls="navs-pills-top-home"
                            aria-selected="true">
                            Staking
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                            data-bs-target="#navs-pills-top-profile"
                            aria-controls="navs-pills-top-profile" aria-selected="false" tabindex="-1">
                            Withdraw
                        </button>
                    </li>

                </ul>
                <div class="tab-content px-0 shadow-none">
                    <div class="tab-pane fade active show" id="navs-pills-top-home" role="tabpanel">

                        <div class="table-responsive">
                            <table class="table table-borderless border-top">
                                <thead class="border-bottom">
                                    <tr>
                                        <th>Stake No</th>
                                        <th>Stake Date</th>
                                        <th>Stake Amount</th>
                                        <th>Release Amount</th>
                                        <th>Release Date</th>
                                        <th>Stake Release</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td></td>
                                        <td>

                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                        <div class="table-responsive">
                            <table class="table table-borderless border-top">
                                <thead class="border-bottom">
                                    <tr>
                                        <th>Stake No</th>
                                        <th>Stake Date</th>
                                        <th>Stake Amount</th>
                                        <th>Release Amount</th>
                                        <th>Release Date</th>
                                        <th>Stake Release</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td></td>
                                        <td>

                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-12 mx-3 mb-3">

            </div>
        </>
    )
}
