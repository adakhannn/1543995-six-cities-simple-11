import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {URL_MARKER_DEFAULT} from '../../const';
import useMap from '../../hooks/use-map/use-map';
import {useAppSelector} from '../../hooks';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(defaultCustomIcon).addTo(map);
      });
      map.options.center = {
        lat: city.location.latitude,
        lng: city.location.longitude
      };
      map.options.zoom = city.location.zoom;
    }
  }, [map, offers]);
  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
