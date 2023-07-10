import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Input/Textbox";
import { RegisterUserDTO } from "../DTOs/RegisterUserDTO";
import "./styles/Login.css";
import CustomLink from "../components/Navbar/CustomLink";

const Registration = () => {
  const [user, setUser] = useState({
    callbackUrl: `${window.location.origin}/auth/confirm-email`,
  } as RegisterUserDTO);
  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleLoginonSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // registration(user).then(() => {
    //   navigate(`/auth/confirmation-email-sent/${user.email}`);
    // });
  };

  const handleReturnToLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <form className="login-form">
      <fieldset className="login-fieldset">
        <Textbox
          name="email"
          handleChange={handleUserChange}
          label="E-mail"
          value={user.email}
        />
        <Textbox
          name="password"
          handleChange={handleUserChange}
          label="Парола"
          value={user.password}
        />
        <button className="button" name="Login" onClick={handleLoginonSubmit}>
          Влез
        </button>
        <CustomLink to={"/Registration"} className="link-button">
          Регистрация
        </CustomLink>
      </fieldset>
    </form>
  );
};

export default Registration;
