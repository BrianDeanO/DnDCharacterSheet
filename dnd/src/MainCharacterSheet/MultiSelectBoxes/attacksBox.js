import { Fragment, useEffect, useState, useMemo } from "react";
import React from "react";
import AttackCard2 from "../../helpers/attackCard";
import MakeAttackCard from "../../helpers/makeAttackCard";
import { determineModifier } from "../../helpers/determineModSign";

function fillAttackCardArray(attCards) {
    const temp = [];
    attCards.forEach((obj) => {
        temp.push(obj);
    })
    return temp;
}

const AttacksSelectionBox = ({attacks, abilityBoxInfo, newAttackInfo}) => {

    // function AttackCard (
    //     name,
    //     atkBonus,
    //     typeOfHitDice,
    //     numberOfHitDice,
    //     typeOfDamage,
    //     shortRange,
    //     longRange,
    //     notes) 
    // {
    //     this.name = name;
    //     this.atkBonus = atkBonus;
    //     this.typeOfHitDice = typeOfHitDice;
    //     this.numberOfHitDice =  numberOfHitDice;
    //     this.typeOfDamage =  typeOfDamage;
    //     this.shortRange =  shortRange;
    //     this.longRange =  longRange;
    //     this.notes = notes;
    // }
    console.log('attacks', attacks);

    const [attackCards, setAttackCards] = useState(attacks ? attacks.attackCardArray : []);
    //const [makeNewAttack, setMakeNewAttack] = useState(newAttackInfo ? newAttackInfo.makeNewAttack : false);
    const [makeNewAttack, setMakeNewAttack] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [attackCardBeingEdited, setAttackCardBeingEdited] = useState(-1);

    const [resetInfo, setResetInfo] = useState(false);

    const [numberOfAttacks, setNumberOfAttacks] =  useState(0);
    // const [attackBonus, setAttackBonus] = useState(newAttackInfo ? 
    //     resetInfo ? 0 : newAttackInfo.attackBonus : 0);
    // const [rangedOrMeleeAnswer, setRangedOrMeleeAnswer] = useState(newAttackInfo ? 
    //     resetInfo ? '' : newAttackInfo.rangedOrMeleeAnswer : '');
    // const [newAttackName, setNewAttackName] = useState(newAttackInfo ? 
    //     resetInfo ? '' : newAttackInfo.newAttackName : '');
    // const [newAttackNotes, setNewAttackNotes] = useState(newAttackInfo ? 
    //     resetInfo ? '' : newAttackInfo.newAttackNotes : '');
    // const [shortRange, setShortRange] = useState(newAttackInfo ? 
    //     resetInfo ? 0 : newAttackInfo.shortRange : 5);
    // const [longRange, setLongRange] = useState(newAttackInfo ? 
    //     resetInfo ? 0 : newAttackInfo.longRange : 5);
    // const [typeOfHitDice, setTypeOfHitDice] = useState(newAttackInfo ? 
    //     resetInfo ? 0 : newAttackInfo.typeOfHitDice : 4);
    // const [numberOfHitDice, setNumberOfHitDice] = useState(newAttackInfo ? 
    //     resetInfo ? 0 : newAttackInfo.numberOfHitDice : 1);
    // const [diceTypeSelected, setDiceTypeSelected] = useState(false);

    // const [attackBonus, setAttackBonus] = useState(0);
    // const [rangedOrMeleeAnswer, setRangedOrMeleeAnswer] = useState('');
    // const [newAttackName, setNewAttackName] = useState('');
    // const [newAttackNotes, setNewAttackNotes] = useState('');
    // const [shortRange, setShortRange] = useState(5);
    // const [longRange, setLongRange] = useState(5);
    // const [typeOfHitDice, setTypeOfHitDice] = useState(4);
    // const [numberOfHitDice, setNumberOfHitDice] = useState(1);

    const [diceTypeSelected, setDiceTypeSelected] = useState(false);


    // useEffect(() => {
    //     setNewAttackName(newAttackName);
    // }, [newAttackName]);


    const [finesseWeaponAnswer, setFinesseWeaponAnswer] = useState(false);
    const [proficientWithWeaponAnswer, setProficientWithWeaponAnswer] = useState(false);

    
    //const attackCardArray = ["1One", "2Two", "3Three"];
    console.log('attacks', attacks);
    console.log('attacks cards ', attackCards);

    // const attackCardArray = [];
    // if(attackCards) {
    //     attackCards.forEach((attackObj) => {
    //         console.log('keys', attackObj);
    //         attackCardArray.push(attackObj);
    //     })
    // }

    // function Attack({attackCards}) {
    //     const attackC = useMemo(() => MediaKeyStatusMap(attackCards), [attackCards]);
    // }


    const attackCardArray = useMemo(() => fillAttackCardArray(attackCards), [attackCards]);

    const aC = fillAttackCardArray(attackCards);

  //console.log('attackC', attackC)
    console.log('aC', aC)


    console.log('attacks', attacks);
    //console.log('attack card array', attacks.attackCardArray);
    
    // attacks.attackCardArray.forEach((attackObj, index) => {
    //     console.log("objec tof reach ", attackObj.name, index);
    //     const test = new AttackCard('Test Sword', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');

    //     attackCardArray.push(test);
    //     // return (
    //     //    new AttackCard('Trident', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown')
    //     // )
    // })

    let attackCardArray2 = [];
    const testCard = {
        name:'Trident', 
        atkBonus: 0, 
        typeOfHitDice: 4, 
        numberOfHitDice: 1, 
        typeOfDamage: 'Piercing',
        shortRange: 20,
        longRange: 60,
        notes: 'Finesse, Thrown'};
        
    const testCard2 = {
            name:'Spear', 
            atkBonus: 0, 
            typeOfHitDice: 4, 
            numberOfHitDice: 1, 
            typeOfDamage: 'Piercing',
            shortRange: 20,
            longRange: 60,
            notes: 'Finesse, Thrown'};

    // {name:'Trident'; atkBonus: 0; typeOfHitDice: 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown'};
    // if(!attackCardArray[0]) {
    //     attackCardArray.push(testCard);
    
    //     attackCardArray.push(testCard2);
    // }

    console.log('attack card array beofre', attackCardArray)


    useEffect(() => {
        // const temp = {
        //     name:'Hammer', 
        //     atkBonus: 0, 
        //     typeOfHitDice: 4, 
        //     numberOfHitDice: 1, 
        //     typeOfDamage: 'Piercing',
        //     shortRange: 20,
        //     longRange: 60,
        //     notes: 'Finesse, Thrown'
        // };
        // attackCardArray.push(temp);
        //setNewAttackName(newAttackName);

        localStorage.setItem("attacks", JSON.stringify(
            {attackCardArray}));


    }, [attackCardArray]);

    

//     useEffect(() => {
//         // setTempName(tempName);
//         // setTempNotes(tempNotes);
//         // setNewAttackName(tempName);
//         // setNewAttackNotes(tempNotes);
//     localStorage.setItem("newAttackInfo", JSON.stringify({
//         attackBonus: attackBonus,
//         rangedOrMeleeAnswer: rangedOrMeleeAnswer,
//         newAttackName: newAttackName,
//         newAttackNotes: newAttackNotes,
//         shortRange: shortRange,
//         longRange: longRange,
//         typeOfHitDice: typeOfHitDice,
//         numberOfHitDice: numberOfHitDice,
//         resetInfo: resetInfo,
//     }));
// }, [attackBonus, rangedOrMeleeAnswer, newAttackName, 
//     newAttackNotes, shortRange, longRange, typeOfHitDice, numberOfHitDice, resetInfo]);


    // useEffect(() => {
    //     localStorage.setItem("attacks", JSON.stringify(
    //         {attackCards}));
    // }, [attackCards]);
 


    // const testAttackCard = new AttackCard('Trident', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');
    // const testAttackCard2 = new AttackCard('Spear', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');

    //const testCard = {name: "test"};


    console.log('attackCard array', attackCardArray);

    // function resetNewAttackInfo() {
    //     localStorage.setItem("newAttackInfo", JSON.stringify({
    //         attackBonus: 0,
    //         rangedOrMeleeAnswer: '',
    //         newAttackName: '',
    //         newAttackNotes: '',
    //         shortRange: 5,
    //         longRange: 5,
    //         typeOfHitDice: 4,
    //         numberOfHitDice: 1,
    //         makeNewAttack: false,
    //     }));
    // }
    

    const AttackCard = ({attackCardArray, attackObj, index}) => {
        console.log('attack card', attackCardArray);
        
        const [notes, setNotes] = useState(attackObj ? attackObj.notes : "");
        const damageBonus = attackObj.versatile ? 
        ((abilityBoxInfo.str >= abilityBoxInfo.dex) ? 
            determineModifier(abilityBoxInfo.str) : determineModifier(abilityBoxInfo.dex)) : 
        ((attackObj.longRange === -1) ? 
        determineModifier(abilityBoxInfo.str) :  determineModifier(abilityBoxInfo.dex));

        console.log("damage bons", damageBonus);
        console.log('str', determineModifier(abilityBoxInfo.str));
        console.log('dex', determineModifier(abilityBoxInfo.dex));

        useEffect(() => {
            setNotes(notes);
        }, [notes]);
    
        return (
            <Fragment>
                <div className="newLoneAttackBox" 
                     key={`${attackObj.name}_${index}`} 
                    //  id={`${attackObj.name}_${index}`}
                     id={`${index}`}>
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
                        // onFocus={()  => {
                        //     setAttackCards(attackCardArray);
                        // }}
                        onChange={(e) => {
                            //setWeaponProficiencies(e.target.value.toString());
                            console.log('id', e.target.id, 'notes', attackCardArray[e.target.id]);
                            console.log('entered', e.target.value);
                            attackCardArray[e.target.id].notes = e.target.value.toString();
                            //attackObj.notes = e.target.value.toString();
                            setNotes(attackObj.notes);
                            //setAttackCards(attackCardArray);
                        }}
                        cols={1}
                        rows={4}></textarea>
                     </div>
                 </div>
            </Fragment>
        )
    };

    return (
        <Fragment>
            <div className="Notes-MultiSelectBox" id="attackTest">
                <div className="attackHeader">
                    <div className="attackHeaderText">ATTACKS</div>
                    <button
                    className="attackHeaderNewButton"
                    onClick={() => {
                        // const test = new AttackCard('Hammer', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');
                        if(makeNewAttack) {
                            if( (document.getElementById('rangedOrMeleeAnswer')?.value !== '') &&
                                (document.getElementById('typeOfHitDice')?.value !== 'Type') &&
                                (document.getElementById('typeOfDamage')?.value !== 'Select Type')) {
                                const newAttack = {
                                    name: document.getElementById('NewAttackName')?.value, 
                                    atkBonus: document.getElementById('attackBonus')?.value, 
                                    typeOfHitDice: document.getElementById('typeOfHitDice')?.value, 
                                    numberOfHitDice: document.getElementById('numberOfHitDice')?.value,
                                    versatile:  (document.getElementById('Versatile').className === 'versatileOptionBoxactive') ? true : false, 
                                    typeOfDamage: document.getElementById('typeOfDamage')?.value,
                                    shortRange: document.getElementById('shortRange')?.value,
                                    longRange: document.getElementById('longRange')?.value ? 
                                        document.getElementById('longRange')?.value : -1,
                                    notes: document.getElementById('NewAttackNotes')?.value,
                                };
                                console.log('IN temp2', newAttack);
                                attackCardArray.push(newAttack);
                                setAttackCards(attackCardArray);
                            }
                            setResetInfo(true);
                            // resetNewAttackInfo();
                            setMakeNewAttack(false);
                        } else {
                            setResetInfo(true);
                            // resetNewAttackInfo();
                            setMakeNewAttack(true);
                        }
                    }}> {makeNewAttack ? 'Add Attack' : 'Make New Attack'}</button>
                </div>
                {makeNewAttack ? 
                    <MakeAttackCard 
                        newAttackInfo={newAttackInfo} 
                        makeNewAttack={makeNewAttack}
                        resetInfo={resetInfo}/> : <div></div>}

                <div className="Test2">
                    {attackCardArray.map((attackObj, index) => {
                        console.log('attackObj', attackObj);
                        console.log('attackObj name', attackObj.name);
                        return (
                            <AttackCard 
                                attackCardArray={attackCardArray}
                                attackObj={attackObj} 
                                index={index}/>
                            // <TestBox2 attName={attackObj} index={index}/>
                            // <div key={index} className="Test">
                            //     {attackObj}
                            // </div>
                            
                        );
                    })}                
                </div>


            </div>
        </Fragment>
    )
}

export default AttacksSelectionBox;