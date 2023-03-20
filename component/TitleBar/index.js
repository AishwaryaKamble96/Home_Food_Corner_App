import styled from "styled-components";

export default function TitleBar() {
  return <Heading>Home Food Corner</Heading>;
}

const Heading = styled.h1`
  color: red;
  display: flex;

  background-color: whitesmoke;
  justify-content: center;
  margin: 10px;
  padding: 20px;
  border-bottom: solid black;
`;
