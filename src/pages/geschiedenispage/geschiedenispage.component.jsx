import React from 'react';
import './geschiedenispage.styles.scss';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
//import arrowleft from '../../images/arrow-left.svg';
//import arrowleft2 from '../../images/arrow-left2.svg';

class Geschiedenispage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //newName: "",
            //showName:"",
            items:[],
        }
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

    render(){
        console.log(this.state);
        const {items} = this.state;

        return(
            <div className='instellingenpage'>
                <div className="pagetitle yellow">GESCHIEDENIS</div>
                <div className="back"><Link to='/waterniveau'>Ga terug</Link></div>

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
            </div> 
        );
    }
}

export default Geschiedenispage;