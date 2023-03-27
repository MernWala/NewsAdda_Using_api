import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artical: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `News Adda | ${this.capitilize(this.props.category)}`;
    }

    capitilize = (str) => {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    async updateNews() {
        this.props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${this.state.page}&category=${this.props.category}`;
        this.setState({ loading: true })
        this.props.setProgress(30)
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(70)
        this.setState({
            artical: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${this.state.page}&category=${this.props.category}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            artical: this.state.artical.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    };

    render() {
        return (
            <>
                <h2 className='text-center customHeading'>Top {this.capitilize(this.props.category)} Headline </h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll dataLength={this.state.artical.length} next={this.fetchMoreData} hasMore={this.state.artical.length !== this.state.totalResults} loader={<Spinner />}>
                    <div className='container'>
                        <div className='row my-4'>
                            {!this.state.loading && this.state.artical.map((ele) => {
                                return <div className='col-md-4 col-l-4' key={ele.url}>
                                    <NewsItem title={ele.title} description={ele.description} imageUrl={ele.urlToImage} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
