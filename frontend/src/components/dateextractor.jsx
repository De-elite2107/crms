export const extractedDate = (isoString) => {
    const date = new Date(isoString);
    // Extracting date and time
    const extractedDate = date.toISOString().split('T')[0]; // '2024-11-30'
    return extractedDate;
}

export const extractedTime = (isoString) => {
    const date = new Date(isoString);
    // Extracting time
    const extractedTime = date.toISOString().split('T')[1].replace('Z', '').split('.')[0]; // '00:00:00'
    return extractedTime;
}