import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import AddRecipe from './screens/AddRecipe';

const App = () => {
  return <Router>
    <Routes>
      <Route exact path='/' Component={Home}></Route>
      <Route path='/add' Component={AddRecipe}></Route>
    </Routes>
  </Router>
}

export default App
