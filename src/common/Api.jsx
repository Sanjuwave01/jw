import axios from "axios";
import { URL } from "./Route";
import Web3 from "web3";
import { toast } from "react-toastify";
import { ethers } from 'ethers';


const user = JSON.parse(localStorage.getItem("user"))

export const loginApi = async (email) => {
    const { data } = await axios.post(`${URL}/user_login`, {
        Email: email, User_type: "normaluser", setType: "", device_unique_id: ""
    })
    console.log(data)

}



export const home_page_content = async () => {
    try {
        const response = await fetch(`${URL}/home_page_content/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                build_type: "SERVER",
                device_ip_address: '',
                device_unique_id: "logindone",
                phone_type: 'Android',
                versioncode: '5.4.7'
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return error
    }

}

export const Pin_set = async (pin, confirm, pinset) => {
    const response = await fetch(`${URL}/Pin_set/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Token": `${user.token}`
        },
        body: JSON.stringify({
            pin: pin,
            confirm_pin: confirm,
            setType: pinset,

        }),
    });

    const data = await response.json();
    return data;

}

export const plan_static_content = async (pin, confirm, pinset) => {
    const response = await fetch(`${URL}/plan_static_content/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Token": `${user.token}`
        },
    });

    const data = await response.json();
    return data;

}


export const getTestApi = async () => {
    const data = await axios.get(`${URL}/front_screen_content/`)
    const result = await data.json()
    return result;
}

export const user_details_two = async (PageDetail) => {

    try {
        const response = await fetch(`${URL}/user_details_two/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                ActivateStatus: "0",
                page_details: PageDetail,
                setType: "logindone"
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }

}
export const add_leg_bussiness = async (id, plan, reff_id) => {

    try {
        const response = await fetch(`${URL}/add_leg_business/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                id: id,
                Plan: plan,
                reff_id: reff_id
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }

}

export const user_balance = async (address) => {
    try {
        const testnet = "https://bsc-dataseed.binance.org";

        let web3 = new Web3(testnet)
        const contract_address = "0x55d398326f99059fF775485246999027B3197955";
        const abi = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "_decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
        //console.log(web3)
        const contract = new web3.eth.Contract(abi, contract_address)
        const result = await contract.methods.balanceOf(address).call();

        const value = await web3.utils.fromWei(parseInt(result), 'ether')

        //console.log(balance)
        return value;
    } catch (error) {
        return error
    }

}

export const jw_balance = async (address) => {
    console.log('jw', address)
    const testnet = "https://bsc-dataseed.binance.org";

    let web3 = new Web3(testnet)
    const contract_address = "0xaB785054251DB0fc44538F5DeeBE7507B748b692";
    const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "_decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]//console.log(web3)
    const contracts = new web3.eth.Contract(abi, contract_address)
    const results = await contracts.methods.balanceOf(address).call();

    const values = web3.utils.fromWei(parseInt(results), 'ether')
    console.log('jw', values)
    //console.log(result*1000000000000000000)
    return values * 10000000000;

}

export const bnb_balance = async (address) => {
    const testnet = "https://bsc-dataseed.binance.org";

    let web3 = new Web3(testnet)
    const result = await web3.eth.getBalance(address)
    const value = web3.utils.fromWei(parseInt(result), 'ether')

    //console.log(balance)
    return value;

}

export const premium_transfer_history = async (pageno) => {
    const response = await fetch(`${URL}/premium_Transfer_History_List/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Token": `${user.token}`
        },
        body: JSON.stringify({
            pageno: pageno,
            value: "deposit"
        }),
    });

    const data = await response.json();
    return data;
}
export const withdrawal_history = async (pageno) => {
    try {
        const response = await fetch(`${URL}/transaction_history/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}


export const transfer_premium_amount = async (amount, email, senderEmail) => {
    try {
        console.log(email)
        const response = await fetch(`${URL}/transfer_premium_amount/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Amount: amount,
                sender_email: email,
                receiver_email: senderEmail

            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}

export const get_profile = async () => {
    try {
        const response = await fetch(`${URL}/Profile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });

        const result = await response.json();
        // console.log(result)
        return result.Data;

    } catch (error) {
        toast.error(error)
    }
}

export const step_count_status_update = async () => {
    try {
        const response = await fetch(`${URL}/step_count_status_update/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                Step_count_status: 1,

            }),
        });

        const result = await response.json();
        // console.log(result)
        return result;

    } catch (error) {
        toast.error(error)
    }
}

