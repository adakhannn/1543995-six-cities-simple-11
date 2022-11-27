import MainLogo from '../../components/main-logo/main-logo';

function Error(): JSX.Element {
  return (
    <div className="page page--gray page--login">

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <MainLogo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1>404 Not Found</h1>
        <a>Main page</a>
      </main>
    </div>
  );
}

export default Error;
