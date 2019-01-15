var RequiredFieldMissing=require('../ErrorHandler/RequiredFieldMissing.js');
var database = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'}
  ];

const service ={
    addUser : function (req, res,next) {
        var user = req.body;
        var validatioErrorArray =new Array();
        if (!user.address) {
            validatioErrorArray.push(new RequiredFieldMissing("address"));
          }
        if (!user.name) {
            validatioErrorArray.push(new RequiredFieldMissing("name"));
        }    
        
        if(validatioErrorArray.length>0){
            return next(validatioErrorArray);
        }
        database.push(user)
        return res.status(200).json(user) ;  
    }
}

module.exports=service;