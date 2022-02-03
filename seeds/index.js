const fs = require("fs");
const MonthService = require("../src/services/MonthService");
exports.seed = async function ( knex, Promise ) {
  await knex('clients').del();
  await knex('clients').insert([
    { client_id: 'client_id', client_secret: 'client_secret', name: 'client_name' }
  ]);
  
  await knex('users').insert([
    {
       'email': 'admin@admin.com',
       'first_name': 'Admin',
       'last_name': 'User',
       'password': '$2b$10$uLycBbdRqlAPnNZG3H9kteXDD1vSG5uEhqgt1Q0qJrxTykP6DY2JW' //password
    }
 ]);
 
	const propertyOneFile = await fs.readFileSync("property1.json", 'utf8');
	const propertyOneJson = JSON.parse(propertyOneFile.toString());
  
  const propertyTwoFile = await fs.readFileSync("property2.json", 'utf8');
	const propertyTwoJson = JSON.parse(propertyTwoFile.toString());
  
  await insertPropertyData(propertyOneJson);
  await insertPropertyData(propertyTwoJson);
  
  
  async function  insertPropertyData  (propertyData) {
    const incomes = propertyData.income;
    const expenses = propertyData.expense;
  
    const incomeData = [];
    const expenseData = [];
  
    await knex('properties').insert([
      { name: propertyData.propertyName, id: propertyData.propertyId }
    ]);
  
    Object.keys(incomes).map(async ( key ) => {
      const month = MonthService.getNumber(key);
      const value = incomes[key];
    
      incomeData.push({
        property_id: propertyData.propertyId,
        month,
        value,
      });
    })
  
    Object.keys(expenses).map(async ( key ) => {
      const month = MonthService.getNumber(key);
      const value = expenses[key];
    
      expenseData.push({
         property_id: propertyData.propertyId,
         month,
         value,
       });
    })

    await knex('incomes').insert(incomeData);
    await knex('expenses').insert(expenseData);
  }
};


