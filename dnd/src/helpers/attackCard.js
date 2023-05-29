import { Fragment, useEffect, useState } from "react";
import React from "react";

const AttackCard2 = ({attackCardArray, attackObj, index}) => {
    // let testArray = [];
    // console.log("t", attackObj);

    // if(attackObj) {
    //     console.log("t", attackObj);
    //     attackObj.forEach(t => {
    //         testArray.push(t);
    //     })
    // } else {
    //     testArray = ["One", "Two", "Three"];
    // }
    console.log('attack card', attackCardArray);
    const [attackCards, setAttackCards] = useState(attackCardArray ? attackCardArray : []);
    console.log('in attack cards', attackCards);

    return (
        <Fragment>
            <div className="newLoneAttackBox" 
                 key={`${attackObj.name}_${index}`} 
                //  id={`${attackObj.name}_${index}`}
                 id={`${index}`}>
                 <div className="attackInfoUpperBox">
                     <div className="attackInfoNameBox">
                         <span>Name: {attackObj.name}</span>
                         {/* <input className="attackNameInput" id="AttackName" type={'text'}></input> */}
                     </div>
                     <div className="finalAttackBonusOuterBox">
                         <span className="attackBonusText">ATK Bonus</span>
                         <div className="finalAttackInnerBox">
                             <span className="finalAttackBonusText"> {attackObj.atkBonus} </span> 
                         </div>
                     </div>
                     <div 
                        className="DeleteAttackBox"
                        id={`${index}`}
                        onClick={(e) => {
                            attackCardArray.splice(e.target.id, 1);
                            setAttackCards(attackCardArray);
                        }}>
                        X
                     </div>
                     <button 
                        className="AttackBoxSaveButton"
                        onClick={(e) => {setAttackCards(attackCardArray);}}>{'save'}</button> 
                 </div>
                 <div className="attackNotesLowerBox">
                     <span className="attackNotesText">Notes</span>
                    <textarea
                    className="attackNotesInputBox"
                    value={attackObj.notes}
                    // onChange={(e) => {setWeaponProficiencies(e.target.value.toString())}}
                    cols={1}
                    rows={4}></textarea>
                 </div>
             </div>
        </Fragment>
    )
};
export default AttackCard2;