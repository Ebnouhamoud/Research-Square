const CustomerManager = require('./customerManager')

const url = 'https://rs-coding-exercise.s3.amazonaws.com/2020/orders-2020-02-10.json';

let orderManager = new CustomerManager(url);




const start = async () => {
  
  await orderManager.getData()
  console.log(orderManager.getMostExpensiveOrder())
  console.log(orderManager.getTotalPricesByYear())
  console.log(orderManager.getTopCustomer())

}
start()