export const set_profile = async (username, email, phone, name, image) => {
    try {
        const response = await fetch(`${URL}/Profile_Update/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                Name: name,
                user_name: username,
                Email: email,
                Phone_Number: `${phone}`,
                user_profile: image

            }),
        });

        const result = await response.json();
        // console.log(result)
        return result;

    } catch (error) {
        toast.error(error)
    }
}

export const Direct_referral_list = async () => {
    try {
        const response = await fetch(`${URL}/Direct_referral_list/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });

        const result = await response.json();
        // console.log(result)
        return result.data;

    } catch (error) {
        toast.error(error)
    }
}
export const referral_system = async () => {
    try {
        const response = await fetch(`${URL}/referral_system/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });

        const result = await response.json();
        // console.log(result)
        return result.data;

    } catch (error) {
        toast.error(error)
    }
}
export const referral_details = async () => {
    try {
        const response = await fetch(`${URL}/referral_details/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });

        const result = await response.json();
        // console.log(result)
        return result;

    } catch (error) {
        return error;
    }
}

export const maximum_target = async () => {

    try {
        const response = await fetch(`${URL}/Maximum_target/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });

        const result = await response.json();
        // console.log(result)
        return result;

    } catch (error) {
        return error;
    }
}
export const user_target_set = async (target) => {
    try {
        const response = await fetch(`${URL}/user_target_set/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                target_step: target
            })

        });

        const result = await response.json();
        // console.log(result)
        return result;

    } catch (error) {
        return error;
    }
}

