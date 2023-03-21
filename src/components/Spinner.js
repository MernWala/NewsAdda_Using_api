import React, { Component } from 'react'
import loading from '../images/loader2.gif'

export default class Spinner extends Component {
    render() {

        let parent = {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            zIndex: 1
        }

        return (
            <div className="d-flex justify-align-center sm-w-25 my-4" style={parent}>
                <img src={loading} alt="Loading" />
            </div>
        );
    }
}
