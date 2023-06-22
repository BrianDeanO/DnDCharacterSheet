import { Fragment, useEffect, useState, useMemo } from "react";
import React from "react";
import { fillDescriptionArray } from "../../helpers/fillCardArrays";
import MakeDescriptionCard from "../../multiSelectCardMakers/makeDescriptionCard";
export const DecriptionSelectionBox = () => {
    const characteristics = JSON.parse(localStorage.getItem("characteristics"));
    const descriptions = JSON.parse(localStorage.getItem("descriptions"));

    console.log('pass in traits', descriptions);

    const [descriptionCards, setDescriptionCards] = useState(descriptions ? descriptions.descriptionArray : []);
    const [isEdit, setIsEdit] = useState(false);
    
    const [entryCardBeingEdited, setEntryCardBeingEdited] = useState('NO');
    const [descriptionBoxSelection, setDescriptionBoxSelection] = useState('CHARACTERISTICS');

    const [isAddBackground, setIsAddBackground] = useState(false);
    const [isAddCharacteristic, setIsAddCharacteristic] = useState(false);


    const [isAddPersonalityTrait, setIsAddPersonalityTrait] = useState(false);
    const [isAddIdeals, setIsAddIdeals] = useState(false);
    const [isAddBonds, setIsAddBonds] = useState(false);
    const [isAddFlaws, setIsAddFlaws] = useState(false);

    const [isAddAppearance, setIsAddAppearance] = useState(false);
    const backgroundIndex = 0;
    const personalTraitsIndex = 1;
    const idealsIndex = 2;
    const bondsIndex = 3;
    const flawsIndex = 4;
    const appearanceIndex = 5;
    const singleEntryIndex = 0;

    console.log('after cards', descriptionCards);

    const descriptionArray = useMemo(() => fillDescriptionArray(descriptionCards), [descriptionCards]);

    console.log('feat array', descriptionArray);

    useEffect(() => {
        localStorage.setItem("descriptions", JSON.stringify({descriptionArray}));
    }, [descriptionArray]);

    const DescriptionCard = ({descriptionArray, descriptionCard, index}) => {
        const [details, setDetails] = useState(descriptionCard ? descriptionCard.descriptionDetails : "");

        useEffect(() => {
            setDetails(details);
            localStorage.setItem("descriptions", JSON.stringify({descriptionArray}));
        }, [details, descriptionArray]);
    
        if(descriptionCard.descriptionCategoryIndex === backgroundIndex) {
            return (
                <div className={descriptionBoxSelection === 'BACKGROUND' ? "newLoneLongDescriptionBox" : "newLoneDescriptionBox"}
                    key={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                    id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                >
                <div className="finalDescriptionInfoUpperBox">
                    <div className="finalDescriptionTitleBox">
                        <span className="finalDescriptionTitleTextNormal">
                            {descriptionCard.descriptionTitle}
                        </span>
                        <div className="finalDescriptionBookAndPageText">
                            {descriptionCard.descriptionSourceBook} Pg. {descriptionCard.descriptionPageNumber}
                        </div>
                    </div>
                    <div 
                        className="DeleteDescriptionBox"
                        id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                        onClick={(e) => {
                            descriptionArray[descriptionCard.descriptionCategoryIndex].splice(index, 1);
                            setDescriptionCards(descriptionArray);
                        }}>X</div>
                </div>
                <div className={descriptionBoxSelection === 'BACKGROUND' ? "descriptionDetailsLongLowerBox" : "descriptionDetailsLowerBox"}>
                    <div className="finalDescriptionDetailsInnerBox">
                        <span className="finalDescriptionDetailsText">Details</span>
                        <button 
                        className="DescriptionBoxSaveButton"
                        id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                        onClick={(e) => {
                            (entryCardBeingEdited === 'NO') ? 
                            setEntryCardBeingEdited(`${descriptionCard.descriptionCategoryIndex}_${index}`) : setEntryCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            }}>
                                {(isEdit && (entryCardBeingEdited === `${descriptionCard.descriptionCategoryIndex}_${index}`)) ? 'save' : 'edit'}
                        </button> 
                    </div>

                    <textarea
                    className={descriptionBoxSelection === 'BACKGROUND' ? "finalDescriptionLongDetailsBox" : "finalDescriptionDetailsBox"}
                    value={descriptionCard.descriptionDetails}
                    id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                    onChange={(e) => {
                        descriptionArray[descriptionCard.descriptionCategoryIndex][index].descriptionDetails = e.target.value.toString();
                        setDetails(descriptionCard.descriptionDetails);
                    }}
                    cols={1}
                    rows={4}></textarea>
                </div>
            </div> 
            )
        }

        else if((descriptionCard.descriptionCategoryIndex === personalTraitsIndex) || 
                (descriptionCard.descriptionCategoryIndex === idealsIndex) || 
                (descriptionCard.descriptionCategoryIndex === bondsIndex) || 
                (descriptionCard.descriptionCategoryIndex === flawsIndex) || 
                (descriptionCard.descriptionCategoryIndex === appearanceIndex)) {
            return (
                <div 
                    className={(descriptionCard.descriptionCategoryIndex === appearanceIndex) ? 
                        descriptionBoxSelection === 'APPEARANCE' ?
                            "newLoneLongDescriptionBox" :
                            "newLoneDescriptionBox" 
                        : "newLoneCharacteristicBox"} 
                    key={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                    id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                    >
                <div 
                    className={(descriptionCard.descriptionCategoryIndex === appearanceIndex) ? 
                        descriptionBoxSelection === 'APPEARANCE' ? 
                            "finalDescriptionAppearanceDetailsLongLowerBox" :
                            "finalDescriptionAppearanceDetailsLowerBox" 
                        : "finalDescriptionWideDetailsLowerBox"}>
                    <textarea
                    className={(descriptionCard.descriptionCategoryIndex === appearanceIndex) ? 
                        descriptionBoxSelection === 'APPEARANCE' ? 
                             "finalDescriptionAppearanceLongDetailsTextBox" : 
                             "finalDescriptionAppearanceDetailsTextBox" 
                        : "finalDescriptionWideDetailsTextBox"}                    
                    value={descriptionCard.descriptionDetails}
                    id={`${descriptionCard.descriptionCategoryIndex}_${index}`}
                    onChange={(e) => {
                        descriptionArray[descriptionCard.descriptionCategoryIndex][index].descriptionDetails = e.target.value.toString();
                        setDetails(descriptionCard.descriptionDetails);
                    }}
                    cols={1}
                    rows={4}></textarea>
                </div>
            </div> 
            )
        }
    }

    const BackgroundSubBox = () => {
        return(
            <Fragment>
                <div className="BackgroundSubBoxHeader">
                    <div className="backgroundText">
                        Background
                    </div>
                    {(!(descriptionArray[backgroundIndex][0])) ? 
                        <button
                            className="addBackgroundButton"
                            onClick={() => {
                                if(isAddBackground) {
                                    if( (document.getElementById('NewDescriptionTitle')?.value !== '') &&
                                        (document.getElementById('NewDescriptionSourceBook')?.value !== '') && 
                                        (document.getElementById('NewDescriptionDetails')?.value !== '')){
                                    
                                            const newEntry = {
                                                descriptionTitle: document.getElementById('NewDescriptionTitle')?.value,
                                                descriptionDetails: document.getElementById('NewDescriptionDetails')?.value,
                                                descriptionSourceBook: document.getElementById('NewDescriptionSourceBook')?.value,
                                                descriptionPageNumber: document.getElementById('NewDescriptionPageNumber')?.value,
                                                descriptionCategoryIndex: backgroundIndex,
                                            };
                                            console.log('new enrt', newEntry);
                                            descriptionArray[backgroundIndex].push(newEntry);
                                            setIsAddBackground(false);
                                        }  
                                } else {
                                    setIsAddBackground(true);
                                }
                                setIsAddAppearance(false);
                                setIsAddPersonalityTrait(false);
                                setIsAddIdeals(false);
                                setIsAddBonds(false);
                                setIsAddFlaws(false);
                            }}>
                            {isAddBackground ? 'Save Background' : 'Add Background'}
                        </button> : null}
                </div>

                {isAddBackground ? <MakeDescriptionCard typeOfEntry={'Background'} /> : null}

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
        console.log('load in sub box', characteristics);

        const [characteristicIsEdit, setCharacteristicIsEdit] = useState(false);
        const [age, setAge] = useState(characteristics ? characteristics.age : 1);
        const [height, setHeight] = useState(characteristics ? characteristics.height : '---');
        const [weight, setWeight] = useState(characteristics ? characteristics.weight : 1);
        const [eyes, setEyes] = useState(characteristics ? characteristics.eyes : '---');
        const [skin, setSkin] = useState(characteristics ? characteristics.skin : '---');
        const [hair, setHair] = useState(characteristics ? characteristics.hair : '---');
        const [alignment, setAlignment] = useState(characteristics ? characteristics.alignment : '---');
        const [faith, setFaith] = useState(characteristics ? characteristics.faith : '---');

        function updateCharacteristicOptionInfo(age, height, weight, eyes, skin, hair, alignment, faith) {
            setAge(age);
            setHeight(height);
            setWeight(weight);
            setEyes(eyes);
            setSkin(skin);
            setHair(hair);
            setAlignment(alignment);
            setFaith(faith);
        }

        useEffect(() => {
            localStorage.setItem("characteristics", JSON.stringify(
                {age: age, height: height, weight: weight, eyes: eyes, skin: skin, hair: hair, alignment: alignment, faith: faith}));
        }, [age, height, weight, eyes, skin, hair, alignment, faith]);

        return(
            <div className="characteristicMainBox">
                <div className="CharacteristicsSubBoxHeader">
                    <div className="characteristicsHeaderText">
                        Characteristics
                    </div>
                    <button 
                        className="CharactersiticBoxSaveButton"
                        onClick={(e) => {
                            characteristicIsEdit ?
                                updateCharacteristicOptionInfo( document.getElementById('AGE')?.value, 
                                                                document.getElementById('HEIGHT')?.value,
                                                                document.getElementById('WEIGHT')?.value,
                                                                document.getElementById('EYES')?.value,
                                                                document.getElementById('SKIN')?.value, 
                                                                document.getElementById('HAIR')?.value,
                                                                document.getElementById('ALIGNMENT')?.value,
                                                                document.getElementById('FAITH')?.value) :
                                updateCharacteristicOptionInfo( age, height, weight, eyes, skin, hair, alignment, faith );
                            setCharacteristicIsEdit(!characteristicIsEdit);
                    }}> {characteristicIsEdit ? 'save' : 'edit'} </button> 
                </div>
                <div className="characteristicOptionSubBox">
                    <div className="characteristicOptionLoneRowBox">
                        <div className="characteristicOptionLoneAgeBox">
                            <div className="characteristicOptionTitleText">Age:</div>
                            {characteristicIsEdit ? 
                                <input
                                    className="ageNumberDial"
                                    id="AGE"
                                    type="number"
                                    defaultValue={age}
                                    min={1}
                                    max={99999}
                                ></input>
                                 : <div className="characteristicOptionText">{age} years</div>}
                        </div>
                        <div className="characteristicOptionLoneHeightBox">
                            <div className="characteristicOptionTitleText">Height:</div>
                            {characteristicIsEdit ? 
                            <textarea
                                className="heightOptionInput"
                                value={height}
                                id={'HEIGHT'}
                                onChange={(e) => {setHeight(e.target.value.toString());}}
                                cols={1}
                                rows={1}></textarea> : <div className="characteristicOptionText">{height}</div>}
                        </div>
                        <div className="characteristicOptionLoneWeightBox">
                            
                            <div className="characteristicOptionTitleText">Weight:</div>
                            <div className="weightOptionInnerBox">

                            {characteristicIsEdit ? 
                            <input
                                className="weightNumberDial"
                                id="WEIGHT"
                                type="number"
                                defaultValue={weight}
                                min={0}
                                max={99999}
                            ></input> : <div className="characteristicOptionWeightText">{weight}</div>}
                            <div className="weightOptionPoundsText">lbs.</div>
                            </div>
                        </div>
                    </div>
                    <div className="characteristicOptionLoneRowBox">
                        <div className="characteristicOptionLoneEyesBox">
                            <div className="characteristicOptionTitleText">Eyes:</div>
                            {characteristicIsEdit ? 
                            <textarea
                                className="eyesOptionInput"
                                value={eyes}
                                id={'EYES'}
                                onChange={(e) => {setEyes(e.target.value.toString());}}
                                cols={1}
                                rows={1}></textarea> : <div className="characteristicOptionText">{eyes}</div>}

                        </div>
                        <div className="characteristicOptionLoneSkinBox">
                            <div className="characteristicOptionTitleText">Skin:</div>
                            {characteristicIsEdit ? 
                            <textarea
                                className="skinOptionInput"
                                value={skin}
                                id={'SKIN'}
                                onChange={(e) => {setSkin(e.target.value.toString());}}
                                cols={1}
                                rows={1}></textarea> : <div className="characteristicOptionText">{skin}</div>}
                        </div>
                        <div className="characteristicOptionLoneHairBox">
                            <div className="characteristicOptionTitleText">Hair:</div>
                            {characteristicIsEdit ? 
                            <textarea
                                className="hairOptionInput"
                                value={hair}
                                id={'HAIR'}
                                onChange={(e) => {setHair(e.target.value.toString());}}
                                cols={1}
                                rows={1}></textarea> : <div className="characteristicOptionText">{hair}</div>}
                        </div>
                    </div>
                    <div className="characteristicOptionLoneRowBox">
                        <div className="characteristicOptionLoneAlignmentBox">
                            <div className="characteristicOptionTitleText">Alignment:</div>
                            {characteristicIsEdit ? 
                            <select 
                                className="alignmentSelector" 
                                id="ALIGNMENT"
                                onClick={(e) => {
                                    console.log('on click alignemnet', e.target.value);
                                    setAlignment(e.target.value);
                                }}>
                                <option 
                                    id="---"
                                    value={'---'}
                                    selected={alignment==='---' ? true : false}
                                    >---</option>
                                <option 
                                    id="Neutral"
                                    value={'Neutral'}
                                    selected={alignment==='Neutral' ? true : false}
                                    >Neutral</option>
                                <option 
                                    id="NeutralGood"
                                    value={'Neutral Good'}
                                    selected={alignment==='Neutral Good' ? true : false}
                                    >Neutral Good</option>
                                <option 
                                    id="NeutralEvil"
                                    value={'Neutral Evil'}
                                    selected={alignment==='Neutral Evil' ? true : false}
                                    >Neutral Evil</option>
                                <option 
                                    id="LawfulNeutral"
                                    value={'Lawful Neutral'}
                                    selected={alignment==='Lawful Neutral' ? true : false}
                                    >Lawful Neutral</option>
                                <option 
                                    id="LawfulGood"
                                    value={'Lawful Good'}
                                    selected={alignment==='Lawful Good' ? true : false}
                                    >Lawful Good</option>
                                <option 
                                    id="LawfulEvil"
                                    value={'Lawful Evil'}
                                    selected={alignment==='Lawful Evil' ? true : false}
                                    >Lawful Evil</option>
                                <option 
                                    id="ChaoticNeutral"
                                    value={'Chaotic Neutral'}
                                    selected={alignment==='Chaotic Neutral' ? true : false}
                                    >Chaotic Neutral</option>
                                <option 
                                    id="ChaoticGood"
                                    value={'Chaotic Good'}
                                    selected={alignment==='Chaotic Good' ? true : false}
                                    >Chaotic Good</option>
                                <option 
                                    id="ChaoticEvil"
                                    value={'Chaotic Evil'}
                                    selected={alignment==='Chaotic Evil' ? true : false}
                                    >Chaotic Evil</option>
                            </select> : <div className="characteristicOptionText">{alignment}</div>}
                        </div>
                        <div className="characteristicOptionLoneFaithBox">
                            <div className="characteristicOptionTitleText">Faith:</div>
                            {characteristicIsEdit ? 
                            <textarea
                                className="faithOptionInput"
                                value={faith}
                                id={'FAITH'}
                                onChange={(e) => {setFaith(e.target.value.toString());}}
                                cols={1}
                                rows={1}></textarea> : <div className="characteristicOptionText">{faith}</div>}
                        </div>
                    </div>
                </div>

                <div className="personalTraitsSubBox">
                    <div className="personalTraitsSubBoxHeader">
                        <div className="subBoxHeaderText">
                            Personality Traits
                        </div>
                        {(!(descriptionArray[personalTraitsIndex][0])) ? 
                        <button
                            className="addPersonalityTraitsButton"
                            onClick={() => {
                                if(isAddPersonalityTrait) {
                                    if( (document.getElementById('NewCharacteristicDetails')?.value !== '')){

                                        const newEntry = {
                                            descriptionDetails: document.getElementById('NewCharacteristicDetails')?.value,
                                            descriptionCategoryIndex: personalTraitsIndex,
                                        };
                                        console.log('new enrt', newEntry);
                                        descriptionArray[personalTraitsIndex].push(newEntry);
                                        setIsAddPersonalityTrait(false);
                                    } 
                                } else {
                                    setIsAddPersonalityTrait(true);
                                }
                                setIsAddBackground(false);
                                setIsAddAppearance(false);
                                setIsAddIdeals(false);
                                setIsAddBonds(false);
                                setIsAddFlaws(false);
                            }}>
                            {isAddPersonalityTrait ? 'Save Personality Traits' : 'Add Personality Traits'}
                        </button> : 
                        <button 
                            className="NoteBoxSaveButton"
                            id={`${descriptionArray[personalTraitsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                            onClick={(e) => {
                                (entryCardBeingEdited === 'NO') ? 
                                setEntryCardBeingEdited(`${descriptionArray[personalTraitsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                                setIsEdit(!isEdit);
                                document.getElementsByClassName('NotesMainBox').scrollHeight = document.getElementsByClassName('OtherSubBoxHeader').offsetHeight;
                                }}>
                            {(isEdit && (entryCardBeingEdited === `${descriptionArray[personalTraitsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                        </button>}
                    </div>   
                </div>
                {isAddPersonalityTrait ? <MakeDescriptionCard typeOfEntry={'PersonalityTraits'}/> : null}
                {(descriptionArray[personalTraitsIndex][singleEntryIndex]) ? 
                    <DescriptionCard 
                        descriptionArray={descriptionArray}
                        descriptionCard={descriptionArray[personalTraitsIndex][singleEntryIndex]} 
                        index={singleEntryIndex}/> : null}

                <div className="idealsSubBox">
                    <div className="CharacteristicsSubBoxHeader">
                        <div className="subBoxHeaderText">
                            Ideals
                        </div>
                        {(!(descriptionArray[idealsIndex][0])) ? 
                        <button
                            className="addIdealsButton"
                            onClick={() => {
                                if(isAddIdeals) {
                                    if( (document.getElementById('NewCharacteristicDetails')?.value !== '')){

                                        const newEntry = {
                                            descriptionDetails: document.getElementById('NewCharacteristicDetails')?.value,
                                            descriptionCategoryIndex: idealsIndex,
                                        };
                                        console.log('new enrt', newEntry);
                                        descriptionArray[idealsIndex].push(newEntry);
                                        setIsAddIdeals(false);
                                    } 
                                } else {
                                    setIsAddIdeals(true);
                                }
                                setIsAddBackground(false);
                                setIsAddAppearance(false);
                                setIsAddPersonalityTrait(false);
                                setIsAddBonds(false);
                                setIsAddFlaws(false);
                            }}>
                            {isAddIdeals ? 'Save Ideals' : 'Add Ideals'}
                        </button> : 
                    <button 
                        className="NoteBoxSaveButton"
                        id={`${descriptionArray[idealsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                        onClick={(e) => {
                            (entryCardBeingEdited === 'NO') ? 
                            setEntryCardBeingEdited(`${descriptionArray[idealsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            document.getElementsByClassName('NotesMainBox').scrollHeight = document.getElementsByClassName('OtherSubBoxHeader').offsetHeight;
                            }}>
                        {(isEdit && (entryCardBeingEdited === `${descriptionArray[idealsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                    </button>}
                    </div>   
                </div>
                {isAddIdeals ? <MakeDescriptionCard typeOfEntry={'Ideals'}/> : null}

                {(descriptionArray[idealsIndex][singleEntryIndex]) ? 
                    <DescriptionCard 
                        descriptionArray={descriptionArray}
                        descriptionCard={descriptionArray[idealsIndex][singleEntryIndex]} 
                        index={singleEntryIndex}/> : null}

                <div className="bondsSubBox">
                    <div className="BondsSubBoxHeader">
                        <div className="subBoxHeaderText">
                            Bonds
                        </div>
                        {(!(descriptionArray[bondsIndex][0])) ? 
                        <button
                            className="addBondsButton"
                            onClick={() => {
                                if(isAddBonds) {
                                    if( (document.getElementById('NewCharacteristicDetails')?.value !== '')){

                                        const newEntry = {
                                            descriptionDetails: document.getElementById('NewCharacteristicDetails')?.value,
                                            descriptionCategoryIndex: bondsIndex,
                                        };
                                        console.log('new enrt', newEntry);
                                        descriptionArray[bondsIndex].push(newEntry);
                                        setIsAddBonds(false);
                                    } 
                                } else {
                                    setIsAddBonds(true);
                                }
                                setIsAddBackground(false);
                                setIsAddAppearance(false);
                                setIsAddPersonalityTrait(false);
                                setIsAddIdeals(false);
                                setIsAddFlaws(false);
                            }}>
                            {isAddBonds ? 'Save Bonds' : 'Add Bonds'}
                        </button> : 
                    <button 
                        className="NoteBoxSaveButton"
                        id={`${descriptionArray[bondsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                        onClick={(e) => {
                            (entryCardBeingEdited === 'NO') ? 
                            setEntryCardBeingEdited(`${descriptionArray[bondsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            document.getElementsByClassName('NotesMainBox').scrollHeight = document.getElementsByClassName('OtherSubBoxHeader').offsetHeight;
                            }}>
                        {(isEdit && (entryCardBeingEdited === `${descriptionArray[bondsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                    </button>}
                    </div>   
                </div>
                {isAddBonds ? <MakeDescriptionCard typeOfEntry={'Bonds'}/> : null}
                {(descriptionArray[bondsIndex][singleEntryIndex]) ? 
                    <DescriptionCard 
                        descriptionArray={descriptionArray}
                        descriptionCard={descriptionArray[bondsIndex][singleEntryIndex]} 
                        index={singleEntryIndex}/> : null}

                <div className="flawsSubBox">
                    <div className="flawsSubBoxHeader">
                        <div className="subBoxHeaderText">
                            Flaws
                        </div>
                        {(!(descriptionArray[flawsIndex][0])) ?
                        <button
                            className="addFlawsButton"
                            onClick={() => {
                                if(isAddFlaws) {
                                    if( (document.getElementById('NewCharacteristicDetails')?.value !== '')){

                                        const newEntry = {
                                            descriptionDetails: document.getElementById('NewCharacteristicDetails')?.value,
                                            descriptionCategoryIndex: flawsIndex,
                                        };
                                        console.log('new enrt', newEntry);
                                        descriptionArray[flawsIndex].push(newEntry);
                                        setIsAddFlaws(false);
                                    } 
                                } else {
                                    setIsAddFlaws(true);
                                }
                                setIsAddBackground(false);
                                setIsAddAppearance(false);
                                setIsAddPersonalityTrait(false);
                                setIsAddIdeals(false);
                                setIsAddBonds(false);
                            }}>
                            {isAddFlaws ? 'Save Flaws' : 'Add Flaws'}
                        </button> : 
                    <button 
                        className="NoteBoxSaveButton"
                        id={`${descriptionArray[flawsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                        onClick={(e) => {
                            (entryCardBeingEdited === 'NO') ? 
                            setEntryCardBeingEdited(`${descriptionArray[flawsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            document.getElementsByClassName('NotesMainBox').scrollHeight = document.getElementsByClassName('OtherSubBoxHeader').offsetHeight;
                            }}>
                        {(isEdit && (entryCardBeingEdited === `${descriptionArray[flawsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                    </button>}
                    </div>   
                </div>
                {isAddFlaws ? <MakeDescriptionCard typeOfEntry={'Flaws'}/> : null}

                {(descriptionArray[flawsIndex][singleEntryIndex]) ? 
                    <DescriptionCard 
                        descriptionArray={descriptionArray}
                        descriptionCard={descriptionArray[flawsIndex][singleEntryIndex]} 
                        index={singleEntryIndex}/> : null}

            </div>)  
    }
    const AppearanceSubBox = () => {
        return(
            <Fragment>
                <div className="AppearanceSubBoxHeader">
                    <div className="appearanceText">
                        Appearance
                    </div>
                    {(!(descriptionArray[appearanceIndex][0])) ?
                    <button
                        className="addAppearanceButton"
                        onClick={() => {
                            if(isAddAppearance) {
                                if( (document.getElementById('NewAppearanceDetails')?.value !== '')){

                                    const newEntry = {
                                        descriptionDetails: document.getElementById('NewAppearanceDetails')?.value,
                                        descriptionCategoryIndex: appearanceIndex,
                                    };
                                    console.log('new enrt', newEntry);
                                    descriptionArray[appearanceIndex].push(newEntry);
                                    setIsAddAppearance(false);
                                }  
                            } else {
                                setIsAddAppearance(true);
                            }
                            setIsAddBackground(false);
                            setIsAddPersonalityTrait(false);
                            setIsAddIdeals(false);
                            setIsAddBonds(false);
                            setIsAddFlaws(false);
                        }}>
                        {isAddAppearance ? 'Save Appearance Information' : 'Add Appearance Information'}
                    </button> : 
                    <button 
                        className="NoteBoxSaveButton"
                        id={`${descriptionArray[appearanceIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                        onClick={(e) => {
                            (entryCardBeingEdited === 'NO') ? 
                            setEntryCardBeingEdited(`${descriptionArray[appearanceIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                            setIsEdit(!isEdit);
                            document.getElementsByClassName('NotesMainBox').scrollHeight = document.getElementsByClassName('OtherSubBoxHeader').offsetHeight;
                            }}>
                        {(isEdit && (entryCardBeingEdited === `${descriptionArray[appearanceIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                    </button>}
                </div>

                {isAddAppearance ? <MakeDescriptionCard typeOfEntry={'Appearance'}/> : null}

                {(descriptionArray[appearanceIndex][singleEntryIndex]) ? 
                    <DescriptionCard 
                        descriptionArray={descriptionArray}
                        descriptionCard={descriptionArray[appearanceIndex][singleEntryIndex]}
                        index={singleEntryIndex}/> : null}
            </Fragment>)  
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

    return (
        <Fragment>
            <div className="Description-MultiSelectBox">
                <div className="descriptionHeader"> 
                    <button
                        className="DescriptionAllButton"
                        id={descriptionBoxSelection === 'ALL' ? 'activeDescriptionButton' : null}
                        onClick={() => {
                            setDescriptionBoxSelection('ALL');
                            setIsAddBackground(false);
                            setIsAddCharacteristic(false);
                            setIsAddAppearance(false);
                            setIsAddPersonalityTrait(false);
                            setIsAddIdeals(false);
                            setIsAddBonds(false);
                            setIsAddFlaws(false);}}>All</button>
                    <button
                        className="BackgroundButton"
                        id={descriptionBoxSelection === 'BACKGROUND' ? 'activeDescriptionButton' : null}
                        onClick={() => {
                            setDescriptionBoxSelection('BACKGROUND');
                            setIsAddBackground(false);
                            setIsAddCharacteristic(false);
                            setIsAddAppearance(false);
                            setIsAddPersonalityTrait(false);
                            setIsAddIdeals(false);
                            setIsAddBonds(false);
                            setIsAddFlaws(false);}}>Background</button>
                    <button
                        className="CharacteristicsButton"
                        id={descriptionBoxSelection === 'CHARACTERISTICS' ? 'activeDescriptionButton' : null}
                        onClick={() => {
                            setDescriptionBoxSelection('CHARACTERISTICS');
                            setIsAddBackground(false);
                            setIsAddCharacteristic(false);
                            setIsAddAppearance(false);
                            setIsAddPersonalityTrait(false);
                            setIsAddIdeals(false);
                            setIsAddBonds(false);
                            setIsAddFlaws(false);}}>Characteristics</button>
                    <button
                        className="AppearanceButton"
                        id={descriptionBoxSelection === 'APPEARANCE' ? 'activeDescriptionButton' : null}
                        onClick={() => {
                            setDescriptionBoxSelection('APPEARANCE');
                            setIsAddBackground(false);
                            setIsAddCharacteristic(false);
                            setIsAddAppearance(false);
                            setIsAddPersonalityTrait(false);
                            setIsAddIdeals(false);
                            setIsAddBonds(false);
                            setIsAddFlaws(false);}}>Appearance</button>
                </div>
                <div className="descriptionMainBox">
                    <MultiFeatsAndTraitsBox />
                </div>
            </div>
        </Fragment>
    )
}