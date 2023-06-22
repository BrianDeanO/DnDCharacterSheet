import { Fragment, useEffect, useState, useMemo } from "react";
import React from "react";
import { fillNotesArray } from "../../helpers/fillCardArrays";
import MakeNotesCard from "../../multiSelectCardMakers/makeNotesCard";

export const NotesSelectionBox = () => {
    const characterInfo = JSON.parse(localStorage.getItem("characterInfo"));
    const notes = JSON.parse(localStorage.getItem("notes"));

    console.log('pass in notes', notes);

    const [noteCards, setNoteCards] = useState(notes ? notes.noteCardArray : []);
    const [makeNewEntry, setMakeNewEntry] = useState(false);
    const [itemIsEdit, setItemIsEdit] = useState(-1);
    const [isEdit, setIsEdit] = useState(false);
    
    const [entryCardBeingEdited, setEntryCardBeingEdited] = useState('NO');
    const [noteBoxSelection, setNoteBoxSelection] = useState('ALL');

    const [isAddOrg, setIsAddOrg] = useState(false);
    const [isAddAllies, setIsAddAllies] = useState(false);
    const [isAddEnemies, setIsAddEnemies] = useState(false);
    const [isAddBackstory, setIsAddBackstory] = useState(false);
    const [isAddOther, setIsAddOther] = useState(false);

    const orgsIndex = 0;
    const alliesIndex = 1;
    const enemiesIndex = 2;
    const backstoryIndex = 3;
    const otherIndex = 4;
    const singleEntryIndex = 0;

    console.log('after - notecards', noteCards);

    const noteCardArray = useMemo(() => fillNotesArray(noteCards), [noteCards]);

    console.log('after function note array', noteCardArray);

    useEffect(() => {
        console.log('saving notes array', noteCardArray);
        localStorage.setItem("notes", JSON.stringify({noteCardArray}));
    }, [noteCardArray]);

    const NoteCard = ({noteCardArray, noteCard, index}) => {
        if((noteCard.noteCategoryIndex === alliesIndex)) {
            console.log('ALLIES NOTE card array', noteCardArray);
            console.log('NTOE carddddd', noteCardArray[noteCard.noteCategoryIndex]);
            console.log('index', index);
        }
        
        const [details, setDetails] = useState(noteCard ? noteCard.noteDetails : "");

        useEffect(() => {
            setDetails(details);
            localStorage.setItem("notes", JSON.stringify({noteCardArray}));
        }, [details, noteCardArray]);

        console.log('org NOTE CARD', noteCard);
        return (
            <div className={((noteCard.noteCategoryIndex === backstoryIndex) || (noteCard.noteCategoryIndex === otherIndex)) ? "noTitleNewLoneNotesBox" : 
                    ((noteBoxSelection === 'ALL') ? "newLoneNotesBox" : "longNewLoneNotesBox")}
                key={`${noteCard.noteCategoryIndex}_${index}`}
                >
                {((noteCard.noteCategoryIndex === backstoryIndex) || (noteCard.noteCategoryIndex === otherIndex)) ? null : 
                    <div className="finalNotesTitleUpperBox">
                        <div className="finalNotesTitleBox">
                            <span className="finalNotesTitleText">
                                {noteCard.notesTitle}
                            </span>
                        </div>
                        <div 
                        className="DeleteNotesBox"
                        id={`${noteCard.noteCategoryIndex}_${index}`}
                        onClick={(e) => {
                            noteCardArray[noteCard.noteCategoryIndex].splice(index, 1);
                            setNoteCards(noteCardArray);
                        }}>X</div>
                    </div>
                }
                <div className={((noteCard.noteCategoryIndex === backstoryIndex) || (noteCard.noteCategoryIndex === otherIndex)) ? "noTitleNoteDetailsLowerBox" : "noteDetailsLowerBox"}>
                    <textarea
                    className={((noteCard.noteCategoryIndex === backstoryIndex) || (noteCard.noteCategoryIndex === otherIndex)) ? "noTitleFinalNoteDetailsBox" : 
                        ((noteBoxSelection === 'ALL') ? "finalNoteDetailsBox" : "longFinalNoteDetailsBox")}
                    value={noteCard.noteDetails}
                    // id={`${noteCard.noteCategoryIndex}_${index}`}
                    id={(((noteCard.noteCategoryIndex === backstoryIndex) && (noteBoxSelection === 'BACKSTORY')) || 
                        ((noteCard.noteCategoryIndex === otherIndex) && (noteBoxSelection === 'OTHER'))) ? 'extendedDetailsBox' : null}
                    onChange={(e) => {
                        noteCardArray[noteCard.noteCategoryIndex][index].noteDetails = e.target.value.toString();
                        setDetails(noteCard.noteDetails);
                    }}
                    cols={1}
                    rows={4}></textarea>
                </div>
            </div>
        )
    }

    const OrgsSubBox = () => {
        console.log("orgs sub box", noteCardArray[orgsIndex]);

        return(
            <Fragment>
                <div className="OrganizationsSubBoxHeader" id={noteBoxSelection === 'ORGANIZATIONS' ? "selectedNoTopBorder" : null}>
                    <div className="organizationsText">
                        Organizations
                    </div>
                    {(!(noteCardArray[orgsIndex][singleEntryIndex])) ? 
                    <button
                        className="addOrganizationButton"
                        onClick={() => {
                            if(isAddOrg) {
                                if( (document.getElementById('NewNotesTitle')?.value !== '') &&
                                    (document.getElementById('NewNotesDetails')?.value !== '')){
                                        
                                        const newNotes = {
                                            notesTitle: document.getElementById('NewNotesTitle')?.value,
                                            noteDetails: document.getElementById('NewNotesDetails')?.value,
                                            noteCategoryIndex: orgsIndex,
                                        };
                                        console.log('org index new neotes', newNotes);
                                        noteCardArray[orgsIndex].push(newNotes);
                                        console.log('notes after push', noteCardArray);
                                        setIsAddOrg(false);
                                    }  
                            } else {
                                setIsAddOrg(true);
                            }
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);
                        }}>
                        {isAddOrg ? 'Save Organization' : 'Add New Organization'}
                    </button> :                     
                        <button 
                            className="NoteBoxSaveButton"
                            id={`${noteCardArray[orgsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                            onClick={(e) => {
                                (entryCardBeingEdited === 'NO') ? 
                                setEntryCardBeingEdited(`${noteCardArray[orgsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                                setIsEdit(!isEdit);
                                document.getElementsByClassName('NotesMainBox').scrollHeight = document.getElementsByClassName('AlliesSubBoxHeader').offsetHeight;
                                }}>
                            {(isEdit && (entryCardBeingEdited === `${noteCardArray[orgsIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                        </button>}
                </div>

                {isAddOrg ? <MakeNotesCard typeOfEntry={'Org'}/> : null}
                {/* 
                {noteCardArray[orgsIndex].map((notesCard, index) => {
                    console.log('or notes array', noteCardArray[orgsIndex]);
                    console.log('org notesObj', notesCard);
                    return (
                        <Fragment>
                            {(notesCard) ? 
                                <NoteCard 
                                    noteCardArray={noteCardArray}
                                    noteCard={notesCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })} */}
                {(noteCardArray[orgsIndex][singleEntryIndex]) ? 
                    <NoteCard 
                        noteCardArray={noteCardArray}
                        noteCard={noteCardArray[orgsIndex][singleEntryIndex]} 
                        index={singleEntryIndex}/> : null}
            </Fragment>)
    }

    const AlliesSubBox = () => {
        return(
            <Fragment>
                <div className="AlliesSubBoxHeader" id={noteBoxSelection === 'ALLIES' ? "selectedNoTopBorder" : null}>
                    <div className="alliesText">
                        Allies
                    </div>
                    <button
                        className="addAlliesButton"
                        onClick={() => {
                            if(isAddAllies) {
                                if( (document.getElementById('NewNotesTitle')?.value !== '') &&
                                    (document.getElementById('NewNotesDetails')?.value !== '')){

                                    const newNotes = {
                                        notesTitle: document.getElementById('NewNotesTitle')?.value,
                                        noteDetails: document.getElementById('NewNotesDetails')?.value,
                                        noteCategoryIndex: alliesIndex,
                                    };
                                    console.log('new enrt', newNotes);
                                    noteCardArray[alliesIndex].push(newNotes);
                                    setIsAddAllies(false);
                                }  
                            } else {
                                setIsAddAllies(true);
                            }
                            setIsAddOrg(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);
                        }}>
                        {isAddAllies ? 'Save Allies' : 'Add Allies'}
                    </button>
                </div>

                {isAddAllies ? <MakeNotesCard typeOfEntry={'Allies'}/> : null}

                {noteCardArray[alliesIndex].map((notesCard, index) => {
                    console.log('note array', noteCardArray[alliesIndex]);
                    console.log('notesCard', notesCard);
                    return (
                        <Fragment>
                            {(notesCard) ? 
                                <NoteCard 
                                    noteCardArray={noteCardArray}
                                    noteCard={notesCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}
            </Fragment>)  
    }

    const EnemiesSubBox = () => {
        return(
            <Fragment>
                <div className="EnemiesSubBoxHeader" id={noteBoxSelection === 'ENEMIES' ? "selectedNoTopBorder" : null}>
                    <div className="enemiesText">
                        Enemies
                    </div>
                    <button
                        className="addEnemiesButton"
                        onClick={() => {
                            if(isAddEnemies) {
                                if( (document.getElementById('NewNotesTitle')?.value !== '') &&
                                    (document.getElementById('NewNotesDetails')?.value !== '')){

                                    const newNotes = {
                                        notesTitle: document.getElementById('NewNotesTitle')?.value,
                                        noteDetails: document.getElementById('NewNotesDetails')?.value,
                                        noteCategoryIndex: enemiesIndex,
                                    };
                                    console.log('new enrt', newNotes);
                                    noteCardArray[enemiesIndex].push(newNotes);
                                    setIsAddEnemies(false);
                                }  
                            } else {
                                setIsAddEnemies(true);
                            }
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);
                        }}>
                        {isAddEnemies ? 'Save Enemies' : 'Add Enemies'}
                    </button>
                </div>

                {isAddEnemies ? <MakeNotesCard typeOfEntry={'Enemies'}/> : null}

                {noteCardArray[enemiesIndex].map((notesCard, index) => {
                    console.log('spell array', noteCardArray[enemiesIndex]);
                    console.log('spellObj', notesCard);
                    return (
                        <Fragment>
                            {(notesCard) ? 
                                <NoteCard 
                                    noteCardArray={noteCardArray}
                                    noteCard={notesCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })}
            </Fragment>)  
    }

    const BackstorySubBox = () => {
        return(
            <Fragment>
                <div className="BackstorySubBoxHeader" id={noteBoxSelection === 'BACKSTORY' ? "selectedNoTopBorder" : null}>
                    <div className="backstoryText">
                        Backstory
                    </div>
                    {(!(noteCardArray[backstoryIndex][0])) ? 
                    <button
                        className="addBackstoryButton"
                        onClick={() => {
                            if(isAddBackstory) {
                                if((document.getElementById('NewNotesTitle')?.value !== '')){
                                
                                        const newNotes = {
                                            noteDetails: document.getElementById('NewNotesDetails')?.value,
                                            noteCategoryIndex: backstoryIndex,
                                        };
                                        console.log('new enrt', newNotes);
                                        noteCardArray[backstoryIndex].push(newNotes);
                                        setIsAddBackstory(false);
                                    }  
                            } else {
                                setIsAddBackstory(true);
                            }
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddOther(false);
                        }}>
                        {isAddBackstory ? 'Save Backstory' : 'Add Backstory'}
                    </button> :                     
                        <button 
                            className="NoteBoxSaveButton"
                            id={`${noteCardArray[backstoryIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                            onClick={(e) => {
                                (entryCardBeingEdited === 'NO') ? 
                                setEntryCardBeingEdited(`${noteCardArray[backstoryIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                                setIsEdit(!isEdit);
                                }}>
                            {(isEdit && (entryCardBeingEdited === `${noteCardArray[backstoryIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                        </button>}
                </div>

                {isAddBackstory ? <MakeNotesCard typeOfEntry={'Backstory'}/> : null}

                {/* {noteCardArray[backstoryIndex].map((notesCard, index) => {
                    console.log('spell array', noteCardArray[backstoryIndex]);
                    console.log('spellObj', notesCard);
                    return (
                        <Fragment>
                            {(notesCard) ? 
                                <NoteCard 
                                    noteCardArray={noteCardArray}
                                    noteCard={notesCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })} */}
                {(noteCardArray[backstoryIndex][singleEntryIndex]) ? 
                    <NoteCard 
                        noteCardArray={noteCardArray}
                        noteCard={noteCardArray[backstoryIndex][singleEntryIndex]}
                        index={singleEntryIndex}/> : null}
            </Fragment>)
    }

    const OtherSubBox = () => {
        return(
            <Fragment>
                <div className="OtherSubBoxHeader" id={noteBoxSelection === 'OTHER' ? "selectedNoTopBorder" : null}>
                    <div className="otherText">
                        Other
                    </div>
                    {(!(noteCardArray[otherIndex][0])) ?
                    <button
                        className="addOtherButton"
                        onClick={() => {
                            if(isAddOther) {
                                if((document.getElementById('NewNotesTitle')?.value !== '')){
                                
                                        const newNotes = {
                                            noteDetails: document.getElementById('NewNotesDetails')?.value,
                                            noteCategoryIndex: otherIndex,
                                        };
                                        console.log('new enrt', newNotes);
                                        noteCardArray[otherIndex].push(newNotes);
                                        setIsAddOther(false);
                                    }  
                            } else {
                                setIsAddOther(true);
                            }
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                        }}>
                        {isAddOther ? 'Save Other' : 'Add Other'}
                    </button> :                     
                        <button 
                            className="NoteBoxSaveButton"
                            id={`${noteCardArray[otherIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`}
                            onClick={(e) => {
                                (entryCardBeingEdited === 'NO') ? 
                                setEntryCardBeingEdited(`${noteCardArray[otherIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`) : setEntryCardBeingEdited('NO');
                                setIsEdit(!isEdit);
                                document.getElementsByClassName('NotesMainBox').scrollHeight = document.getElementsByClassName('OtherSubBoxHeader').offsetHeight;
                                }}>
                            {(isEdit && (entryCardBeingEdited === `${noteCardArray[otherIndex][singleEntryIndex].noteCategoryIndex}_${singleEntryIndex}`)) ? 'save' : 'edit'}
                        </button>}
                </div>

                {isAddOther ? <MakeNotesCard typeOfEntry={'Other'}/> : null}

                {/* {noteCardArray[otherIndex].map((notesCard, index) => {
                    console.log('spell array', noteCardArray[otherIndex]);
                    console.log('spellObj', notesCard);
                    return (
                        <Fragment>
                            {(notesCard) ? 
                                <NoteCard 
                                    noteCardArray={noteCardArray}
                                    noteCard={notesCard} 
                                    index={index}/> : null}
                        </Fragment>
                    )
                })} */}
                {(noteCardArray[otherIndex][singleEntryIndex]) ? 
                    <NoteCard 
                        noteCardArray={noteCardArray}
                        noteCard={noteCardArray[otherIndex][singleEntryIndex]} 
                        index={singleEntryIndex}/> : null}
            </Fragment>)
    }

    const MultiNotesBox = () => {
        switch(noteBoxSelection) {
            case 'ORGANIZATIONS':
                return (<OrgsSubBox />)
            case 'ALLIES':
                return (<AlliesSubBox />)
            case 'ENEMIES':
                return (<EnemiesSubBox />)
            case 'BACKSTORY':
                return (<BackstorySubBox />)
            case 'OTHER':
                return (<OtherSubBox />)
            default:
                return (
                <Fragment>
                    <OrgsSubBox />
                    <AlliesSubBox />
                    <EnemiesSubBox />
                    <BackstorySubBox />
                    <OtherSubBox />
                </Fragment>)
        }
    }

    return (
        <Fragment>
            <div className="Notes-MultiSelectBox">
                <div className="featsAndTraitsHeader">
                    <button
                        className="NotesAllButton"
                        id={noteBoxSelection === 'ALL' ? 'activeNotesButton' : null}
                        onClick={() => {
                            setNoteBoxSelection('ALL');
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);}}>All</button>
                    <button
                        className="NotesOrgsButton"
                        id={noteBoxSelection === 'ORGANIZATIONS' ? 'activeNotesButton' : null}
                        onClick={() => {
                            setNoteBoxSelection('ORGANIZATIONS');
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);}}>Organizations</button>
                    <button
                        className="NotesAlliesButton"
                        id={noteBoxSelection === 'ALLIES' ? 'activeNotesButton' : null}
                        onClick={() => {
                            setNoteBoxSelection('ALLIES');
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);}}>Allies</button>
                    <button
                        className="NotesEnemiesButton"
                        id={noteBoxSelection === 'ENEMIES' ? 'activeNotesButton' : null}
                        onClick={() => {
                            setNoteBoxSelection('ENEMIES');
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);}}>Enemies</button>
                    <button
                        className="NotesBackstoryButton"
                        id={noteBoxSelection === 'BACKSTORY' ? 'activeNotesButton' : null}
                        onClick={() => {
                            setNoteBoxSelection('BACKSTORY');
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);}}>Backstory</button>
                    <button
                        className="NotesOtherButton"
                        id={noteBoxSelection === 'OTHER' ? 'activeNotesButton' : null}
                        onClick={() => {
                            setNoteBoxSelection('OTHER');
                            setIsAddOrg(false);
                            setIsAddAllies(false);
                            setIsAddEnemies(false);
                            setIsAddBackstory(false);
                            setIsAddOther(false);}}>Other</button>
                </div>
                <div className="notesMainBox">
                    <MultiNotesBox />
                </div>
            </div>
        </Fragment>
    )
}