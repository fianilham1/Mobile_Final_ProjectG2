import React, { Component } from 'react';
import Pagination from './Pagination';
// import "./register.css"
// import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
// import IconButton from '@material-ui/core/IconButton';
import {Table} from '../../component';
import TextField from '@material-ui/core/TextField';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./list-parking.css"

const Title = ({ children }) => <div className="titleDialog">{children}</div>;

class ListParking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getDoc:'',
            getDocId:'',
            loadingStatus:true,
            parkingList:[],
            serviceStatus:'',
            completeStatus:false,
            deleteStatus:false,
            open:false,
            idDelete:-1,
            id:-1,
            name:'',
            carplate:'',
            datein:'',
            timein:'',
            duration:'',
            price:0,
            showPassword:false
          
        }
        this.baseSate=this.state
       
    }

    

    componentDidMount(){
        this.props.changePage("/list-parking")
    }

    setValue = e => {
        const keyEdit = `${e.target.name}Edit`
        this.setState({ 
        [keyEdit]: e.target.value
     })
    }

    resetState = () => {
        this.setState(this.baseSate)
    }

    deleteHandler = e => {
        this.setState({
            idDelete:e.target.id,
            deleteStatus:true,
            open:true
        })
        console.log("id delete",e.target.id)
    }

    yesDeleteHandler = e => {
        this.setState({
            deleteStatus:false,
            open:false
        })
        
    }


    dateNow = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
       return yyyy+'-'+mm+'-'+dd; 
    }

    timeNow = () => {
        var today = new Date();
        var HH = today.getHours();
        var MM = today.getMinutes();
        if(HH<10){
            HH='0'+HH;
        } 
        if(MM<10){
            MM='0'+MM;
        } 
        return HH+':'+MM
    }

    calcParking = (initPrice,dateIn, timeIn, type) => {
        const today = new Date();
        this.setState({
            dateout:this.dateNow(), 
            timeout:this.timeNow()
        })
        // Day Out
        let dateDayOut = today.getDate()  
        // Time Out
        let timeHoursOut = Math.ceil(today.getHours()+today.getMinutes()/60)
        // Day in
        let dateArr = dateIn.split("-")
        let dateDayIn = parseInt(dateArr[2])
        // Time In
        let timeArr = timeIn.split(":");
        let timeHoursIn = Math.ceil(parseInt(timeArr[0])+parseInt(timeArr[1]/60))

        //check if parking duration > 24h
        if(dateDayOut!==dateDayIn){
            timeHoursOut += 24*(dateDayOut-dateDayIn) //more than 1 day
        }
        // duration does parking take
        let diffTime = timeHoursOut - timeHoursIn;
        if(type==="time") return diffTime

        const newPrice = diffTime*15000 //price 1 hours for Rp15000
        return initPrice+newPrice
    }

    completeOrderHandler = e => {
        this.setState({
            loadingStatus:true
        })

        setTimeout(() => {  //delay re render userlist page
            console.log("cek", this.state.getDoc)
            this.setState({
                completeStatus:true,
                open:true,
                carplate: this.state.getDoc.carplate,
                datein: this.state.getDoc.datein,
                timein: this.state.getDoc.timein,
                duration: this.calcParking( this.state.getDoc.price, this.state.getDoc.datein, this.state.getDoc.timein,"time"),
                price: this.calcParking( this.state.getDoc.price, this.state.getDoc.datein, this.state.getDoc.timein,"price"),
                loadingStatus:false
            })   
            }, 3000);
      
        console.log("id to finish order",e.target.id)
    }
      
    saveHandler = e => {
        this.setState({
            open:false,
            completeStatus:false
        })
        const {dateout, timeout, price, duration} = this.state  
           
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Complete Order success',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
      };

    cancelHandler = e => {
        this.setState({
            open:false,
            completeStatus:false,
            deleteStatus:false
        })
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword:!this.state.showPassword
        })
      };

    renderDialogContent = () => {
        if(this.state.completeStatus) return (
            <>
            <img className="car-photo" src={this.state.getDoc.photo} alt=''/>
            <TextField
                autoFocus
                margin="dense"
                label="Id"
                type="text"
                value={this.state.getDocId}
                className="inputDialog"
            />
            <TextField
                autoFocus
                margin="dense"
                label="Car Plate"
                type="text"
                value={this.state.carplate}
                className="inputDialog"
            />
            <TextField
                autoFocus
                margin="dense"
                label="Date In"
                type="text"
                value={`${this.state.datein} ${this.state.timein}`}
                className="inputDialog"
            />
            <TextField
                autoFocus
                margin="dense"
                label="Date Out"
                type="text"
                value={`${this.state.dateout} ${this.state.timeout}`}
                className="inputDialog"
            />
            <TextField
                autoFocus
                margin="dense"
                label="Total Hours Parking"
                type="text"
                value={`${this.state.duration} hours`}
                className="inputDialog"
            />
            <TextField
                autoFocus
                margin="dense"
                label="Price"
                type="text"
                value={`Rp${this.state.price}`}
                className="inputDialog"
            />
              {/* <TextField
                autoFocus
                margin="dense"
                name="password"
                label="Password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.passwordEdit}
                onChange={this.setValue}
                className="inputDialog"
            />
            <IconButton
                aria-label="toggle password visibility"
                onClick={this.handleClickShowPassword}
                edge="end">
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton> */}
            </>
        )

        if(this.state.deleteStatus) return  "Are You Sure?"  

        return ''
    }

    renderDialog = () => {
        return (
        <Dialog open={this.state.open} className="dialog-container">
            <DialogTitle>
                <Title>{this.state.completeStatus ? "Complete Parking Order": "Delete Parking Order"}</Title>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                {this.renderDialogContent()}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.state.completeStatus ? this.saveHandler : this.yesDeleteHandler} 
                    color="primary" autoFocus>
                {this.state.completeStatus ? "Confirm" : "Yes"}
            </Button>
            <Button onClick={this.cancelHandler}
                    color="primary" autoFocus>
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        )
    }

    
    render() {

        if (!this.props.loginStatus)
            return <Redirect to="/user/auth" />
        
        const list = this.state.parkingList.map((data,index)=>{
            const {timein,timeout, ...newObj} = data;
            const hours = data.duration!=='' ? data.duration+' Hours' :'-'
            const dates = data.dateout!=='' ? data.dateout+' '+data.timeout : '-'
            return{
                ...newObj,
                datein:`${data.datein} ${data.timein}`,
                dateout:dates,
                duration:hours,
                price:`Rp ${data.price}`,
                clickEvent:{
                    button1:{
                        clickFunc:this.completeOrderHandler,
                        idUser:data.id,
                        label:"Check Out",
                        className:"button1",
                        completeStatus: data.status==='complete' ? true:false
                    },
                    button2:{
                        clickFunc:this.deleteHandler,
                        idUser:data.id,
                        label:"Delete",
                        className:"button2",
                        completeStatus: data.status==='complete' ? true:false
                    }
                }
            }
        })

        const { currentPage, currentEntries } = this.props;

        let filteredData = []; //filter based on pagination
        let startIndex = (currentEntries)*(currentPage-1);
        let endIndex = (currentEntries)+(currentEntries)*(currentPage-1);
        for(let i = startIndex;i < endIndex;i++){
            if(i<list.length){ //limit to user data length
                const data = list[i];
                filteredData.push(data);
            }        
        }
 
        return (
            <div className="user-container">
                <div className="search-container">
                    <label>Search </label>
                    <input 
                    className="search-plate"
                    placeholder="Search Car Plate Number"></input>
                </div>
                <Table 
                    className="fl-table"
                    dataList={filteredData}
                    startIndex= {startIndex}
                    headerName={["No","Id","Car Merk","Car Plate","Date In","Date Out","Duration Parking","Price","Status","Action"]}
                    //NOTE : dataList.length must be headerName.length-1 (for cell number)
                />
              {this.renderDialog()}
              <div className={`lds-ring modal ${this.state.loadingStatus===true ? "loading":''}`}><div></div><div></div><div></div></div>
              <Pagination listLength={this.state.parkingList.length} />
            </div>
        
    
        );
    }
}


const mapStateToProps = state => ({
    loginStatus: state.auth.loginStatus,
    currentPage: state.paginationConfig.currentPage,
    currentEntries: state.paginationConfig.currentEntries
})

const mapDispatchToProps = dispatch => ({
    changePage: page => dispatch({ type: page }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListParking);
