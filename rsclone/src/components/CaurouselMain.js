import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Helmet } from "react-helmet";

class CarouselMain extends React.Component {
    constructor() {
        super();
        this.state = {dataMain: [], type: "films"}
        console.log("herehere", this.props);

    }

    async componentDidMount() {
      let responseMain = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=en-US&page=2');
      if (this.props.type) {
        if (this.props.type === 'films') {
          responseMain = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=en-US&page=2');
        } else {
          responseMain = await fetch('https://api.themoviedb.org/3/person/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=en-US&page=2');
        }
        this.setState({ type: this.props.type })
       }
      const jsonMain = await responseMain.json();
      this.setState({ dataMain: jsonMain});
  }
    render() {

       if (this.state.dataMain.results){
          if (this.state.type === "films") {
            const responsive = {
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
              }
            };
            return(
              <div className="main-carousel-wrapper">
                <Carousel                 
                  swipeable={false}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={1000}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding"
                  centerMode={false}
                  slidesToSlide={3}
                >
                {this.state.dataMain.results.map(el => (
                    <div className="main-carousel-img">
                      <img className="poster-img-main" src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} alt={el.title}/>
                      <h2><span>{el.title}</span></h2>
                    </div>
                ))};
                </Carousel>
              </div>
            );
          } else {
            const responsive = {
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 4
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 2
              }
            };
            return(
              <div className="main-carousel-wrapper">
                <Carousel                 
                  swipeable={false}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={1000}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding"
                  centerMode={false}
                  slidesToSlide={3}
                >
                {this.state.dataMain.results.map(el => (
                    <div className="main-carousel-img">
                      <img className="poster-img-main rounded-img" src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} alt={el.profile_path}/>
                      <h2 className="star-name-carousel"><span>{el.name}</span></h2>
                    </div>
                ))};
                </Carousel>
              </div>
            );
          }
          
        } else {
          return (<div>Wait a little</div>)
        }
    }
}

export default CarouselMain;