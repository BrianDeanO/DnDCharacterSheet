import { Component, ReactComponentElement, useEffect, useState } from "react";
import React from "react";

const CharacterSheet = () => {
    let strScore = 12;
    let dexScore = 10;
    let constScore = 16;
    let intScore = 13;
    let wisScore = 8;
    let chaScore = 12;
    let currentHitPoints = 10;
    let maxHitPoints = 20;
    let tempHitPoints = 0;
    let isEdit = false;

    // React State Components to set the character's ability modifier scores
    const [STRModifier, setSTRModifier] = useState<number>();
    const [DEXModifier, setDEXModifier] = useState<number>();
    const [CONSTModifier, setCONSTModifier] = useState<number>();
    const [INTModifier, setINTModifier] = useState<number>();
    const [WISModifier, setWISModifier] = useState<number>();
    const [CHAModifier, setCHAModifier] = useState<number>();

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
            activeCheckBox.className = 'ReviveChoiceActive';
            revivalChoiceArray[0] = 1;
        } else {
            activeCheckBox.className = 'ReviveChoice';
            revivalChoiceArray[0] = -1;
        }
    } 

    else if(revivalType === 'FullHP') {
        if(revivalChoiceArray[1] === -1) {
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
    </div>
)
}

export default CharacterSheet;
