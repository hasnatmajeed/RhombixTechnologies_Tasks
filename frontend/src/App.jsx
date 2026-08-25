import { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    fetch("http://localhost:3000", {
      credentials: "include"
    })
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      });

  }, []);

  return (
    <div>
      <h1>MERN Todo App</h1>

      <p>{message}</p>
    </div>
  );
}

export default App;