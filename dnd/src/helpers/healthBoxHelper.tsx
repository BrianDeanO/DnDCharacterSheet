import { useEffect, useState } from "react";
import React from "react";

export function healPlayer(pointValue: number) {
    if((currentHealth + pointValue) >= maxHealth) {
        setCurrentHealth(maxHealth);
    } else {
        setCurrentHealth(currentHealth + pointValue);
    }

    setPointValue(0);
}

export function damagePlayer(pointValue: number, hasTempHitPoints: boolean) {
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

export const TempHitPointsBox = () => {
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



export function playerRevival(revivalType: string, reviveBoxID: string) {
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

export function RevivePlayer() {
    if(revivalChoiceArray[0] === 1) {
        healPlayer(1);
        setDeadStatus(false);
    }
    else if(revivalChoiceArray[1] === 1) {
        healPlayer(maxHealth);
        setDeadStatus(false);
    }
}

export const RevivePlayerBox = () => {
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

export default function handleDeathSavingThrows(savingThrowType: string, checkBoxID: string ) {
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


