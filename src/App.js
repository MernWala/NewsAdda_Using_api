import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pageSize = 5;
  key = process.env.REACT_APP_NEWS_API

  state = {
    progress: 20,
  }

  setProgress = (val) => {
    this.setState({
      progress: val
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar color='#f11946' progress={this.state.progress} />
          <Navbar />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.key} key="home" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.key} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.key} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.key} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.key} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.key} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.key} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.key} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
