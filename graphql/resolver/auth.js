const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    createUser: args => {
      return User.findOne({email:args.userInput.email})
        .then(user => {
          if(user) {
            throw new Error('User exists already.');
          }
          return bcrypt.hash(args.userInput.password, 12);
        }).then(hashedPassword => {
          const user = new User({
            email: args.userInput.email,
            password: hashedPassword
          });
          return user.save().then(result => {
            return {...result._doc, password: null, _id:result.id}
          }).catch(err => {
            throw err;
          });
        }).catch(err => {
          throw err;
        });
    },
    login: async ({email, password}) => {
      const user = await User.findOne({email:email});
      if(!user){
        throw new Error('User does not exist!');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if(!isEqual){
        throw new Error('Username or password is incorrect');
      }
      const token = jwt.sign({userId: user.id, email:user.email}, 'somesupersecretkey', {
        expiresIn:'1h'
      });
      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1
      }
    },
    allUsers: async () => {
      try{
        const users = await User.find();
        let count = 0;
        return users.map(user => {
          count++;
          return {
            ...user._doc,
            _id:user.id,
            password:null
          }
        });
      }catch(err){
        throw error
      }      
    }
  };
