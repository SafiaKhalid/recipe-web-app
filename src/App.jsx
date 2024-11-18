import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import AddRecipe from './screens/AddRecipe';
import ViewRecipe from './screens/ViewRecipe';

const App = () => {
  return <Router>
    <Routes>
      <Route exact path='/' Component={Home}></Route>
      <Route path='/add' Component={AddRecipe}></Route>
      <Route path='/view' Component={ViewRecipe}></Route>
    </Routes>
  </Router>
}

export default App
