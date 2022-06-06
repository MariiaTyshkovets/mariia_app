import React from "react";
import "./PrevOrders.css";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import TableRow from "../../components/TableRow/TableRow";

class PrevOrders extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            headers: ['Index', 'Client', 'Phone', 'Quick Delivery', 'Price of order', 'Ingredients of Burger'],
            ordersFromBack: [],
            isLoading: true
        }
    }
    // "https://burger-app-back.herokuapp.com/orders" 
    componentDidMount () {
        axios("https://beetroot-burger-app.herokuapp.com/orders").then(res => {
            const arrOrders = res.data;

            this.setState((oldState) => {
                return {
                    ...oldState,
                    ordersFromBack: arrOrders
                }
            })
        }).catch(e => console.log(e)).finally(() => {
            this.setState((oldState) => {
                return {
                    ...oldState,
                    isLoading: false
                }
            })
        })
    }

    render() {
        return (
            <>
                <div className='prev-orders'>
                    <h3>Previous Orders</h3>
                    {this.state.isLoading ? <Loader /> :
                    <table className="orders-table">
                        <thead>
                            <tr>
                            {this.state.headers.map((item) => {
                                return (
                                    <th key={item.toLowerCase()}>{item}</th>
                                )
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ordersFromBack.map((obj, index) => <TableRow key={index + 1} obj={obj} index={index}/>)}
                        </tbody>
                    </table>}
                </div>
            </>
        )
    }
}

export default PrevOrders;