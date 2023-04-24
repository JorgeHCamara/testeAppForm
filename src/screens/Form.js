import { Text, View, Switch } from 'react-native';
import { useState, useCallback } from 'react';
import { StylesForm } from './css';
import { ModalError } from '../components/Modal';
import { TextCustom, TextPhone } from '../components/TextInput';
import { hasLegalAge, hasName, hasEmail, hasPhone, hasRg, hasCpf, hasPassport } from '../context/validForm'
import { ButtonNext } from '../components/Button';
import { DatePickerCustom } from '../components/DatePicker';

export const ContactForm = () => {
    const [step, setStep] = useState(1);
    const setNome = (value) => {
        var clone = Object.assign({}, contactForm);
        clone.name = value
        SetContactForm(clone)
    }
    const setEmail = (value) => {
        var clone = Object.assign({}, contactForm);
        clone.email = value
        SetContactForm(clone)
    }
    const setAge = (value) => {
        var clone = Object.assign({}, contactForm);
        clone.age = value
        SetContactForm(clone)
    }
    const setPhone = (value) => {
        var clone = Object.assign({}, contactForm);
        clone.phone = value
        SetContactForm(clone)
    }
    const setRg = (value) => {
        var clone = Object.assign({}, contactForm);
        clone.rg = value
        SetContactForm(clone)
    }
    const setCpf = (value) => {
        var clone = Object.assign({}, contactForm);
        clone.cpf = value
        SetContactForm(clone)
    }
    const setPassport = (value) => {
        var clone = Object.assign({}, contactForm);
        clone.passport = value
        SetContactForm(clone)
    }
    const setForeigner = useCallback((value) => {
        var clone = Object.assign({}, contactForm);
        clone.foreigner = value;
        SetContactForm(clone);
      }, [contactForm]);
    const [contactForm, SetContactForm] = useState({
        name: '',
        email: '',
        age: new Date(),
        phone: '',
        rg: '',
        cpf: '',
        passport: '',
        foreigner: false,
    })
    const [msgError, setMsgError] = useState('');
    const [buttonDisable, setButtonDisable] = useState(true);
    const itsFilled = () => {
        setButtonDisable((contactForm.name && contactForm.email && contactForm.age && contactForm.phone) ? false : true)
    }
    const validForm = () => {
        if (step === 1) {
            if (!hasName(contactForm.name)) {
                setMsgError('Preencha o nome corretamente');
                return false
            }
            if (!hasEmail(contactForm.email)) {
                setMsgError('Preencha o email corretamente');
                return false
            }
            if (!hasPhone(contactForm.phone)) {
                setMsgError('Preencha o telefone corretamente');
                return false
            }
            if (!hasLegalAge(contactForm.age)) {
                setMsgError('Você precisa ter entre 18 a 130 anos');
                return false
            }
    } else if (step === 2) {
        if (contactForm.foreigner) {
            if (!hasPassport(contactForm.passport)) {
              setMsgError('Preencha o passaporte corretamente');
              return false;
            }
          } else {
            if (!hasRg(contactForm.rg)) {
              setMsgError('Preencha o RG corretamente');
              return false;
            }
            if (!hasCpf(contactForm.cpf)) {
              setMsgError('Preencha o CPF corretamente');
              return false;
            }
          }
    }
        setMsgError('');
        setStep(2);
        return true;
    }
    return (
        <View style={StylesForm.container}>
          <View style={StylesForm.viewText}>
            <Text style={StylesForm.title}>{step === 1 ? 'Dados de contato' : 'Documentos'}</Text>
          </View>
          <ModalError setMsgError={setMsgError} msgError={msgError} />
          {step === 1 ? (
            <>
              <TextCustom
                onBlur={itsFilled}
                callBack={setNome}
                item={contactForm.name}
                maxLength={100}
                placeholder="Nome completo *"
              />
              <TextCustom
                onBlur={itsFilled}
                callBack={setEmail}
                item={contactForm.email}
                maxLength={100}
                placeholder="E-mail *"
                keyboardType="email-address"
              />
              <TextPhone
                onBlur={itsFilled}
                callBack={setPhone}
                item={contactForm.phone}
                maxLength={15}
                placeholder="Telefone *"
                keyboardType="phone-pad"
              />
              <DatePickerCustom
                placeholder="Data de nascimento *"
                setDate={setAge}
                date={contactForm.age}
              />
            </>
          ) : (
            <>
              <TextCustom
                onBlur={itsFilled}
                callBack={setRg}
                item={contactForm.rg}
                maxLength={9}
                placeholder={contactForm.foreigner ? "RG" : "RG *"}
              />
              <TextCustom
                onBlur={itsFilled}
                callBack={setCpf}
                item={contactForm.cpf}
                maxLength={11}
                placeholder={contactForm.foreigner ? "CPF" : "CPF *"}
              />
              <TextCustom
                onBlur={itsFilled}
                callBack={setPassport}
                item={contactForm.passport}
                maxLength={15}
                placeholder={contactForm.foreigner ? "Passaporte *" : "Passaporte"}
              />
              <View style={StylesForm.toggleContainer}>
                <Switch
                  value={contactForm.foreigner}
                  onValueChange={(value) => {
                    setForeigner(value);
                  }}
                />
                <Text style={StylesForm.toggleLabel}>Estrangeiro</Text>
              </View>
            </>
          )}
          <View style={StylesForm.viewText}>
            <Text style={StylesForm.label}>(*) Preencha todos os campos obrigatório</Text>
          </View>
          <ButtonNext onPress={validForm} title="Cadastrar" disabled={buttonDisable} />
        </View>
      );
    };