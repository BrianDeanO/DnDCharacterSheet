import { Component, ReactComponentElement } from "react";
import React from "react";
import CharacterInfo from "./MainCharacterSheet/characterInfo.tsx";
import CharacterSheet from "./MainCharacterSheet/characterSheet.tsx";

export const backgroundColor = 'rgb(235, 225, 225)';

const CharacterPage = () => {

    const character = JSON.parse(localStorage.getItem("characterInfo"));
    const abilityBoxInfo = JSON.parse(localStorage.getItem("abilityBoxInfo"));
    const skillsBoxInfo = JSON.parse(localStorage.getItem("skillsBoxInfo"));
    const savingThrowsBoxInfo = JSON.parse(localStorage.getItem("savingThrowsBoxInfo"));
    const profAndLangBoxInfo = JSON.parse(localStorage.getItem("profAndLangBoxInfo"));
    const additionalInfoBoxInfo = JSON.parse(localStorage.getItem("additionalInfoBoxInfo"));
    const healthBoxInfo = JSON.parse(localStorage.getItem("healthBoxInfo"));
 
    return (
        <div className="MainPage">
            <CharacterInfo character={character}/>
            <CharacterSheet 
                abilityBoxInfo={abilityBoxInfo}
                skillsBoxInfo={skillsBoxInfo}
                savingThrowsBoxInfo={savingThrowsBoxInfo}
                profAndLangBoxInfo={profAndLangBoxInfo}
                additionalInfoBoxInfo={additionalInfoBoxInfo}
                healthBoxInfo={healthBoxInfo}
            />
        </div>

    );
}

export default CharacterPage;