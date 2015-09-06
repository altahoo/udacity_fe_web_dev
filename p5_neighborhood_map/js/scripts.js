
// $(document).ready(function(){/* google maps -----------------------------------------------------*/
//google.maps.event.addDomListener(window, 'load', initialize);

//function initialize() {

  /* position Amsterdam */
/*  var latlng = new google.maps.LatLng(52.3731, 4.8922);

  var mapOptions = {
    center: latlng,
    scrollWheel: false,
    zoom: 13
  };
  
  var marker = new google.maps.Marker({
    position: latlng,
    url: '/',
    animation: google.maps.Animation.DROP
  });
  
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  marker.setMap(map);

};
/* end google maps -----------------------------------------------------*/
//});

var LATITUTE = '40.7586';
var LONGITUDE = '-73.9792'; // Fort Lee, NJ

var ZIPCODE = '10022'; // New York, NY

var opentableUrl = 'http://opentable.herokuapp.com/api/restaurants?zip=' + ZIPCODE; 

/* 
 * Google Map object 
 * Style: https://developers.google.com/maps/documentation/javascript/styling?hl=en
 * Maker: https://developers.google.com/maps/documentation/javascript/markers
 * Info Windows: https://developers.google.com/maps/documentation/javascript/infowindows
 */
var GoogleMap = function(center, element) {

  // Create an array of styles. 
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 15,
    center: center,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };

  var map = new google.maps.Map(element, mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  return map;
};

/* 
 * Restaurant object 
 */
var Restaurant = function(restaurant, map) {
  
  var self = this;

  self.name = ko.observable(restaurant.name);
  self.lat = restaurant.lat;
  self.lng = restaurant.lng;
  self.url = restaurant.reserve_url;
  self.phone = restaurant.phone;
  self.address = restaurant.address;

  // Check if this restaurant has valide lat and lng
  self.validLocation = ko.computed(function() {
    if (self.lat === 0 || self.lng === 0) {
      return null;
    } else {
      return new google.maps.LatLng(self.lat, self.lng);
    }
  });

  // Initialize marker
  self.marker = (function(restaurant) {
    var marker;

    // validate that the restaurant has a location
    if (restaurant.validLocation()) {
      marker = new google.maps.Marker({
        position: restaurant.validLocation(),
        map: map,
      });
    }

    return marker;

  })(self);

  // Informations are retrieved from opentable API and are shown in the info window
  self.formattedInfo = function() {
    infoString = '<ul class="info-window-list">' + 
                '<p><a href="' + this.url + '">' + this.name() + '</a></p>' + 
                '<p>Address: ' + this.address + '</p>' +
                '<p>Phone: ' + this.phone + '</p>' +
                '</ul>';
    return '<div class="info-window-content">' +
        '<span class="info-window-header">' + infoString + '</span>' + '</div>';
  };

  // Initialize google map info window
  self.infoWindow = new google.maps.InfoWindow({
    content: self.formattedInfo()
  });

  // When the user clicks the marker, an info window opens.
  google.maps.event.addListener(self.marker, 'click', function() {
    map.panTo(self.marker.position);
    self.infoWindow.open(map, self.marker);
  });
};

/* Main application view model */
var AppViewModel = function() {
  var self = this;

  var map;
  var element = document.getElementById('map-canvas');
  var center = new google.maps.LatLng(LATITUTE, LONGITUDE);

  // List of restaurants, bound to #restaurant-list
  self.restaurantList = ko.observableArray([]);

  /* 
   * Fetches restaurants from opentable API
   * @params {string} url - opentable API URL 
   */
  function fetchRestaurants(url) {
    var data;

    $.getJSON(url, function (data) {
      var restaurants = data.restaurants;
      // Build restaurant list and place restaurant markers on the map
      for (var i = 0; i < restaurants.length; i++) {
        var item = restaurants[i];
        restaurant = new Restaurant(item, map);
        if (restaurant.validLocation()) {
          self.restaurantList.push(restaurant);
        }
      }
    }).error(function(e) { // Error handling for calling OpenTable API
      document.getElementById('result-list').innerHTML = "<font color=red>Restaurants Cannot Be Loaded!</font>";
    });
  }

  function initialize() {
    map = new GoogleMap(center, element);
    fetchRestaurants(opentableUrl);
  }

  // Error handling for loading google map
  if (typeof google !== 'object' || typeof google.maps !== 'object') {
    document.getElementById('result-list').innerHTML = "<font color=red>Google Map Cannot Be Loaded!</font>";
  }

  // Search query, bound to `#search-input` search box
  self.query = ko.observable('');

  // Search function, bund to '#search-form'
  self.search = function() {};

  // Returns a filtered list of restaurants if name contains `self.query` data
  self.filteredRestaurantList = ko.computed(function() {
    // Loop through restaurants and clear map markers
    self.restaurantList().forEach(function(restaurant) {
      restaurant.marker.setMap(null);
    });

    // Filter results where name contains `self.query`
    var results = ko.utils.arrayFilter(self.restaurantList(), function(restaurant) {
      return (restaurant.name().toLowerCase().indexOf(self.query().toLowerCase()) > -1);
    });

    // Go through results and set marker to visible
    results.forEach(function(restaurant) {
      restaurant.marker.setMap(map);
    });

    return results;
  });

  // Triggered by clicking the item on the restaurant list
  self.selectRestaurant = function(restaurant) {

    // Reset marker and info window
    self.restaurantList().forEach(function(restaurant) {
      restaurant.marker.setAnimation(null);
      restaurant.infoWindow.close(map, restaurant.marker);
    });

    map.panTo(restaurant.marker.position);

    // Open info window
    restaurant.infoWindow.open(map, restaurant.marker);

    // Animate markers
    restaurant.marker.setAnimation(google.maps.Animation.BOUNCE);  
  };

  // Initialize listener
  google.maps.event.addDomListener(window, 'load', initialize);
};

ko.applyBindings(new AppViewModel());