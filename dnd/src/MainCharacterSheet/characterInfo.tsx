import { useEffect, useState } from "react";
import React from "react";

const CharacterInfo = ({character}) => {
    let name = "Balto Butterdream";
    // let characterRace = "Harengon";
    // let characterClass = "Paladin";
    // let characterLevel = 1;
    // let characterXP = 0;

    //console.log("character", character);

    //const character = localStorage.getItem("characterInfo");
    // let parseChar;
    // if(character) {
    //     parseChar = JSON.parse(character);
    // }

    const [skillsIsEdit, setSkillsIsEdit] = useState<boolean>(false);
    const [characterName, setCharacterName] = useState<string>(character ? character.name : "Sir John Doe");
    const [characterRace, setCharacterRace] = useState<string>(character ? character.race : "Human");
    const [characterClass, setCharacterClass] = useState<string>(character ? character.cls : "Paladin");
    const [characterLevel, setCharacterLevel] = useState<number>(character ? character.lvl : 1);
    const [characterXP, setCharacterXP] = useState<number>(character ? character.xp : 0);

    if(!character) {
        localStorage.setItem("characterInfo", JSON.stringify({name: characterName, race: characterRace, cls: characterClass, lvl: characterLevel, xp: characterXP}));
    }

    function updateCharInfo(name: string, race: string, cls: string, lvl: number, xp: number) {
        setCharacterName(name);
        setCharacterRace(race);
        setCharacterClass(cls);
        setCharacterLevel(lvl);
        setCharacterXP(xp);
    }

    useEffect(() => {
        localStorage.setItem("characterInfo", JSON.stringify({name: characterName, race: characterRace, cls: characterClass, lvl: characterLevel, xp: characterXP}));
    }, [characterName, characterRace, characterClass, characterLevel, characterXP]);
    
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
                    {skillsIsEdit ? 
                    <> 
                        <input  className="Character-Name-Input" 
                                id="CharName" 
                                type='text' 
                                defaultValue={characterName}
                                placeholder="Name"></input>
                        <h2 className="Character-Level-Title" > Lvl. </h2>
                        <input  className="Character-Level-Input" 
                                id="CharLvl" 
                                type='number' 
                                defaultValue={characterLevel} 
                                min={"1"} max={"20"}></input>
                    </> : 
                    <> 
                        <h1 className="Character-Name-Text" > {characterName} </h1>
                        <h2 className="Character-Level-Title"> Lvl. </h2>
                        <h2 className="Character-Level"> {characterLevel} </h2> 
                    </>}
                    <button 
                        className="Character-Header-Edit-Button"
                        onClick={(e) => {
                            skillsIsEdit ? 
                                            //@ts-ignore
                            updateCharInfo( document.getElementById('CharName')?.value, document.getElementById('CharRace')?.value,
                                            //@ts-ignore 
                                            document.getElementById('CharClass')?.value, document.getElementById('CharLvl')?.value, 
                                            //@ts-ignore
                                            document.getElementById('CharXP')?.value) :
                            updateCharInfo( characterName, characterRace, characterClass, characterLevel,  characterXP);
                            setSkillsIsEdit(!skillsIsEdit);
                            }}>{skillsIsEdit ? 'save' : 'edit'}</button>    
                    </div>
                    <div className="Character-Race-Class">
                        {skillsIsEdit ? 
                        <>
                            <input  className="Character-Race-Class-Input" 
                                    id="CharRace" 
                                    type='text' 
                                    defaultValue={characterRace}
                                    placeholder="Race"></input> 
                            <input  className="Character-Race-Class-Input"
                                    id="CharClass" 
                                    type='text' 
                                    defaultValue={characterClass}
                                    placeholder="Class"></input>
                        </> : 
                        <>
                            <h2 className="Character-Race-Class"> {characterRace} </h2> 
                            <h2 className="Character-Race-Class"> {characterClass} </h2>
                        </>}

                    </div>

                    <div className="Character-XP">
                        <h2 className="Character-XP-Title" style={{fontWeight:"bold"}}> XP -  </h2> 
                        {skillsIsEdit ? 
                            <input  className="Character-XP-Input" 
                                    id="CharXP" 
                                    type='number' 
                                    defaultValue={characterXP}
                                    min={"0"} max={"355000"}></input> : 
                            <h2 className="Character-XP"> {characterXP} </h2>}

                    </div>
                </div>
            </div>

            {/* <Spacer /> */}

            <div className="Header-Buttons">
                <div className="Save-And-Load">
                    <button 
                    className="Save-Button"
                    onClick={() => {
                        
                    }}>Save</button>
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
