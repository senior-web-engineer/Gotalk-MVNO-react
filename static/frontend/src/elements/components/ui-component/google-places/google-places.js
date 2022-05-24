import './google-places.scss';
import GooglePlacesAutocomplete, {geocodeByPlaceId} from "react-google-places-autocomplete";
import React, {useState} from "react";

export default function GooglePlaces({onChange, containerClass}) {

    const [googleMapValue, setGoogleMapValue] = useState();

    function googleAddressChange(ev) {
        setGoogleMapValue(ev);
        geocodeByPlaceId(ev.value.place_id).then(places => {
            if(!places?.length) {
                return;
            }

            onChange(places[0]);
        });
    }

    return (
        <div className={`styled-input ${containerClass}`}>
            <p className="styled-input__label">Automatic Address Entry w/Google</p>
            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_MAPS}
                selectProps={{
                    value: googleMapValue,
                    onChange: (ev) => googleAddressChange(ev),
                    placeholder: "Enter address",
                    className: 'google-autocomplete',
                    classNamePrefix: "gat"
                }}
            />
        </div>
    );
}
