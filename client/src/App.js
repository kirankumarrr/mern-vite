import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cards from './components/Card/Card';
import MonthBasedCards from './components/MonthBasedCards/MonthBasedCards';


function App() {
  const theme = createTheme({
    //here you set palette, typography ect...
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Cards />} />
            <Route exact path="/cards" element={<MonthBasedCards />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
