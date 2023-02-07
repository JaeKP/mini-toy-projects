import { Route, Routes } from "react-router-dom";
import { Community, Post } from "./Pages";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Community />}></Route>
        <Route path="/:postId" element={<Post />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
