import { Fragment, useEffect, useState } from "react";
import React from "react";

const MakeNotesCard = ({typeOfEntry}) => {

    const [newNotesTitle, setNewNotesTitle] = useState('');
    const [newNotesDetails, setNewNotesDetails] = useState('');

    return (
        ((typeOfEntry === 'Backstory') || (typeOfEntry === 'Other')) ? 
            <div className="noTitleLoneNoteBox">
                <div className="noTitleDetailsBox">
                    <span className="noteDetailsText">Details</span>
                    <textarea
                            className= "noTitleNoteDetailsInputBox"
                            value={newNotesDetails}
                            id={'NewNotesDetails'}
                            onChange={(e) => {setNewNotesDetails(e.target.value.toString());}}
                            cols={1}
                            rows={1}></textarea>
                </div>
            </div> : 
            <div className="loneNoteBox">
                <div className="notesDetailsUpperBox">
                    <div className="notesTitleBox">
                        <span className="notesCardText">{typeOfEntry} Title</span>
                        <textarea
                            className="notesCardTitleInput"
                            value={newNotesTitle}
                            id={'NewNotesTitle'}
                            onChange={(e) => {setNewNotesTitle(e.target.value.toString());}}
                            cols={1}
                            rows={1}></textarea>
                    </div>
                </div>
                <div className="noteDetailsBox">
                    <span className="noteDetailsText">Details</span>
                    <textarea
                            className="noteDetailsInputBox"
                            value={newNotesDetails}
                            id={'NewNotesDetails'}
                            onChange={(e) => {setNewNotesDetails(e.target.value.toString());}}
                            cols={1}
                            rows={1}></textarea>
                </div>
            </div>
    );
};
export default MakeNotesCard;