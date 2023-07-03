import { Fragment, useEffect, useState } from "react";
import React from "react";

const MakeSpellCard = () => {

    const [newSpellName, setNewSpellName] = useState('');
    const [newSpellNotes, setNewSpellNotes] = useState('');
    const [spellOtherEffect, setSpellOtherEffect] = useState('');

    const [rangedAnswer, setRangedAnswer] = useState(document.getElementById('typeOfRange')?.value ? document.getElementById('typeOfRange')?.value : -1);
    const [spellRange, setSpellRange] = useState(1);

    const [castingTimeValue, setCastingTimeValue] = useState(1)

    const [numberOfSpellDice, setNumberOfSpellDice] = useState(1);

    const [damageEffect, setDamageEffect] = useState(false);
    const [healEffect, setHealEffect] = useState(false);
    const [otherEffect, setOtherEffect] = useState(false);

    function resetSpellCard() {
        const dcSaveElement = document.getElementById('DCType');
        dcSaveElement.value = '---';
        
        const spellLevelElement = document.getElementById('spellLevel');
        spellLevelElement.value = '---';

        const castingTimeElement = document.getElementById('castingTimeUnit');
        castingTimeElement.value = '---';
        
        setNewSpellName('');
        setNewSpellNotes('');
        setSpellOtherEffect('');
        setRangedAnswer(-1);
        setSpellRange(1);
        setCastingTimeValue(1);
        setNumberOfSpellDice(1);
        setDamageEffect(false);
        setHealEffect(false);
        setOtherEffect(false);
    }

    useEffect(() => {
        setRangedAnswer(rangedAnswer);

        localStorage.setItem('newSpellEffectChoice', JSON.stringify({
            spellEffectChoice:  damageEffect ? 'damage' :
                                    healEffect ? 'healing' :
                                    otherEffect ? 'other' : 'N/A', 
        }));
    }, [rangedAnswer,damageEffect, healEffect, otherEffect]);

    return (
        <div>
            <div className="resetSpellCardBox">
                <button 
                    className="spellResetButton"
                    onClick={() => { resetSpellCard() }}>
                    reset
                </button>
            </div>
            <div className="loneSpellBox">
                <div className="newSpellInfoUpperBox">
                    <div className="spellUpperInfoAndTimeBox">
                        <div className="spellNameToLevelInfoBox">
                            <div className="spellInfoNameBox">
                                <span className="spellCardText">Name</span>
                                <textarea
                                    className="spellNameInput"
                                    value={newSpellName}
                                    id={'NewSpellName'}
                                    onChange={(e) => {setNewSpellName(e.target.value.toString());}}
                                    cols={1}
                                    rows={1}></textarea>
                            </div>
                            
                            { rangedAnswer === -1 ?
                                <div className="spellRangeChoiceBox">
                                    <div className="spellCardTypeText">Range Type</div>
                                    <div className="rangedQuestionBox">
                                        <div className="rangedQuestionText">
                                            Ranged?
                                        </div>
                                        <span 
                                            className= {
                                                (rangedAnswer === 1) ? 
                                                    'rangedQuestionOptionBoxActive' : 
                                                    'rangedQuestionOptionBox'}
                                            id="RangedYesAnswer"
                                            onClick={() => {setRangedAnswer(1);}}>Y</span>
                                        <span 
                                            className= {
                                                (rangedAnswer === 0) ? 
                                                    'rangedQuestionOptionBoxActive' : 
                                                    'rangedQuestionOptionBox'}
                                            id="RangedNoAnswer"
                                            onClick={() => {setRangedAnswer(0);}}>N</span>
                                    </div>
                                </div>   : 
                                rangedAnswer === 0 ? 
                                    <div className="spellRangeChoiceBox">
                                        <div className="spellCardTypeText">Range Type</div>
                                        <div className="spellRangeMultiSelectBox">
                                            <select className="rangeSelector" id="typeOfRange">
                                                <option value={'---'}>---</option>
                                                <option value={'Self'}>Self</option>
                                                <option value={'Touch'}>Touch</option>
                                                <option value={'Sight'}>Sight</option>
                                                <option value={'Unlimited'}>Unlimited</option>
                                            </select> 
                                        </div>
                                        
                                    </div> : 
                                    <div className="spellRangeChoiceBox">
                                        <div className="spellCardTypeText">Range</div>
                                        <div className="spellRangeSelectorBox">
                                            <input
                                                className="spellRangeDial"
                                                id="spellRange"
                                                type="number"
                                                defaultValue={spellRange}
                                                min={0}
                                                max={99999}
                                            ></input>
                                            <div className="rangedFeetText">
                                                    ft.
                                            </div>
                                    </div>
                                        

                            </div>  
                            }
                            <div className="spellBonusSelectorBox">
                                <div className="spellBonusSelectorText">DC</div>
                                <select  className="DCSelector" id="DCType">
                                        <option value={'---'}>---</option>
                                        <option value={'N/A'}>N/A</option>
                                        <option value={'STR'}>STR</option>
                                        <option value={'DEX'}>DEX</option>
                                        <option value={'CONST'}>CONST</option>
                                        <option value={'INT'}>INT</option>
                                        <option value={'WIS'}>WIS</option>
                                        <option value={'CHA'}>CHA</option>
                                </select>
                            </div>
                            <div className="spellLevelSelectorBox">
                                <div className="spellLevelSelectorText">Level</div>
                                <select className="spellLevelSelector" id="spellLevel">
                                        <option value={'---'}>---</option>
                                        <option value={'0'}>Cantrip</option>
                                        <option value={'1'}>1st</option>
                                        <option value={'2'}>2nd</option>
                                        <option value={'3'}>3rd</option>
                                        <option value={'4'}>4th</option>
                                        <option value={'5'}>5th</option>
                                        <option value={'6'}>6th</option>
                                        <option value={'7'}>7th</option>
                                        <option value={'8'}>8th</option>
                                        <option value={'9'}>9th</option>
                                </select>
                            </div>
                        </div>
                        <div className="castingTimeBox">
                            <div className="castingTimeTitleText">Casting Time</div>
                            <input
                                    className="castingTimeNumberDial"
                                    id="castingTimeValue"
                                    type="number"
                                    value={castingTimeValue}
                                    min={0}
                                    max={99999}
                                    onChange={(e) => {
                                        setCastingTimeValue(parseInt(e.target.value.toString()));
                                    }}></input>
                            <select className="castingTimeTypeSelector" id="castingTimeUnit">
                                <option value={'---'}>---</option>
                                <option value={'A'}>Action</option>
                                <option value={'BA'}>Bonus Action</option>
                                <option value={'min'}>Minute</option>
                                <option value={'hr'}>Hour</option>
                                <option value={'N.A.'}>No Action</option>
                                <option value={'R'}>Reaction</option>
                                <option value={'S'}>Special</option>
                            </select>     
                        </div>
                    </div>

                    <div className="spellEffectTypeBox">
                        <div className="spellEffectTitleText">Effect</div>
                        <div className="effectSelectionBox">
                            <div className="spellDamageSelectionBox">
                                <div className="spellEffectTypeText">Damage</div>
                                <span 
                                className= {
                                    damageEffect ? 
                                        'damageEffectOptionBoxactive' : 
                                        'damageEffectOptionBox'}
                                id="DamageEffect"
                                onClick={() => {
                                    setDamageEffect(!damageEffect);
                                    setHealEffect(false);
                                    setOtherEffect(false);
                                    }}></span>
                            </div>
                            <div className="spellHealingSelectionBox">
                                <div className="spellEffectTypeText">Healing</div>
                                <span 
                                className= {
                                    healEffect ? 
                                        'healEffectOptionBoxactive' : 
                                        'healEffectOptionBox'}
                                id="HealEffect"
                                onClick={() => {
                                    setDamageEffect(false);
                                    setHealEffect(!healEffect);
                                    setOtherEffect(false);
                                    }}></span>
                            </div>
                            <div className="spellOtherSelectionBox">
                                <div className="spellEffectTypeText">Other</div>
                                <span 
                                className= {
                                    otherEffect ? 
                                        'otherEffectOptionBoxactive' : 
                                        'otherEffectOptionBox'}
                                id="OtherEffect"
                                onClick={() => {
                                    setDamageEffect(false);
                                    setHealEffect(false);
                                    setOtherEffect(!otherEffect);
                                    }}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="newSpellNotesLowerBox">
                    <span className="spellNotesText">Notes</span>
                    <textarea
                            className="spellNotesInputBox"
                            value={newSpellNotes}
                            id={'NewSpellNotes'}
                            onChange={(e) => {
                                setNewSpellNotes(e.target.value.toString());
                            }}
                            cols={1}
                            rows={1}></textarea>  
                    {
                        (!damageEffect && !healEffect && !otherEffect) ? null :
                        (damageEffect || healEffect) ?
                        <div className="spellDiceSelectionBox">
                            <div className="spellDiceTypeBox">
                                <div className="spellDiceText">Dice</div>
                                <select className="spellDiceSelector" id="typeOfSpellDice">
                                    <option value={'Type'}>Type</option>
                                    <option value={'d4'}>d4</option>
                                    <option value={'d6'}>d6</option>
                                    <option value={'d8'}>d8</option>
                                    <option value={'d12'}>d12</option>
                                    <option value={'d20'}>d20</option>
                                </select>
                            </div>
                            <div className="numberOfSpellDiceBox">
                                <div className="spellDiceText">#</div>
                                <input
                                className="numberOfSpellDiceDial"
                                id="numberOfSpellDice"
                                type="number"
                                value={numberOfSpellDice}
                                min={0}
                                max={99999}
                                onChange={(e) => {
                                    setNumberOfSpellDice(parseInt(e.target.value.toString()));
                                }}></input>
                            </div>          
                        </div> : 
                        <div className="spellOtherEffectBox">
                            <textarea
                                className="spellOtherEffectInput"
                                value={spellOtherEffect}
                                placeholder="i.e., Detection"
                                id={'spellOtherEffect'}
                                onChange={(e) => {setSpellOtherEffect(e.target.value.toString());}}
                                cols={1}
                                rows={1}></textarea>
                        </div>
                    }
                </div>
            </div> 
        </div>
    );
};
export default MakeSpellCard;