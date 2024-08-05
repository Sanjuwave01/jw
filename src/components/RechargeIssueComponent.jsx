import React from 'react'

export default function RechargeIssueComponent() {
    return (
        <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card mb-4 p-4">
                <h5 class="mb-2">Recharge Issue</h5>
                <form>
                    <div class="mb-3">
                        <label for="selectpickerBasic" class="form-label">Plan Duration</label>
                        <div class="dropdown bootstrap-select w-100 dropup"><select id="selectpickerBasic"
                            class="selectpicker w-100" data-style="btn-default" tabindex="null">
                            <option>Monthly</option>
                            <option>Half-Yearly</option>
                            <option>Yearly</option>
                        </select>

                            <div class="dropdown-menu" style={{maxHeight:"357.062px", overflow :"hidden" , minHeight:"0px"}}>
                                <div class="inner show" role="listbox" id="bs-select-1" tabindex="-1"
                                    aria-activedescendant="bs-select-1-0"
                                     style={{maxHeight:"341.062px", overflow :"hidden auto" , minHeight:"0px"}}>
                                    <ul class="dropdown-menu inner show" role="presentation"
                                         style={{marginTop:"0px", marginBottom :"0px"}}>
                                        <li class="selected active"><a role="option" class="dropdown-item active selected"
                                            id="bs-select-1-0" tabindex="0" aria-setsize="3" aria-posinset="1"
                                            aria-selected="true"><span class="text">Rocky</span></a></li>
                                        <li><a role="option" class="dropdown-item" id="bs-select-1-1" tabindex="0" aria-setsize="3"
                                            aria-posinset="2"><span class="text">Pulp Fiction</span></a></li>
                                        <li><a role="option" class="dropdown-item" id="bs-select-1-2" tabindex="0" aria-setsize="3"
                                            aria-posinset="3"><span class="text">The Godfather</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="selectpickerBasic" class="form-label">Choose Plan</label>
                        <div class="dropdown bootstrap-select w-100 dropup"><select id="selectpickerBasic"
                            class="selectpicker w-100" data-style="btn-default" tabindex="null">
                            <option>Monthly</option>
                            <option>Half-Yearly</option>
                            <option>Yearly</option>
                        </select>

                            <div class="dropdown-menu" style={{maxHeight:"357.062px", overflow :"hidden" , minHeight:"0px"}}>
                                <div class="inner show" role="listbox" id="bs-select-1" tabindex="-1"
                                    aria-activedescendant="bs-select-1-0"
                                     style={{maxHeight:"341.062px", overflow :"hidden auto" , minHeight:"0px"}}>
                                    <ul class="dropdown-menu inner show" role="presentation"
                                         style={{marginTop:"0px", marginBottom :"0px"}}>
                                        <li class="selected active"><a role="option" class="dropdown-item active selected"
                                            id="bs-select-1-0" tabindex="0" aria-setsize="3" aria-posinset="1"
                                            aria-selected="true"><span class="text">Rocky</span></a></li>
                                        <li><a role="option" class="dropdown-item" id="bs-select-1-1" tabindex="0" aria-setsize="3"
                                            aria-posinset="2"><span class="text">Pulp Fiction</span></a></li>
                                        <li><a role="option" class="dropdown-item" id="bs-select-1-2" tabindex="0" aria-setsize="3"
                                            aria-posinset="3"><span class="text">The Godfather</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="mb-3">
                        <label class="form-label" for="basic-default-message">Hash</label>
                        <textarea id="basic-default-message" class="form-control" rows="3"
                            placeholder=""></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary waves-effect waves-light">Submit</button>
                </form>

            </div>


        </div>
    )
}
