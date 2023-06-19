import { Fragment, useEffect, useState, useMemo } from "react";
import React from "react";
import { fillDescriptionArray } from "../../helpers/fillCardArrays";
import MakeDescriptionCard from "../../multiSelectCardMakers/makeDescriptionCard";

export const DecriptionSelectionBox = () => {
    const characterInfo = JSON.parse(localStorage.getItem("characterInfo"));
    const descriptions = JSON.parse(localStorage.getItem("descriptions"));

    console.log('pass in traits', descriptions);

    const [descriptionCards, setDescriptionCards] = useState(descriptions ? descriptions.descriptionArray : []);
    const [makeNewEntry, setMakeNewEntry] = useState(false);
    const [itemIsEdit, setItemIsEdit] = useState(-1);
    const [isEdit, setIsEdit] = useState(false);
    
    const [entryCardBeingEdited, setEntryCardBeingEdited] = useState('NO');
    const [descriptionBoxSelection, setDescriptionBoxSelection] = useState('ALL');

    const [isAddBackground, setIsAddBackground] = useState(false);
    const [isAddCharacteristic, setIsAddCharacteristic] = useState(false);
    const [isAddAppearance, setIsAddAppearance] = useState(false);
    const backgroundIndex = 0;
    const characteristicIndex = 1;
    const appearanceIndex = 2;

    console.log('after cards', descriptionCards);

    const descriptionArray = useMemo(() => fillDescriptionArray(descriptionCards), [descriptionCards]);

    console.log('feat array', descriptionArray);

    useEffect(() => {
        localStorage.setItem("descriptions", JSON.stringify({descriptionArray}));
    }, [descriptionArray]);

    const DescriptionCard = ({descriptionCardArray, descriptionCard, index}) => {
        const [details, setDetails] = useState(descriptionCard ? descriptionCard.descriptionDetails : "");

        useEffect(() => {
            setDetails(details);
            localStorage.setItem("descriptions", JSON.stringify({descriptionCardArray}));
        }, [details, descriptionCardArray]);

        // const test = "The Armor Of Agathist - Fire";
        // console.log('test', test.length);
    
        return (
            <div className="newLoneEntryBox" 
                key={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                >
                <div className="finalEntryInfoUpperBox">
                    <div className="finalEntryTitleBox">
                        <span className={"finalEntryTitleTextNormal"}>
                            {descriptionCard.descriptionTitle}
                        </span>
                    </div>
                    <div 
                    className="DeleteEntryBox"
                    id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                    onClick={(e) => {
                        descriptionCardArray[descriptionCard.descriptionCategoryIndex].splice(index, 1);
                        setDescriptionCards(descriptionCardArray);
                    }}>X</div>
                </div>
                <div className="entryDetailsLowerBox">
                    <div className="finalEntryDetailsInnerBox">
                        <span className="finalEntryDetailsText">Details</span>
                        <button 
                        className="EntryBoxSaveButton"
                        id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                        onClick={(e) => {
                            (entryCardBeingEdited === 'NO') ? 
                            setEntryCardBeingEdited(`${descriptionCard.descriptionCategoryIndex}_${index}`) : setEntryCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            }}>
                                {(isEdit && (entryCardBeingEdited === `${descriptionCard.descriptionCategoryIndex}_${index}`)) ? 'save notes' : 'edit notes'}
                        </button> 
                    </div>

                    <textarea
                    className="finalEntryDetailsBox"
                    value={descriptionCard.entryDetails}
                    id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                    onChange={(e) => {
                        descriptionCardArray[descriptionCard.descriptionCategoryIndex][index].entryDetails = e.target.value.toString();
                        setDetails(descriptionCard.entryDetails);
                    }}
                    cols={1}
                    rows={4}></textarea>
                </div>
            </div>
        )
    }

    const MultiFeatsAndTraitsBox = () => {
        // console.log('mult select', multiBoxSelection);
        switch(descriptionBoxSelection) {
            case 'BACKGROUND':
                return (<BackgroundSubBox />)
            case 'CHARACTERISTICS':
                return (<CharacteristicsSubBox />)
            case 'APPEARANCE':
                return (<AppearanceSubBox />)
            default:
                return (
                <Fragment>
                    <BackgroundSubBox />
                    <CharacteristicsSubBox />
                    <AppearanceSubBox />
                </Fragment>)
        }
    }
    
    const BackgroundSubBox = () => {
        return(
            <Fragment>
                <div className="ClassFeatsSubBoxHeader">
                    <div className="classFeatsText">
                        Background
                    </div>
                    {(!(descriptionArray[backgroundIndex][0])) ? 
                        <button
                            className="addClassFeatButton"
                            onClick={() => {
                                if(isAddBackground) {
                                    if( (document.getElementById('NewDescriptionTitle')?.value !== '') &&
                                        (document.getElementById('NewDescriptionDetails')?.value !== '')){
                                    
                                            const newEntry = {
                                                descriptionTitle: document.getElementById('NewDescriptionTitle')?.value,
                                                descriptionDetails: document.getElementById('NewDescriptionDetails')?.value,
                                                entryCategoryIndex: backgroundIndex,
                                            };
                                            console.log('new enrt', newEntry);
                                            descriptionArray[backgroundIndex].push(newEntry);
                                            setIsAddBackground(false);
                                        }  
                                } else {
                                    setIsAddBackground(true);
                                }
                                setIsAddCharacteristic(false);
                                setIsAddAppearance(false);
                            }}>
                            {isAddBackground ? 'Save Background' : 'Add Background'}
                        </button> : null}
                </div>

                {isAddBackground ? <MakeDescriptionCard typeOfEntry={'background'} /> : null}

                {descriptionArray[backgroundIndex].map((descriptionCard, index) => {
                    console.log('spell array', descriptionArray[backgroundIndex]);
                    console.log('spellObj', descriptionCard);
                    return (
                        <Fragment>
                            {(descriptionCard) ? 
                                <DescriptionCard 
                                    descriptionArray={descriptionArray}
                                    descriptionCard={descriptionCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}
            </Fragment>)
    }

    const CharacteristicsSubBox = () => {
        return(
            <Fragment>
                <div className="RaceTraitsSubBoxHeader">
                    <div className="raceTraitsText">
                        Characteristics
                    </div>
                    <button
                        className="addRaceTraitButton"
                        onClick={() => {
                            if(isAddCharacteristic) {
                                if( (document.getElementById('NewEntryTitle')?.value !== '') &&
                                    (document.getElementById('NewEntrySourceBook')?.value !== '') &&
                                    (document.getElementById('NewEntryDetails')?.value !== '')){

                                    const newEntry = {
                                        descriptionTitle: document.getElementById('NewEntryTitle')?.value,
                                        entrySourceBook: document.getElementById('NewEntrySourceBook')?.value,
                                        entryPageNumber: document.getElementById('newEntryPageNumber')?.value,
                                        entryDetails: document.getElementById('NewEntryDetails')?.value,
                                        entryCategoryIndex: characteristicIndex,
                                    };
                                    console.log('new enrt', newEntry);
                                    descriptionArray[characteristicIndex].push(newEntry);
                                    setIsAddCharacteristic(false);
                                } 
                            } else {
                                setIsAddCharacteristic(true);
                            }
                            setIsAddBackground(false);
                            setIsAddAppearance(false);
                        }}>
                        {isAddCharacteristic ? 'Save Characteristic' : 'Add Characteristic'}
                    </button>
                </div>

                {isAddCharacteristic ? <MakeDescriptionCard typeOfEntry={'characteristic'}/> : null}

                {descriptionArray[characteristicIndex].map((descriptionCard, index) => {
                    console.log('spell array', descriptionArray[characteristicIndex]);
                    console.log('spellObj', descriptionCard);
                    return (
                        <Fragment>
                            {(descriptionCard) ? 
                                <DescriptionCard 
                                    descriptionArray={descriptionArray}
                                    descriptionCard={descriptionCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}
            </Fragment>)  
    }
    const AppearanceSubBox = () => {
        return(
            <Fragment>
                <div className="BaseFeatsSubBoxHeader">
                    <div className="baseFeatsText">
                        Appearance
                    </div>
                    <button
                        className="addBaseFeatButton"
                        onClick={() => {
                            if(isAddAppearance) {
                                if( (document.getElementById('NewEntryTitle')?.value !== '') &&
                                (document.getElementById('NewEntrySourceBook')?.value !== '') &&
                                (document.getElementById('NewEntryDetails')?.value !== '')){

                                    const newEntry = {
                                        descriptionTitle: document.getElementById('NewEntryTitle')?.value,
                                        entrySourceBook: document.getElementById('NewEntrySourceBook')?.value,
                                        entryPageNumber: document.getElementById('newEntryPageNumber')?.value,
                                        entryDetails: document.getElementById('NewEntryDetails')?.value,
                                        entryCategoryIndex: appearanceIndex,
                                    };
                                    console.log('new enrt', newEntry);
                                    descriptionArray[appearanceIndex].push(newEntry);
                                    setIsAddAppearance(false);
                                }  
                            } else {
                                setIsAddAppearance(true);
                            }
                            setIsAddBackground(false);
                            setIsAddCharacteristic(false);
                        }}>
                        {isAddAppearance ? 'Save Feat' : 'Add New Feat'}
                    </button>
                </div>

                {isAddAppearance ? <MakeDescriptionCard typeOfEntry={'appearance'}/> : null}

                {descriptionArray[appearanceIndex].map((descriptionCard, index) => {
                    console.log('spell array', descriptionArray[appearanceIndex]);
                    console.log('spellObj', descriptionCard);
                    return (
                        <Fragment>
                            {(descriptionCard) ? 
                                <DescriptionCard 
                                    descriptionArray={descriptionArray}
                                    descriptionCard={descriptionCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}
            </Fragment>)  
    }

    return (
        <Fragment>
            <div className="FeatsAndTraits-MultiSelectBox">
                <div className="featsAndTraitsHeader"> 
                    {/* <div className="inventoryHeaderText">Class - {characterInfo.cls}</div>
                    <div className="inventoryHeaderText">Race - {characterInfo.race}</div> */}
                    <button
                        className="AllButton"
                        id={descriptionBoxSelection === 'ALL' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setDescriptionBoxSelection('ALL');
                            setIsAddBackground(false);
                            setIsAddCharacteristic(false);
                            setIsAddAppearance(false);}}>All</button>
                    <button
                        className="ClassFeaturesButton"
                        id={descriptionBoxSelection === 'BACKGROUND' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setDescriptionBoxSelection('BACKGROUND');
                            setIsAddBackground(true);
                            setIsAddCharacteristic(false);
                            setIsAddAppearance(false);}}>Background</button>
                    <button
                        className="RaceTraitsButton"
                        id={descriptionBoxSelection === 'CHARACTERISTICS' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setDescriptionBoxSelection('CHARACTERISTICS');
                            setIsAddBackground(false);
                            setIsAddCharacteristic(true);
                            setIsAddAppearance(false);}}>Characteristics</button>
                    <button
                        className="BasicFeatsButton"
                        id={descriptionBoxSelection === 'APPEARANCE' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setDescriptionBoxSelection('APPEARANCE');
                            setIsAddBackground(false);
                            setIsAddCharacteristic(false);
                            setIsAddAppearance(true);}}>Appearance</button>
                </div>
                <div className="featsAndTraitsMainBox">
                    <MultiFeatsAndTraitsBox />
                </div>
            </div>
        </Fragment>
    )
}