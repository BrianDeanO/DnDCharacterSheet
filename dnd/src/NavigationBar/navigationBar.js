import { Component, ReactComponentElement } from "react";
import React from "react";

const NavigationBar = () => {
    let characterName = "Balto Butterdream";
    let characterRace = "Harengon";
    let characterClass = "Paladin";
    let characterLevel = 1;
    let characterXP = 0;
    let edit = true;
 
    return (
        <div className="NavBar">
            <div className="NavigationButtonMenu">
                <h1 className="Title_Text">
                    D&D Character Sheet
                </h1>
                <button className="Short-Rest"> Short Rest </button>
                <button className="Long-Rest"> Long Rest </button>
            </div>
        </div>
    )
}

export default NavigationBar;