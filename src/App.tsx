import AddColor from './components/AddColor/AddColor';
import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <AddColor />
    </div>
  );
};

export default App;
