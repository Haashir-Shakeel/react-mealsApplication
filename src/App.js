import './App.css';
import Search from './components/Search';
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Modals from './components/Modals';
import { useGlobalContext } from './context';

function App() {
  const {showModal} = useGlobalContext()

  return (
    <main>
      <Search/>
      {/* <Favourites/> */}
      <Meals/>
      {showModal && <Modals/>}
    </main>
  );
}

export default App;
