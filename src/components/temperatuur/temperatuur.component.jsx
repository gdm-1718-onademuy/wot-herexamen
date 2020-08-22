import React from 'react';
import './temperatuur.styles.scss';
import firebase from '../../firebase';

class Temperatuur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperatuur: 3,
        }
    }
    componentDidMount() {
        firebase
        .firestore()
        .collection("temperatuur").doc("2cOJQ2xdZRPQqqas64S1")
        .get()
        .then(function(doc) {
            if (doc.exists) {
                console.log(doc.data().graden);
                this.setState({temperatuur: doc.data().graden})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    render(){
        console.log(this.state);
        
        //const {items} = this.state;
        return (

            <div className='temperatuur'>
                <div className="titlebig">
                    {Math.round(this.state.temperatuur)}°
                </div>
                <div className="omschrijving">Temperatuur</div>
            </div>
        );
      }
}

export default Temperatuur;

