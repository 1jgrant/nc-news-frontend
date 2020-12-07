import React, { Component } from 'react';

class ArticleControls extends Component {
    state = {
        sortBy: 'date',
        show: 10
    }
    render() {
        return (
            <div>
                <h1>Controls</h1>
            </div>
        );
    }
}

export default ArticleControls;