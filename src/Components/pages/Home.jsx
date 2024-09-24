import React, { useEffect } from "react";
import painterImage from "../../images/painter1.jpg";
import Services from "../pages/Services";
import { getAllImages } from "../../actions/imageAction";
import "../../CSS/home/home.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import Reviews from "../other/Reviews";
import Gallery from "./Gallery";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import SliderLoader from "../Loader/sliderLoader";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const dispatch = useDispatch();
  const { loading, images, error } = useSelector((state) => state.getAllImages);

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  const getRandomImages = (images, count) => {
    if (!images || images.length === 0) return [];
    const flattenedImages = images.flatMap((imageEntry) => imageEntry.images);
    const shuffled = [...flattenedImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomImages = getRandomImages(images, 5);

  return (
    <>
      <div className="landing">
        <div className="landing-left">
          <div className="left-content">
            <div className="welcome-message">
              Welcome to Soni Painting Works
            </div>
            <h1>
              Give shining <span>features </span>
            </h1>
            <h1> to your home</h1>
            <div className="left-service">
              <div className="service-icon">
                <span>
                  <i className="fi fi-tr-house-chimney"></i>House Painting
                </span>
                <span>
                  <i className="fi fi-tr-city"></i>Office Painting
                </span>
              </div>
              <div className="service-icon">
                <span className="align-center">
                  <i className="fi fi-tr-blinds-open"></i>Interior Painting
                </span>
                <span>
                  <i className="fi fi-tr-water"></i>Waterproofing
                </span>
              </div>
              <div className="btn">
                <NavLink className="bg-danger text-light button" to="/contact">
                  Get Quote
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="landing-right">
          {loading ? (
            <SliderLoader />
          ) : error ? (
            <div>Error loading images</div>
          ) : (
            <Carousel>
              {randomImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={image.url}
                    alt={`Image ${index}`}
                    className="slider-image"
                  />
                  {image.description && (
                    <Carousel.Caption>
                      <p className="text-black bg-white">{image.description}</p>
                    </Carousel.Caption>
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      </div>

      <Services />
      <Gallery displayCount={8} />
      <Reviews />
      <Footer />
    </>
  );
}

export default Home;
