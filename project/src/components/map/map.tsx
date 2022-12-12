import {useAppSelector} from '../../hooks';
import {currentCustomIcon, defaultCustomIcon} from '../../const';
import {Marker} from 'leaflet';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map/use-map';
import {getActiveCity, getSortedOffers} from '../../store/offers-data/selectors';
import {getHoveredOffer} from '../../store/offers-process/selectors';
import 'leaflet/dist/leaflet.css';

function Map(): JSX.Element {
  const offers = useAppSelector(getSortedOffers);
  const city = useAppSelector(getActiveCity);
  const hoveredOffer = useAppSelector(getHoveredOffer);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    const markers:Marker[] = [];
    if (map) {
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
      if (offers) {
        offers.forEach((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });
          markers.push(marker);
          marker
            .setIcon(
              hoveredOffer && offer.id === hoveredOffer.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(map);
        });
      }
    }
    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, offers, hoveredOffer]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
