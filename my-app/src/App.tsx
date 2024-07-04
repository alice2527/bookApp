import React from 'react';
import BookCatalog from "./Organism/BookCatalog";
import '@smastrom/react-rating/style.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateBookForm from "./Organism/CreateBookForm";
import './styled-system/styles.css'
import "./App.css"

function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<BookCatalog/>}/>
                <Route path="/create-book" element={<CreateBookForm/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
