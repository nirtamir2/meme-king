import React, { Component } from 'react';
import classNames from 'classnames';

export default class SearchInput extends Component {

    onChange = ({ target }) => {
        const { value } = target;
        const { onChange }  = this.props;
        onChange(value);
    };

    clearResults = () => {
        this.props.clearResults();
    }


    getIcon = () => {
        const { isFetching } = this.props;

        if(isFetching ){
            return <div className="search-loader"> Loading... </div>
        }
        else if(this.props.value.length){
            return <label className="glyphicon glyphicon-remove" onClick={this.clearResults}/>
        }
        else{
            return <label className="glyphicon glyphicon-search" />
        }
    }


    render = () => {

        const icon = this.getIcon();
        const { className,  emptyState } = this.props;

        return(
            <div className={classNames('search-input-wrapper', className)}>
               <input onChange={this.onChange}
                      placeholder="חיפוש מם"
                      value={this.props.value}
                      className={classNames({'empty' : emptyState}, className)}
               />
              {icon}
           </div>
        )
    }
}


