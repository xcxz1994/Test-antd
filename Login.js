import React,{Component} from 'react';
import { Modal,Button} from 'antd';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            role:'',
            name:''
        }
    }

    hideModal = () => {
        if(this.state.role=='ggg'){
            const w=window.open('about:blank');
            w.location.href='#/apply?name='+this.state.name;
        }else{
            const w=window.open('about:blank');
            w.location.href='#/examines?name='+this.state.name;
        }
        this.setState({
            visible: false,
        });
    }
    componentWillMount() {
        console.log(this.props.location.query.role);
        let _this = this;
        _this.setState({
            name:this.props.location.query.name,   //React获取当前URL中的参数
            role: this.props.location.query.role
        })

    }


    render(){
        return(
            <div>

                <Modal
                    title="请假系统"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>欢迎使用请假系统</p>


                </Modal>
            </div>

        );
    }
}
