import React, { useState, useEffect } from 'react';
import {kw_data} from "../../data/kw_data";

import './CategoryPage.css'
const CategoryPage = () => {

    const [kw_data, setKwData] = useState([])

    const fetchData = async () => {
        // profiles
        fetch('http://localhost:5000/api/v1/json/keywords')
            .then(res => res.json())
            .then(data => {
                setKwData(data.kw_data)
            })
    }

    useEffect(() => {
        fetchData()
    }, []);

    const getIconByCategory = (cat) => {
        switch (cat) {
            case 'Apparel Accessories' : return 'apparel.png'
            case 'Automotive' : return 'automotive.png'
            case 'Baby Children\'s Products' : return 'baby.png'
            case 'Consumer Electronics' : return 'electronics.png'
            case 'Financial Services' : return 'money.png'
            case 'Health Wellness' : return 'health.png'
            case 'Home Garden' : return 'home.png'
            case 'Real Estate' : return 'realestate.png'
            case 'Software Apps' : return 'software.png'
            case 'Sports Fitness' : return 'fitness.png'
            case 'Travel' : return 'travel.png'
        }
    }

    return (
        <div id="cat_page">
            <div className="cat_header">
                <h2>Keywords Analysis</h2>
            </div>
            <div className="cat_body">
                <div className="cat_container">
                    {
                        kw_data.map(cat => (
                            <div className="cat_box">
                                <img style={{width : '35px', height : '35px'}}
                                     src={'icons/' + getIconByCategory(cat.category)} alt='logo'>
                                </img>
                                <h4>{cat.category}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
