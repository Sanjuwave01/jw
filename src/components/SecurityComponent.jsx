import React from 'react'
import SecurityTfaComponent from './SecurityTfaComponent'
import ChangePin from './ChangePin'


export default function SecurityComponent() {
    return (
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="row">

                <div class="card h-100 pt-4">
                    <div class="nav-align-top mb-4">
                        <ul class="nav nav-pills mb-3 d-flex justify-content-center" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-home" aria-controls="navs-pills-top-home" aria-selected="true">
                                    Security
                                </button>
                            </li>
                            {/* <li class="nav-item" role="presentation">
                                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-profile" aria-controls="navs-pills-top-profile" aria-selected="false" tabindex="-1">
                                    Change Pin
                                </button>
                            </li> */}

                        </ul>
                        <div class="tab-content px-0 shadow-none">
                            <div class="tab-pane fade active show" id="navs-pills-top-home" role="tabpanel">
                                <SecurityTfaComponent />

                            </div>
                            {/* <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                                 <ChangePin />
                            </div> */}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
