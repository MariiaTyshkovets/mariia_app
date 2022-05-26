import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
// import Content from './containers/Content';
// import Purchase from './containers/Purchase';
// import PrevOrders from './containers/PrevOrders';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <App />
        {/* <Routes>
            <Route path='/mariia_app' element={<App />}>
                <Route path='builder' element={<Content />}>
                    <Route path='purchase' element={<Purchase/>}/>
                </Route>
                <Route path='orders' element={<PrevOrders/>}/>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Route>
        </Routes> */}
      </BrowserRouter>
);