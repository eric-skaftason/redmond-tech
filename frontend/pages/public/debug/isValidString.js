// Use async
export async function isValidString(string) {
    if (string.length === 4) return true;
    return "Error: string must have a length of 4.";
}

// Use sync
function isValidString2(string) {
    if (string.length === 4) return true;
    return false;
}

// Return error message
function isValidString3(string) {
    if (string.length === 4) return true;
    return "Error message";
}