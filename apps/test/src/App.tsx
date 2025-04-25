function App() {
  const a = [1, 2, 3];

  return (
    <div>
      {a.map((el) => {
        return (
          <div
            key={el}
            onClick={() => {
              return console.log(el);
            }}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
}

export default App;
