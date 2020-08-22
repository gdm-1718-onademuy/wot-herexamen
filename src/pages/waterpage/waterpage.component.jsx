import React from 'react';
import './waterpage.styles.scss';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';


class Waterpage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filling: false,
            status: "",
            lastone: "",
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stopzetten = this.stopzetten.bind(this);
    }

    componentDidMount() {
        var items = [];
        firebase
        .firestore()
        .collection("watertoevoer").orderBy("datum", "desc")
        .get()
        .then((querySnapshot) => {  //Notice the arrow funtion which bind `this` automatically.
            querySnapshot.forEach(function(doc) {
                items.push(doc.data());
            });
            this.setState({ items: items });   //set data in state here
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const db = firebase.firestore();

        var currentDate = new Date();

            db.collection("watertoevoer").add(
                {
                aan: true,
                datum: currentDate,
                manier: "manueel",
            });
        
            db.collection("boodschap").doc("sQNGeSuqvrAWHEMQVKx6").set({
                manueleAanvraag: true,
                manueleStop: false,
            })
    }

    stopzetten = (e) => {
        e.preventDefault();
        const db = firebase.firestore();

        db.collection("boodschap").doc("sQNGeSuqvrAWHEMQVKx6").set({
            manueleAanvraag: false,
            manueleStop: true,
        })
    }

    render(){
        const {status} = this.state;
        console.log(this.state);

        return(
            <div className='waterpage'>
                <div className="pagetitle">WATERNIVEAU<br></br>{status}</div>
                <div className="back"><Link to='/'>Ga terug</Link></div>
                
                    <form onSubmit={this.handleSubmit}>
                            <input type="submit" className="manueel" value="MANUEEL BIJVULLEN"/>
                    </form>

                    <form onSubmit={this.stopzetten}>
                            <input type="submit" className="stopzetten" value="STOPZETTEN BIJVULLING"/>
                    </form>
                <div className="geschiedenis"><Link to='/geschiedenis'>GESCHIEDENIS</Link></div>


            </div> 
        );
    }
}

export default Waterpage;