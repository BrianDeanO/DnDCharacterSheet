import { useEffect, useState } from "react";
import React from "react";
import { saveCharacterData, loadCharacterData } from "../helpers/handleCharacterSaveData";

const CharacterInfo = ({character}) => {

    const [skillsIsEdit, setSkillsIsEdit] = useState<boolean>(false);
    const [characterName, setCharacterName] = useState<string>(character ? character.name : "Sir John Doe");
    const [characterRace, setCharacterRace] = useState<string>(character ? character.race : "Human");
    const [characterClass, setCharacterClass] = useState<string>(character ? character.cls : "Paladin");
    const [characterLevel, setCharacterLevel] = useState<number>(character ? character.lvl : 1);
    const [characterXP, setCharacterXP] = useState<number>(character ? character.xp : 0);
    const [playerImage, setPlayerImage] = useState<string>(character ? character.playerImage : '');

    if(!character) {
        localStorage.setItem("characterInfo", JSON.stringify({
            name: characterName, 
            race: characterRace, 
            cls: characterClass, 
            lvl: characterLevel, 
            xp: characterXP,
            playerImage: playerImage,
        }));
    }

    function updateCharInfo(name: string, race: string, cls: string, lvl: number, xp: number) {
        setCharacterName(name);
        setCharacterRace(race);
        setCharacterClass(cls);
        setCharacterLevel(lvl);
        setCharacterXP(xp);
    }

    function loadCharacterImage(imageFile) {
        const imageElement = document.getElementById('playerImage');
        const finalImage = URL.createObjectURL(imageFile);
        setPlayerImage(finalImage);
        //@ts-ignore
        imageElement.src  = finalImage;
    }   

    useEffect(() => {
        localStorage.setItem("characterInfo", JSON.stringify({
                name: characterName, 
                race: characterRace, 
                cls: characterClass, 
                lvl: characterLevel, 
                xp: characterXP,
                playerImage: playerImage
        }));
    }, [characterName, characterRace, characterClass, characterLevel, characterXP, playerImage]);

    useEffect(() => {
        const imageElement = document.getElementById('playerImage');
        if(playerImage !== '') {
            //@ts-ignore
            imageElement.src  = playerImage;
        }
    })
    
    return (
        <div className="Header">
            <div className="characterInfo">
                <div className="playerImageBox">
                    {playerImage !== '' ? 
                        <img src='' alt="" id="playerImage" className='playerImage'/> : 
                        <div className='blankPlayerImage'>?</div>
                    }
                </div>
                <div className="characterInfoBox">     
                    <div className="characterNameLvl">
                    {skillsIsEdit ? 
                    <> 
                        <input  className="characterNameInput" 
                                id="CharName" 
                                type='text' 
                                defaultValue={characterName}
                                placeholder="Name"></input>
                        <h2 className="characterLevelTitle" > Lvl. </h2>
                        <input  className="characterLevelInput" 
                                id="CharLvl" 
                                type='number' 
                                defaultValue={characterLevel} 
                                min={"1"} max={"20"}></input>
                    </> : 
                    <> 
                        <h1 className="characterNameText" > {characterName} </h1>
                        <h2 className="characterLevelTitle"> Lvl. </h2>
                        <h2 className="characterLevel"> {characterLevel} </h2> 
                    </>}
                    <button 
                        className="characterHeaderEditButton"
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
                    <div className="characterRaceClass">
                        {skillsIsEdit ? 
                        <>
                            <input  className="characterRaceClassInput" 
                                    id="CharRace" 
                                    type='text' 
                                    defaultValue={characterRace}
                                    placeholder="Race"></input> 
                            <input  className="characterRaceClassInput"
                                    id="CharClass" 
                                    type='text' 
                                    defaultValue={characterClass}
                                    placeholder="Class"></input>
                        </> : 
                        <>
                            <h2 className="characterRaceClassText"> {characterRace} </h2> 
                            <h2 className="characterRaceClassText"> {characterClass} </h2>
                        </>}

                    </div>
                    
                    <div className="characterInfoBottomBox">
                        <div className="characterXPBox">
                            <h2 className="characterXPTitle"> XP -  </h2> 
                            {skillsIsEdit ? 
                                <input  className="characterXPInput" 
                                        id="CharXP" 
                                        type='number' 
                                        defaultValue={characterXP}
                                        min={"0"} max={"355000"}></input> : 
                                <div className="characterXPValue"> {characterXP} </div>}

                        </div>
                        {skillsIsEdit ?
                            <div className="imageInputBox">
                                <label htmlFor="loadImage" className="imageInputLabel">
                                    {`Update Player Image (PNG, JPEG)`}
                                </label>
                                <input 
                                    className="ImageInput"
                                    type="file"
                                    name="load"
                                    id="loadImage"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => {
                                        // console.log('image ifle', e.target?.files?.[0]);
                                        loadCharacterImage(e.target?.files?.[0]);
                                        //loadCharacterData(e.target?.files?.[0]);
                                        e.target.value = '';
                                    }}
                                    />
                            </div> : null}
                    </div>
                </div>
            </div>

            <div className="mainHeaderButtonsBox">
                <button className="mainSaveButton"
                    onClick={() => {saveCharacterData();}}>Save</button>
                    <div className="loadLabel">
                        <label htmlFor="loadFile" className="loadInnerLabel">
                            Load
                        </label>
                        <input 
                            type="file"
                            name="load"
                            id="loadFile"
                            accept='.json'
                            onChange={(e) => {
                                loadCharacterData(e.target?.files?.[0]);
                                e.target.value = '';
                            }}
                            />
                    </div>
            </div>
        </div>
        
    )
}

export default CharacterInfo;
