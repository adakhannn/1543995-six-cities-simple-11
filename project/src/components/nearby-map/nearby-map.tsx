import {useAppSelector} from '../../hooks';
import {currentCustomIcon, defaultCustomIcon} from '../../const';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map/use-map';
import {getActiveCity, getActiveOffer, getNearbyOffers} from '../../store/offers-data/selectors';
import {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

function NearbyMap(): JSX.Element {
  const currentOffer = useAppSelector(getActiveOffer);
  const offers = useAppSelector(getNearbyOffers);
  const city = useAppSelector(getActiveCity);
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
              currentOffer && offer.id === currentOffer.id
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
  }, [map, offers]);
  return (
    <div
      style={{width: '1144px', height: '580px', margin: '0 auto'}}
      ref={mapRef}
    >
    </div>
  );
}

export default NearbyMap;
