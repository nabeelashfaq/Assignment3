import logo from "./app-logo.png";
import "./App.css";
import Products from "./pages/products/products";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Products />
    </div>
  );
}

export default App;
