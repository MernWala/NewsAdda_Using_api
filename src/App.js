import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = (props) => {
  let pageSize = 5;
  const key = process.env.REACT_APP_NEWS_API

  const [Progress, SetProgress] = useState(20);

  const setProgress = (val) => {
    SetProgress(val)
  }
  
  return (
    <div>
      <BrowserRouter>
        <LoadingBar color='#f11946' progress={Progress} />
        <Navbar />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={key} key="home" pageSize={pageSize} country="in" category="general" />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={key} key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey={key} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={key} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route path="/general" element={<News setProgress={setProgress} apiKey={key} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={key} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={key} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={key} key="technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
