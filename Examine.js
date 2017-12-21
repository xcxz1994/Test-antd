
import React,{Component} from 'react';

import { Card, Col, Row ,Button,Table,Modal,Input} from 'antd';
import  Common from './ajaxMethod';

const { TextArea } = Input;

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
};
export default class Examines extends Component{


    constructor(props) {

        super(props);
        this.state = {
            data:'',
            filteredInfo: null,
            sortedInfo: null,
            visible: false
        }
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    componentWillMount()  {

        let _this=this;
        //console.log("aaaaaaaa");

        var data2={
            action:"queryTaskOfManager",
            name:'john'
        };
        Common.getData(JSON.stringify(data2),function(ret) {
            console.log(ret);
            console.log("渲染界面")
            _this.setState({data:ret.msg})



        });
    }
    ApplyToo(){
        const w=window.open('about:blank');
        w.location.href='/';

    }
    Submityes(){

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e,record) => {
        console.log(e);
        var nodata={
            action:'taskProcess',
            id:record.id,
            isAllowed:-1,
            department:record.department,
            approver:'john',
            approverAccount:'john',
            approvalRemark:this.state.otherinfo,
        };
        Common.examine(JSON.stringify(nodata),function (ret) {
            if(ret=='success'){
                console.log("不批准原因已经提交")
            }else{
                alert("发生未知的不批准错误");
            }
        });
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleChange5(otherinfo) {
        this.setState({otherinfo:otherinfo});

    }
    onSelect(record){

        var yesdata={
            action:'taskProcess',
            id:record.id,
            isAllowed:1,
            department:record.department,
            approver:'john',
            approverAccount:'john',
            approvalRemark:null
        };
        Common.examine(JSON.stringify(yesdata),function (ret) {
            if(ret=='success'){
                alert("已批准");
            }else{
                alert("发生未知的错误");
            }
        });


        console.log(record);


    }

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '申请人',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '申请时间',
            key: 'askDate',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'askDate' && sortedInfo.order,
            dataIndex: 'askDate',
        }, {
            title: '岗位',
            dataIndex: 'department',
        },{
            title: '请假类型',
            width: '8%',
            dataIndex: 'askType',
        },{
            title: '请假备注',
            width: '10%',
            dataIndex: 'askRemark',
        },{
            title: '请假时间',
            width:"10%",
            align:"center",
            colSpan: 2,
            dataIndex: 'leaveDate1',
        },{
            colSpan: 0,
            width:"10%",
            dataIndex: 'leaveDate2',
        },{
            title: '共请假天数',
            dataIndex: 'leaveDateCount',
            width: '8%',
        },{
            title: '是否批准',
            width: '3%',
            colSpan: 2,
            render: () => <Button type="primary"  id="yes" onRowClick={this.Submityes.bind(this)}>批准</Button>,
        }, {
            colSpan: 0,
            width: '3%',
            render: () => <Button type="danger"  id="no" onClick={this.showModal.bind(this)} onRowClick={this.handleOk.bind(this)}>不批</Button>,
        }
        ];
        console.log(this.state.data);

        return(

            <div style={{ background: '#ECECEC', padding: '30px' }} onLoad={this.componentWillMount}>
                <Row>
                    <Button type="primary" style={{marginLeft:530,marginBottom:20}} onClick={this.ApplyToo.bind(this)}>我也要请假</Button>
                </Row>

                <Table bordered rowSelection={rowSelection} columns={columns}  dataSource={this.state.data}  onChange={this.handleChange}  style={{backgroundColor:'#FFFFFF'}} />

                <Modal
                    title="不批原因备注"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TextArea rows={4} style={{width:160}} id="otherinfo" onChange={value => this.handleChange5(value.target.value)}/>
                </Modal>

            </div>

        );

    }

}



// ReactDOM.render(<Examines />, document.getElementById('root'));