  
import React, { Component } from 'react';
import loading from '../../assets/images/loading.svg';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
  } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./dialog.css"

const Title = ({ children }) => <div className="dialog-title">{children}</div>;

class DialogApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
         }
    }

    renderPage = () => {
        const {
            openDialog, 
            showHideForgotPassDialog, 
            dialogTitle, 
            renderDialogContent, 
            buttonYesDialogText, 
            buttonNoDialogText,
            buttonYesDialogHandler,
            backDropClick,
            serviceLoading} = this.props
        return (
            <>
            <Dialog
                open={openDialog} 
                onClose={backDropClick ? () => showHideForgotPassDialog(false) : () => {}}
                PaperProps={{
                    style: {
                      minHeight: "85vh",
                      minWidth: "45vw"
                    }
                  }}
                  aria-labelledby="open-dialog-title"
                  aria-describedby="open-dialog-description">
                <DialogTitle id="open-dialog-title">
                    <Title>{dialogTitle}</Title>
                </DialogTitle>
                <DialogContent id="open-dialog-description">
                <DialogContentText>
                    {renderDialogContent}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                {serviceLoading ? 
                <div className='loading-dialog' >
                    <img src={loading} alt="" />
                    <div>Loading...</div>
                </div>
               
                :
                <>
                <Button onClick={() => buttonYesDialogHandler()} 
                    color="primary" autoFocus>
                    {buttonYesDialogText ? buttonYesDialogText : 'Yes'}
                </Button>
                 <Button onClick={() => showHideForgotPassDialog(false)}
                 color="primary" autoFocus>
                    {buttonNoDialogText ? buttonNoDialogText : 'Cancel'}
                </Button>
                </>
                }
                </DialogActions>
            </Dialog>
            </>
        )
    }

    render() {
        
        return ( 
            <div stlye={{}}>
            {this.renderPage()}
            </div> 
         );
    }
}
 
export default DialogApp;