import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {PinIcon} from '../../const';
import useMap from '../../hooks/use-map/use-map';
import {useAppSelector} from '../../hooks';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: PinIcon.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: PinIcon.Active,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(): JSX.Element {
  const offers = useAppSelector((state) => state.sortedOffers);
  const city = useAppSelector((state) => state.city);
  const hoverOffer = useAppSelector((state) => state.hoverOffer);
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
              hoverOffer && offer.id === hoverOffer.id
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
  }, [map, offers, hoverOffer]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
