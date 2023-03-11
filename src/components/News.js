import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {

    constructor() {
        super();
        this.state = {
            artical: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=${this.props.pageSize}&apiKey=ac5863751608477b89145beeb2d18f1b&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            artical: parsedData.articles,
            totalResults: parsedData.totalResults
        });
    }

    handlePrevBtn = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=${this.props.pageSize}&apiKey=ac5863751608477b89145beeb2d18f1b&page=${this.state.page - 1}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            artical: parsedData.articles,
            loading: false
        });
    }

    handleNextBtn = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=${this.props.pageSize}&apiKey=ac5863751608477b89145beeb2d18f1b&page=${this.state.page + 1}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                artical: parsedData.articles,
                loading: false
            });
        }
    }

    render() {
        return (
            <div className='container my-3'>
                {this.state.loading && <Spinner />}
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} className='btn btn-sm btn-dark' onClick={this.handlePrevBtn}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-sm btn-dark' onClick={this.handleNextBtn}>Next &rarr;</button>
                </div>
                
                <h2 className='text-center'>News Adda - Top headline</h2>
                <div className='row my-4'>
                    {!this.state.loading && this.state.artical.map((ele) => {
                        return <div className='col-md-4 col-l-4' key={ele.url}>
                            <NewsItem title={ele.title} description={ele.description} imageUrl={ele.urlToImage} url={ele.url} />
                        </div>
                    })}
                </div>

                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} className='btn btn-sm btn-dark' onClick={this.handlePrevBtn}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-sm btn-dark' onClick={this.handleNextBtn}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}