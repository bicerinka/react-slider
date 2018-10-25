import React from 'react';
import Moment from 'react-moment';
import Slider from "react-slick";
import 'moment-timezone';
import { requestVideoSources } from './api';

function Square(props) {
  return (
    <div className="square">
      {props.value}
    </div>
  );
}

class MultipleItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [-2, -1, 0, 1, 2, 3],
      quantity: 6,
      origin: 'OWNEROR-2LRQDEG/DeviceIpint.2/SourceEndpoint.video:0:0',
      slideIndex: 0,
      step: 3
    };
  }

  componentDidMount () {
    requestVideoSources().then(function(myJson) {
      //   console.log(r); // чтобы посмотреть список камер
    });
  }

  edge = (t) => {
    let arr = this.state.slides.slice();
    let current;
    if (t === 'left'){
      current = arr[arr.length - 1];
      let date = new Date();
      for(let i = 1; i < this.state.step; i++){
        if(date <= new Date(date - (this.state.step - i) * 60000)){
          arr.push(current + i);
        }
      }
    }else{
      current = arr[0];
      arr.unshift(current - 3, current - 2, current - 1);
    }
    this.setState({slides: arr, quantity: arr.length})
  }

  handleWheel = ( move, slider ) => {
    let s = this.state;
    if(move > 50){
      slider.slickPrev();
      if(s.slideIndex === 0){
        this.edge('right')
      }
    }else if(move < -50){
      slider.slickNext();
      if(s.slideIndex + s.step === s.quantity){
        this.edge('left')
      }
    }
  }

  render() {
    const step = this.state.step;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      initialSlide: step,
      slidesToShow: step,
      slidesToScroll: step,
      onEdge:this.edge,
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };
    const quantity = this.state.quantity;
    const origin = this.state.origin;
    return (
      <div onWheel={(move) => this.handleWheel(move.deltaY, this.slider)} className="slider">
        <h2> Временная шкала видеокамеры {this.state.origin}</h2>
        <Slider ref={slider => (this.slider = slider)} {...settings}>

          {this.state.slides.map(function(i) {
            let date = new Date();
            date = new Date(date - (step - i) * 60000);
            let url = `http://try.axxonsoft.com:8000/asip-api/archive/media/${origin}/${date.toISOString().replace(/[:\-Z]/g, '')}?w=250`;
            return (
              <div key={i}>
                <Square
                  value={
                    <>
                      <div className="time">
                        <Moment format="HH:mm">{date}</Moment>
                      </div>
                      <div>
                        <img src={url} alt=""/>
                      </div>
                    </>
                  } />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default MultipleItems