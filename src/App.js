import './App.css';
import Search from './components/Search';
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Modals from './components/Modals';

function App() {


  return (
    <main>
      <Search/>
      {/* <Favourites/> */}
      <Meals/>
      {/* <Modals/> */}
    </main>
  );
}

export default App;
