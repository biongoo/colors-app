import Color from './types/Color';
import classes from './App.module.scss';
import AddColor from './components/Colors/AddColor';
import ColorsList from './components/Colors/ColorsList';

const predefinedColors: Color[] = [
  { id: 1, type: 'prepared', value: '#ffa3a3' },
  { id: 2, type: 'prepared', value: '#000000' },
  { id: 3, type: 'prepared', value: '#FFFFFF' },
  { id: 4, type: 'prepared', value: '#00FFFF' },
  { id: 5, type: 'prepared', value: '#FF00FF' },
  { id: 6, type: 'prepared', value: '#FFFF00' },
  { id: 7, type: 'prepared', value: '#0000FF' },
  { id: 8, type: 'prepared', value: '#00FF00' },
  { id: 9, type: 'prepared', value: '#FF0000' },
];

const App = () => {
  return (
    <div className={classes.app}>
      <AddColor />
      <ColorsList predefinedColors={predefinedColors} />
    </div>
  );
};

export default App;
