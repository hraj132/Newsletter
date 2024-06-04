const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    const data={
      members:[
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME:lastName
          }
        }
      ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us12.api.mailchimp.com/3.0/lists/b43944bc0f";

    const options={
      method:"POST",
      auth:"harsh1:44ce45bf0308656a6c784fd4de621bde-us12"
    };

    const request=https.request(url,options,function(response){
      console.log(response.statusCode);
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
      response.on("data",function(data){
        // console.log(JSON.parse(data));
      })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("Server running on port 3000");
});

//API Key
// 44ce45bf0308656a6c784fd4de621bde-us12

//Audience id
//b43944bc0f
