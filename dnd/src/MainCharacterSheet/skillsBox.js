import { useEffect, useState } from "react";
import React from "react";
import { determineModifier } from "../helpers/determineModSign";
import { determineSkillCheckBonus } from "../helpers/determineSkillCheck";

export const SkillsBox = ({abilityBoxInfo, skillsBoxInfo, proficiencyBonus}) => {

    const [skillsIsEdit, setSkillsIsEdit] = useState(false);

    const [Acrobatics, setAcrobatics] = useState(abilityBoxInfo ? abilityBoxInfo.dex : 2);
    const [profInAcrobatics, setProfInAcrobatics] = useState(skillsBoxInfo ? skillsBoxInfo.Acrobatics[1] : false);

    const [AnimalHandling, setAnimalHandling] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 1);
    const [Arcana, setArcana] = useState(abilityBoxInfo ? abilityBoxInfo.int : 0);
    const [Athletics, setAthletics] = useState(abilityBoxInfo ? abilityBoxInfo.str : 2);
    const [Deception, setDeception] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 1);
    const [History, setHistory] = useState(abilityBoxInfo ? abilityBoxInfo.int : 0);
    const [Insight, setInsight] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 1);
    const [Intimidation, setIntimidation] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 1);
    const [Investigation, setInvestigation] = useState(abilityBoxInfo ? abilityBoxInfo.int : 0);
    const [Medicine, setMedicine] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 1);
    const [Nature, setNature] = useState(abilityBoxInfo ? abilityBoxInfo.int : 0);
    const [Perception, setPerception] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 1);
    const [Performance, setPerformance] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 1);
    const [Persuasion, setPersuasion] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 1);
    const [Religion, setReligion] = useState(abilityBoxInfo ? abilityBoxInfo.int : 0);
    const [SleightOfHand, setSleightOfHand] = useState(abilityBoxInfo ? abilityBoxInfo.dex : 2);
    const [Stealth, setStealth] = useState(abilityBoxInfo ? abilityBoxInfo.dex : 2);
    const [Survival, setSurvival] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 1);

    const skillNamesArray = [
        ['Acrobatics', 'DEX'], ['Animal Handling', 'WIS'], ['Arcana','INT'], ['Athletics', 'STR'], ['Deception', 'CHA'], 
        ['History', 'INT'], ['Insight', 'WIS'], ['Intimidation', 'CHA'], ['Investigation', 'INT'], ['Medicine', 'WIS'], 
        ['Nature', 'INT'], ['Perception', 'WIS'], ['Performance', 'CHA'], ['Persuasion', 'CHA'], ['Religion', 'INT'], 
        ['Sleight of Hand', 'DEX'], ['Stealth', 'DEX'], ['Survival', 'WIS']];

    const proficientSkillsArray = skillNamesArray.map((skillName) => {
        return(
            {skill: skillName[0], ability: skillName[1], proficient: false, modifier: 0}
        )
    });

        /////////////////////////////////// DO THIS WITH All OF THEM  PROFIENCITENINSSES
    useEffect(() => {
        localStorage.setItem("skillsBoxInfo", JSON.stringify(
            {Acrobatics: [Acrobatics, profInAcrobatics]}));
    }, [Acrobatics, profInAcrobatics]);

    //console.log('acrobatics', Acrobatics);
    console.log("prof skills array", proficientSkillsArray);
   // console.log('ability box in skills', abilityBoxInfo);
    //console.log('prof bonus', proficiencyBonus);
    console.log("acro prof", proficientSkillsArray[0].proficient);

    useEffect(() => {
        proficientSkillsArray.forEach((skill, index) => {

            switch(index){
                // case 0:
                //     setAcrobatics(abilityBoxInfo ? abilityBoxInfo.dex : 2);
                //     break;
                default:
                    break;
                // case 1:
                //     setAnimalHandling(skill.modifier);
                //     break;
                // case 2:
                //     setArcana(skill.modifier);
                //     break;
                // case 3:
                //     setAthletics(skill.modifier);
                //     break;   
                // case 4:
                //     setDeception(skill.modifier);
                //     break;
                // case 5:
                //     setHistory(skill.modifier);
                //     break;
                // case 6:
                //     setInsight(skill.modifier);
                //     break;
                // case 7:
                //     setIntimidation(skill.modifier);
                //     break;    
                // case 8:
                //     setInvestigation(skill.modifier);
                //     break;
                // case 9:
                //     setMedicine(skill.modifier);
                //     break;
                // case 10:
                //     setNature(skill.modifier);
                //     break;
                // case 11:
                //     setPerception(skill.modifier);
                //     break;     
                // case 12:
                //     setPerformance(skill.modifier);
                //     break;    
                // case 13:
                //     setPersuasion(skill.modifier);
                //     break;
                // case 14:
                //     setReligion(skill.modifier);
                //     break;
                // case 15:
                //     setSleightOfHand(skill.modifier);
                //     break;
                // case 16:
                //     setStealth(skill.modifier);
                //     break;  
                // case 17:
                //     setSurvival(skill.modifier);
                //     break;  
            }

            // if(skill.proficient === true) {
            //     skill.modifier += proficiencyBonus;
            // }
           // determineSkillCheckBonus(skill.skill, skill.ability);
        })
    });


    // WE JUST NEED TO determineModifierSign THEN ADD PROF BONUS IF CHECKED

    return (
        <div className="SkillsBox">
            <div className="SkillsBoxHeader">
                <span className="SkillsText"> Skills </span>
                <button 
                    className="SkillsEditButton"
                    onClick={(e) => {
                        setSkillsIsEdit(!skillsIsEdit);
                        }}>{skillsIsEdit ? 'save' : 'edit'}</button>
            </div>
            <div className="LoneSkillsBox">
                <span 
                                className= {
                                    profInAcrobatics ? 
                                        'ProficiencyCheckBoxActive' : 
                                        'ProficiencyCheckBox'}
                // className= {
                //     proficientSkillsArray[0].proficient ? 
                //         'ProficiencyCheckBoxActive' : 
                //         'ProficiencyCheckBox'}
                id="Acrobatics"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInAcrobatics(!profInAcrobatics);
                    }
                    // if(skillsIsEdit) {
                    //     (proficientSkillsArray[0].proficient = !proficientSkillsArray[0].proficient );
                    //     console.log("acro prof", proficientSkillsArray[0].proficient);
                    // }
                    }}></span>
                <span className="SkillModifierValue"> 
                    { profInAcrobatics ? 
                        (((parseInt(determineModifier(Acrobatics)) + proficiencyBonus)) >= 0) ?
                           `+${((parseInt(determineModifier(Acrobatics)) + proficiencyBonus))}` 
                           : ((parseInt(determineModifier(Acrobatics)) + proficiencyBonus)) 
                        : determineModifier(Acrobatics)}

                    {/* { proficientSkillsArray[0].proficient ? 
                        (((parseInt(determineModifier(Acrobatics)) + proficiencyBonus)) >= 0) ?
                           `+${((parseInt(determineModifier(Acrobatics)) + proficiencyBonus))}` 
                           : ((parseInt(determineModifier(Acrobatics)) + proficiencyBonus)) 
                        : determineModifier(Acrobatics)}  */}
                </span>
                <span className="SkillsNameText"> Acrobatics </span>
                <span className="SkillsNameAbilityMod"> (DEX) </span>
            </div>
            {/* <div className="LoneSkillsBox">
                <span 
                    className="ProficiencyCheckBox"
                    id="Animal Handling"
                    onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Animal Handling', 'WIS', proficientSkillsArray);
                    }}}></span>
                <span className="SkillModifierValue"> {determineModifierSign(proficientSkillsArray[1].modifier)} </span>
                <span className="SkillsNameText"> Animal Handling </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Arcana"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Arcana', 'INT', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> -1 </span>
                <span className="SkillsNameText"> Arcana </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Athletics"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Athletics', 'STR', proficientSkillsArray);}
                }}></span>
                <span className="SkillModifierValue"> +3 </span>
                <span className="SkillsNameText"> Athletics </span>
                <span className="SkillsNameAbilityMod"> (STR) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Deception"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Deception', 'CHA', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> +2 </span>
                <span className="SkillsNameText"> Deception </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className="ProficiencyCheckBox"
                    id="History"
                    onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('History', 'INT', proficientSkillsArray);
                    }}}></span>
                <span className="SkillModifierValue"> -1 </span>
                <span className="SkillsNameText"> History </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Insight"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Insight', 'WIS', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> +1 </span>
                <span className="SkillsNameText"> Insight </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Intimidation"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Intimidation', 'CHA', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> +2 </span>
                <span className="SkillsNameText"> Intimidation </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Investigation"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Investigation', 'INT', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> -1 </span>
                <span className="SkillsNameText"> Investigation </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Medicine"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Medicine', 'WIS', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> +1 </span>
                <span className="SkillsNameText"> Medicine </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Nature"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Nature', 'INT', proficientSkillsArray);
                }}} ></span>
                <span className="SkillModifierValue"> -1 </span>
                <span className="SkillsNameText"> Nature </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Perception"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Perception', 'WIS', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> +3 </span>
                <span className="SkillsNameText"> Perception </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Performance"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Performance', 'CHA', proficientSkillsArray);
                }}} ></span>
                <span className="SkillModifierValue"> +2 </span>
                <span className="SkillsNameText"> Performance </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Persuasion"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Persuasion', 'CHA', proficientSkillsArray);
                }}}></span>
                <span className="SkillModifierValue"> +4 </span>
                <span className="SkillsNameText"> Persuasion </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Religion"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Religion', 'INT', proficientSkillsArray);
                    }
                }}></span>
                <span className="SkillModifierValue"> -1 </span>
                <span className="SkillsNameText"> Religion </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Sleight of Hand"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Sleight of Hand', 'DEX', proficientSkillsArray);
                    }
                }}></span>
                <span className="SkillModifierValue"> +0 </span>
                <span className="SkillsNameText"> Sleight of Hand </span>
                <span className="SkillsNameAbilityMod"> (DEX) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Stealth"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Stealth', 'DEX', proficientSkillsArray);
                    }
                }}></span>
                <span className="SkillModifierValue"> +0 </span>
                <span className="SkillsNameText"> Stealth </span>
                <span className="SkillsNameAbilityMod"> (DEX) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                className="ProficiencyCheckBox"
                id="Survival"
                onClick={() => {
                    if(skillsIsEdit) {
                        determineSkillCheckBonus('Survival', 'WIS', proficientSkillsArray);
                    }
                }}></span>
                <span className="SkillModifierValue"> +1 </span>
                <span className="SkillsNameText"> Survival </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div> */}
        </div>
    );
}