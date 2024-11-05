import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';

const App = () => {
  return <Router>
    <Routes>
      <Route exact path='/' Component={Home}></Route>
    </Routes>
  </Router>
}

export default App
