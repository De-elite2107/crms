import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import axios from "axios";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import AuthModal from "../modal";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useToast } from "../ToastContext";


export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const user = useStoreState((state) => state.user);
  const clearUser = useStoreActions((actions) => actions.clearUser);
  const notify = useToast();

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  const LogOut = async () => {
    const url = `${process.env.REACT_APP_API_URL}/logout/`;
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error('No token found in local storage.');
        notify("You are not logged in.", 'error');
        return;
    }

    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
        });

        // Handle success
        console.log(response.data); // The response data from the server
        notify(response.data.message, 'success');

        // Clear user state and local storage
        clearUser(); // Ensure this function clears any user-related state
        localStorage.clear();
        
    } catch (error) {
        console.error('Error:', error);
        
        // Handle error response from server
        if (error.response) {
            // Server responded with a status other than 200 range
            notify(error.response.data.error || error.response.statusText, 'error');
        } else if (error.request) {
            // Request was made but no response received
            notify("Server down", 'error');
        } else {
            // Something happened in setting up the request that triggered an Error
            notify("Error: " + error.message, 'error');
        }
    }
};

  return (
    <>
      <AuthModal login={isLogin} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              CRMS
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="projects" spy={true} smooth={true} offset={-80}>
                Projects
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="blog" spy={true} smooth={true} offset={-80}>
                Blog
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                Pricing
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </Link>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
          {user.user_id ? (
            <>
              <li className="semiBold font15 pointer">
                <a href="/dashboard" style={{ padding: "10px 30px 10px 0" }}>
                  Dashboard
                </a>
              </li>
              <li className="semiBold font15 pointer flexCenter">
                <button onClick={LogOut} className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="semiBold font15 pointer">
                <button onClick={() => {setIsLogin(true); setModalOpen(true);}} style={{ padding: "10px 30px 10px 0" }}>
                  Log in
                </button>
              </li>
              <li className="semiBold font15 pointer flexCenter">
                <button onClick={() => {setIsLogin(false); setModalOpen(true);}} className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                  Get Started
                </button>
              </li>
            </>
          )}
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


