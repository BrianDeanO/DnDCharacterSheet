export function determineSkillCheckBonus(proficientSkillsObj) {
    console.log("obj - ", proficientSkillsObj);
    let skillBonus = 0;

    var skillProfCircle = document.getElementById(proficientSkillsObj.skill)?.className;
    // const skillIndex = proficientSkillsArray.findIndex((skillElement) => (skillElement.skill === skillName));
    // console.log('before classname skill prof circle', skillProfCircle);
    // console.log('skill index', skillIndex);

    // if(document.getElementById(proficientSkillsObj.skill)?.className === 'ProficiencyCheckBox') {
    //     //@ts-ignore
    //     document.getElementById(proficientSkillsObj.skill).className = 'ProficiencyCheckBoxActive';
    // } else {
    //     //@ts-ignore
    //     document.getElementById(proficientSkillsObj.skill).className = 'ProficiencyCheckBox';
    // }

    // console.log('after classname', document.getElementById(skillName)?.className);
    // console.log('skill prof circle', skillProfCircle);

    // if(skillProfCircle?.className === 'ProficiencyCheckBox') {
    //     skillProfCircle.className = 'ProficiencyCheckBoxActive';
    // } else {
    //     skillProfCircle.className = 'ProficiencyCheckBox';
    // }

    if(proficientSkillsObj.proficient) {
        proficientSkillsObj.proficient = false;
    } else{
        proficientSkillsObj.proficient = true;
    }

    // switch(skillAbilityAcronym) {
    //     case 'STR':
    //         skillBonus += STRModifier;
    //         break;
    //     case 'DEX':
    //         skillBonus += DEXModifier;
    //         break;
    //     case 'CONST':
    //         skillBonus += CONSTModifier;
    //         break;
    //     case 'INT':
    //         skillBonus += INTModifier;
    //         break;
    //     case 'WIS':
    //         skillBonus += WISModifier;
    //         break;
    //     case 'CHA':
    //         skillBonus += CHAModifier;
    //         break;
    // }

    // console.log('newElement', proficientSkillsArray[skillIndex]);
    // console.log('bonus', skillBonus);

    // proficientSkillsArray[skillIndex].modifier += skillBonus;

    // console.log(' after newElement', proficientSkillsArray[skillIndex]);
}