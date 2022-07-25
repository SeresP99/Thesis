import {Scrollbars} from 'react-custom-scrollbars-2';
import {Component} from 'react';
import {darkTheme} from '../../themes.js'
import styled from "styled-components";
import Axios from "axios";

class CustomScrollbars extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {top: 0};
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderView = this.renderView.bind(this, props);
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
            //backgroundColor: darkTheme.elevation_2, //`#2f2f2f`,
            //color: `#f1f1f1`,
            backgroundColor: props.backgroundcolor === undefined ? darkTheme.elevation_2 : props.backgroundcolor,
            overflowY: `auto`
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
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
                renderView={this.renderView}
                {...this.props}/>
        );
    }
}

export default CustomScrollbars;
