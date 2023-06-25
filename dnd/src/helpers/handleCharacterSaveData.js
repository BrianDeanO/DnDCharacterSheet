export function saveCharacterData() {
    const chracterData = {
        characterInfo: JSON.parse(localStorage.getItem("characterInfo")),
        inventoryHeaderInfo: JSON.parse(localStorage.getItem("inventoryHeaderInfo")),
        inventory: JSON.parse(localStorage.getItem("inventory")),
        notes: JSON.parse(localStorage.getItem("notes")),
        abilityBoxInfo: JSON.parse(localStorage.getItem("abilityBoxInfo")),
        skillsBoxInfo: JSON.parse(localStorage.getItem("skillsBoxInfo")),
        newSpellEffectChoice: JSON.parse(localStorage.getItem("newSpellEffectChoice")),
        spells: JSON.parse(localStorage.getItem("spells")),
        featsAndTraits: JSON.parse(localStorage.getItem("featsAndTraits")),
        additionalInfoBoxInfo: JSON.parse(localStorage.getItem("additionalInfoBoxInfo")),
        profAndLangBoxInfo: JSON.parse(localStorage.getItem("profAndLangBoxInfo")),
        characteristics: JSON.parse(localStorage.getItem("characteristics")),
        descriptions: JSON.parse(localStorage.getItem("descriptions")),
        savingThrowsBoxInfo: JSON.parse(localStorage.getItem("savingThrowsBoxInfo")),
        spellHeaderInfo: JSON.parse(localStorage.getItem("spellHeaderInfo")),
        healthBoxInfo: JSON.parse(localStorage.getItem("healthBoxInfo")),
        attacks: JSON.parse(localStorage.getItem("attacks")),
    }
    const downloadLink = document.createElement('a');
    const saveFile = new Blob([JSON.stringify(chracterData)], { type: 'text/plain'});
    downloadLink.href = URL.createObjectURL(saveFile);
    downloadLink.download = `${(chracterData.characterInfo.name).split(' ').join('')}_CharacterSheet.json`;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
};


export const characterSheetJSONFields = [
    "characterInfo", "inventoryHeaderInfo", "inventory", "notes",
    "abilityBoxInfo", "skillsBoxInfo", "newSpellEffectChoice","spells",
    "featsAndTraits","additionalInfoBoxInfo","profAndLangBoxInfo",
    "characteristics","descriptions","savingThrowsBoxInfo","spellHeaderInfo", "healthBoxInfo","attacks"];

export function loadCharacterData(saveData) {
    const readInFile = new FileReader();
    readInFile.readAsText(saveData);
    let loadError = true;

    readInFile.onload = (e) => {
        const loadedData = JSON.parse(e.target?.result);

        Object.keys(loadedData).forEach((obj, index) => {
            if(loadError) {
                if(obj !== characterSheetJSONFields[index]) {
                    console.log('LOAD ERROR');
                    loadError = false;
                }
            }
        })

        if(loadError) {
            localStorage.setItem("characterInfo", JSON.stringify(loadedData.characterInfo));
            localStorage.setItem("inventoryHeaderInfo", JSON.stringify(loadedData.inventoryHeaderInfo));
            localStorage.setItem("inventory", JSON.stringify(loadedData.inventory));
            localStorage.setItem("notes", JSON.stringify(loadedData.notes));
            localStorage.setItem("abilityBoxInfo", JSON.stringify(loadedData.abilityBoxInfo));
            localStorage.setItem("skillsBoxInfo", JSON.stringify(loadedData.skillsBoxInfo));
            localStorage.setItem("newSpellEffectChoice", JSON.stringify(loadedData.newSpellEffectChoice));
            localStorage.setItem("spells", JSON.stringify(loadedData.spells));
            localStorage.setItem("featsAndTraits", JSON.stringify(loadedData.featsAndTraits));
            localStorage.setItem("additionalInfoBoxInfo", JSON.stringify(loadedData.additionalInfoBoxInfo));
            localStorage.setItem("profAndLangBoxInfo", JSON.stringify(loadedData.profAndLangBoxInfo));
            localStorage.setItem("characteristics", JSON.stringify(loadedData.characteristics));
            localStorage.setItem("descriptions", JSON.stringify(loadedData.descriptions));
            localStorage.setItem("savingThrowsBoxInfo", JSON.stringify(loadedData.savingThrowsBoxInfo));
            localStorage.setItem("spellHeaderInfo", JSON.stringify(loadedData.spellHeaderInfo));
            localStorage.setItem("healthBoxInfo", JSON.stringify(loadedData.healthBoxInfo));
            localStorage.setItem("attacks", JSON.stringify(loadedData.attacks));
            window.location.reload();
        } else {
            alert("Invalid File. Try Again.");
        }
    };
};