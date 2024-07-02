import React from 'react';
import BookCatalog from "./Organism/BookCatalog";
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateBookForm from "./Organism/CreateBookForm";

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<BookCatalog/>}/>
                    <Route path="/create-book" element={<CreateBookForm/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
