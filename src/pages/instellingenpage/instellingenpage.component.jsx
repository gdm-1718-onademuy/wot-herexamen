import React from 'react';
import './instellingenpage.styles.scss';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
//import arrowleft from '../../images/arrow-left.svg';
//import arrowleft2 from '../../images/arrow-left2.svg';

class Instellingenpage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newName: "",
            //showName:"",
            items:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var items = [];
        firebase
        .firestore()
        .collection("user")
        .get()
        .then((querySnapshot) => {  //Notice the arrow funtion which bind `this` automatically.
            querySnapshot.forEach(function(doc) {
                items.push(doc.data());
            });
            this.setState({ items: items });   //set data in state here
        });
    }

    handleChange = (e) => {
        this.setState({newName: e.target.value});
        //console.log(this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state.newName);

        const db = firebase.firestore();
        
        db.collection("user").doc("PUN4hGQNboe1nN5VyUoc").update({
            name: this.state.newName,
        });

        console.log("data added");
        //this.setState({redirect: "/"});
    }

    render(){
        console.log(this.state);
        const {items} = this.state;

        return(
            <div className='instellingenpage'>
                <div className="pagetitlegrey">INSTELLINGEN</div>
                <div className="back"><Link to='/'>Ga terug</Link></div>
                <div className="form-name">
                    <div className="nametag">Naam</div>
                    <div className="formke">
                        {items && items.length > 0 && items.map(item => (
                            <input className="username" name="username" type="text" onChange={this.handleChange} placeholder={item.name} />

                        ))}
                        
                    </div>  
                    <form onSubmit={this.handleSubmit}>
                            <input type="submit" className="save" value="OPSLAAN"/>
                    </form>   
                </div>
                <div></div>
    
            </div> 
        );
    }
}

export default Instellingenpage;