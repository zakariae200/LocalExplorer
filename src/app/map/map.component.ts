import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Loader } from '@googlemaps/js-api-loader';
import { AuthService } from '../Services/authh.service';
import { HostListener } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  likedPlaces: any[] = [];
  map!: google.maps.Map;
  places: any[] = [];
  currentLocation: any
  currentWeather: any
  isLargeScreen = window.innerWidth > 720;
  markers: google.maps.Marker[] = [];



  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.isLargeScreen = event.target.innerWidth > 720;
  }

  constructor(private http: HttpClient , private authService: AuthService) { }

  ngOnInit() {
    this.initMap();
  }
  currentIndex = 0;

  nextCard(liked: boolean) {
    if (liked) {
      this.likedPlaces.push(this.places[this.currentIndex]);
      this.showPlaceOnMap(this.places[this.currentIndex]);
    }
  
    if (this.currentIndex < this.places.length - 1) {
      this.currentIndex++;
    }
  }
  initMap() {
    const loader = new Loader({
      apiKey: 'your-api',
      libraries: ['places']
    });

    loader.load().then(() => {
      console.log('Google Maps API loaded');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude };
          console.log('location:', location)
          this.currentLocation = location
          this.map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 20,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
          });
          new google.maps.Marker({
            position: location,
            map: this.map
          });
          // Get nearby places
          this.getNearbyPlaces(position.coords.latitude, position.coords.longitude);

          // Get weather data
          this.getWeatherData(position.coords.latitude, position.coords.longitude);


        });
      } else {
        console.log('Browser doesn\'t support geolocation');
      }
    }).catch((error) => {
      console.error('Error loading Google Maps API:', error);
    });
  }

  getWeatherData(latitude: number, longitude: number) {
    this.http.get<any>('http://api.weatherapi.com/v1/current.json?key=your-api' + latitude + ',' + longitude)
      .subscribe(data => {
        console.log('Weather Data:', data);
        this.currentWeather = data;
      }, error => {
        console.error('Error fetching weather data:', error);
      });
  }
  getNearbyPlaces(latitude: number, longitude: number) {
    const location = new google.maps.LatLng(latitude, longitude);
    const service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch({
      location: location,
      radius: 500, // Search within a 500m radius
      type: ['restaurant'] 
    }, (results: string | any[], status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          this.getPlaceDetails(results[i].place_id);
        }
      } else {
        console.error('Error fetching nearby places:', status);
      }
    });
  }
  getPlaceDetails(placeId: string) {
    const request = {
      placeId: placeId,
      fields: ['name', 'rating', 'photos', 'geometry', 'opening_hours', 'types']
    };
    const service = new google.maps.places.PlacesService(this.map);
    service.getDetails(request, (place: {
      open_now: any; photos: any; geometry: any; opening_hours: any; types: any;
    }, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place.photos && place.geometry) {
        // Add opening_hours and types to the place object
        place.open_now = place.opening_hours ? place.opening_hours.isOpen() : 'Unknown';
        place.types = place.types ? place.types[0] : 'Unknown';
        this.places.push(place);
        // console.log('Place Details:', place);
      } else {
        console.error('Error fetching place details:', status);
      }
    });
  }


  showPlaceOnMap(place: any) {
    // Center the map on the place
    this.map.setCenter(place.geometry.location);
    // Create an info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="card">
          <div class="card-media" style="background-image: url(${place.photos[0].getUrl()})">
            <div class="delivery-time">39 mins</div>
            <div class="bookmark"></div>
          </div>
          <div class="card-description">
            <div class="about-place">
              <div class="place">
                <p class="place-name">${place.name}</p>
                <p class="place-speciality">${place.types}</p>
                <p class="place-status">${place.open_now ? 'Open Now' : 'Closed'}</p>
              </div>
              <div class="place-review">
                <p class="rating">${place.rating} ★</p>
              </div>
            </div>
          </div>
        </div>
      `
    });

    // Create a marker
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: this.map
    });
    // marker.addListener('click', () => {
    //   infoWindow.open(this.map, marker);
    // });
    // google.maps.event.trigger(marker, 'click');
    this.markers.push(marker);
    infoWindow.open(this.map, marker);
  }

}
