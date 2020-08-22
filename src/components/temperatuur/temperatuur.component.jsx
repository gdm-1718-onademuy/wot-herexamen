import React from 'react';
import './temperatuur.styles.scss';
import firebase from '../../firebase';

class Temperatuur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperatuur: null,
            items: [],
        }
    }
    /*componentDidMount() {
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
    }*/

    componentDidMount() {
        var items = [];
        firebase
        .firestore()
        .collection("temperatuur")
        .get()
        .then((querySnapshot) => {  //Notice the arrow funtion which bind `this` automatically.
            querySnapshot.forEach(function(doc) {
                items.push(doc.data());
            });
            this.setState({ items: items });   //set data in state here
        });
    }

    render(){
        console.log(this.state);
        const {items} = this.state;
        //const {items} = this.state;
        return (

            <div className='temperatuur'>
                  {items && items.length > 0 && items.map(item => (
                <div className="titlebig">
                    {Math.round(item.graden)}°
                </div>
                ))}
                
                <div className="omschrijving">Temperatuur</div>
            </div>
        );
      }
}

export default Temperatuur;

