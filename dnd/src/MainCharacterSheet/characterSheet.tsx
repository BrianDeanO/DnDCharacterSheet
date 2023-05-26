import React from "react";
import { ChangeEvent, Component, ReactComponentElement, useCallback, useEffect, useRef, useState } from "react";
import { AbilityBoxInfo } from "./abilityBox";
import { SkillsBox } from "./skillsBox";
import { determineModifier } from "../helpers/determineModSign";
import { SavingThrowsBox } from "./savingThrowsBox";
import { ProfAndLanguagesBox } from "./profsAndLangsBox";
import { AdditionalCharacterInfoBox } from "./additional_InfoBox";
import { HealthBox } from "./healthBox";
import AttacksSelectionBox  from "./MultiSelectBoxes/attacksBox.js";
import { NotesSelectionBox } from "./MultiSelectBoxes/notesBox";
import { SpellsSelectionBox } from "./MultiSelectBoxes/spellsBox";
import { FeatsAndTraitsSelectionBox } from "./MultiSelectBoxes/featsAndTraitsBox";
import { DecriptionSelectionBox } from "./MultiSelectBoxes/descriptionBox";
import { InventorySelectionBox } from "./MultiSelectBoxes/inventoryBox";

const CharacterSheet = ({
        abilityBoxInfo, 
        skillsBoxInfo, 
        savingThrowsBoxInfo, 
        profAndLangBoxInfo,
        additionalInfoBoxInfo,
        healthBoxInfo,
        attacks,
        spells,
        inventory,
        featsAndTraits,
        description,
        notes
}) => {

    const [proficiencyBonus, setProfiencyBonus] = useState<number>(additionalInfoBoxInfo ? additionalInfoBoxInfo.profBonus : 2);

    const [multiBoxSelection, setMultiBoxSelection] = useState<string>('ATTACKS');
    

    const [numberOfAttacks, setNumberOfAttacks] =  useState<number>(0);
    const [attackBonus, setAttackBonus] = useState<number>(0);
    const [rangedOrMeleeAnswer, setRangedOrMeleeAnswer] = useState<boolean>(false);
    const [finesseWeaponAnswer, setFinesseWeaponAnswer] = useState<boolean>(false);
    const [proficientWithWeaponAnswer, setProficientWithWeaponAnswer] = useState<boolean>(false);

    function AttackCard (
        name: string,
        atkBonus: number,
        typeOfHitDice: number,
        numberOfHitDice: number,
        typeOfDamage: string,
        shortRange?: number,
        longRange?: number,
        notes?: string) 
    {
        this.name = name;
        this.atkBonus = atkBonus;
        this.typeOfHitDice = typeOfHitDice;
        this.numberOfHitDice =  numberOfHitDice;
        this.typeOfDamage =  typeOfDamage;
        this.shortRange =  shortRange;
        this.longRange =  longRange;
        this.notes = notes;
    }

    const testAttackCard = new AttackCard('Trident', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');

    const attackCardArray: {}[] = [];

    attackCardArray.push(testAttackCard);

    const Sarry = (skill) => {
        return (
        <div className="loneAttackBox">
            <div className="attackInfoUpperBox">
                <div className="attackInfoNameBox">
                    <span>Name</span>
                    <input className="attackNameInput" type={'text'}></input>
                </div>
                {proficientWithWeaponAnswer ? <FinalAttackBonusBox /> :
                (<div className="attackBonusOuterBox">
                    <span className="attackBonusText">Attack Bonus</span>
                    <div className="attackBonusChoicesBox">
                    {proficientWithWeaponAnswer ? <FinalAttackBonusBox /> :
                        (rangedOrMeleeAnswer ?
                        (finesseWeaponAnswer ? <ProficientWithWeaponBoxQuestion /> :
                            <FinesseWeaponBoxQuestion />) :
                                <RangedOrMeleeBoxQuestion />)}
                    </div>
                </div>)}
            </div>
            <div className="attackNotesLowerBox">
                <span className="attackNotesText">Notes</span>
                <textarea className="attackNotesInputBox"></textarea>
            </div>
        </div>
    )};


        // function renderArray() {
        //     return skillsArray.map((skill, index) => {
        //         <Sarry skill={skill}/>
        //     })
        // }



        // const sarry = skillsArray.forEach((skill, index) => {
        //     console.log(skill);
        //     <div className="LoneSkillsBox">
        //             <span
        //                 className="ProficiencyCheckBox"
        //                 onClick={() => determineSkillCheckBonus(skill.SkillName, skill.SkillAbility)}></span>
        //             <span className="SkillModifierValue"> {skill.SkillsMod} </span>
        //             <span className="SkillsNameText"> {skill.SkillName} </span>
        //             <span className="SkillsNameAbilityMod"> ({skill.SkillAbility}) </span>
        //     </div>
        // })

        // return (
        //     <div className="SkillsBox">
        //         <span className="SkillsText"> Skills </span>
        //         <>
        //         {renderArray()}
        //         </>
        //     </div>
        // )

    function fillProficientSkillCircle() {

    }

    // function AttacksSelectionBoxF() {
    //     console.log('attack');
    //     const test = document.createElement('div');
    //     document.getElementById('multiTest')?.appendChild(<AttacksSelectionBox />);
    //     return (
    //         <div className="Notes-MultiSelectBox">
    //             ATTACKSaaaaaaaaaaaa
    //         </div>
    //     )
    // }

    // function SpellsSelectionBoxF() {
    //     console.log('spell')
    //     return (
    //         <div className="Notes-MultiSelectBox">
    //             SPELLS
    //         </div>
    //     )
    // }


    const RangedOrMeleeBoxQuestion = () => {
        return (
            <div className="MeleeOrRangedBox">
                <div
                    className="MeleeBox"
                    id="Melee"
                    onClick={() => {
                        setAttackBonus(DEXModifier);
                        setRangedOrMeleeAnswer(true);
                    }}>
                    <span className="MeleeText">Melee</span>
                </div>
                <span>or</span>
                <div
                    className="RangeBox"
                    id="Melee"
                    onClick={() => {
                        setAttackBonus(STRModifier);
                        setRangedOrMeleeAnswer(true);
                    }}>
                    <span className="RangedText">Ranged</span>
                </div>
            </div>
        )
    };

    const FinesseWeaponBoxQuestion = () => {
        return (
            <div className="FinesseWeaponBox">
                <span>Finesse?</span>
                <div
                    className="YesBox"
                    id="YesFinesse"
                    onClick={() => {
                        ((STRModifier >= DEXModifier)
                            ? setAttackBonus(STRModifier) :
                            setAttackBonus(DEXModifier))
                        setFinesseWeaponAnswer(true);
                    }}>
                    <span className="MeleeText">Yes</span>
                </div>
                <div
                    className="NoBox"
                    id="NoFinesse"
                    onClick={() => {
                        setFinesseWeaponAnswer(true);
                    }}>
                    <span className="RangedText">No</span>
                </div>
            </div>
        )
    };

    const ProficientWithWeaponBoxQuestion = () => {
        return (
            <div className="proficientWeaponQuestionBox">
                <span>Proficient?</span>
                <div
                    className="YesBox"
                    id="Proficient"
                    onClick={() => {
                        setAttackBonus(attackBonus + proficiencyBonus);
                        setProficientWithWeaponAnswer(true);
                        setFinesseWeaponAnswer(false);
                        setRangedOrMeleeAnswer(false);
                    }}>
                    <span className="MeleeText">Yes</span>
                </div>
                <div
                    className="NoBox"
                    id="NotProficient"
                    onClick={() => {
                        setProficientWithWeaponAnswer(true);
                        setFinesseWeaponAnswer(false);
                        setRangedOrMeleeAnswer(false);
                    }}>
                    <span className="RangedText">No</span>
                </div>
            </div>
        )
    };

    const FinalAttackBonusBox = () => {
        return (
            <div className="finalAttackBonusOuterBox">
                <span className="attackBonusText">ATK Bonus</span>
                <div className="finalAttackInnerBox">
                    {/*@ts-ignore*/}
                    <span className="finalAttackBonusText">{`+${attackCardArray[attackCardArray.length-1].atkBonus}`} </span> 
                </div>
            </div>
        )
    };

    function resetAttackBonusQuestions() {
        setProficientWithWeaponAnswer(false);
        setFinesseWeaponAnswer(false);
        setRangedOrMeleeAnswer(false);
    };

    function newAttackBoxString(index) {

        return (
            `<div className="newLoneAttackBox">
                <div className="attackInfoUpperBox">
                    <div className="attackInfoNameBox">
                        <span>Name</span>
                        <input className="attackNameInput" id="AttackName" type={'text'}></input>
                    </div>
                    <div className="finalAttackBonusOuterBox">
                        <span className="attackBonusText">ATK Bonus</span>
                        <div className="finalAttackInnerBox">
                            <span className="finalAttackBonusText"> +${attackCardArray[attackCardArray.length-1].atkBonus} </span> 
                        </div>
                    </div>
                </div>
                <div className="attackNotesLowerBox">
                    <span className="attackNotesText">Notes</span>
                    <textarea className="attackNotesInputBox"></textarea>
                </div>
            </div>
        `)
    };

    function createNewAttackBox(index: number) {
        console.log('new attack click');
        const newAttackBox = document.createElement('div');
        newAttackBox.innerHTML = newAttackBoxString(index);
        newAttackBox.className = 'newLoneAttackBox';
        document.getElementById('attackTest')!.appendChild(newAttackBox);
    }

    function handleNewAttackBox() {
        // const attackName = document.getElementById('AttackName')!.value;
        // console.log(attackName);
        // // if(numberOfAttacks === 0) {
        // //     const temp = new AttackCard(attackName, 5, 4, 2, 'Piercing', 20, 60, 'Finesse, Thrown' );
        // //     attackCardArray[numberOfAttacks] = temp;
        // // } else {

        // // }
        // const temp = new AttackCard(attackName, 5, 4, 2, 'Piercing', 20, 60, 'Finesse, Thrown' );
        // attackCardArray.push(temp);
        // console.log('temp', temp);
        console.log('attacks', numberOfAttacks);
        console.log('arrayTemp', attackCardArray[numberOfAttacks]);
        //setNumberOfAttacks(numberOfAttacks + 1);
        //createNewAttackBox(0);
        if(proficientWithWeaponAnswer === false) {
            alert('Not Finished Creating Attack');
        } else {
            createNewAttackBox(0);
        }
    }

    const MultiSelectBox = () => {
        switch(multiBoxSelection) {
            case 'ATTACKS':
                return (<AttacksSelectionBox attacks={attacks} abilityBoxInfo={abilityBoxInfo}/>)
            case 'SPELLS':
                return (<SpellsSelectionBox spells={spells}/>)
            case 'INVENTORY':
                return (<InventorySelectionBox inventory={inventory}/>)
            case 'FEATS&TRAITS':
                return (<FeatsAndTraitsSelectionBox featsAndTraits={featsAndTraits}/>)
            case 'DESCRIPTION':
                return (<DecriptionSelectionBox description={description}/>)
            case 'NOTES':
                return (<NotesSelectionBox notes={notes}/>)
            default:
                return (<AttacksSelectionBox attacks={attacks} abilityBoxInfo={abilityBoxInfo}/>)
        }
    }

    console.log('skillsBxin', skillsBoxInfo);
    const test = ["One", "Two", "Three"];

    return (
        <div className="CharacterSheet">
            <div className="MainAbilityAndHitPointRow">
                <AbilityBoxInfo abilityBoxInfo={abilityBoxInfo}/>
                <div className="HitPoint-DeathSavesAndInfoBox">
                    <HealthBox healthBoxInfo={healthBoxInfo}/>
                    
                    <AdditionalCharacterInfoBox 
                        additionalInfoBoxInfo={additionalInfoBoxInfo}
                        proficiencyBonus={proficiencyBonus}
                        passivePerception={skillsBoxInfo ? skillsBoxInfo.Perception : [13, false]}
                    />
                </div>
            </div>
            <div className="SecondLayerOfCharacterSheet">
                <SkillsBox 
                    abilityBoxInfo={abilityBoxInfo}
                    skillsBoxInfo={skillsBoxInfo} 
                    proficiencyBonus={proficiencyBonus} 
                />
                <div className="SaveThrowsAndProfLangColumn">            
                    <SavingThrowsBox 
                        abilityBoxInfo={abilityBoxInfo}
                        savingThrowsBoxInfo={savingThrowsBoxInfo} 
                        proficiencyBonus={proficiencyBonus}
                    />
                    <ProfAndLanguagesBox profAndLangBoxInfo={profAndLangBoxInfo} />
                </div>

                <div className="Notes-MultiSelectOuterBox">
                    <div className="Notes-MultiSelectHeaderBox">
                        <span
                            className="AttacksBoxButton"
                            id="AttacksBoxButton"
                            onClick={() => setMultiBoxSelection('ATTACKS')}> Attacks </span>
                        <span
                            className="SpellsBoxButton"
                            onClick={() => setMultiBoxSelection('SPELLS')}> Spells </span>
                        <span
                            className="InventoryBoxButton"
                            onClick={() => setMultiBoxSelection('INVENTORY')}> Inventory </span>
                        <span
                            className="FeaturesAndTraitsBoxButton"
                            onClick={() => setMultiBoxSelection('FEATS&TRAITS')}> Features & Traits </span>
                        <span
                            className="DescriptionBoxButton"
                            onClick={() => setMultiBoxSelection('DESCRIPTION')}> Description </span>
                        <span
                            className="NotesBoxButton"
                            onClick={() => setMultiBoxSelection('NOTES')}> Notes </span>
                    </div>
                   <MultiSelectBox />                
                </div>
            </div>
        </div>
    )
}

export default CharacterSheet;