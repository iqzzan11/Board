import BoardList from './components/BoardList'
import Write from './components/Write';
import Content from './components/Content';
import {Routes, Route} from 'react-router-dom';
import './board.css';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<BoardList/>}/>
      <Route path='/write' element={<Write/>}/>
      <Route path='/content' element={<Content/>}/>
    </Routes>

    </>
  );
}

export default App;
