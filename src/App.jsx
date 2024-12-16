import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import AddRecipe from './screens/AddRecipe';
import ViewRecipe from './screens/ViewRecipe';
import EditRecipe from './screens/EditRecipe';

const App = () => {
  /* document.body.focus({ preventScroll: true }) */
  return <Router>
    <Routes>
      <Route exact path='/' Component={Home}></Route>
      <Route path='/add' Component={AddRecipe}></Route>
      <Route path='/view' Component={ViewRecipe}></Route>
      <Route path='/edit' Component={EditRecipe}></Route>
    </Routes>
  </Router>
}

export default App
