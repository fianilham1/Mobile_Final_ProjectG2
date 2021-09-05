import React, {Component} from 'react';
import {Auth, ListParking, Dashboard} from "../../page";
import { Switch, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        // if(this.state.changeStatus==="getApiFirstTime"){
        //     this.props.getApiUsers()
        //     this.setState({
        //         changeStatus:"waitingAnyReq"
        //     })
        // }
    }


    // addNewListPenerimaanHandler = newMahasiswa => {
    //     // const {goToPage} = this.props
    //     const listPenerimaan = this.state.listPenerimaan
    //     const listMhs = this.props.mhsList
    //     const idNew = listMhs.length===0 ? 1 : Math.max(...listMhs.map(mhs => mhs.id)) + 1
    //     console.log("IDCEK",idNew)
    //     const mhsObject = {
    //         ...newMahasiswa,
    //         id:idNew,
    //         nim:`210700${idNew}`
    //     }
    //     listPenerimaan.push(mhsObject) //save to temp list for penerimaan new mhs only
    //     this.setState({
    //         listPenerimaan
    //     })
    //     this.props.addNewMhs(mhsObject) //save to master mahasiswa list in redux
    // }

    // getDetailMhsLogged = () => {
    //     const listMhs = this.props.mhsList
    //     const idxMhs = listMhs.map(mhs => mhs.email).indexOf(this.props.userLogin.username)
    //     // console.log("CEK LOGGED MHS",idxMhs)
    //     return listMhs[idxMhs]
    // }

   

    renderPage = () => {
        return (
        <Switch>
             <Route
                exact
                path="/"
                render={() => {
                    return (
                      this.props.loginStatus ?
                      <Redirect to="/dashboard" /> :
                      <Redirect to="/user/auth" /> 
                    )
                }}
              />
            <Route path="/user/auth">
                <Auth />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/listParking">
                <ListParking />
            </Route>
           
        </Switch>
        )
        
    }

    updateUsers = newUser => {
        console.log(newUser);

        if (newUser.id === "") {
            const oldUsers = this.state.users
            oldUsers.push({
                id: oldUsers.length ? Math.max(...oldUsers.map(user => user.id)) + 1 : 1,
                name: newUser.name,
                address: newUser.address
            })
            return this.setState({
                userList: oldUsers
            }, () => this.props.goToPage("list"))
        }

        const oldUsers = this.state.users
        const idxUser = oldUsers.map(user => user.id).indexOf(newUser.id)
        console.log(idxUser);
        oldUsers.splice(idxUser, 1, newUser)
        this.setState({
            userList: oldUsers
        }, () => this.props.goToPage("list"))
    }

    setUserEdit = userEdit => this.setState({userEdit}, () => this.props.goToPage("form"))

    clearUserEdit = () => this.setState({userEdit: {}})

    render() {
        
        return (
            this.renderPage()
        
        )
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loginStatus,
})

const mapDispatchToProps = dispatch => ({
    // addNewMhs: newMhs => dispatch({ type: "ADD_NEW", payload:{newMhs} }),
    // getApiUsers: () =>  dispatch({ type: "GETALLUSERS" })
})

export default connect(mapStateToProps, mapDispatchToProps)(Body);
