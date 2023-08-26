import Main from "./Components/Contents/Main";





function App(props) {
  console.log((Math.floor(Math.random()*100))%15);
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
