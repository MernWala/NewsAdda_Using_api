import React, { Component } from 'react'
import loading from '../images/loader.gif'

export default class Spinner extends Component {
    render() {

        let parent = {
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: '0px',
            left: '0px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9
        }

        return (
            <div className="d-flex justify-align-center" style={parent}>
                <img src={loading} alt="Loading" style={{zIndex: 9999, borderRadius: '110px'}} />
            </div>
        );
    }
}
