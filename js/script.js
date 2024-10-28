$     = function (el) {	return document.getElementById(el); }
$hide = function (el) { el.style.display = 'none'; };
$show = function (el) { el.style.display = 'block'; };

function getLocation() {
	$show($("status"));
	$hide($("location-info"));

	if (navigator.geolocation) {
		$("status").innerText = "Attempting to get your location... Your browser will likely prompt you for permission.";
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else
		$("status").innerText = "Geolocation is not supported by this browser.";
}

function accuracy(acc) {
	if (acc > 1000)
		return Math.round((acc / 1000) * 100) / 100 + " km";
	else
		return Math.round(acc * 100) / 100 + " m";
}

function showPosition(position) {
	$hide($("status"));
	$show($("location-info"));

	console.log(position);

	const lat = position.coords.latitude;
	const lon = position.coords.longitude;

	$("pos-acc").innerText = accuracy(position.coords.accuracy);

	$("pos-lat").innerText = lat;
	$("pos-long").innerText = lon;

	const plusCode = OpenLocationCode.encode(lat, lon);
	$("pos-plus").innerText = plusCode;

	$("googlemaps-link").href = `https://maps.google.com/?q=${lat},${lon}`;
	$("openstreetmap-link").href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=15`;
}

function showError(error) {
	const message = {
		[error.PERMISSION_DENIED]: "User denied the request for Geolocation.",
		[error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
		[error.TIMEOUT]: "The request to get user location timed out.",
		[error.UNKNOWN_ERROR]: "An unknown error occurred."
	}[error.code] || "An unknown error occurred.";

	$("status").innerText = message;
}
