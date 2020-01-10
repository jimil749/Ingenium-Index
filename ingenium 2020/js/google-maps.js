

function initMap() {
	var uluru = {
		lat: 23.0373,
		lng: 72.5522
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
		},
		scrollwheel: false,
		draggable: true,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
	var infowindow = new google.maps.InfoWindow({
		content: "We Are Here"
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
	var infowindow = new google.maps.InfoWindow({
		content: "We Are Here"
	});
	infowindow.open(map, marker);
}
