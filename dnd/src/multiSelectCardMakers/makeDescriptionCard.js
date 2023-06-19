import { Fragment, useEffect, useState } from "react";
import React from "react";

const MakeDescriptionCard = () => {


    const [newEntryTitle, setNewEntryTitle] = useState('');
    const [newEntrySourceBook, setNewEntrySourceBook] = useState('');
    const [newEntryPageNumber, setNewEntryPageNumber] = useState(1);
    const [newEntryDetails, setNewEntryDetails] = useState('');

    return (
        <div className="loneEntryBox">
            <div className="entryInfoUpperBox">
                <div className="entryInfoTitleBox">
                    <span className="entryCardTitleAndBookText">Entry Title</span>
                    <textarea
                        className="entryCardTitleAndBookInput"
                        value={newEntryTitle}
                        id={'NewEntryTitle'}
                        onChange={(e) => {setNewEntryTitle(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
                </div>
                <div className="entryInfoSourceBookBox">
                    <span className="entryCardTitleAndBookText">Source Book</span>
                    <textarea
                        className="entryCardTitleAndBookInput"
                        value={newEntrySourceBook}
                        id={'NewEntrySourceBook'}
                        onChange={(e) => {setNewEntrySourceBook(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
                </div>
                <div className="entryPageNumberBox">
                    <div className="entryPageNumberText">Page</div>
                    <input
                            className="entryPageNumberDial"
                            id="newEntryPageNumber"
                            type="number"
                            defaultValue={newEntryPageNumber}
                            min={0}
                            max={99999}
                    ></input>
                </div>
            </div>
        <div className="entryDetailsBox">
            <span className="entryDetailsText">Details</span>
            <textarea
                    className="entryDetailsInputBox"
                    value={newEntryDetails}
                    id={'NewEntryDetails'}
                    onChange={(e) => {setNewEntryDetails(e.target.value.toString());}}
                    cols={1}
                    rows={1}></textarea>
        </div>

    </div> 
    );
};
export default MakeDescriptionCard;