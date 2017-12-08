import React,{Component} from 'react';
import { DatePicker, Button,Row,Col,Input,Slider, InputNumber,Progress,Card,Form,Select,Table} from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import  Common from './ajaxMethod';

function onChange(value) {
    console.log(value);
}
const columns = [{
    title: '申请时间',
    dataIndex: 'applydate',
    key: 'applydate',
}, {
    title: '请假类型',
    dataIndex: 'applyclass',
    key: 'applyclass',
}, {
    title: '是否批准',
    dataIndex: 'applystate',
    key: 'applystate',
}];
export default class Apply extends Component {
    constructor(props) {

        super(props);
        this.state = {
            date: '',
            inputValue: 1,
            name:'',
            value:'hello'
        };
    }
    componentDidMount(){
        console.log('componentDidMount');
        console.log(this.state.value);
    }
    Submit(){
         //console.log(this.state.work);
         var data={
                department:this.state.work,
                action:"askForLeaveProcess",
                name:this.state.name,
                askAccount:"chunyu",
                askType:this.state.applyclass,
                askRemark:this.state.otherinfo,
                leaveDate1:this.state.applytime1,
               leaveDate2:this.state.applytime2,
             leaveDateCount:this.state.inputValue,
             type:"1"
         };

        Common.test(JSON.stringify(data));

//console.log(this.state.name)
    }

    handleChange(date) {
        this.setState({date:date});

    }
    handleChange2(work) {
        this.setState({work:work});

    }
    handleChange3(name) {
        this.setState({name:name});

    }
    handleChange4(applyclass) {
        this.setState({applyclass:applyclass});

    }
    handleChange5(otherinfo) {
        this.setState({otherinfo:otherinfo});

    }
    handleChange6(applytime1) {
        this.setState({applytime1:applytime1});

    }
    handleChange7(applytime2) {
        this.setState({applytime2:applytime2});

    }

    onChange = (value) => {

        this.setState({
            inputValue: value,
        });

    }


    render(){
        console.log('asssss');
        return (

            <div className="gutter-example">

                        <Row  gutter={16}>

                            <Col className="gutter-row" span={8}>
                                <h1 style={{marginLeft:100,marginBottom:50}}>历史请假单</h1>
                                <Table columns={columns} />
                            </Col>
                            <Col className="gutter-row" span={8} style={{height:100}}>
                                <h1 style={{marginLeft:100,marginBottom:50}}>请假申请单</h1>


                                <Col span={6}><div>申请时间</div></Col>
                                <Col><DatePicker onChange={value => this.handleChange(value)} id="date"/></Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>岗位</div></Col>
                                <Col>
                                    <Select defaultValue="研发部" style={{ width: 160}} id="work" onChange={value => this.handleChange2(value)} >
                                        <Option value="技术部">技术部</Option>
                                        <Option value="客服部(净水器)">客服部(净水器)</Option>
                                        <Option value="客服部3部">客服部3部</Option>
                                        <Option value="客服部2部">客服部3部</Option>
                                        <Option value="业务部" >业务部</Option>
                                        <Option value="工程部">工程部</Option>
                                    </Select>
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>姓名</div></Col>
                                <Col>
                                    <Input placeholder="请输入您的姓名"  style={{width:160}} id="name" onChange={value => this.handleChange3(value.target.value)} />
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>请假类别</div></Col>
                                <Col>
                                    <Select defaultValue="病假" style={{ width: 160 }} id="applyclass" onChange={value => this.handleChange4(value)}>
                                        <Option value="病假">病假</Option>
                                        <Option value="产假">产假</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="婚假">婚假</Option>
                                    </Select>
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>请假备注</div></Col>
                                <Col>
                                    <TextArea rows={4} style={{width:160}} id="otherinfo" onChange={value => this.handleChange5(value.target.value)}/>
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>请假时间</div></Col>
                                <Col span={16}>
                                    <DatePicker onChange={value => this.handleChange6(value)} id="applytime1"  />
                                    <br/><div style={{height:20}}>到</div>

                                    <DatePicker onChange={value => this.handleChange7(value)} id="applytime2" />
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>共请假</div></Col>
                                <Col span={6}>
                                    <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} style={{width:160}} />
                                    <InputNumber
                                        min={1}
                                        max={20}
                                        style={{ marginLeft: 3 }}
                                        value={this.state.inputValue}
                                        onChange={this.onChange}
                                        id="timecount"
                                    />天
                                </Col>

                            </Col>


                            <Col className="gutter-row" span={8}>
                                <Row gutter={16}>
                                    <h1 style={{marginLeft:100,marginBottom:50}}>当前请假单状态</h1>
                                    <Col span={8}><div>是否批准</div></Col>
                                    <Col style={{marginTop:30}}>
                                        <Progress type="circle" status="exception" percent={50} />
                                    </Col>
                                    <div style={{height:20}}></div>
                                    <Card title="批准人" bordered={false} style={{ width: 300 }}>
                                        <p>批准时间</p>
                                        <p>审批备注</p>

                                    </Card>

                                </Row>
                            </Col>
                        </Row>

                <Row style={{marginTop:180,marginLeft:500}}>
                    <Button type="primary" onClick={this.Submit.bind(this)} id="apply">申请</Button>
                    <Button type="danger" style={{marginLeft:30}} id="cancel">取消</Button>

                </Row>

            </div>

        );
    }
}
// ReactDOM.render(<Apply />, document.getElementById('root'));
