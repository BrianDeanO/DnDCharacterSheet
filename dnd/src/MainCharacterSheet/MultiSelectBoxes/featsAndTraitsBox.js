import { Fragment, useEffect, useState, useMemo } from "react";
import React from "react";
import { fillTraitAndFeatArray } from "../../helpers/fillCardArrays";
import MakeFeatAndTraitCard from "../../helpers/makeFeatAndTraitCard";

export const FeatsAndTraitsSelectionBox = () => {
    const characterInfo = JSON.parse(localStorage.getItem("characterInfo"));
    const featsAndTraits = JSON.parse(localStorage.getItem("featsAndTraits"));

    console.log('pass in traits', featsAndTraits);

    const [featAndTraitCards, setFeatAndTraitCards] = useState(featsAndTraits ? featsAndTraits.featAndTraitArray : []);
    const [makeNewEntry, setMakeNewEntry] = useState(false);
    const [itemIsEdit, setItemIsEdit] = useState(-1);
    const [isEdit, setIsEdit] = useState(false);
    
    const [entryCardBeingEdited, setEntryCardBeingEdited] = useState('NO');
    const [featAndTraitBoxSelection, setFeatAndTraitBoxSelection] = useState('ALL');

    const [isAddClassFeature, setIsAddClassFeature] = useState(false);
    const [isAddRaceTrait, setIsAddRaceTrait] = useState(false);
    const [isAddBaseFeat, setIsAddBaseFeat] = useState(false);
    const classFeatureIndex = 0;
    const raceTraitIndex = 1;
    const baseFeatIndex = 2;

    console.log('after cards', featAndTraitCards);

    const featAndTraitArray = useMemo(() => fillTraitAndFeatArray(featAndTraitCards), [featAndTraitCards]);

    console.log('feat array', featAndTraitArray);

    useEffect(() => {
        localStorage.setItem("featsAndTraits", JSON.stringify({featAndTraitArray}));
    }, [featAndTraitArray]);

    const FeatAndTraitCard = ({featAndTraitArray, featTraitCard, index}) => {
        const [details, setDetails] = useState(featTraitCard ? featTraitCard.entryDetails : "");

        useEffect(() => {
            setDetails(details);
            localStorage.setItem("featsAndTraits", JSON.stringify({featAndTraitArray}));
        }, [details, featAndTraitArray]);

        // const test = "The Armor Of Agathist - Fire";
        // console.log('test', test.length);
    
        return (
            <div className="newLoneEntryBox" 
                key={`${featTraitCard.entryCategoryIndex}_${index}`}
                id={`${featTraitCard.entryCategoryIndex}_${index}`}
                >
                <div className="finalEntryInfoUpperBox">
                    <div className="finalEntryTitleBox">
                        <span className={"finalEntryTitleTextNormal"}>
                            {featTraitCard.entryTitle}
                        </span>
                        <div className="finalEntryBookAndPageText">
                            {featTraitCard.entrySourceBook} Pg. {featTraitCard.entryPageNumber}
                        </div>
                    </div>
                    <div 
                    className="DeleteEntryBox"
                    id={`${featTraitCard.entryCategoryIndex}_${index}`}
                    onClick={(e) => {
                        featAndTraitArray[featTraitCard.entryCategoryIndex].splice(index, 1);
                        setFeatAndTraitCards(featAndTraitArray);
                    }}>X</div>
                </div>
                <div className="entryDetailsLowerBox">
                    <div className="finalEntryDetailsInnerBox">
                        <span className="finalEntryDetailsText">Details</span>
                        <button 
                        className="EntryBoxSaveButton"
                        id={`${featTraitCard.entryCategoryIndex}_${index}`}
                        onClick={(e) => {
                            (entryCardBeingEdited === 'NO') ? 
                            setEntryCardBeingEdited(`${featTraitCard.entryCategoryIndex}_${index}`) : setEntryCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            }}>
                                {(isEdit && (entryCardBeingEdited === `${featTraitCard.entryCategoryIndex}_${index}`)) ? 'save notes' : 'edit notes'}
                        </button> 
                    </div>

                    <textarea
                    className="finalEntryDetailsBox"
                    value={featTraitCard.entryDetails}
                    id={`${featTraitCard.entryCategoryIndex}_${index}`}
                    onChange={(e) => {
                        featAndTraitArray[featTraitCard.entryCategoryIndex][index].entryDetails = e.target.value.toString();
                        setDetails(featTraitCard.entryDetails);
                    }}
                    cols={1}
                    rows={4}></textarea>
                </div>
            </div>
        )
    }

    const MultiFeatsAndTraitsBox = () => {
        // console.log('mult select', multiBoxSelection);
        switch(featAndTraitBoxSelection) {
            case 'ALL':
                return (
                    <Fragment>
                        <ClassFeatsSubBox />
                        <RaceTraitsSubBox />
                        <BaseFeatsSubBox />
                    </Fragment>)
            case 'CLASS_FEATS':
                return (<ClassFeatsSubBox />)
            case 'RACE_TRAITS':
                return (<RaceTraitsSubBox />)
            case 'BASE_FEATS':
                return (<BaseFeatsSubBox />)
            default:
                return (
                <Fragment>
                    <ClassFeatsSubBox />
                    <RaceTraitsSubBox />
                    <BaseFeatsSubBox />
                </Fragment>)
        }
    }

    const ClassFeatsSubBox = () => {
        return(
            <Fragment>
                <div className="ClassFeatsSubBoxHeader">
                    <div className="classFeatsText">
                        Class Features
                    </div>
                    <div className="characterClassText">
                        ({characterInfo.cls})
                    </div>
                    <button
                        className="addClassFeatButton"
                        onClick={() => {
                            if(isAddClassFeature) {
                                if( (document.getElementById('NewEntryTitle')?.value !== '') &&
                                    (document.getElementById('NewEntrySourceBook')?.value !== '') &&
                                    (document.getElementById('NewEntryDetails')?.value !== '')){
                                
                                        const newEntry = {
                                            entryTitle: document.getElementById('NewEntryTitle')?.value,
                                            entrySourceBook: document.getElementById('NewEntrySourceBook')?.value,
                                            entryPageNumber: document.getElementById('newEntryPageNumber')?.value,
                                            entryDetails: document.getElementById('NewEntryDetails')?.value,
                                            entryCategoryIndex: classFeatureIndex,
                                        };
                                        console.log('new enrt', newEntry);
                                        featAndTraitArray[classFeatureIndex].push(newEntry);
                                        setIsAddClassFeature(false);
                                    }  
                            } else {
                                setIsAddClassFeature(true);
                            }
                            setIsAddBaseFeat(false);
                            setIsAddRaceTrait(false);
                        }}>
                        {isAddClassFeature ? 'Save Class Feature' : 'Add New Class Feature'}
                    </button>
                </div>

                {isAddClassFeature ? <MakeFeatAndTraitCard typeOfEntry={'classFeature'}/> : null}

                {featAndTraitArray[classFeatureIndex].map((featTraitCard, index) => {
                    console.log('spell array', featAndTraitArray[classFeatureIndex]);
                    console.log('spellObj', featTraitCard);
                    return (
                        <Fragment>
                            {(featTraitCard) ? 
                                <FeatAndTraitCard 
                                    featAndTraitArray={featAndTraitArray}
                                    featTraitCard={featTraitCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}
            </Fragment>)
    }

    const RaceTraitsSubBox = () => {
        return(
            <Fragment>
                <div className="RaceTraitsSubBoxHeader">
                    <div className="raceTraitsText">
                        Racial Traits
                    </div>
                    <div className="characterRaceText">
                        ({characterInfo.race})
                    </div>
                    <button
                        className="addRaceTraitButton"
                        onClick={() => {
                            if(isAddRaceTrait) {
                                if( (document.getElementById('NewEntryTitle')?.value !== '') &&
                                (document.getElementById('NewEntrySourceBook')?.value !== '') &&
                                (document.getElementById('NewEntryDetails')?.value !== '')){

                                    const newEntry = {
                                        entryTitle: document.getElementById('NewEntryTitle')?.value,
                                        entrySourceBook: document.getElementById('NewEntrySourceBook')?.value,
                                        entryPageNumber: document.getElementById('newEntryPageNumber')?.value,
                                        entryDetails: document.getElementById('NewEntryDetails')?.value,
                                        entryCategoryIndex: raceTraitIndex,
                                    };
                                    console.log('new enrt', newEntry);
                                    featAndTraitArray[raceTraitIndex].push(newEntry);
                                    setIsAddClassFeature(false);
                                }  
                                setIsAddRaceTrait(false);
                            } else {
                                setIsAddRaceTrait(true);
                            }
                            setIsAddClassFeature(false);
                            setIsAddBaseFeat(false);
                        }}>
                        {isAddRaceTrait ? 'Save Racial Trait' : 'Add New Racial Trait'}
                    </button>
                </div>

                {isAddRaceTrait ? <MakeFeatAndTraitCard typeOfEntry={'racialTrait'}/> : null}

                {featAndTraitArray[raceTraitIndex].map((featTraitCard, index) => {
                    console.log('spell array', featAndTraitArray[classFeatureIndex]);
                    console.log('spellObj', featTraitCard);
                    return (
                        <Fragment>
                            {(featTraitCard) ? 
                                <FeatAndTraitCard 
                                    featAndTraitArray={featAndTraitArray}
                                    featTraitCard={featTraitCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}
            </Fragment>)  
    }
    const BaseFeatsSubBox = () => {
        return(
            <Fragment>
                <div className="BaseFeatsSubBoxHeader">
                    <div className="baseFeatsText">
                        Feats
                    </div>
                    <button
                        className="addBaseFeatButton"
                        onClick={() => {
                            if(isAddBaseFeat) {
                                if( (document.getElementById('NewEntryTitle')?.value !== '') &&
                                (document.getElementById('NewEntrySourceBook')?.value !== '') &&
                                (document.getElementById('NewEntryDetails')?.value !== '')){

                                    const newEntry = {
                                        entryTitle: document.getElementById('NewEntryTitle')?.value,
                                        entrySourceBook: document.getElementById('NewEntrySourceBook')?.value,
                                        entryPageNumber: document.getElementById('newEntryPageNumber')?.value,
                                        entryDetails: document.getElementById('NewEntryDetails')?.value,
                                        entryCategoryIndex: baseFeatIndex,
                                    };
                                    console.log('new enrt', newEntry);
                                    featAndTraitArray[baseFeatIndex].push(newEntry);
                                    setIsAddBaseFeat(false);
                                }  
                            } else {
                                setIsAddBaseFeat(true);
                            }
                            setIsAddClassFeature(false);
                            setIsAddRaceTrait(false);
                        }}>
                        {isAddBaseFeat ? 'Save Feat' : 'Add New Feat'}
                    </button>
                </div>

                {isAddBaseFeat ? <MakeFeatAndTraitCard typeOfEntry={'baseFeat'}/> : null}

                {featAndTraitArray[baseFeatIndex].map((featTraitCard, index) => {
                    console.log('spell array', featAndTraitArray[classFeatureIndex]);
                    console.log('spellObj', featTraitCard);
                    return (
                        <Fragment>
                            {(featTraitCard) ? 
                                <FeatAndTraitCard 
                                    featAndTraitArray={featAndTraitArray}
                                    featTraitCard={featTraitCard} 
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
                        id={featAndTraitBoxSelection === 'ALL' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setFeatAndTraitBoxSelection('ALL');
                            setIsAddClassFeature(false);
                            setIsAddRaceTrait(false);
                            setIsAddBaseFeat(false);}}>All</button>
                    <button
                        className="ClassFeaturesButton"
                        id={featAndTraitBoxSelection === 'CLASS_FEATS' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setFeatAndTraitBoxSelection('CLASS_FEATS');
                            setIsAddClassFeature(false);
                            setIsAddRaceTrait(false);
                            setIsAddBaseFeat(false);}}>Class Features</button>
                    <button
                        className="RaceTraitsButton"
                        id={featAndTraitBoxSelection === 'RACE_TRAITS' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setFeatAndTraitBoxSelection('RACE_TRAITS');
                            setIsAddClassFeature(false);
                            setIsAddRaceTrait(false);
                            setIsAddBaseFeat(false);}}>Racial Traits</button>
                    <button
                        className="BasicFeatsButton"
                        id={featAndTraitBoxSelection === 'BASE_FEATS' ? 'activeFeatsAndTraitsButton' : 'notActiveFeatsAndTraitsButton'}
                        onClick={() => {
                            setFeatAndTraitBoxSelection('BASE_FEATS');
                            setIsAddClassFeature(false);
                            setIsAddRaceTrait(false);
                            setIsAddBaseFeat(false);}}>Feats</button>
                </div>
                <div className="featsAndTraitsMainBox">
                    <MultiFeatsAndTraitsBox />
                </div>
            </div>
        </Fragment>
    )
}