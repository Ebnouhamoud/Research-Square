const fetch = require("node-fetch");

class CustomerManager {
  constructor(url){
    this.url = url;
    this.data =[];
    this.mostExpensiveOrder = 0;
    this.totalPricesByYear = {};
    this.topCustomer = [];
  }

  getData = async () => {
    try {
        await fetch(this.url)
              .then(res => res.json())
              .then(res => this.data = res)
    } catch (error) {
      throw error
    }
  }

  getMostExpensiveOrder () {

    if(this.mostExpensiveOrder) return this.mostExpensiveOrder

    for( const order of this.data.orders){
      if( this.mostExpensiveOrder <= order.total_price) this.mostExpensiveOrder = order.total_price;
    }
    return this.mostExpensiveOrder
  }

  getTotalPricesByYear () {

    let now = new Date();
    let yearOne = new Date(`${now.getFullYear()}-01-01`);
    let yearThree = new Date(`${now.getFullYear()-2}-01-01`);
    
    let result = {};
    
    let orders = this.data.orders

    for(const order of orders){

      let orderDate = new Date(order.created_date)
      if(yearThree.getFullYear() <=  orderDate.getFullYear() && yearOne.getFullYear() >= orderDate.getFullYear()){

        if(result[orderDate.getFullYear()]) {
          result[orderDate.getFullYear()] += order.total_price
        }else{
          result[orderDate.getFullYear()] = order.total_price
        }
      }
    }
    return this.totalPricesByYear = result;
  }

  getTopCustomer () {

    let orders = this.data.orders;
    let customers = this.data.customers;
    let customersOrders = {};
    let tempMaxNumberOfOrders = 0;
    let tempTopCustomerId = '';

    for ( const order of orders ) {
      if ( customersOrders[order.customer_id] ){
        customersOrders[order.customer_id] += 1;
      } else {
        customersOrders[order.customer_id] = 1;
      }
      if( tempMaxNumberOfOrders <= customersOrders[order.customer_id] ) {
        tempMaxNumberOfOrders = customersOrders[order.customer_id];
        tempTopCustomerId = order.customer_id;
      }
    }

    for(const customer of customers){
      if (customer.id === tempTopCustomerId) {
        return this.topCustomer = [customer.id, customer.name];
      }
    }
  }
}

module.exports = CustomerManager