import React from 'react';

class SearchBar extends React.Component {

    state = { term: '', spin: false, spn: false, time: new Date().toLocaleString()};

    onSubmitHandle = (event) => {
        event.preventDefault();
        this.setState({ spin: true,spn: !this.state.spn });


        this.props.onFormSubmitProp(this.state.term);

    }

        componentDidMount() {
          this.intervalID = setInterval(
            () => this.spinner(),
            1000
          );
        }
        componentWillUnmount() {
          clearInterval(this.intervalID);
          
        }
        spinner() {
            if(this.props.spinStop === 'True' || this.props.spinStop === 'False'){
          this.setState({
            spin: false 
          });
        }
        }
   

    render(props) {
        // console.log("sanju2",this.props);
        return (

            <div>
                <nav className="navbar navbar-expand-md navbar-dark navbar-fixed-top bg-dark, navBackColor ">
			{/* <img className='offspin logo-adjust' src='http://icons.iconarchive.com/icons/bokehlicia/captiva/256/movie-icon.png' alt="u r watching" width='35px' height='35px' /> */}

              <div className="container">
              <i className="fa fa-film fa-3x" style={{ color: 'rgb(2, 203, 252)' }}></i>
                    <a href='/'><h2 className="filmIn logoName logo-nm-ad" style={{ color: '#02CBFC', marginTop: '2vh' }} >FilmIn</h2></a>

                    <form className="form-inline, searchBar myHomefont" onSubmit={this.onSubmitHandle}>
                        <input className="form-control mr-sm-4 col-sm-12"
                            type='search'
                            onChange={e => { this.setState({ term: e.target.value }) }}
                            value={this.state.term}
                            placeholder='Search for movies ....'
                            aria-label="Search"
                            list="search"
                            autoComplete="on"
                        />
                        {/* <input type="text" className="placeholding form-control" onChange={this.onEmailChange} value={email} name="email" id="email" placeholder="EMAIL" title="select email from given option" list="Emails" autocomplete="off" /> */}
                            <datalist id="search">
                              {/* <option value='{this.state.user.email}'></option> */}
                            </datalist>


                    </form>
                    <div className="myHomefont" style={{ marginLeft: '0.5%' }}>
                        {(this.state.spin === true && this.props.spinStop === null) || (this.state.spin === true && this.props.spinStop === 'True') || (this.state.spin === true && this.props.spinStop === 'False')
                         ? (<div className="clearfix">
                            <div className="spinner-border text-light float-right" role="status">
                            </div>
                        </div>) : (<div className='offspin'><i style={{ color: 'white' }} className="fa fa-search fa-2x float-right" onClick={this.onSubmitHandle} aria-hidden="true"></i></div>)}
                    </div>

              </div>

                </nav><br /><br />
            </div>
        );
    }
}

export default SearchBar;
