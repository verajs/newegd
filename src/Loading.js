import Completion from './Completion';
import './Loading.css';
import React, { useState, useEffect } from 'react';


const Loading = ({ isSuccess, isError }) => {

    return (

        <div class="loading-overlay">
            <div className={`loading-card ${isSuccess ? 'small-card' : ''}`}>

                {isSuccess ? (<Completion />) : isError ? (<p>Something went wrong. Please try again.</p>) : (
                    <>
                        <div class="spinner-box">
                            <div class="blue-orbit leo">
                            </div>

                            <div class="green-orbit leo">
                            </div>

                            <div class="red-orbit leo">
                            </div>

                            <div class="white-orbit w1 leo">
                            </div><div class="white-orbit w2 leo">
                            </div><div class="white-orbit w3 leo">
                            </div>
                        </div>

                        <p>Shipping cards...</p>
                    </>
                )}
            </div>
        </div>

    );
}


export default Loading;