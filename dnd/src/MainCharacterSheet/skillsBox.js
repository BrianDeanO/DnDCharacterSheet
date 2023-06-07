import { useEffect, useState } from "react";
import React from "react";
import { determineModifier } from "../helpers/determineModSign";
import { determineSkillCheckBonus } from "../helpers/determineSkillCheck";

export const SkillsBox = ({abilityBoxInfo, skillsBoxInfo, proficiencyBonus}) => {

    //console.log("skillbs box", skillsBoxInfo);

    const [skillsIsEdit, setSkillsIsEdit] = useState(false);

    const [Acrobatics, setAcrobatics] = useState(abilityBoxInfo ? abilityBoxInfo.dex : 14);
    const [profInAcrobatics, setProfInAcrobatics] = useState(skillsBoxInfo ? skillsBoxInfo.Acrobatics[1] : false);

    const [AnimalHandling, setAnimalHandling] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 12);
    const [profInAnimalHandling, setProfInAnimalHandling] = useState((skillsBoxInfo) ? skillsBoxInfo.AnimalHandling[1] : false);

    const [Arcana, setArcana] = useState(abilityBoxInfo ? abilityBoxInfo.int : 10);
    const [profInArcana, setProfInArcana] = useState(skillsBoxInfo ? skillsBoxInfo.Arcana[1] : false);

    const [Athletics, setAthletics] = useState(abilityBoxInfo ? abilityBoxInfo.str : 15);
    const [profInAthletics, setProfInAthletics] = useState(skillsBoxInfo ? skillsBoxInfo.Athletics[1] : false);

    const [Deception, setDeception] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 13);
    const [profInDeception, setProfInDeception] = useState(skillsBoxInfo ? skillsBoxInfo.Deception[1] : false);

    const [History, setHistory] = useState(abilityBoxInfo ? abilityBoxInfo.int : 10);
    const [profInHistory, setProfInHistory] = useState(skillsBoxInfo ? skillsBoxInfo.History[1] : false);

    const [Insight, setInsight] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 12);
    const [profInInsight, setProfInInsight] = useState(skillsBoxInfo ? skillsBoxInfo.Insight[1] : false);

    const [Intimidation, setIntimidation] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 13);
    const [profInIntimidation, setProfInIntimidation] = useState(skillsBoxInfo ? skillsBoxInfo.Intimidation[1] : false);

    const [Investigation, setInvestigation] = useState(abilityBoxInfo ? abilityBoxInfo.int : 10);
    const [profInInvestigation, setProfInInvestigation] = useState(skillsBoxInfo ? skillsBoxInfo.Investigation[1] : false);

    const [Medicine, setMedicine] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 12);
    const [profInMedicine, setProfInMedicine] = useState(skillsBoxInfo ? skillsBoxInfo.Medicine[1] : false);

    const [Nature, setNature] = useState(abilityBoxInfo ? abilityBoxInfo.int : 10);
    const [profInNature, setProfInNature] = useState(skillsBoxInfo ? skillsBoxInfo.Nature[1] : false);

    const [Perception, setPerception] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 12);
    const [profInPerception, setProfInPerception] = useState(skillsBoxInfo ? skillsBoxInfo.Perception[1] : false);

    const [Performance, setPerformance] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 13);
    const [profInPerformance, setProfInPerformance] = useState(skillsBoxInfo ? skillsBoxInfo.Performance[1] : false);

    const [Persuasion, setPersuasion] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 13);
    const [profInPersuasion, setProfInPersuasion] = useState(skillsBoxInfo ? skillsBoxInfo.Persuasion[1] : false);

    const [Religion, setReligion] = useState(abilityBoxInfo ? abilityBoxInfo.int : 10);
    const [profInReligion, setProfInReligion] = useState(skillsBoxInfo ? skillsBoxInfo.Religion[1] : false);

    const [SleightOfHand, setSleightOfHand] = useState(abilityBoxInfo ? abilityBoxInfo.dex : 14);
    const [profInSleightOfHand, setProfInSleightOfHand] = useState(skillsBoxInfo ? skillsBoxInfo.SleightOfHand[1] : false);

    const [Stealth, setStealth] = useState(abilityBoxInfo ? abilityBoxInfo.dex : 14);
    const [profInStealth, setProfInStealth] = useState(skillsBoxInfo ? skillsBoxInfo.Stealth[1] : false);

    const [Survival, setSurvival] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 12);
    const [profInSurvival, setProfInSurvival] = useState(skillsBoxInfo ? skillsBoxInfo.Survival[1] : false);


    // const skillNamesArray = [
    //     ['Acrobatics', 'DEX'], ['Animal Handling', 'WIS'], ['Arcana','INT'], ['Athletics', 'STR'], ['Deception', 'CHA'], 
    //     ['History', 'INT'], ['Insight', 'WIS'], ['Intimidation', 'CHA'], ['Investigation', 'INT'], ['Medicine', 'WIS'], 
    //     ['Nature', 'INT'], ['Perception', 'WIS'], ['Performance', 'CHA'], ['Persuasion', 'CHA'], ['Religion', 'INT'], 
    //     ['Sleight of Hand', 'DEX'], ['Stealth', 'DEX'], ['Survival', 'WIS']];

    // const proficientSkillsArray = skillNamesArray.map((skillName) => {
    //     return(
    //         {skill: skillName[0], ability: skillName[1], proficient: false, modifier: 0}
    //     )
    // });

    useEffect(() => {
        localStorage.setItem("skillsBoxInfo", JSON.stringify(
            {Acrobatics: [Acrobatics, profInAcrobatics],
             AnimalHandling: [AnimalHandling, profInAnimalHandling],
             Arcana: [Arcana, profInArcana],
             Athletics: [Athletics, profInAthletics],
             Deception: [Deception, profInDeception],
             History: [History, profInHistory],
             Insight: [Insight, profInInsight],
             Intimidation: [Intimidation, profInIntimidation],
             Investigation: [Investigation, profInInvestigation],
             Medicine: [Medicine, profInMedicine],
             Nature: [Nature, profInNature],
             Perception: [Perception, profInPerception],
             Performance: [Performance, profInPerformance],
             Persuasion: [Persuasion, profInPersuasion],
             Religion: [Religion, profInReligion],
             SleightOfHand: [SleightOfHand, profInSleightOfHand],
             Stealth: [Stealth, profInStealth],
             Survival: [Survival, profInSurvival]
        }));
    }, [Acrobatics, profInAcrobatics, AnimalHandling, profInAnimalHandling,
        Arcana, profInArcana, Athletics, profInAthletics, Deception, profInDeception,
        History, profInHistory, Insight, profInInsight, Intimidation, profInIntimidation, 
        Investigation, profInInvestigation, Medicine, profInMedicine, Nature, profInNature,
        Perception, profInPerception, Performance, profInPerformance, Persuasion, profInPersuasion,
        Religion, profInReligion, SleightOfHand, profInSleightOfHand, Stealth, profInStealth,
        Survival, profInSurvival]);

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
                    skillsIsEdit ? 
                        profInAcrobatics ? 
                            'ProficiencyCheckBoxActiveEdit' : 
                            'ProficiencyCheckBoxEdit' :
                        profInAcrobatics ? 
                            'ProficiencyCheckBoxActive' : 
                            'ProficiencyCheckBox'}
                id="Acrobatics"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInAcrobatics(!profInAcrobatics);
                    }
                    }}></span>
                <span className="SkillModifierValue"> 
                    { profInAcrobatics ? 
                        (((parseInt(determineModifier(Acrobatics)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Acrobatics)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Acrobatics)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Acrobatics)}
                </span>
                <span className="SkillsNameText"> Acrobatics </span>
                <span className="SkillsNameAbilityMod"> (DEX) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInAnimalHandling ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInAnimalHandling ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                    id="AnimalHandling"
                    onClick={() => {
                        if(skillsIsEdit) {
                            setProfInAnimalHandling(!profInAnimalHandling);
                        }
                    }}></span>
                <span className="SkillModifierValue"> 
                    { profInAnimalHandling ? 
                        (((parseInt(determineModifier(AnimalHandling)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(AnimalHandling)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(AnimalHandling)) + parseInt(proficiencyBonus))) 
                        : determineModifier(AnimalHandling)}
                </span>                
                <span className="SkillsNameText"> Animal Handling </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInArcana ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInArcana ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Arcana"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInArcana(!profInArcana);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInArcana ? 
                        (((parseInt(determineModifier(Arcana)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Arcana)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Arcana)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Arcana)}
                </span>                
                <span className="SkillsNameText"> Arcana </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInAthletics ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInAthletics ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Athletics"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInAthletics(!profInAthletics);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInAthletics ? 
                        (((parseInt(determineModifier(Athletics)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Athletics)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Athletics)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Athletics)}
                </span>                
                <span className="SkillsNameText"> Athletics </span>
                <span className="SkillsNameAbilityMod"> (STR) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInDeception ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInDeception ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Deception"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInDeception(!profInDeception);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInDeception ? 
                        (((parseInt(determineModifier(Deception)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Deception)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Deception)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Deception)}
                </span>                
                <span className="SkillsNameText"> Deception </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInHistory ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInHistory ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                    id="History"
                    onClick={() => {
                        if(skillsIsEdit) {
                            setProfInHistory(!profInHistory);
                        }
                    }}></span>
                <span className="SkillModifierValue"> 
                    { profInHistory ? 
                        (((parseInt(determineModifier(History)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(History)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(History)) + parseInt(proficiencyBonus))) 
                        : determineModifier(History)}
                </span>                
                <span className="SkillsNameText"> History </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInInsight ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInInsight ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Insight"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInInsight(!profInInsight);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInInsight ? 
                        (((parseInt(determineModifier(Insight)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Insight)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Insight)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Insight)}
                </span>                
                <span className="SkillsNameText"> Insight </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInIntimidation ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInIntimidation ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Intimidation"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInIntimidation(!profInIntimidation);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInIntimidation ? 
                        (((parseInt(determineModifier(Intimidation)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Intimidation)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Intimidation)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Intimidation)}
                </span>                
                <span className="SkillsNameText"> Intimidation </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInInvestigation ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInInvestigation ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Investigation"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInInvestigation(!profInInvestigation);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInInvestigation ? 
                        (((parseInt(determineModifier(Investigation)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Investigation)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Investigation)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Investigation)}
                </span>                
                <span className="SkillsNameText"> Investigation </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInMedicine ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInMedicine ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Medicine"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInMedicine(!profInMedicine);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInMedicine ? 
                        (((parseInt(determineModifier(Medicine)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Medicine)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Medicine)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Medicine)}
                </span>                
                <span className="SkillsNameText"> Medicine </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInNature ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInNature ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Nature"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInNature(!profInNature);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInNature ? 
                        (((parseInt(determineModifier(Nature)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Nature)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Nature)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Nature)}
                </span>                
                <span className="SkillsNameText"> Nature </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInPerception ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInPerception ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Perception"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInPerception(!profInPerception);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInPerception ? 
                        (((parseInt(determineModifier(Perception)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Perception)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Perception)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Perception)}
                </span>                
                <span className="SkillsNameText"> Perception </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInPerformance ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInPerformance ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Performance"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInPerformance(!profInPerformance);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInPerformance ? 
                        (((parseInt(determineModifier(Performance)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Performance)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Performance)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Performance)}
                </span>                
                <span className="SkillsNameText"> Performance </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInPersuasion ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInPersuasion ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Persuasion"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInPersuasion(!profInPersuasion);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInPersuasion ? 
                        (((parseInt(determineModifier(Persuasion)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Persuasion)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Persuasion)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Persuasion)}
                </span>                
                <span className="SkillsNameText"> Persuasion </span>
                <span className="SkillsNameAbilityMod"> (CHA) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInReligion ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInReligion ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Religion"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInReligion(!profInReligion);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInReligion ? 
                        (((parseInt(determineModifier(Religion)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Religion)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Religion)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Religion)}
                </span>                
                <span className="SkillsNameText"> Religion </span>
                <span className="SkillsNameAbilityMod"> (INT) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInSleightOfHand ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInSleightOfHand ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="SleightOfHand"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInSleightOfHand(!profInSleightOfHand);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInSleightOfHand ? 
                        (((parseInt(determineModifier(SleightOfHand)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(SleightOfHand)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(SleightOfHand)) + parseInt(proficiencyBonus))) 
                        : determineModifier(SleightOfHand)}
                </span>                
                <span className="SkillsNameText"> Sleight of Hand </span>
                <span className="SkillsNameAbilityMod"> (DEX) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInStealth ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInStealth ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Stealth"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInStealth(!profInStealth);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInStealth ? 
                        (((parseInt(determineModifier(Stealth)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Stealth)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Stealth)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Stealth)}
                </span>                
                <span className="SkillsNameText"> Stealth </span>
                <span className="SkillsNameAbilityMod"> (DEX) </span>
            </div>
            <div className="LoneSkillsBox">
                <span 
                    className= {
                        skillsIsEdit ? 
                            profInSurvival ? 
                                    'ProficiencyCheckBoxActiveEdit' : 
                                    'ProficiencyCheckBoxEdit' :
                            profInSurvival ? 
                                'ProficiencyCheckBoxActive' : 
                                'ProficiencyCheckBox'}
                id="Survival"
                onClick={() => {
                    if(skillsIsEdit) {
                        setProfInSurvival(!profInSurvival);
                    }
                }}></span>
                <span className="SkillModifierValue"> 
                    { profInSurvival ? 
                        (((parseInt(determineModifier(Survival)) + parseInt(proficiencyBonus))) >= 0) ?
                           `+${((parseInt(determineModifier(Survival)) + parseInt(proficiencyBonus)))}` 
                           : ((parseInt(determineModifier(Survival)) + parseInt(proficiencyBonus))) 
                        : determineModifier(Survival)}
                </span>                
                <span className="SkillsNameText"> Survival </span>
                <span className="SkillsNameAbilityMod"> (WIS) </span>
            </div>
        </div>
    );
}