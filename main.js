const fetch = require("node-fetch");
const CustomerManager = require('./customerManager')

const url = 'https://rs-coding-exercise.s3.amazonaws.com/2020/orders-2020-02-10.json';

const start = async () => {
  let data = []
  try {
      data = await fetch(url);
      data = await data.json();
  } catch (error) {
    throw error
  }
  let orderManager = new CustomerManager(data);
  console.log(orderManager.getMostExpensiveOrder())
  console.log(orderManager.getTotalPricesByYear())
  console.log(orderManager.getTopCustomer())

}
start()


