import './google-places.scss';
import GooglePlacesAutocomplete, {geocodeByPlaceId} from "react-google-places-autocomplete";
import React, {useState} from "react";
import useClassnames from "../../../../shared/hooks/useClassnames";

export default function GooglePlaces({onChange, containerClass, isInvalid, description}) {

    const [googleMapValue, setGoogleMapValue] = useState();
    const descriptionClassNames = useClassnames('styled-input__description', isInvalid ? 'error' : '');

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
            <p className="styled-input__label">Address</p>
            <GooglePlacesAutocomplete
                apiKey={process.env.GOOGLE_MAPS}
                selectProps={{
                    value: googleMapValue,
                    onChange: (ev) => googleAddressChange(ev),
                    placeholder: "Enter address",
                    className: `google-autocomplete ${isInvalid ? 'error' : ''}`,
                    classNamePrefix: "gat"
                }}
            />
            <p className={descriptionClassNames}>{description}</p>
        </div>
    );
}
