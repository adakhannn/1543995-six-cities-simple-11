import {useAppSelector} from '../../hooks';
import {getActiveCity} from '../../store/offers-data/selectors';
import {Offers} from '../../types/offer';

type TitleProps = {
  offers: Offers;
};

function Title({ offers }: TitleProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  return (
    <b className="places__found">{offers ? offers.length : ''} places to stay in {activeCity.name}</b>
  );
}

export default Title;
