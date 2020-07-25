import React from 'react';
import Container from 'react-bootstrap/Container';
import Dir from './components/Dir';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Container className="mt-3">
        <Switch>
          <Route
            path="/content/:path?"
            render={(props) => <Dir key={props.match.params.path} {...props} />}
          />
          <Route path="/">
            <Redirect to="/content/" />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
