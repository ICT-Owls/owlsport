import React, {FC} from 'react';
/*
const LocationFormView = () => {
    return (<!--
    Copyright 2021 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  -->
<!DOCTYPE html>
    <style>
      body {
        margin: 0;
      }

      .sb-title {
        position: relative;
        top: -12px;
        font-family: Roboto, sans-serif;
        font-weight: 500;
      }

      .sb-title-icon {
        position: relative;
        top: -5px;
      }

      .card-container {
        display: flex;
        height: 500px;
        width: 300px;
      }

      .panel {
        background: white;
        width: 300px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .half-input-container {
        display: flex;
        justify-content: space-between;
      }

      .half-input {
        max-width: 120px;
      }

      h2 {
        margin: 0;
        font-family: Roboto, sans-serif;
      }

      input {
        height: 30px;
      }

      input {
        border: 0;
        border-bottom: 1px solid black;
        font-size: 14px;
        font-family: Roboto, sans-serif;
        font-style: normal;
        font-weight: normal;
      }

      input:focus::placeholder {
        color: white;
      }
    </style>
    <script>
    "use strict";

    function initMap() {
      const CONFIGURATION = {
        "ctaTitle": "Checkout",
        "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":true,"zoom":11,"zoomControl":true,"maxZoom":22},
        "mapsApiKey": "***REMOVED***",
        "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":false,"ctaControl":false}
      };
      const componentForm = [
        'location',
        'locality',
        'administrative_area_level_1',
        'country',
        'postal_code',
      ];

      const getFormInputElement = (component) => document.getElementById(component + '-input');
      const autocompleteInput = getFormInputElement('location');
      const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      });
      autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert('No details available for input: \'' + place.name + '\'');
          return;
        }
        fillInAddress(place);
      });

      function fillInAddress(place) {  // optional parameter
        const addressNameFormat = {
          'street_number': 'short_name',
          'route': 'long_name',
          'locality': 'long_name',
          'administrative_area_level_1': 'short_name',
          'country': 'long_name',
          'postal_code': 'short_name',
        };
        const getAddressComp = function (type) {
          for (const component of place.address_components) {
            if (component.types[0] === type) {
              return component[addressNameFormat[type]];
            }
          }
          return '';
        };
        getFormInputElement('location').value = getAddressComp('street_number') + ' '
                  + getAddressComp('route');
        for (const component of componentForm) {
          // Location field is handled separately above as it has different logic.
          if (component !== 'location') {
            getFormInputElement(component).value = getAddressComp(component);
          }
        }
      }
    }
    </script>

    <div class="card-container">
      <div class="panel">
        <div>
          <img class="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="">
          <span class="sb-title">Address Selection</span>
        </div>
        <input type="text" placeholder="Address" id="location-input"/>
        <input type="text" placeholder="Apt, Suite, etc (optional)"/>
        <input type="text" placeholder="City" id="locality-input"/>
        <div class="half-input-container">
          <input type="text" class="half-input" placeholder="State/Province" id="administrative_area_level_1-input"/>
          <input type="text" class="half-input" placeholder="Zip/Postal code" id="postal_code-input"/>
        </div>
        <input type="text" placeholder="Country" id="country-input"/>
      </div>
    </div>
    <script src="https://maps.googleapis.com/maps/api/js?key=***REMOVED***&libraries=places&callback=initMap&solution_channel=GMP_QB_addressselection_v1_cA" async defer></script>
);
};

export default LocationFormView;
*/