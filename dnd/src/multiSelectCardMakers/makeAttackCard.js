import { Fragment, useEffect, useState } from "react";
import React from "react";

const MakeAttackCard = ({newAttackInfo, makeNewAttack}) => {

    const [attackBonus, setAttackBonus] = useState(0);
    const [rangedOrMeleeAnswer, setRangedOrMeleeAnswer] = useState('');
    const [newAttackName, setNewAttackName] = useState('');
    const [newAttackNotes, setNewAttackNotes] = useState('');
    const [shortRange, setShortRange] = useState(5);
    const [longRange, setLongRange] = useState(20);
    const [numberOfHitDice, setNumberOfHitDice] = useState(1);
    const [diceTypeSelected, setDiceTypeSelected] = useState(false);
    const [finesse, setFinesse] = useState(false);

    return (
        <div className="loneAttackBox">
            <div className="attackInfoUpperBox">
                <div className="attackInfoNameBox">
                    <span className="attackCardText">Name</span>
                    <textarea
                        className="attackNameInput"
                        value={newAttackName}
                        id={'NewAttackName'}
                        onChange={(e) => {setNewAttackName(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
                </div>
                {rangedOrMeleeAnswer === '' ? 
                    <div className="attackChoiceBox">
                        <div className="attackCardTypeText">Type:</div>
                        <div className="attackTypeChoice">
                            <button 
                                className="MeleeChoice" 
                                id=""
                                onClick={() => {setRangedOrMeleeAnswer('Melee');}}>
                                Melee
                            </button>
                            <button 
                                className="RangedChoice"
                                onClick={() => {setRangedOrMeleeAnswer('Ranged')}}>
                                Ranged
                            </button>
                        </div>
                    </div> :
                    <div className="attackChosenBox" id={(rangedOrMeleeAnswer === 'Ranged') ? 'rangedAttack' : 'meleeAttack'}>
                        <div className="typeAnswerText" id="rangeOrMeleeAnswer">{rangedOrMeleeAnswer}</div>
                        {rangedOrMeleeAnswer === 'Ranged' ?
                            <div className="rangedRangeBox">
                                <div className="shortRangeBox">
                                    <div className="shortLongRangeText">
                                        Short
                                    </div>
                                    <input
                                        className="rangeDial"
                                        id="shortRange"
                                        type="number"
                                        defaultValue={shortRange}
                                        min={0}
                                        max={99999}
                                    ></input>
                                </div>
                                <div className="longRangeBox">
                                    <div className="shortLongRangeText">
                                        Long
                                    </div>
                                    <input
                                    className="rangeDial"
                                    id="longRange"
                                    type="number"
                                    defaultValue={longRange}
                                    min={0}
                                    max={99999}
                                ></input>
                                </div>
                            
                            </div> : 
                            <div className="meleeRangeBox">
                                <div className="shortLongRangeText">
                                        Reach
                                </div>
                                <input
                                    className="rangeDial"
                                    id="shortRange"
                                    type="number"
                                    defaultValue={shortRange}
                                    min={0}
                                    max={99999}
                                ></input>
                            </div>
                            }
                    </div>
                }
            
                <div className="attackBonusBox">
                    <div className="attackBonusText">ATK Bonus</div>
                    <input
                            className="attackBonusDial"
                            id="attackBonus"
                            type="number"
                            defaultValue={attackBonus}
                            min={0}
                            max={99999}
                    ></input>
                </div>

                <div className="dmgTypeBox">
                    <div className="attackDMGText">DMG Type</div>
                    <select 
                        className="DamageSelector" id="typeOfDamage">
                        <option>---</option>
                        <option value={'Acid'}>Acid</option>
                        <option value={'Bludgeoning'}>Bludgeoning</option>
                        <option value={'Cold'}>Cold</option>
                        <option value={'Fire'}>Fire</option>
                        <option value={'Force'}>Force</option>
                        <option value={'Lightning'}>Lightning</option>
                        <option value={'Necrotic'}>Necrotic</option>
                        <option value={'Piercing'}>Piercing</option>
                        <option value={'Poison'}>Poison</option>
                        <option value={'Psychic'}>Psychic</option>
                        <option value={'Radiant'}>Radiant</option>
                        <option value={'Slashing'}>Slashing</option>
                        <option value={'Thunder'}>Thunder</option>
                    </select>
                    <div className="finesseOption" id="finesseOption">
                        <div className="finesseText">Finesse?</div>
                        <span 
                            className= {
                                finesse ? 
                                    'finesseOptionBoxactive' : 
                                    'finesseOptionBox'}
                            id="Finesse"
                            onClick={() => {
                                setFinesse(!finesse);}}></span>
                        <div></div>
                    </div>
                </div>
            </div>

            <div className="attackNotesLowerBox">
                <span className="attackNotesText">Notes</span>
                <textarea
                        className="attackNotesInputBox"
                        value={newAttackNotes}
                        id={'NewAttackNotes'}
                        onChange={(e) => {
                            setNewAttackNotes(e.target.value.toString());
                        }}
                        cols={1}
                        rows={1}></textarea>
                <div className="diceSelectionBox">
                    <div className="diceTypeBox">
                        <div className="attackDMGText">Dice Type</div>
                        <select className="diceSelector" id="typeOfHitDice">
                            <option>---</option>
                            <option value={'d4'}>d4</option>
                            <option value={'d6'}>d6</option>
                            <option value={'d8'}>d8</option>
                            <option value={'d12'}>d12</option>
                            <option value={'d20'}>d20</option>
                        </select>
                    </div>
                    <div className="numberOfDiceBox">
                        <div className="attackDMGText"># of Dice</div>
                        <input
                        className="numberOfDiceDial"
                        id="numberOfHitDice"
                        type="number"
                        value={numberOfHitDice}
                        min={0}
                        max={99999}
                        onChange={(e) => {
                            setNumberOfHitDice(parseInt(e.target.value.toString()));
                        }}></input>
                    </div>          
                </div>
            </div>
        </div> 
    );
};
export default MakeAttackCard;