import styled from "styled-components";

const FooterContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-weight: bold;
  background-color: var(--mint);
  box-shadow: 0px 4px 2px gray;
`;

const FooterSocialMedia = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;

  a {
    text-decoration: none;
  }
`;

const FooterInfo = styled.section`
  display: flex;
  justify-content: center;
`;

const FooterInfoColumn = styled.section`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 30%;

  div {
    margin-bottom: 1rem;
  }

  text-align: center;
`;
const FooterC = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: var(--light-purple);
  width: 100%;
  color: var(--butter);
`;
const Footer = () => {
  return (
    <FooterContainer>
      <hr />

      <FooterInfo>
        <FooterInfoColumn>
          <div>За нас</div>
          <div>Общи условия</div>
          <div>Политика на поверителност</div>
        </FooterInfoColumn>
        <FooterInfoColumn>
          <div>events_organizer@gmail.com</div>
          <div>Често задавани въпроси</div>
          <div>Контакти</div>
        </FooterInfoColumn>
      </FooterInfo>
      <FooterSocialMedia>
        <FooterC>
          <p>&copy; 2023 EventOrganizer. All rights reserved.</p>
        </FooterC>
      </FooterSocialMedia>
      <hr />
    </FooterContainer>
  );
};

export default Footer;
