import React from 'react'
import Footer from "../components/Sections/Footer"
import styled from "styled-components";
import GenNavbar from '../components/Nav/GenNavbar';

const NotFound = () => {
  return (
    <>
        <GenNavbar/>
        <Wrapper>
            <Text>404 - Page Not Found</Text>
        </Wrapper>
        <Footer/>
    </>
  )
}
const Wrapper = styled.section`
    width: 100%;
    min-height: 85vh;
    @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Text = styled.section`
    padding-top: 40vh;
    width: fit-content;
    margin: auto;
    font-size: 32px;
`
export default NotFound;