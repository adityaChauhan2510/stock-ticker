import './App.css'
import StockDashboard from './page/StockDashboard';
import { Provider } from 'react-redux';
import { store } from './store';
import DarkModeToggle from './components/DarkModeToggle';
function App() {


  return (
    <Provider store={store}>
      <DarkModeToggle />
      <StockDashboard />
    </Provider>
  )
}

export default App 