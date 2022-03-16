import React from 'react';
import './map-block.scss';

const MapBlock = () => (
  <section id="map-section" className="section-map">
    <h2 className="map-block__title">Check coverage in your area</h2>
    <div className="map-block-iframe-container">
      <iframe
        width="100%"
        height="600"
        title="Coverage map"
        src="https://maps.t-mobile.com/pcc.html?map=mvno-roamdcm-5"
      />
    </div>
  </section>
);

export default MapBlock;
