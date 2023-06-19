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
    const temp = [];
    const numberOfFeatAndTraitSections = 3;

    for(let i = 0; i < numberOfFeatAndTraitSections; i++) {
        temp[i] = [];
    }

    cards.forEach((featTraitArray, sectionIndex) => {
        featTraitArray.forEach((featTraitObj) => {
            temp[sectionIndex].push(featTraitObj);
        })
    })
    console.log('temp', temp);
    return temp;
}

export function fillDescriptionArray(cards) {
    console.log('desc cards', cards);
    const temp = [];
    const numberOfDescriptionSections = 3;

    for(let i = 0; i < numberOfDescriptionSections; i++) {
        temp[i] = [];
    }

    cards.forEach((descriptionArray, sectionIndex) => {
        descriptionArray.forEach((descObj) => {
            console.log('descObj', descObj, 'sectionIndex', sectionIndex);
            temp[sectionIndex].push(descObj);
        })
    })
    console.log('temp', temp);
    return temp;
}

export function fillNotesArray(cards) {
    console.log('note cards passed into function', cards);
    const temp = [];
    const numberOfNotesSections = 5;

    for(let i = 0; i < numberOfNotesSections; i++) {
        temp[i] = [];
    }

    cards.forEach((notesArray, sectionIndex) => {
        console.log('card array', notesArray);
        notesArray.forEach((notesObj) => {
            console.log('notesObj', notesObj, 'sectionIndex', sectionIndex);
            temp[sectionIndex].push(notesObj);
        })
    })
    console.log('temp', temp);
    return temp;
}