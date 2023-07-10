import React, { useState, ChangeEvent, FormEvent } from "react";
import Textbox from "../components/Input/Textbox";
import "./styles/Register.css";
import FormInput from "../components/Input/FormInput";
interface RegisterPageState {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const [values, setValues] = useState<RegisterPageState>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const inputs = [
    {
      id: "1",
      name: "name",
      type: "text",
      placeholder: "Име",
      errorMessage: "Моля въведете вашето име!",
      label: "Име",
      pattern: "^[A-Za-zА-Яа-я]{2,20}$",
      required: true,
    },
    {
      id: "2",
      name: "lastname",
      type: "text",
      placeholder: "Фамилия",
      errorMessage: "Моля въведете фамилия!",
      label: "Фамилия",
      pattern: "^[A-Za-zА-Яа-я]{2,20}$",
      required: true,
    },
    {
      id: "3",
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Това не е валиден имейл!",
      label: "Email",
      pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$",
      required: true,
    },
    {
      id: "4",
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Паролатга трябва да е от 8-20 ссимвола, да съдържа поне една цифра, една главна, една малка буква и специален символ",
      label: "Парола",
      pattern:
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
    },
    {
      id: "5",
      name: "confirmPassword",
      type: "password",
      placeholder: "Потвърди парола",
      errorMessage: "Паролите не съвпадат",
      label: "Потвърди парола",
      pattern: values.password,
      required: true,
    },
  ];

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="header-register">Регистрация</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof RegisterPageState]}
            onChange={handleChange}
          />
        ))}

        <button className="button-register">Регистрация</button>
      </form>
    </div>
  );
}

export default RegisterPage;
