import { React } from "react"
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { Loading } from "./components/Loading";
import { ReadBook } from "./feature/ReadBook";

function App() {
  return (
    <>
      <div className="relative font-['helvetica'] text-lg w-[2040px] h-[1500px]">
        <Routes>
          <Route path='/readbook/' element={<ReadBook />} />          
        </Routes>
      </div>
      {<Loading></Loading>}
    </>
  );
}

export default App;