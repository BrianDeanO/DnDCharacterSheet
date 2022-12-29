import { Component, ReactComponentElement } from "react";
import React from "react";
import CharacterInfo from "./MainCharacterSheet/characterInfo";
import CharacterSheet from "./MainCharacterSheet/characterSheet.tsx";

const CharacterPage = () => {

    return (
        <div className="MainPage">
            <CharacterInfo />
            <CharacterSheet />
        </div>

    );
}

export default CharacterPage;