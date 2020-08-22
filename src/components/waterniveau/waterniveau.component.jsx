//import React, { useState } from 'react';
import React from 'react';
import './waterniveau.styles.scss';
import firebase from '../../firebase';

class Waterniveau extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //status: null, //okay or something else
            boodschappen: [],
            stopzetten: null,
        }
    }

    componentDidMount() {
        var boodschappen = [];
        firebase
        .firestore()
        .collection("boodschap")
        .get()
        .then((querySnapshot) => {  //Notice the arrow funtion which bind `this` automatically.
            querySnapshot.forEach(function(doc) {
                boodschappen.push(doc.data());
            });
            this.setState({ boodschappen: boodschappen });   //set data in state here
            //this.setState({bijvullen: this.state.boodschappen[0].manueleAanvraag})
            this.setState({stopzetten: this.state.boodschappen[0].manueleStop})
        });
    }

    render(){
        //make de error pinking
        const {stopzetten} = this.state;
        console.log(this.state);

        return(
            <div>
                    {stopzetten === false ? 
                        <div className='waterniveau green'>
                            <div className="title">WATERTOEVOER</div>
                            <div className="status">STATUS: Systeem is ingeschakeld </div>
                        </div>
                    : 
                        <div className='waterniveau red'>
                            <div className="title">WATERTOEVOER</div>
                            <div className="statuswhite">STATUS: Systeem is uitgeschakeld </div>

                        </div> 
                    }
            </div>
        );
    }
}

export default Waterniveau;
