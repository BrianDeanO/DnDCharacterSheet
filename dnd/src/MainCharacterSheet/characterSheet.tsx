import React from "react";
import { ChangeEvent, Component, ReactComponentElement, useCallback, useEffect, useRef, useState } from "react";
import { AbilityBoxInfo } from "./abilityBox";
import { SkillsBox } from "./skillsBox";
import { determineModifier } from "../helpers/determineModSign";
import { SavingThrowsBox } from "./savingThrowsBox";
import { ProfAndLanguagesBox } from "./profsAndLangsBox";
import { AdditionalCharacterInfoBox } from "./additional_InfoBox";
import { HealthBox } from "./healthBox";

const CharacterSheet = ({
        abilityBoxInfo, 
        skillsBoxInfo, 
        savingThrowsBoxInfo, 
        profAndLangBoxInfo,
        additionalInfoBoxInfo,
        healthBoxInfo}) => {

    // let strScore = 12;
    // let dexScore = 10;
    // let constScore = 16;
    // let intScore = 13;
    // let wisScore = 8;
    // let chaScore = 12;
    let currentHitPoints = 1;
    let maxHitPoints = 20;
    let tempHitPoints = 0;
    let isEdit = false;
    let abilityBoxEdit = false;

    // const [strengthScore, setStrengthScore] = useState<number>(abilityBoxInfo ? abilityBoxInfo.str : 15);
    // const [dexterityScore, setDexterityScore] = useState<number>(abilityBoxInfo ? abilityBoxInfo.dex : 14);
    // const [constitutionScore, setConstitutionScore] = useState<number>(abilityBoxInfo ? abilityBoxInfo.const : 8);
    // const [intelligenceScore, setIntelligenceScore] = useState<number>(abilityBoxInfo ? abilityBoxInfo.int : 10);
    // const [wisdomScore, setWisdomScore] = useState<number>(abilityBoxInfo ? abilityBoxInfo.wis : 12);
    // const [charismaScore, setCharismaScore] = useState<number>(abilityBoxInfo ? abilityBoxInfo.cha : 13);

    // const abilityBoxObj = {str: strengthScore, dex: dexterityScore, const: constitutionScore, int: intelligenceScore, wis: wisdomScore, cha: charismaScore};

    // if(!abilityBoxInfo) {
    //     localStorage.setItem("abilityBoxInfo", JSON.stringify(abilityBoxObj));
    // }

    // function updateAbilityBoxInfo(str: number, dex: number, constituion: number, int: number, wis: number, cha: number,) {
    //     setStrengthScore(str);
    //     setDexterityScore(dex);
    //     setConstitutionScore(constituion);
    //     setIntelligenceScore(int);
    //     setWisdomScore(wis);
    //     setCharismaScore(cha);
    // }

    // useEffect(() => {
    //     localStorage.setItem("abilityBoxInfo", JSON.stringify(
    //         {str: strengthScore, dex: dexterityScore, const: constitutionScore, int: intelligenceScore, wis: wisdomScore, cha: charismaScore}));
    // }, [strengthScore, dexterityScore, constitutionScore, intelligenceScore, wisdomScore, charismaScore]);



    // React State Components to set the character's ability modifier scores
    const [STRModifier, setSTRModifier] = useState<number>(0);
    const [DEXModifier, setDEXModifier] = useState<number>(0);
    const [CONSTModifier, setCONSTModifier] = useState<number>(0);
    const [INTModifier, setINTModifier] = useState<number>(0);
    const [WISModifier, setWISModifier] = useState<number>(0);
    const [CHAModifier, setCHAModifier] = useState<number>(0);

    // const [pointValue, setPointValue] = useState<number>(0);

    // const [currentHealth, setCurrentHealth] = useState<number>(0);
    // const [maxHealth, setMaxHealth] = useState<number>(0);

    // const [hasTempHitPoints, setHasTempHitPoints] = useState<boolean>(false);
    // const [tempPointValue, setTempPointValue] = useState<number>(0);

    // const [stableStatus, setStableStatus] = useState<boolean>(true);
    // const [deadStatus, setDeadStatus] = useState<boolean>(false);

    // const [firstSuccessSaveThrow, setFirstSuccessSaveThrow] = useState<string>();

    // const deathSaveSuccessArray = [-1, -1, -1];
    // const deathSaveFailArray = [-1, -1, -1];
    // const revivalChoiceArray = [-1, -1];

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





    // useEffect(() => {
    //     setCurrentHealth(currentHitPoints);
    //     setMaxHealth(maxHitPoints);
    //     setTempPointValue(tempHitPoints);
    // }, [currentHitPoints, maxHitPoints, tempHitPoints]);








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





    const AttacksSelectionBox = () => {
        function handleAttackClick() {
            console.log('attack click');
            const attackButton = document.getElementById('AttacksBoxButton')!;
            if(attackButton.className === 'activeButton') {
                attackButton.className = 'AttacksBoxButton';
            } else {
                attackButton.className = 'activeButton';
            }
            // attackButton.className = 'AttacksBoxButtonActive';
            const newAttackBox = document.createElement('div');
            newAttackBox.innerHTML = `<div> hello there! </div>`;
            newAttackBox.className = 'newLoneAttackBox';
            document.getElementById('attackTest')!.appendChild(newAttackBox);
        }

        return (
            <div className="Notes-MultiSelectBox" id="attackTest">
                <div className="attackHeader">
                    <div className="attackHeaderText">ATTACKS</div>
                    <button
                    className="attackHeaderNewButton"
                    onClick={() => {handleNewAttackBox()}}
                    // onClick={() => {

                    // console.log('new attack click');
                    // const newAttackBox = document.createElement('div');
                    // newAttackBox.innerHTML = newAttackBoxString(0);
                    // newAttackBox.className = 'newLoneAttackBox';
                    // document.getElementById('attackTest')!.appendChild(newAttackBox);
                    // // setNumberOfAttacks(numberOfAttacks + 1);
                    // // const newAttackBoxClassName = 'newLoneAttackBox';
                    // // const newNumberOfAttacks = numberOfAttacks.toString();
                    // // console.log(newAttackBoxClassName.concat(newNumberOfAttacks));
                    // // newAttackBox.className = newAttackBoxClassName.concat(newNumberOfAttacks);
                    // }}
                    >+</button>
                </div>
                <div className="loneAttackBox">
                    <div className="attackInfoUpperBox">
                        <div className="attackInfoNameBox">
                            <span>Name</span>
                            <input className="attackNameInput" id="AttackName" type={'text'}></input>
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
                {/* {<Sarry />} */}


            </div>
        )
    }

    const SpellsSelectionBox = () => {
        return (
            <div className="Notes-MultiSelectBox">
                SPELLS
            </div>
        )
    }

    const InventorySelectionBox = () => {
        return (
            <div className="Notes-MultiSelectBox">
                INVENTORY
            </div>
        )
    }

    const FeatsAndTraitsSelectionBox = () => {
        return (
            <div className="Notes-MultiSelectBox">
                FEATS&TRAITS
            </div>
        )
    }

    const DecriptionSelectionBox = () => {
        return (
            <div className="Notes-MultiSelectBox">
                DESCRIPTION
            </div>
        )
    }

    const NotesSelectionBox = () => {
        return (
            <div className="Notes-MultiSelectBox">
                NOTES
            </div>
        )
    }

    const MultiSelectBox = () => {
        switch(multiBoxSelection) {
            case 'ATTACKS':
                return (<AttacksSelectionBox />)
            case 'SPELLS':
                return (<SpellsSelectionBox />)
            case 'INVENTORY':
                return (<InventorySelectionBox />)
            case 'FEATS&TRAITS':
                return (<FeatsAndTraitsSelectionBox />)
            case 'DESCRIPTION':
                return (<DecriptionSelectionBox />)
            case 'NOTES':
                return (<NotesSelectionBox />)
            default:
                return (<AttacksSelectionBox />)
        }
    }

    console.log('skillsBxin', skillsBoxInfo);

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
                    {/* <div id="multiTest">

                    </div> */}
                   <MultiSelectBox />
                </div>
            </div>
        </div>
    )


}

export default CharacterSheet;