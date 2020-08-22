import React from 'react';
import './waterpage.styles.scss';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';


class Waterpage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filling: false,
            lastone: "",
            items: [],
            boodschappen: [],
            bijvullen: null,
            stopzetten: null,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stopzetten = this.stopzetten.bind(this);
    }

    componentDidMount() {
        var items = [];
        firebase
        .firestore()
        .collection("watertoevoer").orderBy("datum", "desc").limit(1)
        .get()
        .then((querySnapshot) => {  //Notice the arrow funtion which bind `this` automatically.
            querySnapshot.forEach(function(doc) {
                items.push(doc.data());
            });
            this.setState({ items: items });   //set data in state here
        });

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
            this.setState({bijvullen: this.state.boodschappen[0].manueleAanvraag})
            this.setState({stopzetten: this.state.boodschappen[0].manueleStop})
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const db = firebase.firestore();

        var currentDate = new Date();

        if(this.state.bijvullen){
            this.setState({bijvullen: false})
            this.setState({stopzetten: false})
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
        } else {
            this.setState({bijvullen: true})
            this.setState({stopzetten: false})
            db.collection("boodschap").doc("sQNGeSuqvrAWHEMQVKx6").set({
                manueleAanvraag: false,
                manueleStop: false,
            })
        }
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
        const {status, items, bijvullen, stopzetten} = this.state;
        console.log(this.state);

        return(
            <div className='waterpage'>
                <div className="pagetitle">WATERTOEVOER</div>
                <div className="back"><Link to='/'>Ga terug</Link></div>
                
                    <form onSubmit={this.handleSubmit} className= {bijvullen ? "bijvulling aan" : "bijvulling uit"}>
                        {bijvullen ?
                            <input type="submit" className="manueel grijs" value="MANUEEL BIJVULLEN"/>
                        :
                            <input type="submit" className="manueel oranje" value="MANUEEL BIJVULLEN"/>
                        }
                    </form>

                    <form onSubmit={this.stopzetten}>
                            <input type="submit" className="stopzetten" value="STOPZETTEN BIJVULLING"/>
                    </form>

                    <div className="tussentitel">Laatste bijvulling</div>
                    <div className="tablesettings">
                        <table>
                            <tr>
                                <th>Datum</th>
                                <th>Wijze</th>

                            </tr>

                            {items && items.length > 0 && items.map(item => (
                                <tr>
                                    <td>{JSON.stringify(item.datum.toDate().getDate())}/{JSON.stringify(item.datum.toDate().getMonth())}/{JSON.stringify(item.datum.toDate().getFullYear())} {JSON.stringify(item.datum.toDate().getHours()).padStart(2, "0")}:{JSON.stringify(item.datum.toDate().getMinutes()).padStart(2, "0")}</td>
                                    <td>{item.manier}</td>

                                </tr>
                            ))}
                        </table>
                    </div>
                <div className="geschiedenis"><Link to='/geschiedenis'>GESCHIEDENIS</Link></div>


            </div> 
        );
    }
}

export default Waterpage;