import Color from './types/Color';
import classes from './App.module.scss';
import AddColor from './components/Colors/AddColor';
import ColorsList from './components/Colors/ColorsList';

const predefinedColors: Color[] = [
  { id: 1, type: 'prepared', value: '#ffe0b2' },
  { id: 2, type: 'prepared', value: '#e65100' },
  { id: 3, type: 'prepared', value: '#ffcc80' },
  { id: 4, type: 'prepared', value: '#ffb74d' },
  { id: 5, type: 'prepared', value: '#fb8c00' },
  { id: 6, type: 'prepared', value: '#ffa726' },
  { id: 7, type: 'prepared', value: '#f57c00' },
  { id: 8, type: 'prepared', value: '#fff3e0' },
  { id: 9, type: 'prepared', value: '#ef6c00' },
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
