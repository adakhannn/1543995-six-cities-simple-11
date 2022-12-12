import {fetchNearbyOffers} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useEffect} from 'react';
import {getNearbyOffers} from '../../store/offers-data/selectors';
import NearCard from '../near-card/near-card';

type NearbyCardsList = {
  id: string | undefined;
}

function NearCardList(props: NearbyCardsList): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = props;
  const nearbyOffers = useAppSelector(getNearbyOffers);
  useEffect(() => {
    dispatch(fetchNearbyOffers(Number(id)));
  }, []);
  return (
    <div className="near-places__list places__list">
      {nearbyOffers.map((offer) => <NearCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default NearCardList;
