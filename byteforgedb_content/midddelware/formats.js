// Function to format date as dd:mm:yyyy
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');         // Get day and pad with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month and pad with leading zero
    const year = date.getFullYear();                             // Get full year
    return `${day}:${month}:${year}`;                            // Return formatted date
}
  
//  Function to format time as hh:mm:ss
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');      // Get hours and pad with leading zero
    const minutes = String(date.getMinutes()).padStart(2, '0');  // Get minutes and pad with leading zero
    const seconds = String(date.getSeconds()).padStart(2, '0');  // Get seconds and pad with leading zero
    return `${hours}:${minutes}:${seconds}`;                     // Return formatted time
}

module.exports = { formatDate, formatTime }; // Export requestTime