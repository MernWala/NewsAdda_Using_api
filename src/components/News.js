import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [Artical, setArtical] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Page, setPage] = useState(1);
    const [TotalResult, setTotalResult] = useState(0);

    const capitilize = (str) => {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    const updateNews = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${Page}&category=${props.category}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json();
        props.setProgress(70)
        setArtical(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        updateNews();
    }, [])  


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${Page+1}&category=${props.category}`;
        setPage(Page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArtical(Artical.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
        setLoading(false)
    };

    return (
        <>
            <h2 className='text-center customHeading' style={{marginTop: '80px'}}>Top {capitilize(props.category)} Headline </h2>
            {Loading && <Spinner />}
            <InfiniteScroll dataLength={Artical.length} next={fetchMoreData} hasMore={Artical.length !== TotalResult} loader={<Spinner />}>
                <div className='container'>
                    <div className='row my-4'>
                        {!Loading && Artical.map((ele) => {
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

export default News;