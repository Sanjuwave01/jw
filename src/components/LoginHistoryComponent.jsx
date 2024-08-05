import React from 'react'

export default function LoginHistoryComponent() {
    return (
        <div class="container-xxl flex-grow-1 container-p-y">


            <div class="card mb-4 p-4 ">

                <span class="badge bg-label-success mb-3 fs-5">BGLOBAL1977@gmail.com</span>
                <h5>
                    Login History
                </h5>
                <div class="table-responsive">
                    <table class="table table-borderless border-top">
                        <thead class="border-bottom">
                            <tr>
                                <th>S.No.</th>
                                <th>Login At</th>
                                <th>Last Login</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="d-flex justify-content-start align-items-center">
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column">
                                        <p class="mb-0 fw-medium">March 18,2024 10:32:27</p>
                                        <small class="text-muted text-nowrap">IP:192.168.1.6</small>
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0 fw-medium">March 18,2024 10:32:27</p>
                                    <small class="text-muted text-nowrap">IP:192.168.1.6</small>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex justify-content-start align-items-center">
                                        2
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column">
                                        <p class="mb-0 fw-medium">March 18,2024 10:32:27</p>
                                        <small class="text-muted text-nowrap">IP:192.168.1.6</small>
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0 fw-medium">March 18,2024 10:32:27</p>
                                    <small class="text-muted text-nowrap">IP:192.168.1.6</small>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>




        </div>
    )
}
