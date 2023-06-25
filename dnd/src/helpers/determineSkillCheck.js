export function determineSkillCheckBonus(proficientSkillsObj) {
    if(proficientSkillsObj.proficient) {
        proficientSkillsObj.proficient = false;
    } else{
        proficientSkillsObj.proficient = true;
    }
}