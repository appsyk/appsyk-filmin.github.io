import './greenfair/css/style.css';
import './greenfair/css/isotope/style.css';
import './greenfair/css/animate.min.css';
import './greenfair/css/bootstrap.min.css';
import './greenfair/css/carousel.css';
import './greenfair/css/font-awesome.min.css';
import './greenfair/css/responsive.css';
import image1 from './images/avatar.jpg';
import image2 from './images/ironman.jpg';
import image3 from './images/wonderwoman.jpg';
import image4 from './images/avengers.jpg';
import image5 from './images/farzand.jpg';
import image6 from './images/300.jpg';
import image7 from './images/bahubali.jpg';
import image8 from './images/bumblebee.jpg';

import React from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Youtube from './API/Youtube';
import VideoList from './Modules/VideoList';
import VideoDetail from './Modules/VideoDetail';
import FilmInfo from './components/FilmInfo';
import Helper from './components/Helper';

// import Images from './images/Images';
import SpinSearch from './Modules/SpinSearch';
// import Spinner from './Modules/Spinner';

class CuTube extends React.Component {

    state = {
        vids: [],
        selectedVid: null,
        title: null,
        poster: null,
        actors: null,
        country: null,
        director: null,
        release_date: null,
        year: null,
        genre: null,
        response: null,
        plot: null,
        boxoffice: null,
        imdbRating: null,
        production: null,
        language: null,
        website: null,
        runTime: null
    };

    onTermSubmit = async (term) => {

        const response1 = await axios.get(`https://www.omdbapi.com/?t=${term}&apikey=af7bfde9`, {
            // http://www.omdbapi.com/?i=tt3896198&apikey=af7bfde9
            params: { query: term },
        });
// console.log(response1)
        this.setState({
            title: response1.data.Title,
            poster: response1.data.Poster,
            actors: response1.data.Actors,
            year: response1.data.Year,
            director: response1.data.Director,
            genre: response1.data.Genre,
            country: response1.data.Country,
            release_date: response1.data.Released,
            response: response1.data.Response,
            plot: response1.data.Plot,
            boxoffice: response1.data.BoxOffice,
            production: response1.data.Production,
            imdbRating: response1.data.imdbRating,
            language: response1.data.Language,
            website: response1.data.Website,
            runTime: response1.data.Runtime


        });
        console.log(this.state.title)

        if(this.state.title){
            var response = await Youtube.get('/search', {
                params: {
                    q: `${this.state.title} ${this.state.year} ${this.state.actors} movie official trailer`
                }
            });
            this.setState({ vids: response.data.items });

        }else{
           document.querySelector('#not-show1').style.display = 'none';
           document.querySelector('#not-show2').style.display = 'none';

        }

        

        console.log(`${this.state.title} ${this.state.year} ${this.state.actors} movie official trailer`)


    };
    onVidSelect = (video) => {
        this.setState({ selectedVid: video });
    }
    
    onlikeClick = (e) => {
        
        var like = parseInt(localStorage.getItem("like"))
       
        { localStorage.getItem("like") ? ((localStorage.setItem("like", like += 1)))
        :(localStorage.setItem("like", 0)) }
        
        setInterval(function(){ 
            var like = localStorage.getItem("like");
            document.querySelector('.icon-up').innerHTML = like;
         }, 10); 
        
    }
    
    onDislikeClick = (e) => {
        
        var dislike = parseInt(localStorage.getItem("dislike"))
       
        { localStorage.getItem("dislike") ? ((localStorage.setItem("dislike", dislike += 1)))
        :(localStorage.setItem("dislike", 0)) }
        
        setInterval(function(){ 
            var dislike = localStorage.getItem("dislike");
            document.querySelector('.icon-down').innerHTML = dislike;
         }, 10); 
        
    }

