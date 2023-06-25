export function fillCardArray(cards) {
    const temp = [];
    cards.forEach((obj) => {
        temp.push(obj);
    })
    return temp;
}

export function fillSpellCardArray(cards) {
    const temp = [];
    const numberOfSpellLevels = 10;

    for(let i = 0; i < numberOfSpellLevels; i++) {
        temp[i] = [];
    }

    cards.forEach((spellLevelArray) => {
        spellLevelArray.forEach((spell) => {
            const spellLevelIndex = parseInt(spell.spellLevel);
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
    return temp;
}

export function fillDescriptionArray(cards) {
    const temp = [];
    const numberOfDescriptionSections = 6;

    for(let i = 0; i < numberOfDescriptionSections; i++) {
        temp[i] = [];
    }

    cards.forEach((descriptionArray, sectionIndex) => {
        descriptionArray.forEach((descObj) => {
            temp[sectionIndex].push(descObj);
        })
    })
    return temp;
}

export function fillNotesArray(cards) {
    const temp = [];
    const numberOfNotesSections = 5;

    for(let i = 0; i < numberOfNotesSections; i++) {
        temp[i] = [];
    }

    cards.forEach((notesArray, sectionIndex) => {
        notesArray.forEach((notesObj) => {
            temp[sectionIndex].push(notesObj);
        })
    })
    return temp;
}