import React, {useLayoutEffect} from 'react';
import './map-block.scss';

const MapBlock = () => {

    useLayoutEffect(() => {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://contentkit.t-mobile.com/prd/web-content-kit.js";
        s.id = "map-block";
        document.getElementsByTagName("head")[0].appendChild(s);
    }, []);

    return (
        <section id="map-section" className="section-map">
            <h2 className="map-block__title">Check coverage in your area</h2>
            <div className="map-block-iframe-container">
                {/*<tmo-web-content-kit kit-type="map" client-id="PLINTRON-GOTALK" variation="roamdcm-5">*/}
                {/*</tmo-web-content-kit>*/}
                <iframe
                    width="100%"
                    height="600"
                    title="Coverage map"
                    src="https://maps.t-mobile.com/pcc.html?map=mvno-roamdcm-5"
                />
            </div>
        </section>
    );
}

export default MapBlock;
