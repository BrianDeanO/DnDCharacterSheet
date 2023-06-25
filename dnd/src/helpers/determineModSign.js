// Function to get the correct sign on the ability modifier
export function determineModifier(score) {
    const modifier = Math.floor((score - 10) / 2);
    const signedMod = modifier >= 0 ? `+${modifier}` : `${modifier}`;
    return signedMod;
}