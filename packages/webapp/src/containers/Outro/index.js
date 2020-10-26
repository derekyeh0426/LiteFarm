import OutroImg from '../../assets/images/outro/outro.svg';
import React, {Component} from "react";
import styles from "./styles.scss";
import Footer from '../../stories/Footer/index';
import Button from '../../stories/Button/index'
import {connect} from 'react-redux';
import {farmSelector} from '../selector';
import history from '../../history';
// import {Button} from 'react-bootstrap';

class Outro extends Component {
    constructor(props) {
    super(props);
    this.redirectFinish = this.redirectFinish.bind(this)
    }

    redirectFinish() {
        console.log(this.props)
        const { farm } = this.props;
        console.log("farm is")
        console.log(farm)
        if (farm) {
            console.log("farm is not null")
            history.push('/home')
        }
      }

    render() {
        return (
            <div className={styles.home}> 
                <div className={styles.lander}>
                    <div>
                        <div className={styles.greetContainer}>
                        <img src={OutroImg}/>
                            <div className={styles.description}> 
                                <h3>{`And finally, let us show you a couple of important things!`}</h3>
                            </div>
                        </div>
                    
                        <Footer
                            children={<><Button fullLength color="secondary" children='Go back'/>
                            
                                        <Button fullLength children='Finish' onClick={this.redirectFinish}/>
                                        </>}
                        >

                       
                        </Footer>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      farm: farmSelector(state),
    }
  };
  
  export default connect(mapStateToProps)(Outro);