
angular.module('app', ['onsen']);

angular.module('app').controller('FilterController', function($scope, $http) {

  $scope.records = JSON.parse(localStorage.getItem('records'));


});


angular.module('app').controller('AppController', function($scope, $http) {
	
	
	

	
  $scope.obj = {
    searchString: '',
    state: 'isLoading',
  };
	

  var records = JSON.parse(localStorage.getItem('records'));

  if (records === null) {
    records = {
      food: true,
      shops: false,
      outdoors: false
    };

    localStorage.setItem('records', JSON.stringify(records));
  }

  

  
  
	window.navigator.geolocation.getCurrentPosition(function(position){
		var lat=position.coords.latitude;
		var lng=position.coords.longitude;
		
		$scope.$apply(function(){
			
			$scope.lat=lat;
			$scope.lng=lng;
			
		});
		
		  var clientID = "1FBODOBPJ2LNQYMBLB2X2UFOGXJW5VYKUO1UKQO1RVTGOVY4";
    var clientSecret = "3N4MPZHV3MIN5HXS5BWPDZTEYQK1VYSUPJK5RI1HFX3D1MBC";

	
    $http.get("https://api.foursquare.com/v2/venues/explore/?ll="+lat+","+lng+"&radius=4000&venuePhotos=1&section=coffee&limit=10&openNow=1&sortByDistance=1&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20131124")
      .then(function(result, status) {
        var items = result.data.response.groups[0].items;

        var help = [];
        for (var el in items) {
          var place = $scope.parseVenue(items[el]);


          help.push(place);
        }

        $scope.obj.state = 'loaded';
        $scope.venues = help;
      }, function(data, status) {
        $scope.obj.state = 'noResult';
      });
  

  $scope.parseVenue = function(data) {
  var venue = data.venue;
  var price = '$';

  if (venue.price) {
    var value = venue.price.tier;
    while (value > 1) {
      price += '$';
      value--;
    }
  } else {
    price = '';
  }



  return {
    title: venue.name,
   
    venueID: venue.id,
    picture_url: venue.photos.groups[0].items[0].prefix + '100x100' + venue.photos.groups[0].items[0].suffix,
    
    price: price,
    place: venue.location.formattedAddress[0] + ',' + venue.location.formattedAddress[1],
    category: venue.categories[0].name
  };
};
	});

 

  


  $scope.$watch('obj.searchString', function() {
    $scope.search();
  });
});
