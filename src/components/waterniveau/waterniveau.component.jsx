//import React, { useState } from 'react';
import React from 'react';
import './waterniveau.styles.scss';

class Waterniveau extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "filling", //okay, filling or something else
        }
    }

    render(){
        //make de error pinking
        const {status} = this.state;
        console.log(this.state);

        return(
            <div>
                    {status === "okay" ? 
                        <div className='waterniveau green'>
                            <div className="title">WATERNIVEAU</div>
                            <div className="status">STATUS: in orde</div>
                        </div>
                    : 
                        <div className='waterniveau red'>
                            <div className="title">WATERNIVEAU</div>
                            <div className="statuswhite">ERROR: Controleer de aansluiting </div>

                        </div> 
                    }

            </div>

    
        );
    }
}

export default Waterniveau;
