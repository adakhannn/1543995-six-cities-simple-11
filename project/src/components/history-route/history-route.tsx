import {Router} from 'react-router-dom';
import {useState, useLayoutEffect, ReactNode} from 'react';
import type {BrowserHistory} from 'history';

export interface HistoryRouteProps {
  history: BrowserHistory;
  basename?: string;
  children?: ReactNode;
}

function HistoryRoute({
  basename,
  children,
  history,
}: HistoryRouteProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRoute;
