import Container from './components/Container';
import HeaderTable from './components/HeaderPage';
import './static/App.css';

function App() {
  return (
    <div>
      <div>
        <HeaderTable />
      </div>
      <div className='div-container'>
        <Container />
      </div>

    </div>
  );
}

export default App;
