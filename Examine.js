import React,{Component} from 'react';

import { Card, Col, Row ,Button} from 'antd';
import  Common from './ajaxMethod';


export default class Examines extends Component{


    constructor(props) {

        super(props);
        this.state = {
            date: '',
            person:'',
            work:'',
            applyclass:'',
            otherinfo:'',
            applytime1:'',
            applytime2:'',
            timecount:''
        }
    }


    ApplyToo(){
        const w=window.open('about:blank');
        w.location.href='/';

    }

    render(){


        var items = [];
        for (var i = 0; i < 10; i++) {
            items.push(<OneTask person={this.state.person}/>);
        }
        return(

            <div style={{ background: '#ECECEC', padding: '30px' }} onLoad={this.componentWillMount}>
                <Row>
                    <Button type="primary" style={{marginLeft:530,marginBottom:20}} onClick={this.ApplyToo.bind(this)}>我也要请假</Button>
                </Row>
            <Row gutter={16}>

                {items}
            </Row>
            </div>

        );

    }

}

class OneTask extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            date: '',
            person:'',
            work:'',
            applyclass:'',
            otherinfo:'',
            applytime1:'',
            applytime2:'',
            timecount:''
        }
    }
    componentDidMount()  {

        let _this=this;
        //console.log("aaaaaaaa");

        var data2={
            action:"queryTaskOfManager"
        };
        var data3={};
        var lastdata={};
        Common.getData(JSON.stringify(data2),function aa(ret) {
            console.log(ret);
            data3= eval(ret);
            lastdata=data3.msg[0];
            //console.log(lastdata);
            _this.setState({
                person:lastdata.name,
                date:lastdata.askDate
            })
        });



    }
    render(){

        return (
            <Col span={8}>
                <Card title="请假申请单" bordered={false}>
                    <p>申请人：{this.state.person}</p>
                    <p>申请时间：{this.state.date}</p>
                    <p>岗位：{this.state.work}</p>
                    <p>请假类型：{this.state.applyclass}</p>
                    <p>请假备注：{this.state.otherinfo}</p>
                    <p>请假时间：{this.state.applytime1}到,{this.state.applytime2}</p>
                    <p>共请假：{this.state.timecount}天</p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="primary"  id="apply">批准</Button>

                        </Col>
                        <Col span={12}>
                            <Button type="danger" style={{marginLeft:30}} id="cancel">不批</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>

        )}
}

// ReactDOM.render(<Examines />, document.getElementById('root'));