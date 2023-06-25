import { Fragment, useEffect, useState } from "react";
import React from "react";

const MakeDescriptionCard = ({typeOfEntry}) => {

    const [newDescriptionTitle, setNewDescriptionTitle] = useState('');
    const [newDescriptionDetails, setNewDescriptionDetails] = useState('');
    const [newDescriptionSourceBook, setNewDescriptionSourceBook] = useState('');
    const [newDescriptionPageNumber, setNewDescriptionPageNumber] = useState(1);
    const [newCharacteristicDetails, setNewCharacteristicDetails] = useState('');
    const [newAppearanceDetails, setNewAppearanceDetails] = useState('');

    if(typeOfEntry === 'Background') {
        return (
        <div className="loneDescriptionBox">
            <div className="descriptionDetailsBox">
                <div className="descriptionInfoTitleBox">
                    <span className="descriptionCardTitleAndBookText">Background Title</span>
                    <textarea
                        className="descriptionCardTitleAndBookInput"
                        value={newDescriptionTitle}
                        id={'NewDescriptionTitle'}
                        onChange={(e) => {setNewDescriptionTitle(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
                </div>
                <div className="descriptionInfoSourceBookBox">
                    <span className="descriptionCardTitleAndBookText">Source Book</span>
                    <textarea
                        className="descriptionCardTitleAndBookInput"
                        value={newDescriptionSourceBook}
                        id={'NewDescriptionSourceBook'}
                        onChange={(e) => {setNewDescriptionSourceBook(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
                </div>
                <div className="descriptionPageNumberBox">
                    <div className="descriptionPageNumberText">Page</div>
                    <input
                            className="descriptionPageNumberDial"
                            id="NewDescriptionPageNumber"
                            type="number"
                            defaultValue={newDescriptionPageNumber}
                            min={0}
                            max={99999}
                    ></input>
                </div>
            </div>
            <div className="descriptionDetailsBox">
                <span className="descriptionDetailsText">Details</span>
                <textarea
                        className="descriptionDetailsInputBox"
                        value={newDescriptionDetails}
                        id={'NewDescriptionDetails'}
                        onChange={(e) => {setNewDescriptionDetails(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
            </div>
        </div>)
    }
    
    else if((typeOfEntry === 'PersonalityTraits') || 
            (typeOfEntry === 'Ideals') || 
            (typeOfEntry === 'Bonds') || 
            (typeOfEntry === 'Flaws')) {
        return (
        <div className="noTitleLoneSubCharacteristicsBox">
            <div className="noTitleSubCharacteristicsDetailsBox">
                <span className="noteDetailsText">Details</span>
                <textarea
                        className= "noTitleSubCharacteristicsDetailsInputBox"
                        value={newCharacteristicDetails}
                        id={'NewCharacteristicDetails'}
                        onChange={(e) => {setNewCharacteristicDetails(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
            </div>
        </div>)
    }
    
    else if(typeOfEntry === 'Appearance') {
        return (
        <div className="noTitleLoneAppearanceBox">
            <div className="noTitleAppearanceDetailsBox">
                <span className="noteDetailsText">Details</span>
                <textarea
                        className= "noTitleAppearanceDetailsInputBox"
                        value={newAppearanceDetails}
                        id={'NewAppearanceDetails'}
                        onChange={(e) => {setNewAppearanceDetails(e.target.value.toString());}}
                        cols={1}
                        rows={1}></textarea>
            </div>
        </div>)
    }


};
export default MakeDescriptionCard;