    render() {
        // var like = parseInt(localStorage.getItem("like"));
        // var dislike = localStorage.getItem("dislike"); 
        // console.log(like)

        return (
            
            <div className="container" style={{ backgroundColor: '#031b2b' }}>
                <div className="">

                    <SearchBar onFormSubmitProp={this.onTermSubmit} spinStop={this.state.response} />
                    {this.state.response ? (
                        <div className='' >
                            <div class="up-down-icon">
    <i class="fa fa-thumbs-up fa-2x icon-up" onClick={this.onlikeClick} aria-hidden="true">{localStorage.getItem("like")}</i>
                    
    <span className="fa fa-2x icon-down">{localStorage.getItem("dislike")}</span><i class="fa fa-thumbs-down fa-flip-horizontal fa-2x icon-down" onClick={this.onDislikeClick} aria-hidden="true"></i>
                                    </div>
                                    {/*  */}
                            <div className=''>
                                <div>
                                    <div>

                                        <FilmInfo
                                            poster={this.state.poster}
                                            actors={this.state.actors}
                                            title={this.state.title}
                                            year={this.state.year}
                                            director={this.state.director}
                                            genre={this.state.genre}
                                            country={this.state.country}
                                            release_date={this.state.release_date}
                                            response={this.state.response}
                                            plot={this.state.plot}
                                            boxoffice={this.state.boxoffice}
                                            production={this.state.production}
                                            imdbRating={this.state.imdbRating}
                                            language={this.state.language}
                                            website={this.state.website}
                                            runtime={this.state.runTime}
                                        />
                                    </div>
                                </div>
                                <div><VideoDetail video={this.state.selectedVid} /></div>
                                
                                {/* <div className="row" style={{ margin: '20px auto' }}>
                                    <div className="col-md-offset-3 col-md-6 col-xs-12, vidRend ">
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <VideoDetail video={this.state.selectedVid} />

                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className='col-md-6 col-sm-12'>
                                <VideoDetail video={this.state.selectedVid} />
col-md-3 col-sm-6, vidListAlign
                                </div> */}
                                
                                {this.state.vids[0] === undefined ? (<div id='not-show1' className='' >
                                   <h2 style={{ color: 'white', textAlign: 'center', fontSize: '300px', marginTop: '-15%' }}>
                                       <div className="spinner-border" role="status"></div>
                                    </h2>
                                </div>):(<div className='' id='not-show1'>
                                <iframe id="video-iframe" allowFullScreen="allowfullscreen" style={{ height: '350px', width: '100%', marginTop: '2%', marginBottom: '2%' }} className="" title='video player' src={`https://www.youtube.com/embed/${this.state.vids[0].id.videoId}`} />

                                </div>) }
                            
                            
                                <div className='container' id='not-show2'>
                                    <h3 style={{ color: 'white' }}>Related Videos:</h3>
                                    <VideoList onSelectVid={this.onVidSelect} vidList={this.state.vids} />
                                    
                                </div>

                                {/* <div className="col-md-3 col-sm-6">
                                    <img src="https://www.nilfiskcfm.com/wp-content/uploads/2016/12/placeholder.png" />
                                </div> */}
                                <SpinSearch />

                            </div>

                        </div>
                    ) : (
                            <div >
                                <section id="slider">

                                    <div style={{ margin: '1%' }} id="carousel-example-generic" className="carousel slide carousel-fade" data-ride="carousel" data-interval="3100">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="5"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="6"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="7"></li>
                                            {/* <li data-target="#carousel-example-generic" data-slide-to="8"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="9"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="10"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="11"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="12"></li> */}

                                        </ol>

                                        <div className="carousel-inner" role="listbox" >
                                            <div className="item active">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image1} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                        <div className="slider_text center ">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image2} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                    <div className="slider_text center">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image3} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                    <div className="slider_text center">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image4} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                    <div className="slider_text">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image5} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                    <div className="slider_text">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image6} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                    <div className="slider_text">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image7} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                    <div className="slider_text">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="slider_overlay">
                                                <img className="blog-img" src={image8} title="Wonder Woman" alt="Avatar"></img>
                                                    <div className="carousel-caption">
                                                    <div className="slider_text">
                                                            <h3 className='logoName'>FilmIn</h3>
                                                            <h2 className='logoName'>Search for movies</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {Images.map((img) => {
                                                return (
                                                    <div className="item" key={img.alte}>
                                                        <div className="slider_overlay">
                                                            <img className="blog-img" src={img.imgUrl} alt={img.alte} title={img.alte} key={img.alte} ></img>
                                                            <div className="carousel-caption">
                                                                <div className="slider_text navbar-fixed-center" style={{ marginTop: '-63%' }}>
                                                                    <h3 className='logoName'>FilmIn</h3>
                                                                    <h2 className='logoName'>Search for movies</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                );
                                            })
                                            } */}
                                        </div>
                                        <SpinSearch />

                                        {/* <!--End of Carousel Inner--> */}
                                    </div>
                                    <div>
                                        <Helper />
                                    </div>
                                </section>

                            </div>

                        )}
                </div>

            </div>
        );
    }
}

export default CuTube;