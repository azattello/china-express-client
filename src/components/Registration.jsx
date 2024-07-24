import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/home.css';
import phonePNG from '../assets/img/phone.png';
import passwdPNG from '../assets/img/passwd.png';
import namePNG from '../assets/img/name.png';
import { registration } from "../action/user";
import { useDispatch } from 'react-redux';

const Registration = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Проверка, что все поля заполнены и чекбокс установлен
        if (name && surname && phone && password && isChecked) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [name, surname, phone, password, isChecked]);

    const handleRegistration = async () => {
        if (!isFormValid) return; // Если форма невалидна, выходим из функции
        const registrationSuccess = await dispatch(registration(name, surname, phone, password));
        if (registrationSuccess) {
            navigate("/main");
        }
    };

    return (
        <div className="auth">
            <div className="form">
                <h1 className="h1-auth">Регистрация</h1>
                <div className="input__div">
                    <img src={namePNG} alt="person" className="phonePNG" />
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="input" placeholder="ФИО" />
                </div>
                <div className="input__div">
                    <img src={namePNG} alt="person" className="phonePNG" />
                    <input value={surname} onChange={(event) => setSurname(event.target.value)} type="text" className="input" placeholder="Личный код" />
                </div>
                <div className="input__div">
                    <img src={phonePNG} alt="Phone" className="phonePNG" />
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} type="number" className="input" placeholder="8............" />
                </div>
                <div className="input__div">
                    <img src={passwdPNG} alt="Password" className="phonePNG" />
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="input" placeholder="Придумайте пароль" />
                </div>
                <div className="checkbox__div">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(event) => setIsChecked(event.target.checked)}
                    />
                    <span className="checkbox__text">
                        Согласен на обработку персональных данных и с <a href="../assets/doc.pdf" target="_blank" className="terms-link">условиями</a>
                    </span>
                </div>
                <button
                    className="buttonLogin"
                    onClick={handleRegistration}
                    disabled={!isFormValid}
                    style={{ backgroundColor: isFormValid ? '#5572f3' : 'grey' }}
                >
                    Зарегистрироваться
                </button>
                <Link to="/login" className="link__auth">Войти</Link>
            </div>
        </div>
    );
};

export default Registration;
