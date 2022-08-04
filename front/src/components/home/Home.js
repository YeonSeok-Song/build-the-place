import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Edit } from '../../pages/Home/Edit';
import { Join } from '../../pages/Home/Join';

const Home = () => {

    // 입장, 만들기
    
    return (
        <div>
            <Edit />
            <Join />
        </div>
    );
}

export default Home;