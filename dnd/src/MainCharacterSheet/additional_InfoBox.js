import { useEffect, useState } from "react";
import React from "react";
import { determineModifier } from "../helpers/determineModSign";

/* 
    Possible fix for not immediate update of passive wisdom is to use useComeback?
*/
export const AdditionalCharacterInfoBox = ({additionalInfoBoxInfo, proficiencyBonus, passivePerception}) => {

    const [additionalInfoIsEdit, setAdditionalInfoIsEdit] = useState(false);
    const [profBonus, setProfiencyBonus] = useState(proficiencyBonus ? proficiencyBonus : 2);
    const [armorClass, setArmorClass] = useState(additionalInfoBoxInfo ? additionalInfoBoxInfo.armorClass : 10);
    const [speed, setSpeed] = useState(additionalInfoBoxInfo ? additionalInfoBoxInfo.speed : 30);    
    
    function updateAdditionalBoxInfo(proficiency, armor, speed) {
        setProfiencyBonus(proficiency);
        setArmorClass(armor);
        setSpeed(speed);
    }

    useEffect(() => {
        localStorage.setItem("additionalInfoBoxInfo", JSON.stringify(
            {profBonus: profBonus, armorClass: armorClass, speed: speed}));
    }, [profBonus, armorClass, speed]);

    return (
        <div className="ProficiencyBonus-Armor-Speed-OuterBox">
            <div className="ProfBonusBox">
                <span id="ProfTextTop"> Proficiency </span>
                {additionalInfoIsEdit ? 
                    <input  className="ProfInput" 
                            id="PROF" 
                            type='number' 
                            min={2} max={20}
                            defaultValue={profBonus}></input> :
                    <div className="ProfTextValue"> +{profBonus} </div>
                }
                <span id="ProfTextBottom"> Bonus </span>
            </div>
            <div className="ArmorClassBox">
                <span id="ArmorTextTop"> Armor </span>
                {additionalInfoIsEdit ? 
                    <input  className="ArmorIncrement" 
                            id="ARMOR" 
                            type='number' 
                            min={5} max={50}
                            defaultValue={armorClass}></input> :
                    <div className="ArmorTextValue"> {armorClass} </div>
                }
                <span id="ArmorTextBottom"> Class </span>
            </div>

            <button 
                    className="AdditionalInfoEditButton"
                    onClick={(e) => {
                        additionalInfoIsEdit ?
                            updateAdditionalBoxInfo( document.getElementById('PROF')?.value, 
                                                     document.getElementById('ARMOR')?.value,
                                                     document.getElementById('SPEED')?.value):
                            updateAdditionalBoxInfo( profBonus, armorClass, speed );
                        setAdditionalInfoIsEdit(!additionalInfoIsEdit);
                         }}
                        >{additionalInfoIsEdit ? 'save' : 'edit'}</button> 

            <div className="SpeedBox">
                {additionalInfoIsEdit ? 
                    <input  className="SpeedInput" 
                            id="SPEED" 
                            type='number' 
                            min={0} max={200}
                            defaultValue={speed}></input> :
                    <div className="SpeedTextValue"> {speed} </div>
                }
                <span id="SpeedTextBottom"> Speed </span>
            </div>
            <div className="PassiveWisdomBox">
                <div className="PassiveTextValue"> 
                    {passivePerception[0]}
                </div>
                <span id="PassiveTextMiddle"> Passive Wisdom </span>
                <span id="PassiveTextBottom"> (Perception) </span>
            </div>
        </div>
    )
}