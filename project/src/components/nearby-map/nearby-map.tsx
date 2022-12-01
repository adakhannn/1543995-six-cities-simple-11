import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {useAppSelector} from '../../hooks';
import {PinIcon} from '../../const';
import useMap from '../../hooks/use-map/use-map';
import {getActiveCity, getNearbyOffers} from '../../store/offers-data/selectors';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: PinIcon.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function NearbyMap(): JSX.Element {
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
            .setIcon(defaultCustomIcon)
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
