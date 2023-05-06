// Function to get the correct sign on the ability modifier
export function determineModifier(score) {
    const modifier = Math.floor((score - 10) / 2);
    const signedMod = modifier >= 0 ? `+${modifier}` : `${modifier}`;
    return signedMod;
}

// // Function to calculate the modifier given the character'{s ability score
// export const abilityModifierSetter = (ability, score) => {
//     const modifier = Math.floor((score - 10) / 2);
//     switch(ability) {
//         case 'STR':
//             setSTRModifier(modifier);
//             break;
//         case 'DEX':
//             setDEXModifier(modifier);
//             break;
//         case 'CONST':
//             setCONSTModifier(modifier);
//             break;
//         case 'INT':
//             setINTModifier(modifier);
//             break;
//         case 'WIS':
//             setWISModifier(modifier);
//             break;
//         case 'CHA':
//             setCHAModifier(modifier);
//             break;
//     }
// }