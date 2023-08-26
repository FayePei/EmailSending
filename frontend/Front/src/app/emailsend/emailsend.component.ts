import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emailsend',
  templateUrl: './emailsend.component.html',
  styleUrls: ['./emailsend.component.scss']
})


export class EmailsendComponent {
  imageUrl: string = '/assets/maxresdefault.jpg'; 
  EmailArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  Emailaddr  ="";
  User  ="";
  idEmail = "";


  constructor(private http: HttpClient ) 
  {
    this.getAllEmail();
  }

  ngOnInit(): void {
  }

  getAllEmail()
  { 
    this.http.get("http://localhost:8085/api/email/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.EmailArray = resultData.data;
    });
  }

  
  register()
  {
   // this.isLogin = false; 
   // alert("hi");
    let bodyData = {
      "idEmail" : this.idEmail,
      "User" : this.User,
      "Emailaddr" : this.Emailaddr,
    };
    this.http.post("http://localhost:8085/api/email/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Email Registered Successfully")
        this.getAllEmail();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }

  setUpdate(data: any) 
  {
   this.idEmail = data.idEmail;
   this.User = data.User;
   this.Emailaddr = data.Emailaddr;
 
  }


  UpdateRecords()
  {
    let bodyData = 
    {
      "idEmail" : this.idEmail,
      "User" : this.User,
      "Emailaddr" : this.Emailaddr
    };
    
    this.http.put("http://localhost:8085/api/email/update"+ "/"+ this.idEmail,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Email Registered Updated")
        this.getAllEmail();
      
    });
  }
 
  save()
  {
    if(this.idEmail == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }

  setDelete(data: any)
  {
    this.http.delete("http://localhost:8085/api/email/delete"+ "/"+ data.idEmail).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Email Deleted")
        this.getAllEmail();
    });
  }
}


