import './list-parking.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
const prevPage = 'prev';
const nextPage = 'next';
let currentPage = 1;

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
  }

//event of pagination
const buildPagination = (entries,currentPage,dataLength) => {
    let pageTotal = Math.ceil(dataLength/entries); //total pagination number
    let showPagination = 3; //show n button only
    let diff = (showPagination-1); //differences between start index and end index
    let halfLengthPage = Math.floor(showPagination/2); //5/2 == 2
    
    console.log("TOTAL",pageTotal)
  
    if(diff>=pageTotal){
      showPagination = pageTotal;
      diff = (showPagination-1); //if custom showpagination >= page total based entries
      halfLengthPage = Math.floor(showPagination/2);
    }
  
    let startIndex = currentPage-halfLengthPage; //declare start index
    if(startIndex<1){
      startIndex = 1; //first page
    }
  
    let endIndex = startIndex+diff; //declare end index
    if(endIndex>pageTotal){
      endIndex = pageTotal;
    }
  
    let currentDiff = endIndex-startIndex;
    if(currentDiff<diff){
      let correction = diff-currentDiff;
      startIndex = currentPage - halfLengthPage - correction;
    }
  
    let pages = range(startIndex,endIndex);

    //add previous button
    if(currentPage!==1){
        
        // if(currentPage >= diff && currentPage==startIndex){
        if(startIndex!==1 && showPagination!==pageTotal){
            pages = [1, prevPage, ...pages]; //pages = ['prev',1,2,3,4,5]
        }else{
            pages = [prevPage, ...pages];
        }
    }

    //add next button
    if(currentPage!==pageTotal){
        if(endIndex!==pageTotal && pageTotal!==0 && showPagination!==pageTotal){
            pages = [...pages, nextPage, pageTotal];
        }else{
            pages = [...pages, nextPage];
        }
    }
 
    return pages;    

  }

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        // this.gotoPage = this.gotoPage.bind(this);
    }

    handleClick = e => {
        e.preventDefault();
        console.log("click",e.target.id)
        this.props.gotoPage(parseInt(e.target.id));
    }  
    handleMovePrev = e => {
        e.preventDefault();
        console.log("click prev")
        this.props.gotoPage(this.props.currentPage-1);
    }
    handleMoveNext = e => {
        e.preventDefault();
        console.log("click next")
        this.props.gotoPage(this.props.currentPage+1);
    }
    render() { 
        const { currentEntries, currentPage, listLength } = this.props;
        const pageTotal = Math.ceil(listLength/currentEntries); //total pagination number
        const pages = buildPagination(currentEntries,currentPage,listLength)
        const showPages = pages.map((page, index) => {
            if (page === prevPage) return (
                <button key={index} onClick={this.handleMovePrev} className="prevNext">{'<<'}</button>
            );
            
            if (page === nextPage) return (
                <button key={index} onClick={this.handleMoveNext} className="prevNext">{'>>'}</button>
            );
    
            return (
                <button key={index} id={page} onClick={this.handleClick} className={`page${ currentPage === page ? ' active-pagination' : ''}`}>{page}</button>
            );
        }) 
       
        return ( 
            <>
                <div className={`pagination_section${ currentPage === pageTotal ? ' maxPage' : ''}${ pages[0] === 1 && pages[1] === prevPage ? ' shift' : ''}`}>
                    {showPages}
                </div>
            </>
         );
    }
}

const mapStateToProps = state => ({
    currentPage: state.paginationConfig.currentPage,
    currentEntries: state.paginationConfig.currentEntries
})

const mapDispatchToProps = dispatch => ({
    changePage: page => dispatch({ type: page }),
    gotoPage: page => dispatch({ type: "GoToPage", payload: {page} })
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);