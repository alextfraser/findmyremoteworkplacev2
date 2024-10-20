// parseGoogleMapsUrl.js

function parseGoogleMapsUrl(url) {
    try {
        const parsedUrl = new URL(url);
        const pathSegments = parsedUrl.pathname.split('/');
        const nameIndex = pathSegments.findIndex(segment => segment === 'place');
        const locationName = nameIndex !== -1 ? decodeURIComponent(pathSegments[nameIndex + 1]).replaceAll('+', ' ') : '';

        const latLongMatch = parsedUrl.pathname.match(/@([-\d\.]+),([-\d\.]+)/);
        if (latLongMatch) {
            const latitude = latLongMatch[1];
            const longitude = latLongMatch[2];
            return {
                locationName,
                latitude,
                longitude
            };
        } else {
            throw new Error('Coordinates not found in URL');
        }
    } catch (error) {
        console.error('Invalid Google Maps URL:', error);
        return null;
    }
}

// Function to use the parsed data and fill in the form fields
function fillLocationFields(url) {
    const parsedData = parseGoogleMapsUrl(url);
    if (parsedData) {
        document.getElementById('location-name').value = parsedData.locationName;
        document.getElementById('latitude').value = parsedData.latitude;
        document.getElementById('longitude').value = parsedData.longitude;
    } else {
        alert('Unable to parse Google Maps URL. Please enter manually.');
    }
}