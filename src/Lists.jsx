import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Lists.css';
import { extractOrderId, getCardField, extractValues, makeLabelRequest, getCards } from './utils/shippingUtils';
import Loading from './Loading';


const Lists = () => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchLists = async () => {
        try {
            const BOARD_ID = "1cjxI7RO";
            const API_KEY = "5f4f4968dba4cf7b4d97efa7bb0d777d";
            const API_TOKEN = "ATTA5d3cf6a3576b9ac6d6e8f1f8d5c9de5bb21572c07b0897825a6844b1452b66ff77CA69C3";
            const url = `https://api.trello.com/1/boards/${BOARD_ID}/lists?key=${API_KEY}&token=${API_TOKEN}`;
            const response = await axios.get(url);
            setLists(response.data);
        } catch (error) {
            console.error('Failed to fetch lists:', error);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    const handleShip = async (listId, listTitle) => {
        setIsLoading(true);
        setIsSuccessful(false); // Reset the success state on a new request
        setIsError(false); // Reset the error state on a new request
        try {
            const cards = await getCards(listId);
            //if cards is empty
            if (cards.length === 0) {
                throw new Error('No cards in this list');
            }
            let allCardsProcessedSuccessfully = true; // Flag for tracking success for all cards

            for (const card of cards) {
                let orderObject; // Declare orderObject here

                try {
                    // Retrieve card fields: title and description
                    const title = await getCardField(card.id, 'name');
                    const desc = await getCardField(card.id, 'desc');
                    console.log(`Card: ${title}`);

                    // Extract dimensions and order ID from the card description
                    const { length, width, height, weight } = extractValues(listTitle);
                    const dimensions = { length, width, height, weight };
                    const orderId = extractOrderId(desc);
                    console.log(`orderId: ${orderId}`);
                    console.log("Dimensions:", length, width, height, weight);

                    // Search for the order in the database using the extracted order ID
                    try {
                        orderObject = await axios.get(`http://104.197.253.79:8000/api/orders/${orderId}`).then(res => res.data);
                        console.log("Order object:", orderObject);
                    } catch (error) {
                        console.error('Error fetching order:', error);
                        // Handle the error appropriately
                    }
                    const itemDetails = orderObject['itemDetails'];
                    console.log("Item details:", itemDetails);

                    // Make a label request with the order ID, card ID, item details, and dimensions
                    const reqResponse = await makeLabelRequest(orderId, card.id, itemDetails, dimensions);
                    console.log(reqResponse);
                    // Separator for clarity in logs
                    console.log("\n-------------------\n");

                } catch (err) {
                    allCardsProcessedSuccessfully = false; // Update flag if any card fails

                    setIsError(true);
                    setTimeout(() => {
                        setIsLoading(false); // Stop the loading
                        setIsError(false); // Optionally hide the error message
                    }, 3000);
                }
                finally {
                    console.log("Finally");
                }
            }
            if (allCardsProcessedSuccessfully === true) {
                setIsLoading(false); // Stop the loading
                setIsSuccessful(true); // Show the success message  
            }
        } catch (error) {
            //show error message
            setIsError(true);
            setTimeout(() => {
                setIsLoading(false); // Stop the loading
                setIsError(false); // Optionally hide the error message
            }, 3000);
            console.error('Error processing shipping:', error);
        }
    };

    return (
        <div className="lists-container">
            {isLoading && <Loading isSuccess={isSuccessful} isError={isError} />}
            <header className="app-header">
                <h1 className='SHIPTITLE'>Shipping Dispatcher</h1>
                <button onClick={fetchLists} className="refresh-button">
                    <svg fill="#ffffff" height="30px" width="30px" viewBox="0 0 489.70 489.70" stroke="#ffffff" strokeWidth="6.855772">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path d="M468.999,227.774c-11.4,0-20.8,8.3-20.8,19.8c-1,74.9-44.2,142.6-110.3,178.9c-99.6,54.7-216,5.6-260.6-61l62.9,13.1 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-123.7-26c-7.2-1.7-26.1,3.5-23.9,22.9l15.6,124.8 c1,10.4,9.4,17.7,19.8,17.7c15.5,0,21.8-11.4,20.8-22.9l-7.3-60.9c101.1,121.3,229.4,104.4,306.8,69.3 c80.1-42.7,131.1-124.8,132.1-215.4C488.799,237.174,480.399,227.774,468.999,227.774z" />
                                    <path d="M20.599,261.874c11.4,0,20.8-8.3,20.8-19.8c1-74.9,44.2-142.6,110.3-178.9c99.6-54.7,216-5.6,260.6,61l-62.9-13.1 c-10.4-2.1-21.8,4.2-23.9,15.6c-2.1,10.4,4.2,21.8,15.6,23.9l123.8,26c7.2,1.7,26.1-3.5,23.9-22.9l-15.6-124.8 c-1-10.4-9.4-17.7-19.8-17.7c-15.5,0-21.8,11.4-20.8,22.9l7.2,60.9c-101.1-121.2-229.4-104.4-306.8-69.2 c-80.1,42.6-131.1,124.8-132.2,215.3C0.799,252.574,9.199,261.874,20.599,261.874z" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </header>
            {lists.map((list, index) => (
                <div className="list-card" key={index}>
                    <h3 className="list-title">{list.name}</h3>
                    <button onClick={() => handleShip(list.id, list.name)} className="ship-button">SHIP</button>
                </div>
            ))}
        </div>
    );
};

export default Lists;
