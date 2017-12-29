import React , {Component} from "react" ;

export  class Can extends Component
{
    constructor(props) {
        super(props);
        this.state={
            value:""
        }

    }

    drawArrow(ctx, fromX, fromY, toX, toY,theta,headlen,width,color) {
    var theta = theta || 30,
        headlen = headlen || 10,
        width = width || 1,
        color = color || '#000',
        angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    var arrowX, arrowY;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}




    onChange(){
        this.setState({
            value:this.props.value
        },this.hua.bind(this));

    }
    componentDidMount(){

this.onChange()




        console.log('componentDidMount');


       console.log(this.state.value)



    }



    hua(){






        console.log(this.state.value);

        let xian0="#191970";
        let xian1= "#191970";
        let xian6="#191970";
        let x0="#191970";
        let x1="#191970";
        let x6="#191970";
        var z=this.props.value;
        switch (z){

            case "jingli":
                x0="#FF0000";
                x1="#FF0000";
                x6="#FF0000";
                xian0="#FF0000";
                xian1="#191970";
                xian6="#191970";
                break;
            case "zhuren":
                x0="#FF0000";
                x1="#FF0000";
                x6="#FF0000";
                xian0="#191970";
                xian1="#FF0000";
                xian6="#191970";
                break;
            case "dongshizhang":
                x0="#FF0000";
                x1="#FF0000";
                x6="#FF0000";
                xian0="#191970";
                xian1="#191970";
                xian6="#FF0000";
                break;
            default:
                x0="#191970";
                x1="#191970";
                x6="#191970";
                xian0="#191970";
                xian1="#191970";
                xian6="#191970";




        }





        var canvas=document.getElementById('c');
        var cxt=canvas.getContext('2d');

        cxt.clearRect(0, 0, 1000, 300);
        cxt.lineWidth=1;
        cxt.strokeStyle="#00ff00";
        cxt.fillStyle="#00ff00"




        cxt.font="normal 20px sans-serif";


        cxt.beginPath();
        var grd = cxt.createLinearGradient(50,140,70,160);
        grd.addColorStop(0,"#54FF9F");

        grd.addColorStop(0.99,"#F0FFF0");

        cxt.strokeStyle = grd;
        cxt.fillStyle= grd   ;

        cxt.arc(60,150,20,0,2*Math.PI,false);
        cxt.stroke();
        cxt.fill();
        cxt.fillStyle="#191970";
        cxt.fillText("开始",40,190);


        cxt.closePath();
        cxt.beginPath();
        cxt.strokeStyle=x0;
        this.drawArrow(cxt, 80, 150, 150,150,16,16,1,x0);

        cxt.closePath();

        cxt.beginPath();
        var grd = cxt.createLinearGradient(150,126,310,176);
        grd.addColorStop(0,"black");
        grd.addColorStop(0.5,"red");
        grd.addColorStop(1,"yellow");
        cxt.strokeStyle = grd;
        cxt.fillStyle="#191970";

        cxt.rect(150,126,160,50);
        cxt.stroke();
        cxt.fillText("员工请假申请",170,156);
        cxt.closePath();

        cxt.beginPath();
        this.drawArrow(cxt, 310, 150, 360,150,16,16,1,x1);

        cxt.closePath();



        cxt.save();




        cxt.fillStyle=	"#CDC673";
        cxt.translate(390,122);
        cxt.rotate(45*Math.PI/180) ;
        cxt.fillRect(0,0,40,40);
        cxt.restore();





        cxt.beginPath();
        cxt.strokeStyle=xian0;
        cxt.moveTo(390,123);
        cxt.lineTo(390,60);
        cxt.stroke();
        cxt.closePath()




        cxt.beginPath();
        this.drawArrow(cxt, 390, 60, 490,60,16,16,1,xian0);
        cxt.closePath();



        cxt.beginPath();
        cxt.strokeStyle=xian1;
        cxt.moveTo(390,176);
        cxt.lineTo(390,243);
        cxt.stroke();






        cxt.beginPath();
        this.drawArrow(cxt, 390, 243, 490,243,16,16,1,xian1);
        cxt.closePath()



        cxt.beginPath();
        var grd6 = cxt.createLinearGradient(490,36,650,86);
        grd6.addColorStop(0,"black");
        grd6.addColorStop(0.5,"red");
        grd6.addColorStop(1,"yellow");
        cxt.strokeStyle = grd6;
        cxt.rect(490,36,160,50);
        cxt.stroke();
        cxt.fillStyle="#191970";
        cxt.fillText("部门经理审批",506,66);
        cxt.closePath();
        cxt.beginPath();
        var grd = cxt.createLinearGradient(490,220,650,270);
        grd.addColorStop(0,"black");
        grd.addColorStop(0.5,"red");
        grd.addColorStop(1,"yellow");
        cxt.strokeStyle = grd;
        cxt.rect(490,220,160,50);
        cxt.stroke();
        cxt.fillStyle="#191970";
        cxt.fillText("主任审批",526,249);
        cxt.closePath();
        cxt.beginPath();
        cxt.closePath();



        cxt.strokeStyle=xian0;
        cxt.moveTo(650,60);
        cxt.lineTo(760,60);
        cxt.stroke();
        cxt.closePath();


        cxt.beginPath();
        cxt.strokeStyle=xian1;
        cxt.moveTo(650,240);
        cxt.lineTo(760,240);
        cxt.stroke();
        cxt.closePath();




        cxt.beginPath();
        this.drawArrow(cxt, 760, 60, 760,123,16,16,1,xian0);


        cxt.closePath();








        cxt.beginPath();
        this.drawArrow(cxt, 416, 150, 490,150,16,16,1,xian6);
        cxt.closePath();





        cxt.beginPath();
        var grd6 = cxt.createLinearGradient(490,175,576,225);
        grd6.addColorStop(0,"black");
        grd6.addColorStop(0.5,"red");
        grd6.addColorStop(1,"yellow");
        cxt.strokeStyle = grd6;
        cxt.rect(490,125,160,50);
        cxt.stroke();
        cxt.fillStyle="#191970";
        cxt.fillText("董事长审批",516,160);
        cxt.closePath();




        cxt.beginPath();
        this.drawArrow(cxt, 650, 150, 730,150,16,16,1,xian6);
        cxt.closePath();


        cxt.save();


        cxt.fillStyle=	"#CDC673";
        cxt.translate(760,122);
        cxt.rotate(45*Math.PI/180) ;
        cxt.fillRect(0,0,40,40);
        cxt.restore();
        cxt.beginPath();
        this.drawArrow(cxt, 760, 240, 760,177,16,16,1,xian1);
        cxt.beginPath();
        this.drawArrow(cxt, 789, 149, 900,149,16,16,1,xian1);

        cxt.closePath();
        cxt.beginPath();
        cxt.fillStyle="#CD2626";
        cxt.arc(920,149,20,0,2*Math.PI,false);
        cxt.fill();
        cxt.fillText("结束",900,186);
        cxt.closePath();
        cxt.closePath();






    }
    render (){




        return(
            <div>
                <div id="canva">
                    <canvas id="c" width="1000"　height="300"></canvas>
                </div>

            </div>

        )

    }
}