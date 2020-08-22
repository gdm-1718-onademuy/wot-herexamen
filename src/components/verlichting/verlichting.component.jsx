import React from 'react';
import './verlichting.styles.scss';
import firebase from '../../firebase';

class Verlichting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verlichting: false,
        }
    }

    componentDidMount() {
        console.log("printing the data");
        firebase
        .firestore()
        .collection("verlichting").doc("OjgC8T12rslWt7J3XbHp")
        .get()
        .then(function(doc) {
            if (doc.exists) {
                console.log(doc.data().aan);
                this.setState({verlichting: doc.data().aan})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    
    submit = (e) => {
        e.preventDefault();
        const db = firebase.firestore();
        
        //console.log(this.state.newName);
        if(this.state.verlichting){
            this.setState({verlichting: false});
            db.collection("verlichting").doc("OjgC8T12rslWt7J3XbHp").update({
                aan: false,
            });

        } else {
            this.setState({verlichting: true});
            db.collection("verlichting").doc("OjgC8T12rslWt7J3XbHp").update({
                aan: false,
            });
        }
    }

    render(){
        console.log(this.state.verlichting);
        //const {items} = this.state;

        // <input type="submit" className="save" value="OPSLAAN"/>

        return ( 
                   
            <div onClick={this.submit} className= {this.state.verlichting ? "verlichting aan" : "verlichting uit"}>
                {this.state.verlichting === false ?
                    <div className="titlebig">UIT</div>
                :  this.state.verlichting === true ?
                    <div className="titlebig">AAN</div>
                :
                <div className="titlebig">loading</div>
                }

                <div className="omschrijving">Verlichting</div>
            </div>
        );
      }
}

export default Verlichting;


