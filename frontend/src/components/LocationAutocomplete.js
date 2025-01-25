import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

function LocationAutocomplete({ value, onChange }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error('Google Maps Places API not loaded');
        return;
      }

      try {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          { types: ['(cities)'] }
        );

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.formatted_address) {
            onChange(place.formatted_address);
          } else {
            onChange(inputRef.current.value);
          }
        });
      } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error);
      }
    };

    if (window.google) {
      initAutocomplete();
    } else {
      // Handle case when Google Maps script is still loading
      const checkGoogleExists = setInterval(() => {
        if (window.google) {
          initAutocomplete();
          clearInterval(checkGoogleExists);
        }
      }, 100);

      // Clear interval after 10 seconds if Google Maps doesn't load
      setTimeout(() => clearInterval(checkGoogleExists), 10000);
    }
  }, [onChange]);

  return (
    <Form.Control
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter car location"
      required
    />
  );
}

export default LocationAutocomplete;