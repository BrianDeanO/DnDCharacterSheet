import { useEffect, useState } from "react";
import React from "react";
import { determineModifier } from "../helpers/determineModSign";
import { ProfAndLanguagesBox } from "./profsAndLangsBox";

export const SavingThrowsBox = ({abilityBoxInfo, savingThrowsBoxInfo, proficiencyBonus}) => {

    const [throwsIsEdit, setThrowsIsEdit] = useState(false);
    const [profInSTR, setProfInSTR] = useState(savingThrowsBoxInfo ? savingThrowsBoxInfo.str : false);
    const [profInDEX, setProfInDEX] = useState(savingThrowsBoxInfo ? savingThrowsBoxInfo.dex : false);
    const [profInCONST, setProfInCONST] = useState(savingThrowsBoxInfo ? savingThrowsBoxInfo.const : false);
    const [profInINT, setProfInINT] = useState(savingThrowsBoxInfo ? savingThrowsBoxInfo.int : false);
    const [profInWIS, setProfInWIS] = useState(savingThrowsBoxInfo ? savingThrowsBoxInfo.wis : false);
    const [profInCHA, setProfInCHA] = useState(savingThrowsBoxInfo ? savingThrowsBoxInfo.cha : false);

    const strengthScore = abilityBoxInfo ? abilityBoxInfo.str : 15;
    const dexterityScore = abilityBoxInfo ? abilityBoxInfo.dex : 14;
    const constitutionScore = abilityBoxInfo ? abilityBoxInfo.const : 8;
    const intelligenceScore = abilityBoxInfo ? abilityBoxInfo.int : 10;
    const wisdomScore = abilityBoxInfo ? abilityBoxInfo.wis : 12;
    const charismaScore = abilityBoxInfo ? abilityBoxInfo.cha : 13;

    useEffect(() => {
        localStorage.setItem("savingThrowsBoxInfo", JSON.stringify(
            {str: profInSTR, dex: profInDEX, const: profInCONST, int: profInINT, wis: profInWIS, cha: profInCHA}));
    }, [profInSTR, profInDEX, profInCONST, profInINT, profInWIS, profInCHA]);

    return (
        <div className="SavingThrows-ProficiencesAndLanguagesBox">
            <div className="SavingThrowsOuterBox">
                <div className="SavingsThrowHeader">
                    <span className="SavingThrowText"> Saving Throws </span>
                    <button 
                    className="SaveThrowsEditButton"
                    onClick={(e) => {
                        setThrowsIsEdit(!throwsIsEdit);
                        }}>{throwsIsEdit ? 'save' : 'edit'}</button>
                </div>
                <div className="SavingThrowInnerBox">
                    <div className="SavingThrowsFirstColumn">
                        <div className="LoneSavesBox">
                            <div className="LoneSavesBoxInnerTop">
                                <span 
                                className= {
                                    throwsIsEdit ? 
                                        profInSTR ? 
                                            'ProficiencyCheckBoxActiveEdit' : 
                                            'ProficiencyCheckBoxEdit' :
                                        profInSTR ? 
                                            'ProficiencyCheckBoxActive' : 
                                            'ProficiencyCheckBox'}
                                id="strSave"
                                onClick={() => {
                                    if(throwsIsEdit) {
                                        setProfInSTR(!profInSTR);
                                    }
                                    }}></span>
                                <span className="SaveModifierValue"> 
                                { profInSTR ? 
                                    (((parseInt(determineModifier(strengthScore)) + parseInt(proficiencyBonus))) >= 0) ?
                                    `+${((parseInt(determineModifier(strengthScore)) + parseInt(proficiencyBonus)))}` 
                                    : ((parseInt(determineModifier(strengthScore)) + parseInt(proficiencyBonus))) 
                                    : determineModifier(strengthScore)} 
                                </span>
                            </div>
                            <span className="SaveNameText"> Strength </span>
                        </div>
                        <div className="LoneSavesBox">
                            <div className="LoneSavesBoxInnerTop">
                            <span 
                                className= {
                                    throwsIsEdit ? 
                                        profInDEX ? 
                                            'ProficiencyCheckBoxActiveEdit' : 
                                            'ProficiencyCheckBoxEdit' :
                                        profInDEX ? 
                                            'ProficiencyCheckBoxActive' : 
                                            'ProficiencyCheckBox'}
                                id="dexSave"
                                onClick={() => {
                                    if(throwsIsEdit) {
                                        setProfInDEX(!profInDEX);
                                    }
                                    }}></span>
                                <span className="SaveModifierValue"> 
                                { profInDEX ? 
                                    (((parseInt(determineModifier(dexterityScore)) + parseInt(proficiencyBonus))) >= 0) ?
                                    `+${((parseInt(determineModifier(dexterityScore)) + parseInt(proficiencyBonus)))}` 
                                    : ((parseInt(determineModifier(dexterityScore)) + parseInt(proficiencyBonus))) 
                                    : determineModifier(dexterityScore)}
                                </span>
                            </div>
                            <span className="SaveNameText"> Dexterity </span>
                        </div>
                        <div className="LoneSavesBox">
                            <div className="LoneSavesBoxInnerTop">
                            <span 
                                className= {
                                    throwsIsEdit ? 
                                        profInCONST ? 
                                                'ProficiencyCheckBoxActiveEdit' : 
                                                'ProficiencyCheckBoxEdit' :
                                        profInCONST ? 
                                            'ProficiencyCheckBoxActive' : 
                                            'ProficiencyCheckBox'}
                                id="constSave"
                                onClick={() => {
                                    if(throwsIsEdit) {
                                        setProfInCONST(!profInCONST);
                                    }
                                    }}></span>                                
                            <span className="SaveModifierValue"> 
                            { profInCONST ? 
                                (((parseInt(determineModifier(constitutionScore)) + parseInt(proficiencyBonus))) >= 0) ?
                                `+${((parseInt(determineModifier(constitutionScore)) + parseInt(proficiencyBonus)))}` 
                                : ((parseInt(determineModifier(constitutionScore)) + parseInt(proficiencyBonus))) 
                                : determineModifier(constitutionScore)}
                            </span>
                            </div>
                            <span className="SaveNameText"> Constituion </span>
                        </div>
                    </div>
                    {/* IF HERE do -      margin: 70px 10px 0px -35px; */}
                    {/* <button 
                    className="SaveThrowsEditButton"
                    onClick={(e) => {
                        setThrowsIsEdit(!throwsIsEdit);
                        }}>{throwsIsEdit ? 'save' : 'edit'}</button> */}
                    <div className="SavingThrowsSecondColumn">
                        <div className="LoneSavesBox">
                            <div className="LoneSavesBoxInnerTop">
                            <span 
                                className= {
                                    throwsIsEdit ? 
                                        profInINT ? 
                                                'ProficiencyCheckBoxActiveEdit' : 
                                                'ProficiencyCheckBoxEdit' :
                                        profInINT ? 
                                            'ProficiencyCheckBoxActive' : 
                                            'ProficiencyCheckBox'}
                                id="intSave"
                                onClick={() => {
                                    if(throwsIsEdit) {
                                        setProfInINT(!profInINT);
                                    }
                                    }}></span>
                            <span className="SaveModifierValue"> 
                            { profInINT ? 
                                (((parseInt(determineModifier(intelligenceScore)) + parseInt(proficiencyBonus))) >= 0) ?
                                `+${((parseInt(determineModifier(intelligenceScore)) + parseInt(proficiencyBonus)))}` 
                                : ((parseInt(determineModifier(intelligenceScore)) + parseInt(proficiencyBonus))) 
                                : determineModifier(intelligenceScore)}
                            </span>
                            </div>
                            <span className="SaveNameText"> Intelligence </span>
                        </div>
                        <div className="LoneSavesBox">
                            <div className="LoneSavesBoxInnerTop">
                            <span 
                                className= {
                                    throwsIsEdit ? 
                                        profInWIS ? 
                                                'ProficiencyCheckBoxActiveEdit' : 
                                                'ProficiencyCheckBoxEdit' :
                                        profInWIS ? 
                                            'ProficiencyCheckBoxActive' : 
                                            'ProficiencyCheckBox'}
                                id="wisSave"
                                onClick={() => {
                                    if(throwsIsEdit) {
                                        setProfInWIS(!profInWIS);
                                    }
                                    }}></span>
                            <span className="SaveModifierValue"> 
                            { profInWIS ? 
                                (((parseInt(determineModifier(wisdomScore)) + parseInt(proficiencyBonus))) >= 0) ?
                                `+${((parseInt(determineModifier(wisdomScore)) + parseInt(proficiencyBonus)))}` 
                                : ((parseInt(determineModifier(wisdomScore)) + parseInt(proficiencyBonus))) 
                                : determineModifier(wisdomScore)}
                            </span>
                            </div>
                            <span className="SaveNameText"> Wisdom </span>
                        </div>
                        <div className="LoneSavesBox">
                            <div className="LoneSavesBoxInnerTop">
                            <span 
                                className= {
                                    throwsIsEdit ? 
                                        profInCHA ? 
                                                'ProficiencyCheckBoxActiveEdit' : 
                                                'ProficiencyCheckBoxEdit' :
                                        profInCHA ? 
                                            'ProficiencyCheckBoxActive' : 
                                            'ProficiencyCheckBox'}
                                id="chaSave"
                                onClick={() => {
                                    if(throwsIsEdit) {
                                        setProfInCHA(!profInCHA);
                                    }
                                    }}></span>
                            <span className="SaveModifierValue"> 
                            { profInCHA ? 
                                (((parseInt(determineModifier(charismaScore)) + parseInt(proficiencyBonus))) >= 0) ?
                                `+${((parseInt(determineModifier(charismaScore)) + parseInt(proficiencyBonus)))}` 
                                : ((parseInt(determineModifier(charismaScore)) + parseInt(proficiencyBonus))) 
                                : determineModifier(charismaScore)}
                            </span>
                            </div>
                            <span className="SaveNameText"> Charisma </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}