import { Component, ReactComponentElement } from "react";
import React from "react";
import CharacterInfo from "./MainCharacterSheet/characterInfo";
import NavigationBar from './NavigationBar/navigationBar';
import CharacterSheet from "./MainCharacterSheet/characterSheet.tsx";

const CharacterPage = () => {

    return (
        <div className="MainPage">
            {/* <NavigationBar /> */}
            <CharacterInfo />
            <CharacterSheet />
        </div>

    );
}

export default CharacterPage;