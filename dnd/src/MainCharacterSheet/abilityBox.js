import { useEffect, useState } from "react";
import React from "react";
import { determineModifier } from "../helpers/determineModSign";

export const AbilityBoxInfo = ({abilityBoxInfo}) => {

   const [abilityBoxEdit, setAbilityBoxEdit] = useState(false);
   const [strengthScore, setStrengthScore] = useState(abilityBoxInfo ? abilityBoxInfo.str : 15);
   const [dexterityScore, setDexterityScore] = useState(abilityBoxInfo ? abilityBoxInfo.dex : 14);
   const [constitutionScore, setConstitutionScore] = useState(abilityBoxInfo ? abilityBoxInfo.const : 8);
   const [intelligenceScore, setIntelligenceScore] = useState(abilityBoxInfo ? abilityBoxInfo.int : 10);
   const [wisdomScore, setWisdomScore] = useState(abilityBoxInfo ? abilityBoxInfo.wis : 12);
   const [charismaScore, setCharismaScore] = useState(abilityBoxInfo ? abilityBoxInfo.cha : 13);

   function updateAbilityBoxInfo(str, dex, constituion, int, wis, cha) {
       setStrengthScore(str);
       setDexterityScore(dex);
       setConstitutionScore(constituion);
       setIntelligenceScore(int);
       setWisdomScore(wis);
       setCharismaScore(cha);
   }

   useEffect(() => {
       localStorage.setItem("abilityBoxInfo", JSON.stringify(
           {str: strengthScore, dex: dexterityScore, const: constitutionScore, int: intelligenceScore, wis: wisdomScore, cha: charismaScore}));
   }, [strengthScore, dexterityScore, constitutionScore, intelligenceScore, wisdomScore, charismaScore]);

    return (
        <div className="AbilityBox">
            <div className="AbilityBoxTopRow">
                <div className="LoneAbilityBox">
                    <div className="AbilityHeader"> Strength  </div>
                    <div className="AbilityModifier"> {determineModifier(strengthScore)} </div>
                    {abilityBoxEdit ? 
                    <input  className="AbilityScoreInput" 
                            id="STR" 
                            type='number' 
                            min={3} max={20}
                            defaultValue={strengthScore}></input> :
                    <div className="AbilityScore"> {strengthScore} </div>
                    }

                </div>
                <div className="LoneAbilityBox">
                    <div className="AbilityHeader"> Dexterity  </div>
                    <div className="AbilityModifier"> {determineModifier(dexterityScore)} </div>
                    {abilityBoxEdit ? 
                    <input  className="AbilityScoreInput" 
                            id="DEX" 
                            type='number' 
                            min={3} max={20}
                            defaultValue={dexterityScore}></input> :
                    <div className="AbilityScore"> {dexterityScore} </div>
                    }
                </div>
                <div className="LoneAbilityBox">
                    <div className="AbilityHeader"> Constitution  </div>
                    <div className="AbilityModifier"> {determineModifier(constitutionScore)} </div>
                    {abilityBoxEdit ? 
                    <input  className="AbilityScoreInput" 
                            id="CONST" 
                            type='number' 
                            min={3} max={20}
                            defaultValue={constitutionScore}></input> :
                    <div className="AbilityScore"> {constitutionScore} </div>
                    }
                </div>
            </div>

            <div className="AbilityBoxEditButtonBox">
                <button 
                    className="AbilityBoxEditButton"
                    onClick={(e) => {
                        if(abilityBoxEdit) {
                            updateAbilityBoxInfo( document.getElementById('STR')?.value, document.getElementById('DEX')?.value,
                                document.getElementById('CONST')?.value, document.getElementById('INT')?.value,
                                document.getElementById('WIS')?.value, document.getElementById('CHA')?.value);
                            window.location.reload(); 
                        } else {
                            updateAbilityBoxInfo( strengthScore, dexterityScore, constitutionScore, intelligenceScore,  wisdomScore, charismaScore);
                        }
                        setAbilityBoxEdit(!abilityBoxEdit);
                        }}>{abilityBoxEdit ? 'save' : 'edit'}</button> 
            </div>

            <div className="AbilityBoxBottomRow">
                    <div className="LoneAbilityBox">
                        <div className="AbilityHeader"> Intelligence  </div>
                        <div className="AbilityModifier"> {determineModifier(intelligenceScore)} </div>
                        {abilityBoxEdit ? 
                        <input  className="AbilityScoreInput" 
                                id="INT" 
                                type='number' 
                                min={3} max={20}
                                defaultValue={intelligenceScore}></input> :
                        <div className="AbilityScore"> {intelligenceScore} </div>
                        }
                    </div>
                    <div className="LoneAbilityBox">
                        <div className="AbilityHeader"> Wisdom  </div>
                        <div className="AbilityModifier"> {determineModifier(wisdomScore)} </div>
                        {abilityBoxEdit ? 
                        <input  className="AbilityScoreInput" 
                                id="WIS" 
                                type='number' 
                                min={3} max={20}
                                defaultValue={wisdomScore}></input> :
                        <div className="AbilityScore"> {wisdomScore} </div>
                        }
                    </div>
                    <div className="LoneAbilityBox">
                        <div className="AbilityHeader"> Charisma  </div>
                        <div className="AbilityModifier"> {determineModifier(charismaScore)} </div>
                        {abilityBoxEdit ? 
                        <input  className="AbilityScoreInput" 
                                id="CHA" 
                                type='number' 
                                min={3} max={20}
                                defaultValue={charismaScore}></input> :
                        <div className="AbilityScore"> {charismaScore} </div>
                        }
                    </div>
            </div>
        </div>
    )
}