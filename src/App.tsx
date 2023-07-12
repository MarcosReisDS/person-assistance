import { FC } from 'react';
import './App.css';
import Router from './shared/router';

interface IApp { }
const App: FC<IApp> = () => {
  return (
    <div>
      <Router />
    </div>
  )
}

export default App
