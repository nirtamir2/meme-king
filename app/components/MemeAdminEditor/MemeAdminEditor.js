import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios'
import classNames from 'classnames';

// constants
import menu from 'constants/menu';

// components
import Button from 'components/Button/Button';

// config
import config from 'config/config';

export default class Editor extends Component {

    constructor(props){
        super(props);
        this.state = {
            meme : this.props.meme,
            isSaved: false
        }
    }

    onCategoryChange = (event) => {

        this.setState({ meme: { ...this.state.meme, category: event.target.value } })
    }

    onDescriptionChange = (event) => {
        this.setState({ meme : { ...this.state.meme, description :  event.target.value } });
    }


    onSave = () => {

        if (this.props.editMode) {
            axios({
                method: 'post',
                url: `${config.apiBaseUrl}/edit-meme`,
                data: this.state.meme
            });
        } else {
            axios({
                method: 'post',
                url: `${config.apiBaseUrl}/save-new-meme`,
                data: this.state.meme
            });
        }

        this.setState({ isSaved : true });

    }

    onDelete = () => {
        axios({
            method: 'post',
            url: `${config.apiBaseUrl}/delete-meme`,
            data: this.state.meme
        });

        this.props.onDelete(this.state.meme.id)
    }

    render(){
        const {  urlPath, description } = this.props.meme;
        return (
            <div className={classNames("container box-meme-admin-editor" , { 'saved' : this.state.isSaved })}>
                <img src={urlPath} style={{width: '200px'}} />

                <div className="description-container">
                        <textarea value={this.state.meme.description} rows="5" onChange={this.onDescriptionChange} />
                    </div>
                <div className="utils">
                    {!this.props.editMode && (
                        <select value={this.state.meme.category} onChange={this.onCategoryChange}>
                            {_.map(menu, (value, prop) => {
                                return <option key={_.uniqueId()}>{prop}</option>
                            })}
                        </select>
                    )}
                    <Button onClick={this.onSave} label="Save meme"/>
                    <Button onClick={this.onDelete} className="danger" label="Delete meme"/>
                </div>
            </div>
        )
    }
}

