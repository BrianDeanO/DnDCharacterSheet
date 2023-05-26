import { Fragment, useEffect, useState } from "react";
import React from "react";
import AttackCard from "../../helpers/attackCard";

const AttacksSelectionBox = ({attacks, abilityBoxInfo}) => {

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
    

    const [numberOfAttacks, setNumberOfAttacks] =  useState(0);
    const [attackBonus, setAttackBonus] = useState(0);
    const [rangedOrMeleeAnswer, setRangedOrMeleeAnswer] = useState(false);
    const [finesseWeaponAnswer, setFinesseWeaponAnswer] = useState(false);
    const [proficientWithWeaponAnswer, setProficientWithWeaponAnswer] = useState(false);
    const [attackCards, setAttackCards] = useState(attacks ? attacks : []);

    
    //const attackCardArray = ["1One", "2Two", "3Three"];
    console.log('attacks', attacks);
    console.log('attacks cards ', attackCards);

    let attackCardArray = [];
    if(attacks) {
        attacks.attackCardArray.forEach((attackObj) => {
            console.log('keys', attackObj)
            attackCardArray.push(attackObj);
        })
    }

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

    useEffect(() => {
        localStorage.setItem("attacks", JSON.stringify(
            {attackCardArray: attackCardArray}));
    }, [attackCardArray]);
 


    // const testAttackCard = new AttackCard('Trident', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');
    // const testAttackCard2 = new AttackCard('Spear', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');

    //const testCard = {name: "test"};
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
    // attackCardArray.push(testCard);
    
    // attackCardArray.push(testCard2);

    console.log('attackCard array', attackCardArray);

    // // WILL JUST HAVE TO DO THIS

    // function createNewAttackBox(index: number) {
    //     console.log('new attack click');
    //     const newAttackBox = document.createElement('div');
    //     newAttackBox.innerHTML = newAttackBoxString(index);
    //     newAttackBox.className = 'newLoneAttackBox';
    //     document.getElementById('attackTest')!.appendChild(newAttackBox);
    // }

    // function newAttackBoxString(index) {

    //     return (
    //         `<div className="newLoneAttackBox">
    //             <div className="attackInfoUpperBox">
    //                 <div className="attackInfoNameBox">
    //                     <span>Name</span>
    //                     <input className="attackNameInput" id="AttackName" type={'text'}></input>
    //                 </div>
    //                 <div className="finalAttackBonusOuterBox">
    //                     <span className="attackBonusText">ATK Bonus</span>
    //                     <div className="finalAttackInnerBox">
    //                         <span className="finalAttackBonusText"> +${attackCardArray[attackCardArray.length-1].atkBonus} </span> 
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="attackNotesLowerBox">
    //                 <span className="attackNotesText">Notes</span>
    //                 <textarea className="attackNotesInputBox"></textarea>
    //             </div>
    //         </div>
    //     `)
    // };

    const attackObj = {

    }

    /*


        MAKE THE ATTACK CARD OBJECT.
        ADD EACH NEW OBJECT TO THE LOCAL STORAGE ARRAY
            attackCards.push(newObj);
        WRITE TO LOCAL STORAGE EACH TIME.
        THE FUNCTION THAT DISPLAYS THE CARD WILL BE A FOR LOOP THAT CREATES THE DIV ELEMENTS

    */

    function handleAttackClick() {
        console.log('attack click');
        const attackButton = document.getElementById('AttacksBoxButton');
        if(attackButton.className === 'activeButton') {
            attackButton.className = 'AttacksBoxButton';
        } else {
            attackButton.className = 'activeButton';
        }
        // attackButton.className = 'AttacksBoxButtonActive';
        const newAttackBox = document.createElement('div');
        newAttackBox.innerHTML = `<div> hello there! </div>`;
        newAttackBox.className = 'newLoneAttackBox';
        document.getElementById('attackTest').appendChild(newAttackBox);
    }

    // function handleNewAttackBox() {
    //     // const attackName = document.getElementById('AttackName')!.value;
    //     // console.log(attackName);
    //     // // if(numberOfAttacks === 0) {
    //     // //     const temp = new AttackCard(attackName, 5, 4, 2, 'Piercing', 20, 60, 'Finesse, Thrown' );
    //     // //     attackCardArray[numberOfAttacks] = temp;
    //     // // } else {

    //     // // }
    //     // const temp = new AttackCard(attackName, 5, 4, 2, 'Piercing', 20, 60, 'Finesse, Thrown' );
    //     // attackCardArray.push(temp);
    //     // console.log('temp', temp);
    //     console.log('attacks', numberOfAttacks);
    //     console.log('arrayTemp', attackCardArray[numberOfAttacks]);
    //     //setNumberOfAttacks(numberOfAttacks + 1);
    //     //createNewAttackBox(0);
    //     if(proficientWithWeaponAnswer === false) {
    //         alert('Not Finished Creating Attack');
    //     } else {
    //         createNewAttackBox(0);
    //     }
    // }


    return (
        <Fragment>
            <div className="Notes-MultiSelectBox" id="attackTest">
                

                <div className="attackHeader">
                    <div className="attackHeaderText">ATTACKS</div>
                    <button
                    className="attackHeaderNewButton"
                    onClick={() => {

                        // const test = new AttackCard('Hammer', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');

                        const temp = {
                            name:'Hammer', 
                            atkBonus: 0, 
                            typeOfHitDice: 4, 
                            numberOfHitDice: 1, 
                            typeOfDamage: 'Piercing',
                            shortRange: 20,
                            longRange: 60,
                            notes: 'Finesse, Thrown'
                        };
                        attackCards.attackCardArray.push(temp);
                        setAttackCards(attackCards);
                        console.log('attack card', attackCardArray);
                        console.log('attack cardaa', attackCards);
                    }}
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

                         {/* {proficientWithWeaponAnswer ? <FinalAttackBonusBox /> :
                        (<div className="attackBonusOuterBox">
                            <span className="attackBonusText">Attack Bonus</span>
                            <div className="attackBonusChoicesBox">
                            {proficientWithWeaponAnswer ? <FinalAttackBonusBox /> :
                                (rangedOrMeleeAnswer ?
                                (finesseWeaponAnswer ? <ProficientWithWeaponBoxQuestion /> :
                                    <FinesseWeaponBoxQuestion />) :
                                        <RangedOrMeleeBoxQuestion />)}
                            </div>
                        </div>)}  */}

                    </div>
                    <div className="attackNotesLowerBox">
                        <span className="attackNotesText">Notes</span>
                        <textarea className="attackNotesInputBox"></textarea>
                    </div>

                </div>

            <div className="Test2">
                
                {attackCardArray.map((attackObj, index) => {
                    console.log('attackObj', attackObj);
                    console.log('attackObj name', attackObj.name);
                    return (
                        <AttackCard attackObj={attackObj} index={index}/>
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