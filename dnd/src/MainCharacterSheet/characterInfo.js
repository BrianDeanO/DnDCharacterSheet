import { Component, ReactComponentElement } from "react";
import React from "react";

const CharacterInfo = () => {
    let characterName = "Balto Butterdream";
    let characterRace = "Harengon";
    let characterClass = "Paladin";
    let characterLevel = 1;
    let characterXP = 0;
    let edit = true;
 
    return (
        <div className="Header">
            <div className="Character-Info">
                <svg className="Player-ImageSVG">
                    <circle className="Image-Circle" 
                            cx="50" 
                            cy="50" 
                            r="50" 
                            fill="#222" 
                            stroke="gold"
                            strokeWidth={3}
                            strokeOpacity={"50%"} 
                    /> 
                    <image className="Player-Image" href="HotMobbinLogo.png"  x="14px" y="6px"/>
                </svg>

                <div className="Character-Info-Box">     
                    <div className="Character-Name-Lvl">     
                        <h1 className="Character-Name-Text"> {characterName} </h1>
                        <h2 className="Character-Level-Title"> Lvl. </h2>
                        <h2 className="Character-Level"> {characterLevel} </h2>               
                    </div>

                    <div className="Character-Race-Class">
                        <h2 className="Character-Race"> {characterRace} </h2> 
                        <h2 className="Character-Class"> {characterClass} </h2>
                    </div>

                    <div className="Character-XP">
                        <h2 className="Character-XP-Title" style={{fontWeight:"bold"}}> XP -  </h2> 
                        <h2 className="Character-XP"> {characterXP} </h2>
                    </div>
                </div>
            </div>

            <Spacer />

            <div className="Header-Buttons">
                <div className="Save-And-Load">
                    <button className="Save-Button"> Save </button>
                    <button className="Load-Button"> Load </button>
                </div>

                <div className="Short-Long-Rests">
                    <button className="Short-Rest"> Short Rest </button>
                    <button className="Long-Rest"> Long Rest </button>
                </div>
            </div>
        </div>
        
    )
}

const Spacer = () => <div className="Spacer"/>;

export default CharacterInfo;
