import { Fragment, useEffect, useState, useMemo } from "react";
import React from "react";
import MakeSpellCard from "../../helpers/makeSpellCard";
import { determineModifier } from "../../helpers/determineModSign";
import { fillSpellCardArray } from "../../helpers/fillCardArray";
import { determineSpellDC } from "../../helpers/determineSpellDC";

export const SpellsSelectionBox = ({spells, abilityBoxInfo, newSpellInfo, spellHeaderInfo}) => {

    console.log('passed in spells', spells);

    const [spellCards, setSpellCards] = useState(spells ? spells.spellCardArray : []);
    const [makeNewSpell, setMakeNewSpell] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [spellInfoIsEdit, setSpellInfoIsEdit] = useState(false);
    const [spellCardBeingEdited, setSpellCardBeingEdited] = useState('NO');
    const [spellMod, setSpellMod] = useState(spellHeaderInfo ? spellHeaderInfo.spellMod : 2);
    const [spellBonus, setSpellBonus] = useState(spellHeaderInfo ? spellHeaderInfo.spellBonus : 4);
    const [spellSaveDC, setSpellSaveDC] = useState(spellHeaderInfo ? spellHeaderInfo.spellSaveDC : 15);

    console.log('after spell cards', spellCards);

    const spellCardArray = useMemo(() => fillSpellCardArray(spellCards), [spellCards]);

    console.log('after spell arrat', spellCardArray);


    useEffect(() => {
        localStorage.setItem("spells", JSON.stringify({spellCardArray}));
        localStorage.setItem("spellHeaderInfo", JSON.stringify({
            spellMod: spellMod,
            spellBonus: spellBonus,
            spellSaveDC: spellSaveDC,
        }));

    }, [spellCardArray, spellMod ,spellBonus ,spellSaveDC]);

    function updateSkillHeaderInfo(mod, bonus, dc) {
        // console.log('MOD', document.getElementById('MOD')?.value);
        // console.log('BONUS', document.getElementById('BONUS')?.value);
        // console.log('DC', document.getElementById('DC')?.value);
        setSpellMod(mod);
        setSpellBonus(bonus);
        setSpellSaveDC(dc);
    }

    const cantrip = {
        spellLevel: '0',
        spellName: 'Healing Word'
    };
    const oneLevel = {
        spellLevel: '1',
        spellName: 'Jump'
    };
    const oneLevel2 = {
        spellLevel: '1',
        spellName: 'Speak With Animals'
    };
    const threeLevel = {
        spellLevel: '3',
        spellName: 'Cure Wounds'
    };
    const fourLevel = {
        spellLevel: '4',
        spellName: 'Flame Arrows'
    };



    const SpellCard = ({spellSubArray, spellObj, index}) => {
        console.log('spell sub card array', spellSubArray);
        console.log('main spell card array', spellCardArray);
        console.log('sspellObj', spellObj);
        console.log()

        console.log('level', spellObj.spellLevel, 'index', index, 'spell', spellCardArray[spellObj.spellLevel][index]);

        
        const [notes, setNotes] = useState(spellObj ? spellObj.notes : "");
        const dcValue = determineSpellDC(spellObj.DCType, abilityBoxInfo);
        //console.log('dc value', dcValue, spellObj.DCType);

        useEffect(() => {
            setNotes(notes);
            localStorage.setItem("spells", JSON.stringify({spellCardArray}));
        }, [notes]);
    
        return (

            <div className="newLoneSpellBox" 
                key={`${spellObj.name}_${index}`}
                id={`${spellObj.spellLevel}_${index}`}>
                <div className="spellInfoUpperBox">
                    <div className="spellNameBox">
                        <span>{spellObj.spellName}</span>
                    </div>

                    <div className="spellFinalTimeBox">
                        <div>Time</div>
                        <div className="spellInnerTimeBox">
                            <div className="spellTimeValueBox">
                                {spellObj.castingTimeValue}{spellObj.castingTimeUnit}
                            </div>
                        </div>
                    </div>

                    <div className="finalSpellRangeBox">
                        <div>Range</div>
                        {(parseInt(spellObj.spellRange)) ? 
                            <div className="spellRangeBox">
                                <div className="finalSpellRange">
                                    {spellObj.spellRange}
                                </div>
                                <div className="finalSpellRangeFeetText">
                                    ft.
                                </div>
                            </div> : 
                            <div className="spellOtherRangeTypeBox">
                                <div className="spellOtherRangeTypeText">
                                    {spellObj.spellRange}
                                </div>
                            </div>
                        }
                    </div>

                    <div className="finalSpellDCOuterBox">
                        <span className="finalSpellDCHeaderText">DC</span>
                        {(dcValue === 0) ? 
                            <div className="finalSpellNoDCInnerBox">
                                <span className="finalSpellNoDCAbilityText"> --- </span> 
                            </div> : 
                            <div className="finalSpellDCInnerBox">
                                <span className="finalSpellDCValueText"> {dcValue} </span>
                                <span className="finalSpellDCAbilityText"> ({spellObj.DCType}) </span> 
                            </div>
                        }
                    </div>
                    
                    <div className="finalEffectBox">
                        <div className= {(spellObj.spellEffectChoice === 'other') ? 
                            "finalEffectOtherTitle" : "finalEffectHealOrDamageTitle"}>Effect</div>
                        {(spellObj.spellEffectChoice === 'other') ?
                            <div className="finalOtherTypeOuterBox">
                                <div className="finalOtherTypeInnerBox">
                                    {spellObj.spellOtherEffect}
                                </div>
                            </div> :
                            <div className="finalHealOrDamageBox">
                                <div className="finalSpellHitDiceBox">
                                    {spellObj.numberOfDice}{spellObj.typeOfDice}
                                </div>
                                <div className="finalSpellHealOrDamageTextBox">
                                    ({spellObj.spellEffectChoice})
                                </div>
                            </div>
                        }
                    </div>
                    <div 
                    className="DeleteSpellBox"
                    id={`${spellObj.spellLevel}_${index}`}
                    onClick={(e) => {
                        console.log('delete array',  spellCardArray[spellObj.spellLevel][index]);
                        spellCardArray[spellObj.spellLevel].splice(index, 1);
                        setSpellCards(spellCardArray);
                    }}>X</div>
                </div>
                <div className="spellNotesLowerBox">
                    <div className="spellNotesInnerBox">
                        <span className="spellNotesText">Notes</span>
                        <button 
                        className="SpellBoxSaveButton"
                        id={`${spellObj.spellLevel}_${index}`}
                        onClick={(e) => {
                            (spellCardBeingEdited === 'NO') ? 
                            setSpellCardBeingEdited(`${spellObj.spellLevel}_${index}`) : setSpellCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            }}>
                                {(isEdit && (spellCardBeingEdited === `${spellObj.spellLevel}_${index}`)) ? 'save notes' : 'edit notes'}
                        </button> 
                    </div>

                    <textarea
                    className="finalSpellNotesBox"
                    value={spellObj.notes}
                    id={`${spellObj.spellLevel}_${index}`}
                    // onFocus={()  => {
                    //     setSpellCards(spellCardArray);
                    // }}
                    onChange={(e) => {
                        //setWeaponProficiencies(e.target.value.toString());

                        spellCardArray[spellObj.spellLevel][index].notes = e.target.value.toString();
                        //spellCardArray[spellLevel][spellIndex].notes = e.target.value.toString();
                        //attackObj.notes = e.target.value.toString();
                        setNotes(spellObj.notes);
                        //setSpellCards(attackCardArray);
                    }}
                    cols={1}
                    rows={4}></textarea>
                </div>
            </div>
        )
    };

    return (
        <Fragment>
        <div className="Spells-MultiSelectBox" id="spellTest">
            <div className="spellHeader">
                <div className="spellTitleAndButtonBox"> 
                    <div className="spellHeaderText">SPELLS</div>
                    <button
                    className="spellHeaderNewButton"
                    onClick={() => {
                        const newSpellEffectChoice = JSON.parse(localStorage.getItem("newSpellEffectChoice"));
                        console.log('other effect', document.getElementById('spellOtherEffect')?.value);
                        if(makeNewSpell) {
                            if( 
                                (document.getElementById('NewSpellName')?.value !== '') &&
                                ((document.getElementById('typeOfRange')?.value && document.getElementById('typeOfRange')?.value !== '---') || 
                                 (document.getElementById('spellRange')?.value)) &&
                                (determineSpellDC(document.getElementById('DCType')?.value, abilityBoxInfo) !== -1) &&
                                (document.getElementById('spellLevel')?.value !== '---') &&
                                (document.getElementById('castingTimeUnit')?.value !== '---') &&
                                (newSpellEffectChoice.spellEffectChoice !== 'N/A') &&
                                (((newSpellEffectChoice.spellEffectChoice === 'damage' || newSpellEffectChoice.spellEffectChoice === 'healing') && 
                                   (document.getElementById('typeOfSpellDice')?.value !== 'Type')) || 
                                  (newSpellEffectChoice.spellEffectChoice === 'other' && (document.getElementById('spellOtherEffect')?.value)))
                                ){

                                    console.log('type spell dice', document.getElementById('typeOfSpellDice')?.value);
                                    console.log('# spell dice', document.getElementById('numberOfSpellDice')?.value);
                                const spellLevel = parseInt(document.getElementById('spellLevel')?.value);
                                const newSpell = {
                                    spellName: document.getElementById('NewSpellName')?.value, 
                                    castingTimeValue:document.getElementById('castingTimeValue')?.value, 
                                    castingTimeUnit: document.getElementById('castingTimeUnit')?.value, 
                                
                                    spellRange: document.getElementById('typeOfRange')?.value ? 
                                        document.getElementById('typeOfRange')?.value : 
                                        document.getElementById('spellRange')?.value,

                                    //DCType: determineSpellDC(document.getElementById('DCType')?.value, abilityBoxInfo), 
                                    DCType: document.getElementById('DCType')?.value,
                                    spellLevel: spellLevel, 
                                    spellEffectChoice: newSpellEffectChoice.spellEffectChoice ? newSpellEffectChoice.spellEffectChoice : 'N/A', 

                                    spellOtherEffect: (newSpellEffectChoice.spellEffectChoice === 'other') ? 
                                        document.getElementById('spellOtherEffect')?.value : 'N/A',

                                    typeOfDice: (newSpellEffectChoice.spellEffectChoice === 'damage' || newSpellEffectChoice.spellEffectChoice === 'healing') ?
                                        document.getElementById('typeOfSpellDice')?.value : -1,

                                    numberOfDice: (newSpellEffectChoice.spellEffectChoice === 'damage' || newSpellEffectChoice.spellEffectChoice === 'healing') ? 
                                        document.getElementById('numberOfSpellDice')?.value : -1,
                                
                                    notes: document.getElementById('NewSpellNotes')?.value,
                                };
                                console.log('New Spell', newSpell);
                                spellCardArray[spellLevel].push(newSpell);
                                setSpellCards(spellCardArray);
                                setMakeNewSpell(false);
                            }
                            
                        } else {
                            // spellCardArray[cantrip.spellLevel].push(cantrip);
                            // setSpellCards(spellCardArray);
                            // spellCardArray[cantrip.spellLevel].push(fourLevel);
                            // setSpellCards(spellCardArray);
                            // spellCardArray[cantrip.spellLevel].push(threeLevel);
                            // setSpellCards(spellCardArray);
                            setMakeNewSpell(true);
                        }
                    }}> {makeNewSpell ? 'Add Spell' : 'Make New Spell'}</button>
                </div>
                <div className="spellHeaderInfoBox">
                    <div className="spellModifierBox">
                        {spellInfoIsEdit ? 
                            <input  className="spellModifierEditBox" 
                                    id="MOD" 
                                    type='number' 
                                    min={-5} max={20}
                                    defaultValue={spellMod}></input> : 
                            <div className="spellModifierUpperBox">
                                +{spellMod}
                            </div>
                        }
                        <div className="spellModifierLowerBox">
                            Modifier
                        </div>
                    </div>
                    <div className="spellBonusBox">
                        {spellInfoIsEdit ? 
                            <input  className="spellBonusUpperEditBox" 
                                    id="BONUS" 
                                    type='number' 
                                    min={-5} max={20}
                                    defaultValue={spellBonus}></input> : 
                            <div className="spellBonusUpperBox">
                                +{spellBonus}
                            </div>
                        }
                        <div className="spellBonusLowerBox">
                            ATK Bonus
                        </div>
                    </div>
                    <div className="spellSaveDCBox">
                        {spellInfoIsEdit ? 
                            <input  className="spellSaveDCUpperEditBox" 
                                    id="DC" 
                                    type='number' 
                                    min={0} max={40}
                                    defaultValue={spellSaveDC}></input> : 
                            <div className="spellSaveDCUpperBox">
                                +{spellSaveDC}
                            </div>
                        }
                        <div className="spellSaveDCLowerBox">
                            Save DC
                        </div>
                    </div>
                    <button 
                    className="spellInfoEditButton"
                    onClick={(e) => {
                        spellInfoIsEdit ? 
                            updateSkillHeaderInfo( document.getElementById('MOD')?.value, 
                                                document.getElementById('BONUS')?.value, 
                                                document.getElementById('DC')?.value) :
                            updateSkillHeaderInfo(spellMod, spellBonus, spellSaveDC);
                        setSpellInfoIsEdit(!spellInfoIsEdit);
                        }}
                        >{spellInfoIsEdit ? 'save' : 'edit'}</button>
                </div>
            </div>
            {makeNewSpell ? 
                <MakeSpellCard 
                    newSpellInfo={newSpellInfo} 
                    makeNewSpell={makeNewSpell}/> : null}
            <div className="spellCardsMainBox">
                {/* {spellCardArray.map((spellObj, index) => {
                    console.log('spell array', spellCardArray);
                    console.log('spellObj', spellObj);
                    // console.log('attackObj name', spellObj.name);

                    return (
                        <Fragment>
                            {(index === 0 && spellObj[0]) ? 
                            <div className="spellFinalLevelHeader">
                                {index} Level
                            </div> : null}

                            {(spellObj[0]) ? 
                                <SpellCard 
                                    spellCardArray={spellCardArray}
                                    spellObj={spellObj} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}     */}
                {spellCardArray.map((spellSubArray) => {
                    return (
                        spellSubArray.map((spellObj, index) => {
                            console.log('spell array', spellCardArray);
                            console.log('spellSubArray', spellSubArray);
                            console.log('spellObj', spellObj);
                            // console.log('attackObj name', spellObj.name);
                            return (
                                <Fragment>
                                    {(index === 0 && spellObj) ? 
                                    <div className="spellFinalLevelHeader">
                                        {(spellObj.spellLevel === '0') ? `Cantrip` :
                                            `${spellObj.spellLevel} Level`}
                                    </div> : null}
        
                                    {(spellObj) ? 
                                        <SpellCard 
                                            spellSubArray={spellSubArray}
                                            spellObj={spellObj} 
                                            index={index}/> : null}
                                </Fragment>
                            )
                        }))
                })}                  
            </div>
        </div>
    </Fragment>

    )
}