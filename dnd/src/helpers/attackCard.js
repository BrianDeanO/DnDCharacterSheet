import { Fragment, useEffect, useState } from "react";
import React from "react";

const AttackCard = ({attackObj, index}) => {
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
    console.log('attack OBJ', attackObj);

    return (
        <Fragment>
            <div className="newLoneAttackBox" key={`${attackObj.name}_${index}`} id={`${attackObj.name}`}>
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
export default AttackCard;