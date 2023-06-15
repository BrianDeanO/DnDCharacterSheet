export function determineSpellDC(spellDCInput, abilityBoxInfo) {
    console.log('determine', spellDCInput, abilityBoxInfo);
    switch(spellDCInput) {
        case 'N/A':
            return 0;
        case 'STR':
            return abilityBoxInfo.str;
        case 'DEX':
            return abilityBoxInfo.dex;
        case 'CONST':
            return abilityBoxInfo.const;
        case 'INT':
            return abilityBoxInfo.int;
        case 'WIS':
            return abilityBoxInfo.wis;
        case 'CHA':
            return abilityBoxInfo.cha;
        default:
            return -1;
    }
}