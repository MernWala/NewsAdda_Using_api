import React, { Component } from 'react'


export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, url, author, date, source } = this.props;

        return (
            <div>
                <div className="card m-2">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{ left: '95%', zIndex: 1 }}>{source}</span>
                    <img src={imageUrl} className="card-img-top" alt="" height={'143'} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author === null ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;
