import React from "react";
import { ChangeEvent, Component, ReactComponentElement, useCallback, useEffect, useRef, useState } from "react";
import { AbilityBoxInfo } from "./abilityBox";
import { SkillsBox } from "./skillsBox";
import { determineModifier } from "../helpers/determineModSign";
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
        attacks,
        newAttackInfo,
        spells,
        inventory,
        featsAndTraits,
        description,
        notes
}) => {

    const [proficiencyBonus, setProfiencyBonus] = useState<number>(additionalInfoBoxInfo ? additionalInfoBoxInfo.profBonus : 2);

    const [multiBoxSelection, setMultiBoxSelection] = useState<string>('ATTACKS');
    

    const [numberOfAttacks, setNumberOfAttacks] =  useState<number>(0);
    const [attackBonus, setAttackBonus] = useState<number>(0);
    const [rangedOrMeleeAnswer, setRangedOrMeleeAnswer] = useState<boolean>(false);
    const [finesseWeaponAnswer, setFinesseWeaponAnswer] = useState<boolean>(false);
    const [proficientWithWeaponAnswer, setProficientWithWeaponAnswer] = useState<boolean>(false);

    function AttackCard (
        name: string,
        atkBonus: number,
        typeOfHitDice: number,
        numberOfHitDice: number,
        typeOfDamage: string,
        shortRange?: number,
        longRange?: number,
        notes?: string) 
    {
        this.name = name;
        this.atkBonus = atkBonus;
        this.typeOfHitDice = typeOfHitDice;
        this.numberOfHitDice =  numberOfHitDice;
        this.typeOfDamage =  typeOfDamage;
        this.shortRange =  shortRange;
        this.longRange =  longRange;
        this.notes = notes;
    }

    const testAttackCard = new AttackCard('Trident', 0, 4, 1, 'Piercing', 20, 60, 'Finesse, Thrown');

    const attackCardArray: {}[] = [];

    attackCardArray.push(testAttackCard);

    const MultiSelectBox = () => {
        console.log('mult select', multiBoxSelection);
        switch(multiBoxSelection) {
            case 'ATTACKS':
                return (
                    <AttacksSelectionBox 
                        attacks={attacks} 
                        abilityBoxInfo={abilityBoxInfo}
                        newAttackInfo={newAttackInfo}/>)
            case 'SPELLS':
                return (<SpellsSelectionBox spells={spells}/>)
            case 'INVENTORY':
                return (<InventorySelectionBox inventory={inventory}/>)
            case 'FEATS&TRAITS':
                return (<FeatsAndTraitsSelectionBox featsAndTraits={featsAndTraits}/>)
            case 'DESCRIPTION':
                return (<DecriptionSelectionBox description={description}/>)
            case 'NOTES':
                return (<NotesSelectionBox notes={notes}/>)
            default:
                return (<AttacksSelectionBox 
                            attacks={attacks} 
                            abilityBoxInfo={abilityBoxInfo}
                            newAttackInfo={newAttackInfo}/>)
        }
    }

    console.log('skillsBxin', skillsBoxInfo);

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

                <div className="Notes-MultiSelectOuterBox">
                    <div className="Notes-MultiSelectHeaderBox">
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