import Carousel from "react-bootstrap/Carousel";

function CarouselComponent() {
  return (
    <Carousel fade style={{ height: "100%", width: "100%" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/255041826.jpg?k=91da93edc76c3f6850663e1fe7183d8f0f729cf7765e53d36db3df7aa48caa71&o=&hp=1"
          alt="view1"
        />
        <Carousel.Caption>
          <h3>City of colture</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.kimkim.com/files/a/content_articles/featured_photos/ba32ca21a3de3d4bb32dffe0a1f00b3527b0dd4c/big-6374e1446cb4ec079211216c9bd7273b.jpg"
          alt="view2"
        />

        <Carousel.Caption>
          <h3>Holy places</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.timeout.com/images/103798282/image.jpg"
          alt="view3"
        />

        <Carousel.Caption>
          <h3> City of night life</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
