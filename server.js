const { default: inquirer } = require("inquirer");
const inreq = require ("inquirer")
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`)
);
function menu () {
  inreq.prompt ( {
    type: "list",
    name: "userchoice",
    choices: ["view departments","view roles","view employees","add department","add role","add employee"], message:" What would you like to do"
  })
  .then ((data) =>{
    if(data.userchoice==="view departments"){
      viewdepartments()

    }

    if(data.userchoice==="view employees"){
      viewemployees()

    }
    
    if(data.userchoice==="add department"){
      adddepartment()

    }
    if(data.userchoice==="add roles"){

    }
    if(data.userchoice==="add employee"){

    }
    if(data.userchoice==="exits"){

    }
  
  }) 
}
function viewdepartments (){
  const sql = "select * from departments";
   db.query(sql, (err,results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.table (results)
   })
}
function viewroles(){
  const sql = " select * from roles";
  db.query(sql, (err,results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.table (results)
   })


}

function viewemployees (){
  const sql ="select * from employees";
  db.query(sql, (err,results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.table (results)
   })
}

function adddepartment (){
  inreq.prompt({
    type:"input",
    name: "department_name",
    message:"whats the name of your new department"
  })
  .then((data)=>{
    const sql = "insert into departments (department_name) values (?)";
    db.query (sql,[data.department_name],(err,results)=>{
      if (err) {
        console.log (err)
        return;
      }
      console.table (results)
    })

  })

}





menu ()