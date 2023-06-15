import { useEffect, useState } from "react";
import React from "react";
import { determineModifier } from "../helpers/determineModSign";

export const ProfAndLanguagesBox = ({profAndLangBoxInfo}) => {

   // console.log('profs and langs', profAndLangBoxInfo);

    const [armorProficiencies,setArmorProficiencies] = useState(profAndLangBoxInfo ? profAndLangBoxInfo.armor : 'None');
    const [weaponProficiencies,setWeaponProficiencies] = useState(profAndLangBoxInfo ? profAndLangBoxInfo.weapons : 'None');
    const [toolProficiencies,setToolProficiencies] = useState(profAndLangBoxInfo ? profAndLangBoxInfo.tools : 'None');
    const [languageProficiencies,setLanguageProficiencies] = useState(profAndLangBoxInfo ? profAndLangBoxInfo.languages : 'None');

    // const handleChange = (input) => {
    //     console.log(input);
    //     setArmorProficiencies(input);
    // }
    // var armorStuff;

    // useEffect(() => {
    //     if(document.getElementById('ArmorInfo')) {
    //         console.log('armor stuff', document.getElementById('ArmorInfo').value);
    //     }
    // }, [document.getElementById('ArmorInfo').value]);

    useEffect(() => {
        localStorage.setItem("profAndLangBoxInfo", JSON.stringify(
            {   armor: armorProficiencies, 
                weapons: weaponProficiencies, 
                tools: toolProficiencies, 
                languages: languageProficiencies}));
    }, [armorProficiencies, weaponProficiencies, toolProficiencies, languageProficiencies]);

    return (
        <div className="ProfAndLangOuterBox">
            <span className="ProfAndLangText"> Proficiences & Languages </span>
            <div className="ArmorBox">
                <span className="ProfAndLangBoxText"> Armor </span>
                <textarea
                    className="ArmorInput"
                    value={armorProficiencies}
                    onChange={(e) => {setArmorProficiencies(e.target.value.toString())}}
                    cols={1}
                    rows={4}></textarea>
            </div>
            <div className="WeaponsBox">
                <span className="ProfAndLangBoxText"> Weapons </span>
                <textarea
                    className="WeaponInput"
                    value={weaponProficiencies}
                    onChange={(e) => {setWeaponProficiencies(e.target.value.toString())}}
                    cols={1}
                    rows={4}></textarea>
            </div>
            <div className="ToolsBox">
                <span className="ProfAndLangBoxText"> Tools </span>
                <textarea
                    className="ToolInput"
                    value={toolProficiencies}
                    onChange={(e) => {setToolProficiencies(e.target.value.toString())}}
                    cols={1}
                    rows={4}></textarea>
            </div>
            <div className="LanguagesBox">
                <span className="ProfAndLangBoxText"> Languages </span>
                <textarea
                    className="LangInput"
                    value={languageProficiencies}
                    onChange={(e) => {setLanguageProficiencies(e.target.value.toString())}}
                    cols={1}
                    rows={4}></textarea>
            </div>
        </div>
    )
}