import './App.css';
import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';

function App() {
  const ingredients = [{name: "Salad", price: 0.30}, {name: "Cheese", price: 0.50}, {name: "Meat", price: 2.00}, {name: "Bacon", price: 1.00}, {name: "Tomato", price: 0.50}, {name: "Onion", price: 0.30}];
  return (
    <div className="App">
      <Header />
      <Content ingredients={ingredients}/>
      <Footer />
    </div>
  );
}

export default App;
