import {Scrollbars} from 'react-custom-scrollbars-2';
import {Component} from "react";
import styled from "styled-components";
import Axios from "axios";

class CustomScrollbars extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {top: 0};
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
        const {top} = values;
        this.setState({top});
    }


    renderView({style, ...props}) {
        const {top} = this.state;
        const viewStyle = {
            padding: 15,
            backgroundColor: `#2f2f2f`,
            color: `#f1f1f1`
        };
        return (
            <div
                className="box"
                style={{...style, ...viewStyle}}
                {...props}/>
        );
    }

    renderThumb({style, ...props}) {
        const {top} = this.state;
        const thumbStyle = {
            backgroundColor: `#6500ad`,
            borderRadius: `5px`
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    render() {
        return (
            <Scrollbars
                autoHide
                renderView={this.renderView}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
                {...this.props}/>
        );
    }
}

export default CustomScrollbars;
