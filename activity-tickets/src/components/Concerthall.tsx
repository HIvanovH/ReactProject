// ConcertHall.tsx
import React, { useState } from "react";
import styled from "styled-components";

const ConcertHallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--mint);
  padding: 2em;
  margin-top: 2rem;
`;

const Scene = styled.div`
  width: 300px;
  height: 50px;
  background-color: var(--light-purple);
  border-radius: 25px 25px 0 0;
  margin-bottom: 20px;
  position: relative;
  &:after {
    content: "Сцена";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--butter);
  }
`;

const SeatsRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

const Seat = styled.button<{ reserved: boolean }>`
  width: 20px;
  height: 20px;
  margin: 0 3px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) =>
    props.reserved ? "light-red" : "var(--light-purple)"};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--butter);
  }

  &:focus {
    outline: none;
  }
`;

interface Props {
  reservedSeats: Array<boolean>;
  onSeatToggle: (index: number) => void;
}

const ConcertHall: React.FC<Props> = ({ reservedSeats, onSeatToggle }) => {
  const handleSeatClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    onSeatToggle(index);
  };
  return (
    <ConcertHallWrapper>
      <Scene />
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <SeatsRow key={rowIndex}>
          {Array.from({ length: 10 }).map((_, colIndex) => {
            const seatIndex = rowIndex * 10 + colIndex;
            return (
              <Seat
                key={seatIndex}
                reserved={reservedSeats[seatIndex]}
                onClick={(event) => handleSeatClick(event, seatIndex)}
              />
            );
          })}
        </SeatsRow>
      ))}
    </ConcertHallWrapper>
  );
};

export default ConcertHall;
