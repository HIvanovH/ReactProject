import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../constants/url.constants";
import FormInput from "../components/Input/FormInput";
import { useCookies } from "react-cookie";
import view from "../imgs/view.png";
import hide from "../imgs/hide.png";
import { styled } from "styled-components";
import CustomLink from "../components/CustomLink";
import ReCAPTCHA from "react-google-recaptcha";

const LoginContainer = styled.form`
  padding: 20px;
  margin: 5em auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--mint);
  padding: 20px 45px 25px;
  box-shadow: 0 0 5px 1px #aaaaaa;
  margin-top: 2em;
  justify-content: center;
  text-shadow: 1px 1px rgb(85, 85, 85);
`;

const LoginFieldset = styled.fieldset`
  padding: 0.4em;
  margin: 0 auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 440px;
  height: 50%;
  padding: 10px;
  border: none;
  background-color: var(--light-purple);
  border-radius: 10px;
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
  margin: 20px 0px 5px 5px;
  box-shadow: 0 8px 16px 0 rgba(141, 141, 141, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: var(--butter);
`;
const PassworndContainer = styled.div`
  display: block;
`;
const ShowHideButton = styled.button<{ showPassword: boolean }>`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  top: -3rem;
  left: 25rem;
  border: none;
  background-color: var(--light-purple);
  border-radius: 10px;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 8px 16px 0 rgba(141, 141, 141, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: var(--butter);
  background-image: url(${view});
  background-repeat: no-repeat;
  background-size: cover;
  ${({ showPassword }) =>
    showPassword &&
    `
    background-image: url(${hide});
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const Login = () => {
  const [user, setUser] = useState<{
    email: string;
    password: string;
    recaptchaResponse: string | null;
  }>({
    email: "",
    password: "",
    recaptchaResponse: null,
  });
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);
  const [showPassword, setShowPassword] = useState(false);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "recaptchaResponse") {
      setUser((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleLoginonSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user.recaptchaResponse) {
      alert("Please complete the reCAPTCHA challenge.");
      return;
    }

    try {
      const response = await axios.post(loginUrl, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data.token;

      setCookie("token", token, {
        domain: "localhost",
        path: "/",
      });

      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <LoginContainer>
      <LoginFieldset>
        <FormInput
          name="email"
          onChange={handleUserChange}
          label="E-mail"
          value={user.email}
        />
        <PassworndContainer>
          <FormInput
            name="password"
            onChange={handleUserChange}
            label="Парола"
            value={user.password}
            type={showPassword ? "text" : "password"}
          >
            <ShowHideButton
              type="button"
              onClick={togglePasswordVisibility}
              showPassword={showPassword}
            ></ShowHideButton>
          </FormInput>
        </PassworndContainer>
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={(value) =>
            setUser((prevState) => ({ ...prevState, recaptchaResponse: value }))
          }
        />
        <Button type="button" name="Login" onClick={handleLoginonSubmit}>
          Влез
        </Button>
        <CustomLink to={"/Registration"} className="link-button">
          Регистрация
        </CustomLink>
      </LoginFieldset>
    </LoginContainer>
  );
};

export default Login;
