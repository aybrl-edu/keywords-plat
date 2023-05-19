import React, { useState, useEffect } from 'react';
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import './CategoryPage.css'
const CategoryPage = () => {

    const [kw_data, setKwData] = useState([])
    const [category, setCategory] = useState({keywords : []})

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

    const handleCatClick = (cat) => {
        setCategory(cat)
    }

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
                <div className="left_side">
                    <div className="cat_container">
                        {
                            kw_data.map(cat => (
                                <div className="cat_box" onClick={() => handleCatClick(cat)}>
                                    <img style={{width : '35px', height : '35px'}}
                                         src={'icons/' + getIconByCategory(cat.category)} alt='logo'>
                                    </img>
                                    <h4>{cat.category}</h4>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="right_side">
                    <div className="cat_table">
                        <table id="kw_table">
                            <thead>
                                <tr>
                                    <th>Keyword</th>
                                    <th>Confidence</th>
                                    <th>Relevance</th>
                                    <th>Search Volume</th>
                                    <th>Headiness</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.keywords.map(keyword => (
                                        <tr>
                                            <td>{keyword.kw}</td>
                                            <td>{keyword.con}</td>
                                            <td>{keyword.c}</td>
                                            <td>{keyword.n}</td>
                                            <td>{keyword.headiness}</td>
                                            <td>
                                                <div style={{ width: 50, height: 50}}>
                                                    <CircularProgressbar
                                                        value={keyword.c} maxValue={1}
                                                        text={`${(keyword.c * 100).toFixed(2)}%`}
                                                        styles={buildStyles({
                                                            textColor: "darkblue",
                                                            pathColor: "green",
                                                            trailColor: "gray"
                                                        })}
                                                    />;
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
