export function fillCardArray(cards) {
    const temp = [];
    cards.forEach((obj) => {
        temp.push(obj);
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
    return temp;
}

export function fillTraitAndFeatArray(cards) {
    console.log('feat cards', cards);
    const temp = [];
    const numberOfSections = 3;

    for(let i = 0; i < numberOfSections; i++) {
        temp[i] = [];
    }

    cards.forEach((featTraitArray, sectionIndex) => {
        console.log('feat array', featTraitArray);
        featTraitArray.forEach((featTraitObj) => {
            console.log('featTraitObj', featTraitObj, 'leve', sectionIndex);
            temp[sectionIndex].push(featTraitObj);
        })
    })
    console.log('temp', temp);
    return temp;
}