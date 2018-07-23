require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom'

let yeomanImage = require('../images/yeoman.png');
// 获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

class ImgFigure extends React.Component {
	render(){
		return(
			<figure className="img-figure">
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">
                    	{this.props.data.title}
                    </h2>
                </figcaption>
            </figure>
		)
	}
}


class AppComponent extends React.Component {
	componentDidMount(){
		// 获取舞台大小
		var stageDom  = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			halfStageW = Math.ceil(stageW/2),
			halfStageH = Math.ceil(stageH/2);
		console.log(stageW,stageH,halfStageW,halfStageH)
		// 拿到一个imageFigure
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW/2),
			halfImgH = Math.ceil(imgH/2);
			console.log(imgFigureDOM,imgW,imgH,halfImgW,halfImgH);
		// 计算中心图片的未知点
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			right:halfStageH - halfImgH
		}

		/* 水平方向上左右两侧图片范围 */
		this.Constant.hPosRange.leftSecx[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		/**右**/
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		/**垂直**/
		this.Constant.hPosRange.h_y[0] = -halfImgH;
		this.Constant.hPosRange.h_y[1] = stageH - halfImgH;
		/**水平方向上左右两侧图片范围end**/
		/**垂直方向上顶部图片范围start**/
		this.Constant.vPosRange.v_x[0] = halfStageW - imgW;
		this.Constant.vPosRange.v_x[1] = halfStageW;
		this.Constant.vPosRange.v_y[0] = -halfImgH;
		this.Constant.vPosRange.v_y[1] = halfStageH - halfStageH*3;
		/**垂直方向上顶部图片范围end**/
		/**默认居中第一章图片**/
		this.rearrange(0); 
	}
	constructor(props) {
        super(props);
        this.state = { imgsArrangeArr: []};
         /***位置范围常量***/
        this.Constant= {
          centerPos:{
            left:0,
            top: 0
          },
          hPosRange:{
            leftSecX:[0,0],
            rightSecX:[0,0],
            h_y:[0,0]
          },
          vPosRange:{
            v_x:[0,0],
            v_y:[0,0]
          }
        };
    }
  	render() {
	  	var controllerUnits = [],
	  		ImgFigures = [];

	  	imageDatas.forEach(function(value,index){
	  		ImgFigures.push(<ImgFigure data={value} key={ImgFigures} ref={'imgFigure'+index}/>)
	  	})

	    return (
	      // <div className="index">
	      //   <img src={yeomanImage} alt="Yeoman Generator" />
	      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
	      //   <span>Hello word!</span>
	      // </div>
	      	<section className="stage" ref="stage">
		        <section className="img-sec">
		            {ImgFigures}
		        </section>
		        <nav className="controller-nav">
		            {controllerUnits}
		        </nav>
	    	</section>

	    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
