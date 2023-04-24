import { Alert } from 'react-native';

export const hasName = (nome) => {
    var regName = /^[A-Z][a-z].* [A-Z][a-z]+$/;
    return regName.test(nome)
}

export const hasEmail = (email) => {
    var regEmail = /\S+@\S+\.\S+/;
    return regEmail.test(email)
}

export const hasPhone = (phone) => {
    var regPhone = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
    return regPhone.test(phone)
}
export const hasLegalAge = (date) => {
    var year = calculaIdade_(date, new Date())
    if (year >= 18 && year <= 130) {
        return true
    }
    return false
}

export const hasRg = (rg) => {
    var regRG = /^(\d{2}\.\d{3}\.\d{3}-\d{1})|(\d{7}-\d{1})$/;
    return regRG.test(rg);
};

export const hasCpf = (cpf) => {
    var regCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regCPF.test(cpf);
};
  
export const hasPassport = (passport) => {
    var regPassport = /^[a-zA-Z0-9]{6,10}$/;
    return regPassport.test(passport);
};

function calculaIdade_(year, now) {
    return Math.floor(
        Math.ceil(Math.abs(year.getTime() - now.getTime()) / (1000 * 3600 * 24)) / 365.25);
}
