export function fillAttackCardArray(cards) {
    const temp = [];
    cards.forEach((attack) => {
        temp.push(attack);
    })
    return temp;
}

export function fillSpellCardArray(cards) {
    console.log('spell cards', cards);
    const temp = [];
    const numberOfSpellLevels = 10;

    for(let i = 0; i < numberOfSpellLevels; i++) {
        temp[i] = [];
    }

    cards.forEach((spellLevelArray) => {
        spellLevelArray.forEach((spell) => {
            const spellLevelIndex = parseInt(spell.spellLevel);
            console.log('spell', spell, 'leve', spellLevelIndex);
            temp[spellLevelIndex].push(spell);
        })
    })
    // cards.forEach((spell) => {
    //     console.log('spell', spell)
    //     console.log('spell', spell, 'leve', spell.spellLevel);

    //     if(spell[0]) {
    //         temp[spell.spellLevel].push(spell);
    //     }
    // })
    return temp;
}