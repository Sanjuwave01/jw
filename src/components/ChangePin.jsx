import React from 'react'

export default function ChangePin() {
    return (
        <div>
            <h5>
                Change Pin
            </h5>
            <form class="my-3">
                <div class="col-12">
                    <label for="old_pass" class="col-md-2 col-form-label">Old Password</label><input class="form-control" type="password" value="password" id="old_pass" />
                </div>
                <div class="col-12">
                    <label for="new_pass" class="col-md-2 col-form-label">New Password</label><input class="form-control" type="password" value="password" id="old_pass" />
                </div>
                <div class="col-12">
                    <label for="confirm_pass" class="col-md-2 col-form-label">Confirm Password</label><input class="form-control" type="password" value="password" id="old_pass" />
                </div>

                <div class="col-md-3 col-sm-6 col-12 mb-3 my-3">

                    <button type="Submit" class="btn btn-primary waves-effect waves-light">Change Pin</button>
                </div>
            </form>
        </div>
    )
}
