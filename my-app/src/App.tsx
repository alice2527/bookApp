import React from 'react';
import BookCatalog from "./Organism/BookCatalog";
import '@smastrom/react-rating/style.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateBookForm from "./Organism/CreateBookForm";
import '../styled-system/styles.css'
import "./App.css"
import UpdateForm from "./Organism/UpdateForm";

function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<BookCatalog/>}/>
                <Route path="/create-book" element={<CreateBookForm/>}/>
                <Route path="/update-book/:bookId" element={<UpdateForm/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
