import React, {Component} from 'react';

export default class SearchInput extends Component {

    state = {
        value: ''
    }

    onChange = ({ target })=> {
        const { value } = target;
        const { onChange }  = this.props;
        this.setState({value: value});
        onChange(value);
    };

    clearResults = () => {
        this.props.clearResults();
        this.setState({value : ''});
    }


    getIcon = ()=>{
        const { isFetching, hasResults } = this.props;

        if(isFetching ){
            return <div className="search-loader"> Loading... </div>
        }
        else if(hasResults){
            return <label className="glyphicon glyphicon-remove" onClick={this.clearResults}/>
        }
        else{
            return <label className="glyphicon glyphicon-search" />
        }
    }


    render = () => {

        const icon = this.getIcon();

        return(
            <div className="search-input-wrapper">
               <input onChange={this.onChange}
                      placeholder="חיפוש מם"
                      value={this.state.value}
               />
              {icon}
           </div>
        )
    }
}


