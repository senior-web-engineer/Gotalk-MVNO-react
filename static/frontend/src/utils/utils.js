export function beautifyPhoneNumber(phone) {
    if(phone?.length === 11) {
        return `+${phone.substr(0, 1)} ${phone.substr(1, 3)} ${phone.substr(4, 3)}-${phone.substr(7, 2)}-${phone.substr(9, 2)}`
    }
    else if(phone?.length === 12) {
        return `+${phone.substr(0, 2)} ${phone.substr(2, 3)} ${phone.substr(5, 3)}-${phone.substr(8, 2)}-${phone.substr(10, 2)}`
    }
    else if(phone?.length >= 13) {
        return `+${phone.substr(0, 3)} ${phone.substr(3, 3)} ${phone.substr(6, 3)}-${phone.substr(9, 2)}-${phone.substr(11, 2)}`
    }
    return phone;
}
