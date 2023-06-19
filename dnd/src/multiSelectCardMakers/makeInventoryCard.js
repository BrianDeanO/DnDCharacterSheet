import { Fragment, useEffect, useState } from "react";
import React from "react";

const MakeInventoryCard = () => {

    const [newItemName, setNewItemName] = useState('');

    const [itemType, setItemType] = useState(document.getElementById('itemType')?.value ? document.getElementById('itemType')?.value : '');
    const [itemOtherTypeAnswer, setItemOtherTypeAnswer] = useState('');

    const [itemCost, setItemCost] = useState(0);
    const [itemWeight, setItemWeight] = useState(0);
    const [itemQty, setItemQty] = useState(1);
    const [newItemNotes, setNewItemNotes] = useState('');

    useEffect(() => {
       console.log('item cost', document.getElementById('itemCost')?.value);
    //    console.log('other tem type answer', document.getElementById('itemOtherTypeAnswer')?.value);
    //    console.log('normal item type answer', document.getElementById('itemType')?.value);

        //setRangedAnswer(rangedAnswer);
        //console.log('get elem ID', document.getElementById('typeOfRange')?.value);
    }, [itemType]);

    return (
        <div className="loneItemBox">
            <div className="newItemInfoUpperBox">
                <div className="itemNameInputBox">
                    <span className="inventoryCardText">Name</span>
                    <textarea
                        className="itemNameInput"
                        value={newItemName}
                        id={'newItemName'}
                        onChange={(e) => {setNewItemName(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
                </div>
                {(itemType === 'Other') ? 
                    <div className="itemTypeSelectorBox">
                        <div className="itemOtherTypeSelectorTextBox">
                            <span className="itemOtherTypeLeftLabel">Type</span>
                            <span className="itemOtherTypeRightLabel">(other)</span>
                        </div>
                        <textarea
                            className="itemTypeInput"
                            value={itemOtherTypeAnswer}
                            id={'itemOtherTypeAnswer'}
                            placeholder="ex. Holy Symbol"
                            onChange={(e) => {setItemOtherTypeAnswer(e.target.value.toString());}}
                            cols={1}
                            rows={1}></textarea>
                    </div> : 
                    <div className="itemTypeSelectorBox">
                        <div className="itemTypeSelectorText">Type</div>
                        <select 
                            className="itemTypeSelector" 
                            id="itemType"
                            onClick={(e) => {
                                console.log('on click', e.target.value);
                                setItemType(e.target.value);
                            }}>
                                <option>---</option>
                                <option value={'Armor'}>Armor</option>
                                <option value={'Potion'}>Potion</option>
                                <option value={'Ring'}>Ring</option>
                                <option value={'Rod'}>Rod</option>
                                <option value={'Scroll'}>Scroll</option>
                                <option value={'Staff'}>Staff</option>
                                <option value={'Wand'}>Wand</option>
                                <option value={'Weapon'}>Weapon</option>
                                <option value={'Wondrous'}>Wondrous</option>
                                <option value={'Other'}>Other</option>
                        </select>
                    </div>}
                <div className="itemCostBox">
                    <div className="itemCostTitleText">
                        <span className="itemCostLeftLabel">Cost</span>
                        <span className="itemCostRightLabel">(gp)</span>
                    </div>
                    <input
                            className="itemCostNumberDial"
                            id="itemCost"
                            type="number"
                            value={itemCost}
                            min={0}
                            max={99999}
                            onChange={(e) => {
                                setItemCost(parseInt(e.target.value.toString()));
                            }}></input>    
                </div>
                <div className="itemRaritySelectorBox">
                    <div className="itemRaritySelectorText">Rarity</div>
                    <select className="itemRaritySelector" id="itemRarity">
                            <option>---</option>
                            <option value={'Common'}>Common</option>
                            <option value={'Uncommon'}>Uncommon</option>
                            <option value={'Rare'}>Rare</option>
                            <option value={'Very Rare'}>Very Rare</option>
                            <option value={'Legendary'}>Legendary</option>
                    </select>
                </div>
                <div className="itemWeightChoiceBox">
                    <div className="itemWeightText">Weight</div>
                    <div className="itemWeightSelectorBox">
                        <input
                            className="itemWeightDial"
                            id="itemWeight"
                            type="number"
                            defaultValue={itemWeight}
                            min={0}
                            max={99999}
                        ></input>
                        <div className="itemWeightPoundText">
                                lb.
                        </div>
                    </div>
                </div>

            </div>
            <div className="newItemNotesLowerBox">
                <span className="spellNotesText">Notes</span>
                <textarea
                        className="spellNotesInputBox"
                        value={newItemNotes}
                        id={'newItemNotes'}
                        onChange={(e) => {
                            setNewItemNotes(e.target.value.toString());
                        }}
                        cols={1}
                        rows={1}></textarea>  
                <div className="itemQtyBox">
                    <div className="itemQtyTitleText">Quantity</div>
                    <input
                            className="itemQtyNumberDial"
                            id="itemQty"
                            type="number"
                            value={itemQty}
                            min={1}
                            max={999}
                            onChange={(e) => {
                                setItemQty(parseInt(e.target.value.toString()));
                            }}></input>    
                </div>
            </div>
        </div> 
    );
};
export default MakeInventoryCard;