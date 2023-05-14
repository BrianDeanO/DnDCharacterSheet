import { useEffect, useState } from "react";
import React from "react";
// import {
//     healPlayer, 
//     damagePlayer, 
//     TempHitPointsBox, 
//     playerRevival, 
//     RevivePlayer,
//     RevivePlayerBox,
//     handleDeathSavingThrows}  from "../helpers/healthBoxHelper";



export const HealthBox = ({healthBoxInfo}) => {
    console.log('health box', healthBoxInfo);
    const [isHealthEdit, setIsHealthEdit] = useState(false);
    const [pointValue, setPointValue] = useState(healthBoxInfo ? healthBoxInfo.pointValue : 0);

    const [currentHealth, setCurrentHealth] = useState(healthBoxInfo ? healthBoxInfo.currentHealth : 13);
    const [maxHealth, setMaxHealth] = useState(healthBoxInfo ? healthBoxInfo.maxHealth : 13);

    const [hasTempHitPoints, setHasTempHitPoints] = useState(healthBoxInfo ? healthBoxInfo.hasTempHitPoints : false);
    const [tempPointValue, setTempPointValue] = useState(healthBoxInfo ? healthBoxInfo.tempPointValue : 0);

    const [stableStatus, setStableStatus] = useState(healthBoxInfo ? healthBoxInfo.stableStatus : true);
    const [deadStatus, setDeadStatus] = useState(healthBoxInfo ? healthBoxInfo.deadStatus : false);

    const [firstSuccessSaveThrow, setFirstSuccessSaveThrow] = useState(healthBoxInfo ? healthBoxInfo.firstSuccessSaveThrow : false);
    const [secondSuccessSaveThrow, setSecondSuccessSaveThrow] = useState(healthBoxInfo ? healthBoxInfo.secondSuccessSaveThrow : false);
    const [thirdSuccessSaveThrow, setThirdSuccessSaveThrow] = useState(healthBoxInfo ? healthBoxInfo.thirdSuccessSaveThrow : false);

    const [firstFailedSaveThrow, setFirstFailedSaveThrow] = useState(healthBoxInfo ? healthBoxInfo.firstFailedSaveThrow : false);
    const [secondFailedSaveThrow, setSecondFailedSaveThrow] = useState(healthBoxInfo ? healthBoxInfo.secondFailedSaveThrow : false);
    const [thirdFailedSaveThrow, setThirdFailedSaveThrow] = useState(healthBoxInfo ? healthBoxInfo.thirdFailedSaveThrow : false);

    //const [deathSaveSuccessArray, setDeathSaveSuccessArray] = useState(healthBoxInfo ? healthBoxInfo.deathSaveSuccessArray : [-1, -1, -1]);
    //const deathSaveFailArray = [-1, -1, -1];
    const revivalChoiceArray = [-1, -1];


    useEffect(() => {
        localStorage.setItem("healthBoxInfo", JSON.stringify(
            {   pointValue: pointValue,
                currentHealth: currentHealth, 
                maxHealth: maxHealth, 
                hasTempHitPoints: hasTempHitPoints,
                tempPointValue: tempPointValue, 
                stableStatus: stableStatus, 
                deadStatus: deadStatus, 
                firstSuccessSaveThrow: firstSuccessSaveThrow,
                secondSuccessSaveThrow: secondSuccessSaveThrow,
                thirdSuccessSaveThrow: thirdSuccessSaveThrow,
                firstFailedSaveThrow: firstFailedSaveThrow,
                secondFailedSaveThrow: secondFailedSaveThrow,
                thirdFailedSaveThrow: thirdFailedSaveThrow,
                revivalChoiceArray: revivalChoiceArray}));
    }, [pointValue, currentHealth, maxHealth, hasTempHitPoints, tempPointValue, 
        stableStatus, deadStatus, firstFailedSaveThrow, secondFailedSaveThrow, firstSuccessSaveThrow, 
        secondSuccessSaveThrow, thirdSuccessSaveThrow, thirdFailedSaveThrow, revivalChoiceArray]);

    function adjustMaxHealth(maxHealth) {
        setMaxHealth(maxHealth);
        if(currentHealth > maxHealth) {
            setCurrentHealth(maxHealth);
        }
    }

    function resetSaves() {
        setFirstSuccessSaveThrow(false);
        setSecondSuccessSaveThrow(false);
        setThirdSuccessSaveThrow(false);
        setFirstFailedSaveThrow(false);
        setSecondFailedSaveThrow(false);
        setThirdFailedSaveThrow(false);
    }

    function healPlayer(pointValue) {
        if((currentHealth + pointValue) >= maxHealth) {
            setCurrentHealth(maxHealth);
        } else {
            setCurrentHealth(parseInt(currentHealth) + parseInt(pointValue));
        }
    
        setPointValue(0);
    }
    
    function damagePlayer(pointValue, hasTempHitPoints) {
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
    
    
    function playerRevival(revivalType, reviveBoxID) {
        const activeCheckBox = window.document.getElementById(reviveBoxID);
    
        if(revivalType === 'OneHP') {
            if(revivalChoiceArray[0] === -1) {
                if(revivalChoiceArray[1] === 1) {
                    const otherActiveCheckBox = window.document.getElementById('FullHPRevive');
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
                    const otherActiveCheckBox = window.document.getElementById('OneHPRevive');
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
            resetSaves();
        }
        else if(revivalChoiceArray[1] === 1) {
            healPlayer(maxHealth);
            setDeadStatus(false);
            resetSaves();
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
    
    function handleDeathSavingThrows() {
        if( firstSuccessSaveThrow && secondSuccessSaveThrow && thirdSuccessSaveThrow) {
            console.log('STABLE');
            setStableStatus(true);
            resetSaves();
        }

        if( firstFailedSaveThrow && secondFailedSaveThrow && thirdFailedSaveThrow) {
            console.log('DEAD');
            setDeadStatus(true);
            resetSaves();
        }
    }

    const DeathSavingThrowsBox = () => {
        handleDeathSavingThrows();
        return (
            <div className="DeathSavingThrowsOuterBox">
                <h2 className="DeathSavesTitle"> Death Saves </h2>
                <div className="DeathSavingThrowsInnerBox">
                    {stableStatus ?
                        <div className="StableBox"> 
                            <span className="StableTitle">
                                STABLE
                            </span>
                        </div> 
                        : 
                    deadStatus ? 
                        <div className="DeadBox"> 
                            <span className="DeadTitle">
                                DEAD
                            </span>
                        </div> 
                        :
                        <div className="DeathSavesBox">
                            <div className="SuccessesBox">
                                <text className="DeathSavesTextSuccess"> Success </text>
                                <span
                                    className={firstSuccessSaveThrow ? "SavesBoxesActive" : "SavesBoxes"}
                                    id="FirstSuccess"
                                    onClick={() => setFirstSuccessSaveThrow(!firstSuccessSaveThrow)}></span>
                                <span
                                    className={secondSuccessSaveThrow ? "SavesBoxesActive" : "SavesBoxes"}
                                    id="SecondSuccess"
                                    onClick={() => setSecondSuccessSaveThrow(!secondSuccessSaveThrow)}></span>
                                <span
                                    className={thirdSuccessSaveThrow ? "SavesBoxesActive" : "SavesBoxes"}
                                    id="ThirdSuccess"
                                    onClick={() => setThirdSuccessSaveThrow(!thirdSuccessSaveThrow)}></span>
                            </div>
        
                            <div className="FailsBox">
                                <text className="DeathSavesTextFail"> Fail </text>
                                <span
                                    className={firstFailedSaveThrow ? "SavesBoxesActive" : "SavesBoxes"}
                                    id="FirstFail"
                                    onClick={() => setFirstFailedSaveThrow(!firstFailedSaveThrow)}></span>
                                <span
                                    className={secondFailedSaveThrow ? "SavesBoxesActive" : "SavesBoxes"}
                                    id="SecondFail"
                                    onClick={() => setSecondFailedSaveThrow(!secondFailedSaveThrow)}></span>
                                <span
                                    className={thirdFailedSaveThrow ? "SavesBoxesActive" : "SavesBoxes"}
                                    id="ThirdFail"
                                    onClick={() => setThirdFailedSaveThrow(!thirdFailedSaveThrow)}></span>
                            </div>
                        </div>
                    }
    
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
    console.log('max health', maxHealth);
    
    const HitPointTrackerBox = () => {
        
        return (
            <div className="HitPointBox">
                <div className="HitPointsTitle">
                    <h2 className="HitPointsTitleText"> Hit Points </h2>
                    <button 
                        className="HealthEditButton"
                        onClick={(e) => {
                            isHealthEdit ?
                            adjustMaxHealth(document.getElementById('MAX_HEALTH')?.value) :
                            adjustMaxHealth(maxHealth);
                            setIsHealthEdit(!isHealthEdit);
                            }}>{isHealthEdit ? 'Save HP' : 'Add HP'}</button>
                </div>

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
                            value={pointValue.toString()}
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
                                <text> {currentHealth} </text>
                            </div>
                            <div className="HitPointDivider">
                                <h3> / </h3>
                            </div>
                            <div className="MaxHitPoints">
                                <h4> MAX </h4>
                                {isHealthEdit ?
                                    <input
                                    type="number"
                                    className="MaxHitPointInput"
                                    id="MAX_HEALTH"
                                    min={0} max={99999}
                                    defaultValue={maxHealth}></input>
                                    : 
                                    <text className="MaxHealthText"> {maxHealth} </text>}
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

    return (
        (currentHealth <= 0) ? <DeathSavingThrowsBox /> : <HitPointTrackerBox />
    );
}