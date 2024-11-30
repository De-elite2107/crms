import React, { useState } from 'react'
import GenNavbar from '../components/Nav/GenNavbar';
import Footer from "../components/Sections/Footer"
import styled from 'styled-components';
import Courses from '../components/dashboard/Courses';
import Assignment from '../components/dashboard/Assignment';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
  return (
    <>
        <GenNavbar dash/>
        <Wrapper id="home" className="p-0 container lightBg">
            <Box className='flex'>
                <Box className='w-1/4 darkBg text-white leading-10 font48 flex-row mb-5 text-center'>
                    <button 
                        onClick={() => handleTabClick('tab1')} 
                        className={`block text-center w-full text-left p-2 ${activeTab === 'tab1' ? 'purpleBg text-white' : ''}`}
                    >
                        Courses
                    </button>
                    {/* <button 
                        onClick={() => handleTabClick('tab2')} 
                        className={`block text-center w-full text-left p-2 ${activeTab === 'tab2' ? 'purpleBg text-white' : ''}`}
                    >
                        Resources
                    </button> */}
                    <button 
                        onClick={() => handleTabClick('tab3')} 
                        className={`block text-center w-full text-left p-2 ${activeTab === 'tab3' ? 'purpleBg text-white' : ''}`}
                    >
                        Assignments
                    </button>
                    </Box>
                    <Box className="w-3/4 p-4">
                        {activeTab === 'tab1' && <Courses/>}
                        {/* {activeTab === 'tab2' && <div>Content for Tab 2</div>} */}
                        {activeTab === 'tab3' && <Assignment/>}
                    </Box>
                </Box>
        </Wrapper>
        <Footer/>
    </>
  )
}
const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 100vh;
  padding-left: 0px;
`;
const Box = styled.div`
  min-height: 100vh;
`;
export default Dashboard;