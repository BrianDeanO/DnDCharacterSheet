import React from "react";
import { useState } from "react";
import { AbilityBoxInfo } from "./abilityBox";
import { SkillsBox } from "./skillsBox";
import { SavingThrowsBox } from "./savingThrowsBox";
import { ProfAndLanguagesBox } from "./profsAndLangsBox";
import { AdditionalCharacterInfoBox } from "./additional_InfoBox";
import { HealthBox } from "./healthBox";
import AttacksSelectionBox  from "./MultiSelectBoxes/attacksBox.js";
import { NotesSelectionBox } from "./MultiSelectBoxes/notesBox";
import { SpellsSelectionBox } from "./MultiSelectBoxes/spellsBox";
import { FeatsAndTraitsSelectionBox } from "./MultiSelectBoxes/featsAndTraitsBox";
import { DecriptionSelectionBox } from "./MultiSelectBoxes/descriptionBox";
import { InventorySelectionBox } from "./MultiSelectBoxes/inventoryBox";

const CharacterSheet = ({
        abilityBoxInfo, 
        skillsBoxInfo, 
        savingThrowsBoxInfo, 
        profAndLangBoxInfo,
        additionalInfoBoxInfo,
        healthBoxInfo,
        // attacks,
        // newAttackInfo,
        // spells,
        // spellHeaderInfo,
        // inventory,
        // inventoryHeaderInfo,
        featsAndTraits,
        description,
        notes
}) => {

    const [proficiencyBonus, setProfiencyBonus] = useState<number>(additionalInfoBoxInfo ? additionalInfoBoxInfo.profBonus : 2);

    const [multiBoxSelection, setMultiBoxSelection] = useState<string>('FEATS&TRAITS');

    const MultiSelectBox = () => {
       // console.log('mult select', multiBoxSelection);
        switch(multiBoxSelection) {
            case 'ATTACKS':
                return (
                    <AttacksSelectionBox 
                        // attacks={attacks} 
                        abilityBoxInfo={abilityBoxInfo}
                        // newAttackInfo={newAttackInfo}
                        />)
            case 'SPELLS':
                return (<SpellsSelectionBox 
                            // spells={spells}
                            abilityBoxInfo={abilityBoxInfo}
                            // spellHeaderInfo={spellHeaderInfo}
                            />)
            case 'INVENTORY':
                return (<InventorySelectionBox 
                            // inventory={inventory}
                            // inventoryHeaderInfo={inventoryHeaderInfo}
                            />)
            case 'FEATS&TRAITS':
                return (<FeatsAndTraitsSelectionBox />)
            case 'DESCRIPTION':
                return (<DecriptionSelectionBox description={description}/>)
            case 'NOTES':
                return (<NotesSelectionBox notes={notes}/>)
            default:
                return (<AttacksSelectionBox 
                            // attacks={attacks} 
                            abilityBoxInfo={abilityBoxInfo}
                            // newAttackInfo={newAttackInfo}
                            />)
        }
    }

    //console.log('skillsBxin', skillsBoxInfo);

    return (
        <div className="CharacterSheet">
            <div className="MainAbilityAndHitPointRow">
                <AbilityBoxInfo abilityBoxInfo={abilityBoxInfo}/>
                <div className="HitPoint-DeathSavesAndInfoBox">
                    <HealthBox healthBoxInfo={healthBoxInfo}/>
                    
                    <AdditionalCharacterInfoBox 
                        additionalInfoBoxInfo={additionalInfoBoxInfo}
                        proficiencyBonus={proficiencyBonus}
                        passivePerception={skillsBoxInfo ? skillsBoxInfo.Perception : [13, false]}
                    />
                </div>
            </div>
            <div className="SecondLayerOfCharacterSheet">
                <SkillsBox 
                    abilityBoxInfo={abilityBoxInfo}
                    skillsBoxInfo={skillsBoxInfo} 
                    proficiencyBonus={proficiencyBonus} 
                />
                <div className="SaveThrowsAndProfLangColumn">            
                    <SavingThrowsBox 
                        abilityBoxInfo={abilityBoxInfo}
                        savingThrowsBoxInfo={savingThrowsBoxInfo} 
                        proficiencyBonus={proficiencyBonus}
                    />
                    <ProfAndLanguagesBox profAndLangBoxInfo={profAndLangBoxInfo} />
                </div>

                <div className="MultiSelectOuterBox">
                    <div className="MultiSelectHeaderBox">
                        <span
                            className="AttacksBoxButton"
                            id={multiBoxSelection === 'ATTACKS' ? 'activeButton' : 'notActiveButton'}
                            onClick={() => setMultiBoxSelection('ATTACKS')}> Attacks </span>
                        <span
                            className="SpellsBoxButton"
                            id={multiBoxSelection === 'SPELLS' ? 'activeButton' : 'notActiveButton'}
                            onClick={() => setMultiBoxSelection('SPELLS')}> Spells </span>
                        <span
                            className="InventoryBoxButton"
                            id={multiBoxSelection === 'INVENTORY' ? 'activeButton' : 'notActiveButton'}
                            onClick={() => setMultiBoxSelection('INVENTORY')}> Inventory </span>
                        <span
                            className="FeaturesAndTraitsBoxButton"
                            id={multiBoxSelection === 'FEATS&TRAITS' ? 'activeButton' : 'notActiveButton'}
                            onClick={() => setMultiBoxSelection('FEATS&TRAITS')}> Features & Traits </span>
                        <span
                            className="DescriptionBoxButton"
                            id={multiBoxSelection === 'DESCRIPTION' ? 'activeButton' : 'notActiveButton'}
                            onClick={() => setMultiBoxSelection('DESCRIPTION')}> Description </span>
                        <span
                            className="NotesBoxButton"
                            id={multiBoxSelection === 'NOTES' ? 'activeButton' : 'notActiveButton'}
                            onClick={() => setMultiBoxSelection('NOTES')}> Notes </span>
                    </div>
                   <MultiSelectBox />                
                </div>
            </div>
        </div>
    )
}

export default CharacterSheet;