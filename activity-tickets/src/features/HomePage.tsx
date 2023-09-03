import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import beachEvent from "../imgs/beachEvent.jpg";
import conference from "../imgs/conference.jpg";
import event1 from "../imgs/event1.jpg";
import outdoorEvent from "../imgs/outdoorEvent.jpg";
import indoorEvent from "../imgs/indoorEvent.jpg";
import logo from "../imgs/Logo.png";
import CustomLink from "../components/CustomLink";

const Container = styled.div`
  font-family: "Courier New", Courier, monospace, sans-serif;
  color: #333;
  background-color: var(--butter);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100rem;
  padding: 1rem;
  width: 100rem;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  background-color: var(--light-purple);
  padding: 1rem;
  width: 100%;
  box-shadow: 0 0 5px 1px #aaaaaa;
`;

const Title = styled.h1`
  color: var(--butter);
  font-weight: bold;
`;

const MainContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const CommonEvents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 1rem;
  background-color: var(--mint);
  padding: 1rem;
  border-radius: 10px;
`;

const OtherContent = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const ImageSlider = styled(Slider)`
  display: inline-flex;
  width: 90rem;
  height: 25rem;
  margin: 1rem;
  justify-content: center;
  align-items: center;
  .slick-slide {
    justify-content: center;
    align-items: center;
    width: 10rem;
    padding: 0 1rem;
  }
`;

const EventImage = styled.img`
  width: 25rem;
  height: 18rem;
  border-radius: 8px;
`;
const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;
const DetailsText = styled(CustomLink)`
  color: #222121;
  text-decoration: none;
  margin: 1rem;
  font-size: 1.3rem;
`;
const Styledh2 = styled.h2`
  align-items: center;
  font-weight: bold;
`;
const HomePage: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  return (
    <Container>
      <Header>
        <Title>Еvent Organizer</Title>
        <Styledh2>Вашият помощник в организирането на събития</Styledh2>
      </Header>
      <MainContent>
        <CommonEvents>
          <Styledh2>Предостоящи събития</Styledh2>
          <ImageSlider {...sliderSettings}>
            <div style={{ display: "inline-block" }}>
              <EventImage src={beachEvent} alt="Beach Events" />
              <DetailsText to={`/events/1`} className="details">
                Повече информация...
              </DetailsText>
            </div>
            <div>
              <EventImage src={outdoorEvent} alt="Outdoor Events" />
              <DetailsText to={`/events/2`} className="details">
                Повече информация...
              </DetailsText>
            </div>
            <div>
              <EventImage src={event1} alt="Events" />
              <DetailsText to={`/events/3`} className="details">
                Повече информация...
              </DetailsText>
            </div>
            <div>
              <EventImage src={indoorEvent} alt="Indoor Events" />
              <DetailsText to={`/events/4`} className="details">
                Повече информация...
              </DetailsText>
            </div>
            <div>
              <EventImage src={conference} alt="Conference" />
              <DetailsText to={`/events/5`} className="details">
                Повече информация...
              </DetailsText>
            </div>
          </ImageSlider>
        </CommonEvents>
        <OtherContent>
          <Header>
            <h2>Открийте вашетео събитие за 2023</h2>
            <p>
              Разгледайте голям набор от събития подходящи за всеки интерес.
            </p>
          </Header>
          <ImagesContainer>
            <img
              src={beachEvent}
              style={{
                margin: "1rem",
                height: "35rem",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "4rem",
              }}
            ></img>
            <img src={logo} style={{ margin: "1rem" }}></img>
          </ImagesContainer>
        </OtherContent>
      </MainContent>
    </Container>
  );
};

export default HomePage;
