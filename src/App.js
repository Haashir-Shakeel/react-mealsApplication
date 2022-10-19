import './App.css';
import Search from './components/Search';
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Modals from './components/Modals';
import { useGlobalContext } from './context';

function App() {
  const {showModal, favourites} = useGlobalContext()
  console.log(favourites.length);

  return (
    <main>
      <Search/>
      {/* rendering favourites only when we have favourites */}
      
      {(favourites.length > 0) && <Favourites/> } 
      <Meals/>
      {/* rendering modal fonly when someone clicks */}
      {showModal && <Modals/>}
    </main>
  );
}

export default App;
