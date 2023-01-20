import { ChangeEvent, Component, ReactComponentElement, useCallback, useEffect, useRef, useState } from "react";
import React from "react";

const CharacterSheet = () => {
    console.log('Testing Git Connection From Macbook Pro.');

    let strScore = 12;
    let dexScore = 10;
    let constScore = 16;
    let intScore = 13;
    let wisScore = 8;
    let chaScore = 12;
    let currentHitPoints = 1;
    let maxHitPoints = 20;
    let tempHitPoints = 0;
    let isEdit = false;

    const [skillsIsEdit, setSkillsIsEdit] = useState<boolean>(false);

    // React State Components to set the character's ability modifier scores
    const [STRModifier, setSTRModifier] = useState<number>(0);
    const [DEXModifier, setDEXModifier] = useState<number>(0);
    const [CONSTModifier, setCONSTModifier] = useState<number>(0);
    const [INTModifier, setINTModifier] = useState<number>(0);
    const [WISModifier, setWISModifier] = useState<number>(0);
    const [CHAModifier, setCHAModifier] = useState<number>(0);

    const [pointValue, setPointValue] = useState<number>(0);

    const [currentHealth, setCurrentHealth] = useState<number>(0);
    const [maxHealth, setMaxHealth] = useState<number>(0);

    const [hasTempHitPoints, setHasTempHitPoints] = useState<boolean>(false);
    const [tempPointValue, setTempPointValue] = useState<number>(0);

    const [stableStatus, setStableStatus] = useState<boolean>(true);
    const [deadStatus, setDeadStatus] = useState<boolean>(false);

    const [firstSuccessSaveThrow, setFirstSuccessSaveThrow] = useState<string>();

    const deathSaveSuccessArray = [-1, -1, -1];
    const deathSaveFailArray = [-1, -1, -1];
    const revivalChoiceArray = [-1, -1];

    const [proficiencyBonus, setProfiencyBonus] = useState<number>(2);
    const [armorClass, setArmorClass] = useState<number>(10);
    const [characterSpeed, setCharacterSpeed] = useState<number>(30);
    const [perceptionModifier, setPerceptionModifier] = useState<number>(2);

    const skillNamesArray = [
        'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 
        'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand',
        'Stealth', 'Survival'];

    const proficientSkillsArray = skillNamesArray.map((skillName) => {
        return(
            {skill: skillName, proficient: false, modifier: 0}
        )
    });

    console.log(proficientSkillsArray);

    useEffect(() => {
        proficientSkillsArray.forEach(() => {
            
        })
    });

    const [armorProficiencies,setArmorProficiencies] = useState<string>('');
    const [weaponProficiencies,setWeaponProficiencies] = useState<string>('None');
    const [toolProficiencies,setToolProficiencies] = useState<string>('None');
    const [languageProficiencies,setLanguageProficiencies] = useState<string>('None');


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

    // Function to calculate the modifier given the character's ability score
    const abilityModifierSetter = (ability: string, score: number) => {
        const modifier = Math.floor((score - 10) / 2);
        switch(ability) {
            case 'STR':
                setSTRModifier(modifier);
                break;
            case 'DEX':
                setDEXModifier(modifier);
                break;
            case 'CONST':
                setCONSTModifier(modifier);
                break;
            case 'INT':
                setINTModifier(modifier);
                break;
            case 'WIS':
                setWISModifier(modifier);
                break;
            case 'CHA':
                setCHAModifier(modifier);
                break;
        }
    }

    // React Effect Hook to dynamically determine and set ability modifiers
    useEffect(() => {
        abilityModifierSetter('STR', strScore);
        abilityModifierSetter('DEX', dexScore);
        abilityModifierSetter('CONST', constScore);
        abilityModifierSetter('INT', intScore);
        abilityModifierSetter('WIS', wisScore);
        abilityModifierSetter('CHA', chaScore);
    });

    useEffect(() => {
        setCurrentHealth(currentHitPoints);
        setMaxHealth(maxHitPoints);
        setTempPointValue(tempHitPoints);
    }, [currentHitPoints, maxHitPoints, tempHitPoints]);

    // useEffect(() => {
    //     setCurrentHealth(currentHitPoints);
    //     setMaxHealth(maxHitPoints);
    //     setTempPointValue(tempHitPoints);
    // }, [currentHitPoints, maxHitPoints, tempHitPoints]);



    // Function to get the correct sign on the ability modifier
    function determineModifierSign(abilityMod) {
        const signedMod = abilityMod >= 0 ? `+${abilityMod}` : `${abilityMod}`;
        return signedMod;
    }

    function healPlayer(pointValue: number) {
        if((currentHealth + pointValue) >= maxHealth) {
            setCurrentHealth(maxHealth);
        } else {
            setCurrentHealth(currentHealth + pointValue);
        }

        setPointValue(0);
    }

    function damagePlayer(pointValue: number, hasTempHitPoints: boolean) {
        if(hasTempHitPoints) {
            if((tempPointValue - pointValue) <= 0) {
                let additionalDamage = pointValue - tempPointValue;
                setTempPointValue(0);
                setHasTempHitPoints(false);

                if((currentHealth - additionalDamage) <= 0) {
                    console.log('UNCONCISOUS');
                    setCurrentHealth(0);
                }

                else if(((currentHealth + maxHealth) - additionalDamage) <= 0) {
                    console.log('INSTANT DEATH');
                    setCurrentHealth(0);
                }

                else {
                    setCurrentHealth(currentHealth - additionalDamage);
                }

            } else {
                setTempPointValue(tempPointValue - pointValue);
            }
        } else {
            if((currentHealth - pointValue) <= 0) {
                console.log('UNCONCISOUS');
                setCurrentHealth(0);
                setStableStatus(false);
            }

            else if(((currentHealth + maxHealth) - pointValue) <= 0) {
                console.log('INSTANT DEATH');
                setCurrentHealth(0);
                setDeadStatus(true);
            }

            else {
                setCurrentHealth(currentHealth - pointValue);
            }
        }
        setPointValue(0);
    }

        function handleTempPoints(tempPoints: number) {


        }

    const TempHitPointsBox = () => {
        return (
            hasTempHitPoints ?
                <input
                    className="TempHitPointBox"
                    id="tempHitPoints"
                    type="number"
                    value={tempPointValue}
                    min={0}
                    max={99999}
                    onChange={(e) => {
                        setTempPointValue(parseInt(e.target.value.toString()));
                    }}
                >
                </input> :
                <text
                    className="TempHitPointBoxText"
                    onClick={() => { setHasTempHitPoints(true) }}> -- </text>
        )
    }

    function handleDeathSavingThrows(savingThrowType: string, checkBoxID: string ) {
        const activeCheckBox = window.document.getElementById(checkBoxID)!;

        if(savingThrowType === 'success') {
            switch(checkBoxID) {
                case 'FirstSuccess':
                    if(deathSaveSuccessArray[0] === -1) {
                        activeCheckBox.className = 'SavesBoxesActive';
                        deathSaveSuccessArray[0] = 1;
                    } else {
                        activeCheckBox.className = 'SavesBoxes';
                        deathSaveSuccessArray[0] = -1;
                    }
                    break;

                case 'SecondSuccess':
                    if(deathSaveSuccessArray[1] === -1) {
                        activeCheckBox.className = 'SavesBoxesActive';
                        deathSaveSuccessArray[1] = 1;
                    } else {
                        activeCheckBox.className = 'SavesBoxes';
                        deathSaveSuccessArray[1] = -1;
                    }
                    break;

                case 'ThirdSuccess':
                    if(deathSaveSuccessArray[2] === -1) {
                        activeCheckBox.className = 'SavesBoxesActive';
                        deathSaveSuccessArray[2] = 1;
                    } else {
                        activeCheckBox.className = 'SavesBoxes';
                        deathSaveSuccessArray[2] = -1;
                    }
                    break;
            }

            if(
                (deathSaveSuccessArray[0] === 1) &&
                (deathSaveSuccessArray[1] === 1) &&
                (deathSaveSuccessArray[2] === 1)) {
                console.log('STABLE');
                setStableStatus(true);
            }
        }

        else if(savingThrowType === 'fail') {
            switch(checkBoxID) {
                case 'FirstFail':
                    if(deathSaveFailArray[0] === -1) {
                        activeCheckBox.className = 'SavesBoxesActive';
                        deathSaveFailArray[0] = 1;
                    } else {
                        activeCheckBox.className = 'SavesBoxes';
                        deathSaveFailArray[0] = -1;
                    }
                    break;

                case 'SecondFail':
                    if(deathSaveFailArray[1] === -1) {
                        activeCheckBox.className = 'SavesBoxesActive';
                        deathSaveFailArray[1] = 1;
                    } else {
                        activeCheckBox.className = 'SavesBoxes';
                        deathSaveFailArray[1] = -1;
                    }
                    break;

                case 'ThirdFail':
                    if(deathSaveFailArray[2] === -1) {
                        activeCheckBox.className = 'SavesBoxesActive';
                        deathSaveFailArray[2] = 1;
                    } else {
                        activeCheckBox.className = 'SavesBoxes';
                        deathSaveFailArray[2] = -1;
                    }
                    break;
            }

            if(
                (deathSaveFailArray[0] === 1) &&
                (deathSaveFailArray[1] === 1) &&
                (deathSaveFailArray[2] === 1)) {
                console.log('DEAD');
                setDeadStatus(true);
            }
        }
    }

    function playerRevival(revivalType: string, reviveBoxID: string) {
        const activeCheckBox = window.document.getElementById(reviveBoxID)!;

        if(revivalType === 'OneHP') {
            if(revivalChoiceArray[0] === -1) {
                if(revivalChoiceArray[1] === 1) {
                    const otherActiveCheckBox = window.document.getElementById('FullHPRevive')!;
                    otherActiveCheckBox.className = 'ReviveChoice';
                    revivalChoiceArray[1] = -1;
                }
            activeCheckBox.className = 'ReviveChoiceActive';
            revivalChoiceArray[0] = 1;
            } else {
                activeCheckBox.className = 'ReviveChoice';
                revivalChoiceArray[0] = -1;
            }
        }

        else if(revivalType === 'FullHP') {
            if(revivalChoiceArray[1] === -1) {
                if(revivalChoiceArray[0] === 1) {
                    const otherActiveCheckBox = window.document.getElementById('OneHPRevive')!;
                    otherActiveCheckBox.className = 'ReviveChoice';
                    revivalChoiceArray[0] = -1;
                }
            activeCheckBox.className = 'ReviveChoiceActive';
            revivalChoiceArray[1] = 1;
            } else {
                activeCheckBox.className = 'ReviveChoice';
                revivalChoiceArray[1] = -1;
            }
        }
    }

    function RevivePlayer() {
        if(revivalChoiceArray[0] === 1) {
            healPlayer(1);
            setDeadStatus(false);
        }
        else if(revivalChoiceArray[1] === 1) {
            healPlayer(maxHealth);
            setDeadStatus(false);
        }
    }

    function determineSkillCheckBonus(skillName: string, skillAbilityAcronym: string) {
        let skillBonus = 0;
        const skillProfCircle = document.getElementById(skillName)!;
        const skillIndex = proficientSkillsArray.findIndex((skillElement) => (skillElement.skill === skillName));
        console.log('skill prof circle', skillProfCircle);
        console.log('skill index', skillIndex);

        if(skillProfCircle?.className === 'ProficiencyCheckBox') {
            skillProfCircle.className = 'ProficiencyCheckBoxActive';
        } else {
            skillProfCircle.className = 'ProficiencyCheckBox';
        }

        if(skillIndex !== -1) {
            if(proficientSkillsArray[skillIndex].proficient) {
                proficientSkillsArray[skillIndex].proficient = false;
            } else{
                proficientSkillsArray[skillIndex].proficient = true;
                skillBonus += proficiencyBonus;
            }
        }

        switch(skillAbilityAcronym) {
            case 'STR':
                skillBonus += STRModifier;
                break;
            case 'DEX':
                skillBonus += DEXModifier;
                break;
            case 'CONST':
                skillBonus += CONSTModifier;
                break;
            case 'INT':
                skillBonus += INTModifier;
                break;
            case 'WIS':
                skillBonus += WISModifier;
                break;
            case 'CHA':
                skillBonus += CHAModifier;
                break;
        }

        console.log('newElement', proficientSkillsArray[skillIndex]);
        console.log('bonus', skillBonus);

        proficientSkillsArray[skillIndex].modifier += skillBonus;

        console.log(' after newElement', proficientSkillsArray[skillIndex]);
        return skillBonus;
    }

    function determineSaveThrowBonus(abilityName: string) {
        let savingThrowBonus = 0;

        switch(abilityName) {
            case 'STR':
                savingThrowBonus += STRModifier;
                break;
            case 'DEX':
                savingThrowBonus += DEXModifier;
                break;
            case 'CONST':
                savingThrowBonus += CONSTModifier;
                break;
            case 'INT':
                savingThrowBonus += INTModifier;
                break;
            case 'WIS':
                savingThrowBonus += WISModifier;
                break;
            case 'CHA':
                savingThrowBonus += CHAModifier;
                break;
        }

        // if(proficientSkillsArray.indexOf(abilityName) != -1) {
        //     savingThrowBonus += proficiencyBonus;
        // }

        console.log('skill', savingThrowBonus);

        return savingThrowBonus;
    }



    const RevivePlayerBox = () => {
        return (
            <div className="ReviveBox">
                <text className="ReviveTextTitle">Revive?</text>
                <div className="ReviveChoicesBox">
                    <div className="OneHPReviveBox">
                        <span
                            className="ReviveChoice"
                            id="OneHPRevive"
                            onClick={() => playerRevival('OneHP', 'OneHPRevive')}></span>
                        <text> Revive With One HP </text>
                    </div>

                    <div className="FullHPReviveBox">
                        <span
                            className="ReviveChoice"
                            id="FullHPRevive"
                            onClick={() => playerRevival('FullHP', 'FullHPRevive')}></span>
                        <text> Revive With Full HP </text>
                    </div>
                </div>
                {

                }
                <div className="ConfirmReviveBox">
                    <button
                        className="ConfirmReviveButton"
                        onClick={() => RevivePlayer()}>
                        Confirm
                    </button>
                </div>
            </div>
        )

    }

    const DeathSavingThrowsBox = () => {
        return (
            <div className="DeathSavingThrowsOuterBox">
                <h2 className="DeathSavesTitle"> Death Saves </h2>
                <div className="DeathSavingThrowsInnerBox">
                    <div className="DeathSavesBox">
                        <div className="SuccessesBox">
                            <text className="DeathSavesTextSuccess"> Success </text>
                            <span
                                className="SavesBoxes"
                                id="FirstSuccess"
                                onClick={() => {handleDeathSavingThrows('success', 'FirstSuccess')}}></span>
                            <span
                                className="SavesBoxes"
                                id="SecondSuccess"
                                onClick={() => handleDeathSavingThrows('success', 'SecondSuccess')}></span>
                            <span
                                className="SavesBoxes"
                                id="ThirdSuccess"
                                onClick={() => handleDeathSavingThrows('success', 'ThirdSuccess')}></span>
                        </div>

                        <div className="FailsBox">
                            <text className="DeathSavesTextFail"> Fail </text>
                            <span
                                className="SavesBoxes"
                                id="FirstFail"
                                onClick={() => handleDeathSavingThrows('fail', 'FirstFail')}></span>
                            <span
                                className="SavesBoxes"
                                id="SecondFail"
                                onClick={() => handleDeathSavingThrows('fail', 'SecondFail')}></span>
                            <span
                                className="SavesBoxes"
                                id="ThirdFail"
                                onClick={() => handleDeathSavingThrows('fail', 'ThirdFail')}></span>
                        </div>
                    </div>

                    {deadStatus ? <RevivePlayerBox /> :
                        <div className="SaveThrowCounterAndButtonBox">
                            <div className="SaveThrowPointCounter">
                                <button
                                    id="Up"
                                    onClick={() => {setPointValue(pointValue + 1)}}>
                                </button>
                                <div className="PointNumberBox">
                                    <input
                                    type="number"
                                    className="PointInput"
                                    id="PointInputValue"
                                    value={pointValue}
                                    min={0}
                                    max={99999}
                                    onChange={(e) => {setPointValue(parseInt(e.target.value.toString()))}}>
                                    </input>
                                </div>
                                <button
                                    id="Down"
                                    onClick={() => {
                                        if(pointValue !== 0) {
                                            setPointValue(pointValue - 1)
                                        }}}>
                                </button>
                            </div>
                            <div className="SavingThrowHealBox">
                                <button
                                    className="SavingThrowHealButton"
                                    onClick={() => healPlayer(pointValue)}> Heal
                                </button>
                            </div>
                        </div> }
                </div>
                <div>

                </div>
            </div>
        )
    }

    const HitPointTrackerBox = () => {
        return (
            <div className="HitPointBox">
                <h2 className="HitPointsTitle"> Hit Points </h2>
                <div className="HealAndDamageBox">
                    <div className="PointCounter">
                        <button
                            id="Up"
                            onClick={() => {setPointValue(pointValue + 1)}}>
                        </button>
                        <div className="PointNumberBox">
                            <input
                            type="number"
                            className="PointInput"
                            id="PointInputValue"
                            value={pointValue}
                            min={0}
                            max={99999}
                            onChange={(e) => {setPointValue(parseInt(e.target.value.toString()))}}>
                            </input>
                        </div>
                        <button
                            id="Down"
                            onClick={() => {
                                if(pointValue !== 0) {
                                    setPointValue(pointValue - 1)
                                }}}>
                        </button>
                    </div>
                    <div className="HealAndDamageButtons">
                        <button
                            className="HealButton"
                            onClick={() => healPlayer(pointValue)}> Heal
                        </button>
                        <button
                            className="DamageButton"
                            onClick={() => damagePlayer(pointValue, hasTempHitPoints)}> Damage
                        </button>
                    </div>
                    <div className="HitPointsBox">
                        <div className="HitPointTracker">
                            <div className="CurrentHitPoints">
                                <h4> CURRENT </h4>
                                <text > {currentHealth} </text>
                            </div>
                            <div className="HitPointDivider">
                                <h3> / </h3>
                            </div>
                            <div className="MaxHitPoints">
                                <h4> MAX </h4>
                                {isEdit ?
                                    <input
                                    type="number"
                                    className="MaxHitPointInput"
                                    id="PointInputValue"
                                    value={pointValue}
                                    min={0}
                                    max={99999}
                                    onChange={(e) => {setPointValue(parseInt(e.target.value.toString()))}}>
                                    </input>
                                    : <text> {maxHealth} </text>}
                            </div>
                            <div className="TemporaryHitPoints">
                                <h4> Temporary </h4>
                                <div
                                    className="TempHitPointSurroundingBox"
                                    onClick={(e) => { setHasTempHitPoints(true) }}>
                                    <TempHitPointsBox />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const AdditionalCharacterInfoBox = () => {
        return (
            <div className="ProficiencyBonus-Armor-Speed-OuterBox">
                <div className="ProfBonusBox">
                    <span id="ProfTextTop"> Proficiency </span>
                    <span id="ProfTextValue"> +{proficiencyBonus} </span>
                    <span id="ProfTextBottom"> Bonus </span>
                </div>
                <div className="ArmorClassBox">
                    <span id="ArmorTextTop"> Armor </span>
                    <span id="ArmorTextValue"> {armorClass} </span>
                    <span id="ArmorTextBottom"> Class </span>
                </div>
                <div className="SpeedBox">
                    <span id="SpeedTextValue"> {characterSpeed} </span>
                    <span id="SpeedTextBottom"> Speed </span>
                </div>
                <div className="PassiveWisdomBox">
                    <span id="PassiveTextValue"> {determineModifierSign(perceptionModifier)} </span>
                    <span id="PassiveTextMiddle"> Passive Wisdom </span>
                    <span id="PassiveTextBottom"> (Perception) </span>
                </div>
            </div>
        )
    }

    // const skillsArray = [
    //     {SkillsMod: determineSkillCheckBonus('Acrobatics', 'DEX'), SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    //     {SkillsMod: 1, SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    //     {SkillsMod: -1, SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    //     {SkillsMod: 1, SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    //     {SkillsMod: 1, SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    //     {SkillsMod: 1, SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    //     {SkillsMod: 1, SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    //     {SkillsMod: 1, SkillName: 'Acrobatics', SkillAbility: 'DEX'},
    // ]

    // function SkillsBoxLoop(skill) {
    //     skillsArray.map((skill, index) => {
    //         return (
    //             <div className="LoneSkillsBox">
    //                 <span
    //                     className="ProficiencyCheckBox"
    //                     onClick={() => determineSkillCheckBonus(skill.SkillName, skill.SkillAbility)}></span>
    //                 <span className="SkillModifierValue"> {skill.SkillsMod} </span>
    //                 <span className="SkillsNameText"> {skill.SkillName} </span>
    //                 <span className="SkillsNameAbilityMod"> ({skill.SkillAbility}) </span>
    //             </div>
    //         )
    // })}



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

    const SkillsBox = () => {

        return (
            <div className="SkillsBox">
                <div className="SkillsBoxHeader">
                    <span className="SkillsText"> Skills </span>
                    <button 
                        className="SkillsEditButton"
                        onClick={(e) => {setSkillsIsEdit(!skillsIsEdit)}}>edit</button>
                </div>
                <div className="LoneSkillsBox">
                    <span 
                    className="ProficiencyCheckBox"
                    id="Acrobatics"
                    onClick={() => {
                        if(skillsIsEdit) {
                            determineSkillCheckBonus('Acrobatics', 'DEX');
                        }}}></span>
                    <span className="SkillModifierValue"> {determineModifierSign(proficientSkillsArray[0].modifier)} </span>
                    <span className="SkillsNameText"> Acrobatics </span>
                    <span className="SkillsNameAbilityMod"> (DEX) </span>
                </div>
                <div className="LoneSkillsBox">
                    <span 
                        className="ProficiencyCheckBox"
                        id="Animal Handling"
                        onClick={() => {
                        if(skillsIsEdit) {
                            determineSkillCheckBonus('Animal Handling', 'WIS');
                        }}}></span>
                    <span className="SkillModifierValue"> +1 </span>
                    <span className="SkillsNameText"> Animal Handling </span>
                    <span className="SkillsNameAbilityMod"> (WIS) </span>
                </div>
                <div className="LoneSkillsBox">
                    <span 
                    className="ProficiencyCheckBox"
                    id="Arcana"
                    onClick={() => {
                        if(skillsIsEdit) {
                            determineSkillCheckBonus('Arcana', 'INT');
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
                            determineSkillCheckBonus('Athletics', 'STR');}
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
                            determineSkillCheckBonus('Deception', 'CHA');
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
                            determineSkillCheckBonus('History', 'INT');
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
                            determineSkillCheckBonus('Insight', 'WIS');
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
                            determineSkillCheckBonus('Intimidation', 'CHA');
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
                            determineSkillCheckBonus('Investigation', 'INT');
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
                            determineSkillCheckBonus('Medicine', 'WIS');
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
                            determineSkillCheckBonus('Nature', 'INT');
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
                            determineSkillCheckBonus('Perception', 'WIS');
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
                            determineSkillCheckBonus('Performance', 'CHA');
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
                            determineSkillCheckBonus('Persuasion', 'CHA');
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
                            determineSkillCheckBonus('Religion', 'INT');}
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
                            determineSkillCheckBonus('Sleight of Hand', 'DEX');}
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
                            determineSkillCheckBonus('Stealth', 'DEX');}
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
                            determineSkillCheckBonus('Survival', 'WIS');}
                    }}></span>
                    <span className="SkillModifierValue"> +1 </span>
                    <span className="SkillsNameText"> Survival </span>
                    <span className="SkillsNameAbilityMod"> (WIS) </span>
                </div>
            </div>
        )
    }

    const SavingThrowsBox = () => {
        return (
            <div className="SavingThrows-ProficiencesAndLanguagesBox">
                <div className="SavingThrowsOuterBox">
                    <span className="SavingThrowText"> Saving Throws </span>
                    <div className="SavingThrowInnerBox">
                        <div className="SavingThrowsFirstColumn">
                            <div className="LoneSavesBox">
                                <div className="LoneSavesBoxInnerTop">
                                    <span className="ProficiencyCheckBox"></span>
                                    <span className="SaveModifierValue"> +1 </span>
                                </div>
                                <span className="SaveNameText"> Strength </span>
                            </div>
                            <div className="LoneSavesBox">
                                <div className="LoneSavesBoxInnerTop">
                                    <span className="ProficiencyCheckBox"></span>
                                    <span className="SaveModifierValue"> +0 </span>
                                </div>
                                <span className="SaveNameText"> Dexterity </span>
                            </div>
                            <div className="LoneSavesBox">
                                <div className="LoneSavesBoxInnerTop">
                                    <span className="ProficiencyCheckBox"></span>
                                    <span className="SaveModifierValue"> +1 </span>
                                </div>
                                <span className="SaveNameText"> Constituion </span>
                            </div>
                        </div>
                        <div className="SavingThrowsSecondColumn">
                            <div className="LoneSavesBox">
                                <div className="LoneSavesBoxInnerTop">
                                    <span className="ProficiencyCheckBox"></span>
                                    <span className="SaveModifierValue"> -1 </span>
                                </div>
                                <span className="SaveNameText"> Intelligence </span>
                            </div>
                            <div className="LoneSavesBox">
                                <div className="LoneSavesBoxInnerTop">
                                    <span className="ProficiencyCheckBox"></span>
                                    <span className="SaveModifierValue"> +3 </span>
                                </div>
                                <span className="SaveNameText"> Wisdom </span>
                            </div>
                            <div className="LoneSavesBox">
                                <div className="LoneSavesBoxInnerTop">
                                    <span className="ProficiencyCheckBox"></span>
                                    <span className="SaveModifierValue"> +4 </span>
                                </div>
                                <span className="SaveNameText"> Charisma </span>
                            </div>
                        </div>
                    </div>

                </div>
                <ProfAndLanguagesBox />
            </div>
        )
    }

    // function handleChange(textInput) {
    //     setArmorProficiencies(textInput);
    // }

    const handleChange = (input) => {
        console.log(input);
        setArmorProficiencies(input);
    }

    // const input = (document.getElementById('ArmorInput') as HTMLInputElement).value;
    // console.log(input);

    const ProfAndLanguagesBox = () => {
        return (
            <div className="ProfAndLangOuterBox">
                <span className="ProfAndLangText"> Proficiences & Languages </span>
                <div className="ArmorBox">
                    <span className="ProfAndLangBoxText"> Armor </span>
                    <textarea
                        className="ArmorInput"
                        id="ArmorInput"
                        placeholder="None"
                        onChange={(e) => handleChange(e.target.value)}
                        cols={1}
                        rows={3}></textarea>
                </div>
                <div className="WeaponsBox">
                    <span className="ProfAndLangBoxText"> Weapons </span>
                    <textarea
                        className="ArmorInput"
                        value={weaponProficiencies}
                        onChange={(e) => setWeaponProficiencies(e.target.value.toString())}
                        cols={1}
                        rows={3}></textarea>
                </div>
                <div className="ToolsBox">
                    <span className="ProfAndLangBoxText"> Tools </span>
                    <textarea
                        className="ArmorInput"
                        value={toolProficiencies}
                        onChange={(e) => setToolProficiencies(e.target.value.toString())}
                        cols={1}
                        rows={3}></textarea>
                </div>
                <div className="LanguagesBox">
                    <span className="ProfAndLangBoxText"> Languages </span>
                    <textarea
                        className="ArmorInput"
                        value={languageProficiencies}
                        onChange={(e) => setLanguageProficiencies(e.target.value.toString())}
                        cols={1}
                        rows={3}></textarea>
                </div>

            </div>
        )
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


    return (
        <div className="CharacterSheet">
            <div className="MainAbilityAndHitPointRow">
                <div className="AbilityBox">
                    <div className="AbilityBoxTopRow">
                        <div className="LoneAbilityBox">
                            <div className="AbilityHeader"> Strength  </div>
                            <div className="AbilityModifier"> {determineModifierSign(STRModifier)} </div>
                            <div className="AbilityScore"> {strScore} </div>
                        </div>
                        <div className="LoneAbilityBox">
                            <div className="AbilityHeader"> Dexterity  </div>
                            <div className="AbilityModifier"> {determineModifierSign(DEXModifier)} </div>
                            <div className="AbilityScore"> {dexScore} </div>
                        </div>
                        <div className="LoneAbilityBox">
                            <div className="AbilityHeader"> Constitution  </div>
                            <div className="AbilityModifier"> {determineModifierSign(CONSTModifier)} </div>
                            <div className="AbilityScore"> {constScore} </div>
                        </div>
                    </div>

                    <div className="AbilityBoxBottomRow">
                            <div className="LoneAbilityBox">
                                <div className="AbilityHeader"> Intelligence  </div>
                                <div className="AbilityModifier"> {determineModifierSign(INTModifier)} </div>
                                <div className="AbilityScore"> {intScore} </div>
                            </div>
                            <div className="LoneAbilityBox">
                                <div className="AbilityHeader"> Wisdom  </div>
                                <div className="AbilityModifier"> {determineModifierSign(WISModifier)} </div>
                                <div className="AbilityScore"> {wisScore} </div>
                            </div>
                            <div className="LoneAbilityBox">
                                <div className="AbilityHeader"> Charisma  </div>
                                <div className="AbilityModifier"> {determineModifierSign(CHAModifier)} </div>
                                <div className="AbilityScore"> {chaScore} </div>
                            </div>
                    </div>
                </div>
                <div className="HitPoint-DeathSavesAndInfoBox">
                    {(currentHealth <= 0) ? <DeathSavingThrowsBox /> : <HitPointTrackerBox />}
                    <AdditionalCharacterInfoBox />
                </div>
            </div>
            <div className="SecondLayerOfCharacterSheet">
                <SkillsBox />
                <SavingThrowsBox />
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