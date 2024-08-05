import React from 'react'
import PriceConvertPage from '../pages/PriceConvertPage'

export default function PriceConverterComponent() {
    return (
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="card pt-4 mb-3 px-3">
                <h5>Price Converter</h5>
                <div class="row">
                    <div class="col-md-6 mb-4 px-3">
                        <label for="selectpickerBasic" class="form-label">Enter Amount</label>
                        <div class="dropdown bootstrap-select w-100 position-relative">
                            <input type="number" class="form-control amt" id="amt" placeholder="Enter Amount"
                                aria-describedby="" />
                            <select id="selectpickerBasic" class="selectpicker w-100 floating_select"
                                data-style="btn-default" tabindex="null">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>

                        </div>
                    </div>
                    <div class="col-md-6 mb-4 px-3">
                        <label for="selectpickerBasic" class="form-label">Equivalent Price</label>
                        <div class="dropdown bootstrap-select w-100 position-relative">
                            <input type="number" class="form-control amt" id="eq_amt" placeholder="Enter Amount"
                                aria-describedby="" />
                            <select id="selectpickerBasic"
                                class="selectpicker w-100 floating_select" data-style="btn-default" tabindex="null">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>

                        </div>
                    </div>
                    <div class="col-md-6 mb-4 px-3">
                        <label for="selectpickerBasic" class="form-label">Select Fiat Currency</label>
                        <div class="dropdown bootstrap-select w-100 position-relative">
                            <input type="number" class="form-control amt" id="fiat_currency" placeholder="Enter Amount"
                                aria-describedby="" />
                            <select id="selectpickerBasic"
                                class="selectpicker w-100 floating_select" data-style="btn-default" tabindex="null">
                                <option>--</option>
                                <option>--</option>
                                <option>--</option>
                            </select>

                        </div>
                    </div>
                    <div class="col-md-6 mb-4 px-3">
                        <label for="p2p_rate" class="form-label">Enter P2P Binance Rate</label>
                        <input type="number" class="form-control" id="p2p_rate"
                            placeholder="Enter P2P Binance Rate" aria-describedby="" />

                    </div>
                    <div class="col-md-6 mb-4 px-3">
                        <label for="fiat_value" class="form-label">Fiat Currency Value</label>
                        <input type="number" class="form-control" id="fiat_value"
                            placeholder="Fiat Currency Value" aria-describedby="" />

                    </div>
                </div>
            </div>



        </div>
    )
}
