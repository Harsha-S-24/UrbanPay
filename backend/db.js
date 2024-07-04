const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/UrbanPay");


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Enter a User Name"],
        unique:true,
        lowercase: true,
        minLength:3,
        maxLength:30,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please Enter a password"],
        minLength:6,
    },
    firstName:{
        type:String,
        required:[true,"Please Enter a first name"],
        trim:true

    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }

});
userSchema.methods.createHash = async function (plainTextPassword) {

    const saltRounds = 10;
  
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  
    // Second mehtod - Or we can create salt and hash in a single method also
    // return await bcrypt.hash(plainTextPassword, saltRounds);
  };
  
  // Validating the candidate password with stored hash and hash function
  userSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash);
  };
  
const User=mongoose.model('User',userSchema);

module.exports={
    User
};