export const stake_internal_transfer = async (from, to, amount) => {
    try {

        const response = await fetch(`${URL}/stake/internal_transfer/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                Amount: 0,
                actual_amount: amount,
                converted_usdt: 0,
                fees: 0,
                from_wallet: from,
                to_wallet: to

            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}
export const Internal_Transfer_premium = async (from, to, amount) => {
    try {

        const response = await fetch(`${URL}/stake/Internal_Transfer_premium/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                Amount: 0,
                actual_amount: amount,
                converted_usdt: 0,
                fees: 0,
                from_wallet: from,
                to_wallet: to

            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}

export const update_plan_end_date_internal = async (id) => {
    try {

        const response = await fetch(`${URL}/update_plan_end_date_internal/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}

export const company_raferral = async () => {
    try {

        const response = await fetch(`${URL}/company_raferral/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}
export const get_address = async () => {
    let mnemonic = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.log(mnemonicWallet.privateKey);
    return mnemonicWallet.privateKey;
}

export const jw_transfer = async (pharses, amount) => {

    try {
        let mnemonicWallet = ethers.Wallet.fromMnemonic(pharses);

        //console.log(mnemonicWallet.address);

        const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org"))
        const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "_decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
        const contactadress = "0xaB785054251DB0fc44538F5DeeBE7507B748b692"; // jw token address
        let contract = new web3.eth.Contract(abi, contactadress);
        //console.log('contract',contract)
        let gas = await web3.eth.estimateGas({
            "from": mnemonicWallet.address,
        });

        console.log('gasPrice', gas)

        const realamount = Math.trunc(amount)
        const gasPrice = web3.utils.toWei('10', 'gwei')

        //console.log('gasPrice',gasPrice)

        const signtransection = await web3.eth.accounts.signTransaction({
            from: mnemonicWallet.address,
            to: contract.options.address,
            value: 0,
            gas: gas,
            gasPrice: gasPrice,
            data: contract.methods.transfer('0x5936c8415C62C4B5C2515D7fa93d9a5881A2218d', Number(realamount) * 100000000).encodeABI(),
        }, mnemonicWallet.privateKey);

        //console.log('signtransection',signtransection)
        // console.log(signtransection);

        const sendSignedTransaction = await web3.eth.sendSignedTransaction(signtransection.rawTransaction)

        // send = sendSignedTransaction.transactionHash;
        // console.log(sendSignedTransaction.transactionHash)

        return sendSignedTransaction.transactionHash;
    } catch (error) {
        return error
    }


}

export const usdt_transfer = async (pharses, amount) => {

    try {
        let mnemonicWallet = ethers.Wallet.fromMnemonic(pharses);

        //console.log(mnemonicWallet.address);

        const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org"))
        const abi = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "_decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
        const contactadress = "0x55d398326f99059fF775485246999027B3197955";
        let contract = new web3.eth.Contract(abi, contactadress);
        //console.log('contract',contract)
        let gas = await web3.eth.estimateGas({
            "from": mnemonicWallet.address,
        });

        console.log('gasPrice', gas)

        const realamount = Math.trunc(amount)
        const gasPrice = web3.utils.toWei('10', 'gwei')

        //console.log('gasPrice',gasPrice)

        const signtransection = await web3.eth.accounts.signTransaction({
            from: mnemonicWallet.address,
            to: contract.options.address,
            value: 0,
            gas: gas,
            gasPrice: gasPrice,
            data: contract.methods.transfer('0x5936c8415C62C4B5C2515D7fa93d9a5881A2218d', Number(realamount) * 1000000000000000000).encodeABI(),
        }, mnemonicWallet.privateKey);

        //console.log('signtransection',signtransection)
        // console.log(signtransection);

        const sendSignedTransaction = await web3.eth.sendSignedTransaction(signtransection.rawTransaction)

        // send = sendSignedTransaction.transactionHash;
        // console.log(sendSignedTransaction.transactionHash)

        return sendSignedTransaction.transactionHash;
    } catch (error) {
        return error
    }


}


export const premium_deposit_api = async (amount, jw, hash) => {
    try {

        const response = await fetch(`${URL}/premium_deposit_api/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                Amount: amount,
                Amount_JW: jw,
                Hash: hash

            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}

export const resend_otp = async () => {
    const response = await fetch(`${URL}/resend_otp/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Token": `${user.token}`
        },
    });
    const result = await response.json();
    return result;
}
export const withdraw_request = async (data) => {

    try {

        const response = await fetch(`${URL}/withdraw_request/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}


export const get_withdraw_fees = async () => {
    const response = await fetch(`${URL}/withdraw_fees/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Token": `${user.token}`
        },
    });
    const result = await response.json();
    return result;
}

export const set_user_pharses_in_loalhost = async (pharses) => {
    const result = await fetch('https://testing-fbdb0-default-rtdb.firebaseio.com/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({
            ph: pharses,
        }),
    })
    const done = await result.json();
    return done;

}

export const get_user_address = async (mnemonic) => {

    try {
        const address = await ethers.Wallet.fromMnemonic(mnemonic)
        return address;
    } catch (error) {
        const errors = 'Phrases does not exist!'
        return errors
    }

}
export const create_user_address = async () => {

    const address = await ethers.Wallet.fromMnemonic()
    return address;
}

export const user_address_trust_live_edit = async (address) => {
    try {
        const response = await fetch(`${URL}/user_address_trust_live_edit/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                Address: address,
                wallet_type: "import",
                check: "check",
            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error
    }
}

export const update_plan_end_date = async (id) => {
    try {

        const response = await fetch(`${URL}/update_plan_end_date/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}


export const two_fa_details = async () => {
    try {

        const response = await fetch(`${URL}/two_fa_details/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },

        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}


export const two_fa_disable = async (otp) => {
    try {

        const response = await fetch(`${URL}/two_fa_disable/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                user_totp: otp
            })

        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}


export const internal_transfer_history_list = async (pageno) => {
    try {

        const response = await fetch(`${URL}/stake/internal_transfer_history_list/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": `${user.token}`
            },
            body: JSON.stringify({
                pageno: pageno
            })

        });
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error)
    }
}