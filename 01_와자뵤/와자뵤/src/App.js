import { useEffect, useState } from "react";
import Button from "./component/Button";
import Card from "./component/Card";
import Sidebar from "./component/Sidebar";

function App() {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("data")) || [""]
  );

  const deleteData = (num) => {
    const newData = data.filter((d) => d.id !== num);
    setData(newData);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <Button data={data} setData={setData} />
      <Card data={data} setData={setData} deleteData={deleteData} />
      <Sidebar data={data} />
    </div>
  );
}

export default App;
