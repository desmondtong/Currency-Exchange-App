import React, { useState, useEffect } from "react";

const domain = import.meta.env.VITE_SERVER;

function App() {
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    try {
      const res = await fetch(
        domain +
          "fluctuation?start_date=2023-07-24&end_date=2023-07-25&base=SGD"
      );

      if (!res.ok) alert("error");

      const data = await res.json();

      setPost(data);
      console.log("fetched");
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  };

  useEffect(() => {
    fetchPost();
    console.log("useEff run");
  }, []);

  return <div>{JSON.stringify(post)}</div>;
}

export default App;
