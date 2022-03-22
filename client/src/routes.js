import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

// import {LinksPage} from './pages/LinksPage';
// import {CreatePage} from './pages/CreatePage';
// import {DetailPage} from './pages/DetailPage';
import {AuthPage} from './pages/AuthPage';
import {RegisterPage} from './pages/RegisterPage'
// import {AddProduct} from './pages/AddProduct';
import {Upload} from './pages/Upload';
// import {AddVariant} from './pages/AddVariant';
// import {AddCategory} from './pages/AddCategory';

export const useRoutes = (isAuthenticated) => {
if (isAuthenticated){
    return(
        <Routes>
            {/* <Route path="/links" exact element={<LinksPage />} /> */}
            <Route path="/upload" exact element={<Upload />} />
            {/* <Route path="/addproduct" exact element={<AddProduct />} />
            <Route path="/addvariant" exact element={<AddVariant />} />
            <Route path="/addcategory" exact element={<AddCategory />} /> */}
            {/* <Route path="/detail/:id" element={<DetailPage />} /> */}
            <Route path="*" element={<Navigate to="/upload" />} />
        </Routes>
    )
}
return(
    <Routes>
    <Route path="/"  element={<AuthPage />} />
    <Route path="/register" exact element={<RegisterPage />} />
    <Route path="*" element={<Navigate to="/" />} />
    </Routes>
)
}