import BoardList from './components/BoardList'
import Write from './components/Write';
import {Routes, Route} from 'react-router-dom';
import './board.css';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<BoardList/>}/>
      <Route path='/write' element={<Write/>}/>
    </Routes>

    </>
  );
}

export default App;
