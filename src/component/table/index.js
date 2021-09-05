import React, {Component} from 'react'
import './table.css'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderHeaderTable = () => {
        const {headerName} = this.props
        return headerName.map((header, index) => {
            // if(header==="Action") return ( 
            // <th colSpan="2" key={index}>{header}</th>
            // )

            return (
                <th key={index}>{header}</th>
            )
        })
    }

    renderButton = (datakey) => {
        const clickArr = Object.keys(datakey)
        return clickArr.map((key2,index)=> {
            return <button 
                id={datakey[key2]['idUser']} 
                key={index} 
                className={datakey[key2]['completeStatus'] && datakey[key2]['label']==='Check Out' ? 'hide' : datakey[key2]['className']} 
                onClick={datakey[key2]['clickFunc']}>
                {datakey[key2]['label']}</button>
        })
    }

    renderCellTable = (data) => {
        const {userLogin} = this.props
        const cellArr = Object.keys(data)
        return cellArr.map((key, index) => {

            if(key==="clickEvent") {
                return (
                    <td key={index} className="cell actionList">
                        {/* <button id={data[key]['idUser']} className={data[key]['className']} onClick={data[key]['clickFunc']}>{data[key]['label']}</button> */}
                        {this.renderButton(data[key])}
                    </td>
                )               
            }

            return (
                <td key={index} className="cell">{data[key]}</td>
            )
        })
    }

    renderBodyTable = () => {
        const {dataList, startIndex} = this.props
        return dataList.map((data, index) => {
            return (
                <tr key={index}>
                    <td className="cell num">{startIndex + index + 1}</td>
                    {this.renderCellTable(data)}
                </tr>
            )
        })
    }

    

    render() {
        const {className} = this.props
        return (
            <>
            <div className="table-wrapper">
                <table className={className} width="80%">
                    <thead>
                        <tr>
                            {this.renderHeaderTable()}
                        </tr>
                    </thead>
                    <tbody>          
                        {this.renderBodyTable()}
                    </tbody>
                </table>
            </div>
              
            </>
        );
    }
}

export default Table;