export class User{
 id:number;
 username : string;
 password : string;
 fullname : string;
 email : string ;
 phone : string;
 created_date : Date;
 isAdmin : Boolean;
 
 public User(username : string,
    password : string,
    fullname : string,
    email : string ,
    phone : string,
    isAdmin:Boolean){}
}