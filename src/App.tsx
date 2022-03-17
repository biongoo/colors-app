import AddColor from './components/Colors/AddColor';
import ColorsList from './components/Colors/ColorsList';
import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <AddColor />
      <ColorsList />
    </div>
  );
};

export default App;
