import {useAppDispatch, useAppSelector} from '../../hooks';
import MainLogo from '../main-logo/main-logo';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <MainLogo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ?
                <>
                  <li className="header__nav-item user">
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: userInfo ? userInfo.avatarUrl : ''}}></div>
                      <span className="header__user-name user__name">{userInfo ? userInfo.email : ''}</span>
                    </div>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
                :
                <li className="header__nav-item user">
                  <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;