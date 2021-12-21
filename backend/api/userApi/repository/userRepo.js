// I switched to mySQL - leaving this for studying purposes


// const User = require("../../../models/User");
// const CustomError = require("../../../errors/CustomError");

// class UserRepository {
//   async CheckIfExists(input) {
//     try {
//       const doc = await User.findOne({input});
//       if (doc) throw new CustomError("User already exists", 400);
//       return doc;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }
//   async GetUser(input) {
//     try {
//       const user = await User.findOne(input);
//       if (!user) throw new CustomError("Wrong email or password", 401);
//       return user;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }
//   async SaveUser(userInputs) {
//     const { email, hashedPassword, emailConfirmationCode } = userInputs;
//     try {
//       const newUser = new User({
//         email: email,
//         password: hashedPassword,
//         isEmailConfirmed: false,
//         confirmation_Id: emailConfirmationCode,
//       });
//       await newUser.save();
//     } catch (err) {
//       if (err instanceof CustomError)
//       throw new CustomError(err.message, err.statusCode);
//     throw new Error(err.message);
//     }
//   }
//   async UpdateUser(searchParams, updateInfo) {
//     try {
//       const doc = await User.findOneAndUpdate(searchParams, updateInfo);
//       return doc;
//     } catch (err) {
//       if (err instanceof CustomError)
//       throw new CustomError(err.message, err.statusCode);
//     throw new Error(err.message);
//     }
//   }
// }

// module.exports = { UserRepository };
