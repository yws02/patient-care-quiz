import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/quiz" component={Quiz} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;