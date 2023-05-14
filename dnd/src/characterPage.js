import { Component, ReactComponentElement } from "react";
import React from "react";
import CharacterInfo from "./MainCharacterSheet/characterInfo.tsx";
import CharacterSheet from "./MainCharacterSheet/characterSheet.tsx";

const CharacterPage = () => {
    // const abilityBoxObj = {str: 10, dex: 12, const: 14, int: 17, wis: 8, cha: 16};
    // localStorage.setItem("abilityBoxInfo", JSON.stringify(abilityBoxObj));

    // if(localStorage.getItem("abilityBoxInfo")) {
    //     const abilityBoxObj = {str: 10, dex: 12, const: 14, int: 17, wis: 8, cha: 16};
    //     localStorage.setItem("abilityBoxInfo", JSON.stringify(abilityBoxObj));
    // }

    const character = JSON.parse(localStorage.getItem("characterInfo"));
    const abilityBoxInfo = JSON.parse(localStorage.getItem("abilityBoxInfo"));
    const skillsBoxInfo = JSON.parse(localStorage.getItem("skillsBoxInfo"));
    const savingThrowsBoxInfo = JSON.parse(localStorage.getItem("savingThrowsBoxInfo"));
    const profAndLangBoxInfo = JSON.parse(localStorage.getItem("profAndLangBoxInfo"));
    const additionalInfoBoxInfo = JSON.parse(localStorage.getItem("additionalInfoBoxInfo"));
    const healthBoxInfo = JSON.parse(localStorage.getItem("healthBoxInfo"));

    //console.log('first char', character);
 
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