import {loginAction} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import MainLogo from '../../components/main-logo/main-logo';
import {getActiveCity} from '../../store/offers-data/selectors';
import {redirectToRoute} from '../../store/action';
import {useRef, FormEvent, ChangeEvent, useState} from 'react';
import {AppRoute} from '../../const';
import {AuthData} from '../../types/auth-data';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const location = useAppSelector(getActiveCity);
  const [validationStatus, setValidationStatus] = useState(false);
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };
  const handleInputPassword = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    if (/[0-9]/.test(value) && /[a-z]/.test(value)) {
      setValidationStatus(true);
    } else {
      setValidationStatus(false);
    }
  };
  const onSubmit = (authData: AuthData) => {
    if (validationStatus) {
      dispatch(loginAction(authData));
    }
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <MainLogo />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onInput={handleInputPassword}
                />
              </div>
              {!validationStatus ? <p>Password must contain at least one number and one letter!</p> : ''}
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(redirectToRoute(AppRoute.Root));
                }}
              >
                <span>{location.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
