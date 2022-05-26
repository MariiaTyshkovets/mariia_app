import './Content.css';
import Ingredient from '../../components/Ingredient/Ingredient';
import Builder from '../../components/Builder/Builder';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import Purchase from '../Purchase';
import React from "react";

class Content extends React.Component{

    constructor (props) {
        super(props);

        this.state = {
            orders: [],
            ingredients: {},
            orderedList: [],
            total: "1.00",
            isModalActive: false,
            isPurchaseActive: false,
            isLoading: true
        }
        
        this.reload.bind(this);
        this.addIngredientBuilder.bind(this);
        this.addToBill.bind(this);
        this.changeActiveModal.bind(this);
        this.hideShowPurchase.bind(this)
    }

    componentDidMount = () => {
        fetch("https://beetroot-burger-app.herokuapp.com/ingredients").then(res => res.json()).then(order => {
            this.setState((oldState) => {
                const orderFromBack = order[0].ingredients.map(e => {return {ingredient: e.name, price: e.price}});
                let ingredientsFromBack = {};
                orderFromBack.forEach((item) => {
                    ingredientsFromBack[item.ingredient] = 0;
                });
                return {
                    ...oldState,
                    orders: orderFromBack,
                    ingredients: ingredientsFromBack,
                }
            })
        }).catch((err) => console.error(err)).finally(() => {
            this.setState((oldState) => {
                return {
                    ...oldState,
                    isLoading: false
                }
            })
        })
    }

    addToState = (name, price) => {
        this.setState((oldState) => {
            return {
                ...oldState,
                total: (+oldState.total + +price).toFixed(2), 
                ingredients: {
                    ...oldState.ingredients,
                    [name]: +oldState.ingredients[name] + 1
                },
                orderedList: [...oldState.orderedList, name]
            }
        })
    }

    removeFromState = (name, price) => {
        let index = this.state.orderedList.lastIndexOf(name);
        this.state.orderedList.splice(index, 1)
        this.setState((oldState) => {
            return {
                ...oldState,
                total: (+oldState.total - +price).toFixed(2), 
                ingredients: {
                    ...oldState.ingredients,
                    [name]: +oldState.ingredients[name] - 1,
                },
                orderedList: oldState.orderedList
            }
        })
    }

    changeActiveModal = () => {
        this.setState((oldState) => {
            return {
                ...oldState,
                isModalActive: !oldState.isModalActive
            }
        });
    }

    addToBill = () => {
        let li = "";
        if (this.state.total > 0) {
            Object.entries(this.state.ingredients).forEach(([key, value]) => {
                let price = this.state.orders.filter((item) => item.ingredient === key)[0].price.toFixed(2);
                if (value > 0) {
                    li = [li, (<li key={key}>{key}: {value} x {price} $</li>)]
                }
            });
        }
        return li;
    }

    addIngredientBuilder = () => {
        let block = "";
        this.state.orderedList.forEach((ingre, index) => {
            let nameOfClass = ingre.toLowerCase();
            block = [block, (<div className={nameOfClass + " ingredient"} key={nameOfClass + "_" + index}></div>)]  
        });
        return block;
    }

    hideShowPurchase = () => {
        this.setState((oldState) => {
            return {
                ...oldState,
                isPurchaseActive: !oldState.isPurchaseActive
            }
        });
    }

    reload = () => {
        let ingre = {};

        Object.entries(this.state.ingredients).forEach((item) => {
            ingre[item[0]] = 0
        });

        setTimeout(() => {
            this.setState((oldState) => {
                return {
                    ...oldState,
                    orderedList: [],
                    total: "1.00",
                    isModalActive: false,
                    isPurchaseActive: false,
                    ingredients: ingre
                }
            });
        }, 4000)  
    }
    
    render() {
        return (
            <>  
                <main className="main">
                    <div className={'burger-bilder'}>
                        {!this.state.isPurchaseActive ? 
                        <>
                            <Builder total={this.state.total} builder={this.addIngredientBuilder}/>
                            <div className='container-counter'>
                                <div className='counter__total'>Total:<br/>{this.state.total} USD</div>
                                {this.state.isLoading ? <Loader/> :
                                <div className='counter'>
                                    {this.state.orders.map((item) => <Ingredient add={this.addToState} 
                                    remove={this.removeFromState} nameOfIngredient={item.ingredient} priceOfIngredient={item.price} 
                                    key={item.ingredient} counter={this.state.ingredients} />)}                   
                                </div>}
                                <button className='btn-checkout' disabled={this.state.total <= 1} onClick={this.changeActiveModal}>Checkout</button>
                            </div>
                            <Modal isModalActive={this.state.isModalActive} addToBill={this.addToBill} 
                            total={this.state.total} changeActiveModal={this.changeActiveModal} hideShowPurchase={this.hideShowPurchase}/>
                        </>
                        : 
                        <Purchase isPurchaseActive={this.state.isPurchaseActive} total={this.state.total} hideShowPurchase={this.hideShowPurchase} ingredients={this.state.ingredients} reload={this.reload}/>
                        }
                    </div>
                </main>
            </>
        )
    }
}

export default Content;