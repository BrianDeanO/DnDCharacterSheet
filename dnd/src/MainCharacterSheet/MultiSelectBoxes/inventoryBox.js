import { Fragment, useEffect, useMemo, useState } from "react";
import React from "react";
import { fillCardArray } from "../../helpers/fillCardArrays";
import MakeInventoryCard from "../../multiSelectCardMakers/makeInventoryCard";

export const InventorySelectionBox = () => {

    const inventory = JSON.parse(localStorage.getItem("inventory"));
    const inventoryHeaderInfo = JSON.parse(localStorage.getItem("inventoryHeaderInfo"));

    console.log('coin info', inventoryHeaderInfo);
    console.log('inventory', inventory);

    const [inventoryCards, setInventoryCards] = useState(inventory ? inventory.inventoryItemArray : []);
    const [makeNewItem, setMakeNewItem] = useState(false);
    const [itemIsEdit, setItemIsEdit] = useState(-1);
    const [isEdit, setIsEdit] = useState(false);
    const [coinIsEdit, setCoinIsEdit] = useState(false);

    const [platinumPieces, setPlatinumPieces] = useState(inventoryHeaderInfo ? inventoryHeaderInfo.platinum : 0);
    const [goldPieces, setGoldPieces] = useState(inventoryHeaderInfo ? inventoryHeaderInfo.gold : 0);
    const [silverPieces, setSilverPieces] = useState(inventoryHeaderInfo ? inventoryHeaderInfo.silver : 0);
    const [copperPieces, setCopperPieces] = useState(inventoryHeaderInfo ? inventoryHeaderInfo.copper : 0);

    const [totalWeight, setTotalWeight] = useState(inventoryHeaderInfo ? inventoryHeaderInfo.totalWeight : 0);

    console.log('cards', inventoryCards);

    const inventoryItemArray = useMemo(() => fillCardArray(inventoryCards), [inventoryCards]);

    console.log('after item array', inventoryItemArray);

    useEffect(() => {
        localStorage.setItem("inventory", JSON.stringify({inventoryItemArray}));
    }, [inventoryItemArray]);

    useEffect(() => {
        localStorage.setItem("inventoryHeaderInfo", JSON.stringify({
            totalWeight: totalWeight,
            platinum: platinumPieces,
            gold: goldPieces,
            silver: silverPieces,
            copper: copperPieces,
        }));
    }, [totalWeight, platinumPieces, goldPieces ,silverPieces ,copperPieces]);

    function updateCoinInfo(pp, gp, sp, cp) {
        console.log('PP', document.getElementById('PP')?.value);
        console.log('GP', document.getElementById('GP')?.value);
        console.log('SP', document.getElementById('SP')?.value);
        console.log('CP', document.getElementById('CP')?.value);

        setPlatinumPieces(pp);
        setGoldPieces(gp);
        setSilverPieces(sp);
        setCopperPieces(cp);
    }

    console.log('total weight', totalWeight);

    const InventoryCard = ({inventoryItemArray, itemObj, index}) => {
        // console.log('inventory', inventory);
        // console.log('invetnory card array', inventoryItemArray);
        
        const [notes, setNotes] = useState(itemObj ? itemObj.notes : "");

        useEffect(() => {
            setNotes(notes);
            localStorage.setItem("inventory", JSON.stringify({inventoryItemArray}));
        }, [notes, inventoryItemArray]);

        // const test = "The Armor Of Agathist - Fire";
        // console.log('test', test.length);
    
        return (
            <div className="newLoneItemBox" 
                key={`${itemObj.name}_${index}`}
                id={`${index}`}
                >
                <div className="itemInfoUpperBox">
                    <div className="itemNameBox">
                        <span className={
                            (itemObj.itemName.length >= 28) ? 
                            (itemObj.itemName.length >= 31) ? "itemNameTextExtraLong" : 
                                "itemNameTextLong" : "itemNameTextNormal"}>
                            {itemObj.itemName}
                        </span>
                        <span className="itemTypeIndicatorText">
                            {`(${itemObj.itemType} - ${itemObj.itemRarity})`}
                        </span>
                    </div>
                    <div className="finalWeightBox">
                        <div>Weight</div>
                        <div className="weightBoxText">
                            {itemObj.itemWeight} lb.
                        </div>
                    </div>
                    <div className="finalQtyBox">
                        <div className="qtyBoxTitleText">QTY</div>
                        <div className="qtyBoxText">
                            {(itemObj.itemQty === '1') ? "---" : `${itemObj.itemQty}`}
                        </div>
                    </div>
                    <div className="finalCostBox">
                        <div className="costGoldUpperBox">
                            <div className="costGoldTextTitle"> Cost </div>
                            <div className="costGoldText"> (gp) </div>
                        </div>
                        <div className="costGoldLowerBox">
                            {itemObj.itemCost}
                        </div>
                    </div>
                    <div 
                    className="DeleteItemBox"
                    id={`${index}`}
                    onClick={(e) => {
                        setTotalWeight(totalWeight - parseInt(inventoryItemArray[e.target.id].itemWeight));
                        inventoryItemArray.splice(e.target.id, 1);
                        setInventoryCards(inventoryItemArray);
                    }}>X</div>
                </div>
                <div className="attackNotesLowerBox">
                <div className="attackNotesInnerBox">
                    <span className="attackNotesText">Notes</span>
                    <button 
                    className="AttackBoxSaveButton"
                    id={`${index}`}
                    onClick={(e) => {
                        (itemIsEdit === -1) ? 
                            setItemIsEdit(index) : setItemIsEdit(-1);
                        setIsEdit(!isEdit);
                        }}>
                            {(isEdit && (itemIsEdit === index)) ? 'save notes' : 'edit notes'}
                    </button> 
                </div>

                <textarea
                className="finalAttackNotesBox"
                value={itemObj.notes}
                id={`${index}`}
                onChange={(e) => {
                    inventoryItemArray[e.target.id].notes = e.target.value.toString();
                    setNotes(itemObj.notes);
                }}
                cols={1}
                rows={4}></textarea>
                </div>
            </div>
        )
    };

    return (
        <Fragment>
            <div className="Inventory-MultiSelectBox">
                <div className="inventoryHeader">
                    <div className="inventoryTitleAndButtonBox"> 
                        <div className="inventoryHeaderText">INVENTORY</div>
                        <button
                        className="inventoryHeaderNewButton"
                        onClick={() => {
                            if(makeNewItem) {
                                if( 
                                    (document.getElementById('NewItemName')?.value !== '') &&
                                    ((document.getElementById('itemType')?.value && document.getElementById('itemType')?.value !== '---') || 
                                    (document.getElementById('itemOtherTypeAnswer')?.value)) &&
                                    (document.getElementById('itemWeight')?.value !== 0)){

                                    const newItem = {
                                        itemName: document.getElementById('newItemName')?.value, 
                                        itemType: document.getElementById('itemOtherTypeAnswer')?.value ? 
                                                    document.getElementById('itemOtherTypeAnswer')?.value :
                                                    document.getElementById('itemType')?.value, 
                                        itemCost: document.getElementById('itemCost')?.value, 
                                        itemRarity: document.getElementById('itemRarity')?.value,
                                        itemWeight: document.getElementById('itemWeight')?.value,
                                        itemQty: document.getElementById('itemQty')?.value,
                                        notes: document.getElementById('newItemNotes')?.value,
                                    };

                                    setTotalWeight(parseInt(totalWeight + parseInt(document.getElementById('itemWeight')?.value)));
                                  //  console.log('New Item', newItem);
                                    inventoryItemArray.push(newItem);
                                    setInventoryCards(inventoryItemArray);
                                    setMakeNewItem(false);
                                }
                            } else {
                                setMakeNewItem(true);
                            }
                        }}> {makeNewItem ? 'Add Item' : 'Make New Item'}</button>
                    </div>
                    <div className="inventoryHeaderInfoBox">
                        <div className="coinOuterBox">
                            <div className="coinHeaderBox">
                                <div className="coinTitle">
                                    Coins
                                </div>
                                <button 
                                className="coinEditButton"
                                onClick={(e) => {
                                    coinIsEdit ? 
                                        updateCoinInfo( document.getElementById('PP')?.value, 
                                                        document.getElementById('GP')?.value, 
                                                        document.getElementById('SP')?.value,
                                                        document.getElementById('CP')?.value) :
                                        updateCoinInfo(platinumPieces, goldPieces, silverPieces, copperPieces);
                                        setCoinIsEdit(!coinIsEdit);
                                    }}
                                    >{coinIsEdit ? 'save' : 'edit'}</button>
                            </div>
                            <div className="allCoinHolderBox">
                                <div className="coinLeftBox">
                                    <div className="coinDisplayBox">
                                        <div className="platinumCoinLabelText">
                                            Platinum:
                                        </div>
                                        {coinIsEdit ? 
                                            <input  className="platinumCoinIncrementBox" 
                                                    id="PP" 
                                                    type='number' 
                                                    min={-9999} max={9999}
                                                    defaultValue={platinumPieces}></input> : 
                                            <div className="platinumCoinValueText">
                                                {platinumPieces}
                                            </div>
                                        }
                                    </div>
                                    <div className="coinDisplayBox">
                                        <div className="silverCoinLabelText">
                                            Silver:
                                        </div>
                                        {coinIsEdit ? 
                                            <input  className="silverCoinIncrementBox" 
                                                    id="SP" 
                                                    type='number' 
                                                    min={-9999} max={9999}
                                                    defaultValue={silverPieces}></input> : 
                                            <div className="silverCoinValueText">
                                                {silverPieces}
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="coinRightBox">
                                    
                                    <div className="coinDisplayBox">
                                        <div className="goldCoinLabelText">
                                            Gold:
                                        </div>
                                        {coinIsEdit ? 
                                            <input  className="goldCoinIncrementBox" 
                                                    id="GP" 
                                                    type='number' 
                                                    min={-9999} max={9999}
                                                    defaultValue={goldPieces}></input> : 
                                            <div className="goldCoinValueText">
                                                {goldPieces}
                                            </div>
                                        }
                                    </div>
                                    <div className="coinDisplayBox">
                                        <div className="copperCoinLabelText">
                                            Copper:
                                        </div>
                                        {coinIsEdit ? 
                                            <input  className="copperCoinIncrementBox" 
                                                    id="CP" 
                                                    type='number' 
                                                    min={-9999} max={9999}
                                                    defaultValue={copperPieces}></input> : 
                                            <div className="copperCoinValueText">
                                                {copperPieces}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="totalWeightBox">
                            <div className="totalWeightText">
                                Total Weight
                            </div>
                            <div className="totalWeightText">
                                {totalWeight} lb.
                            </div>
                        </div>
                    </div>

                </div>
                {makeNewItem ? 
                    <MakeInventoryCard /> : null}
                <div className="inventoryCardsMainBox">
                    {inventoryItemArray.map((itemObj, index) => {
                        console.log('attackObj', itemObj, index);
                        console.log('attackObj name', itemObj.itemName);
                        return (
                            <InventoryCard 
                                inventoryItemArray={inventoryItemArray}
                                itemObj={itemObj} 
                                index={index}/>
                        );
                    })}                  
                </div>
            </div>
        </Fragment>
    )
}