import { Fragment, useEffect, useState, useMemo } from "react";
import React from "react";
import MakeAttackCard from "../../multiSelectCardMakers/makeAttackCard";
import { determineModifier } from "../../helpers/determineModSign";
import { fillCardArray } from "../../helpers/fillCardArrays";

const AttacksSelectionBox = ({abilityBoxInfo}) => {

    const attacks = JSON.parse(localStorage.getItem("attacks"));
    const newAttackInfo = JSON.parse(localStorage.getItem("newAttackInfo"));

    const [attackCards, setAttackCards] = useState(attacks ? attacks.attackCardArray : []);
    const [makeNewAttack, setMakeNewAttack] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [attackCardBeingEdited, setAttackCardBeingEdited] = useState(-1);

    const attackCardArray = useMemo(() => fillCardArray(attackCards), [attackCards]);

    useEffect(() => {
        localStorage.setItem("attacks", JSON.stringify({attackCardArray}));
    }, [attackCardArray]);

    const AttackCard = ({attackCardArray, attackObj, index}) => {
        
        const [notes, setNotes] = useState(attackObj ? attackObj.notes : "");
        const damageBonus = attackObj.finesse ? 
        ((abilityBoxInfo.str >= abilityBoxInfo.dex) ? 
            determineModifier(abilityBoxInfo.str) : determineModifier(abilityBoxInfo.dex)) : 
        ((attackObj.longRange === -1) ? 
        determineModifier(abilityBoxInfo.str) :  determineModifier(abilityBoxInfo.dex));

        useEffect(() => {
            setNotes(notes);
            localStorage.setItem("attacks", JSON.stringify({attackCardArray}));
        }, [notes, attackCardArray]);
    
        return (
            <div className="newLoneAttackBox" 
                    key={`${attackObj.name}_${index}`} 
                    id={`${index}`}
                    >
                    <div className="attackInfoUpperBox">
                        <div className="attackNameBox">
                            <span>{attackObj.name}</span>
                            <span className="attackTypeIndicatorText">
                                {(attackObj.longRange === -1) ? '(Melee)' : '(Ranged)'}
                            </span>
                        </div>
                        <div className="finalRangeBox">
                        <div>Range</div>
                        {
                            (attackObj.longRange === -1) ? 
                            <div className="reachBox">
                                <div className="finalReachTop">
                                    {attackObj.shortRange} ft.
                                </div>
                                <div className="finalReachBottom">
                                    Reach
                                </div>
                            </div> : 
                            <div className="rangeBox">
                                <div className="finalShortRange">
                                    {attackObj.shortRange}
                                </div>
                                <div className="finalLongRange">
                                    ({attackObj.longRange})
                                </div>
                            </div>
                        }
                        </div>
                        <div className="finalAttackBonusOuterBox">
                            <span className="finalAttackBonusHeaderText">HIT</span>
                            <div className="finalAttackInnerBox">
                                <span className="finalAttackBonusValueText"> +{attackObj.atkBonus} </span> 
                            </div>
                        </div>
                        
                        <div className="finalDamageBox">
                        <div className="finalDamageTitle">Damage</div>
                        <div className="finalInnerDamageBox">
                            <div className="finalHitDiceBox">
                                {attackObj.numberOfHitDice}{attackObj.typeOfHitDice}{damageBonus} 
                            </div>
                            <div className="finalTypeOfDamageBox">
                                ({attackObj.typeOfDamage})
                            </div>
                        </div>
                        </div>

                        <div 
                        className="DeleteAttackBox"
                        id={`${index}`}
                        onClick={(e) => {
                            attackCardArray.splice(e.target.id, 1);
                            setAttackCards(attackCardArray);
                        }}>X</div>
                    </div>
                    <div className="attackNotesLowerBox">
                    <div className="attackNotesInnerBox">
                        <span className="attackNotesText">Notes</span>
                        <button 
                        className="AttackBoxSaveButton"
                        id={`${index}`}
                        onClick={(e) => {
                            (attackCardBeingEdited === -1) ? 
                                setAttackCardBeingEdited(index) : setAttackCardBeingEdited(-1);
                            setIsEdit(!isEdit);
                            }}>
                                {(isEdit && (attackCardBeingEdited === index)) ? 'save notes' : 'edit notes'}
                        </button> 
                    </div>

                    <textarea
                    className="finalAttackNotesBox"
                    value={attackObj.notes}
                    id={`${index}`}
                    onChange={(e) => {
                        attackCardArray[e.target.id].notes = e.target.value.toString();
                        setNotes(attackObj.notes);
                    }}
                    cols={1}
                    rows={4}></textarea>
                    </div>
                </div>
        )
    };

    return (
        <Fragment>
            <div className="Attacks-MultiSelectBox">
                <div className="attackHeader">
                    <div className="attackHeaderText">ATTACKS</div>
                    <button
                    className="attackHeaderNewButton"
                    onClick={() => {
                        if(makeNewAttack) {
                            if( (document.getElementById('rangedOrMeleeAnswer')?.value !== '') &&
                                (document.getElementById('typeOfHitDice')?.value !== '---') &&
                                (document.getElementById('typeOfDamage')?.value !== '---') &&
                                (document.getElementById('NewAttackName')?.value !== '')) {
                                const newAttack = {
                                    name: document.getElementById('NewAttackName')?.value, 
                                    atkBonus: document.getElementById('attackBonus')?.value, 
                                    typeOfHitDice: document.getElementById('typeOfHitDice')?.value, 
                                    numberOfHitDice: document.getElementById('numberOfHitDice')?.value,
                                    finesse:  (document.getElementById('Finesse').className === 'finesseOptionBoxactive') ? true : false, 
                                    typeOfDamage: document.getElementById('typeOfDamage')?.value,
                                    shortRange: document.getElementById('shortRange')?.value,
                                    longRange: document.getElementById('longRange')?.value ? 
                                        document.getElementById('longRange')?.value : -1,
                                    notes: document.getElementById('NewAttackNotes')?.value,
                                };
                                attackCardArray.push(newAttack);
                                setAttackCards(attackCardArray);
                                setMakeNewAttack(false);
                            }
                        } else {
                            setMakeNewAttack(true);
                        }
                    }}> {makeNewAttack ? 'Add Attack' : 'Make New Attack'}</button>
                </div>
                {makeNewAttack ? 
                    <MakeAttackCard 
                        newAttackInfo={newAttackInfo} 
                        makeNewAttack={makeNewAttack}/> : null}

                <div className="attackCardsMainBox">
                    {attackCardArray.map((attackObj, index) => {
                        return (
                            <AttackCard 
                                attackCardArray={attackCardArray}
                                attackObj={attackObj} 
                                index={index}/>
                        );
                    })}                
                </div>


            </div>
        </Fragment>
    )
}

export default AttacksSelectionBox;