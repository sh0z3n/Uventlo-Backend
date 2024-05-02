import User from '../models/User.mjs'
import validator from 'validator'
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import zxcvbn from 'zxcvbn'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passport from 'passport';
import { sendWelcomeEmail } from '../services/emailService.mjs';
import { sendResetPasswordEmail } from '../services/emailService.mjs';



// @desc    Get all  users
// @route   Get /api/v1/auth/users
// @access  Private

export const getAllUsers =  async (req,res) =>{
        try
        {
            const users = await User.find();
            if (!users) {
                return res.status(404).json({message:'guess what you just lost your dat'});
            };
            console.log('waiting for the users flow ')
            return res.status(200).json(users);
        }

        catch(error)
        {
            return res.status(500).json({message:'Error while fetching users , check your connection',error:error.message});
        }

};

// @desc    Get a specific user
// @route   Get /api/v1/auth/users/:id
// @access  Private

export const getUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error while fetching user, check your connection', error: err.message });
  }
});


export const registerUser = asyncHandler(async (req, res) => {
    try {
    const { name, email, password, role } = req.body;

    // chwy the consfirmation wa 7viv 
    
    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: '3 chrachters long Name is required !' });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email adress' });
    }
    
    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 0.5) {
      throw new Error(`Password is too weak. ${passwordStrength.feedback.warning}`);
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("b3rtha drt safi user 1000 mra" );
      return res.status(400).json({ message: 'User already exists' })};
      
      
      // cooooock awlidou     
      const salt = await bcrypt.genSalt(3);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      
     await sendWelcomeEmail(name,email);
      
      const token = jwt.sign({
        userId: user._id,
        userRole: user.role 
      }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      res.set('Authorization', `Bearer ${token}`);
      res.status(201).json({message:'User created successfully',user:user,token:token});
} catch (error) {
    res.status(500).json({ message: 'Error while registering user :(', error: error.message });

}});

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  Public


export const loginUser = asyncHandler(async (req, res) => {
    try 
    {
        const { email, password } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (!password || !email) {
            return res.status(400).json({ message: 'all inputs are required !' });
        }
        
        const user = await User.findOne({ email});
        if (!user) { return res.status(404).json({ message: 'User not found' }); }
        console.log(password);
        console.log(user.password)
        const PasswordMatch = await bcrypt.compare(password, user.password);
        console.log(PasswordMatch)
        if (!PasswordMatch) { return res.status(401).json({ message: 'Invalid password' }); }  // bdl les messages f deployment it ain't a secure approach
        

        const token = jwt.sign({
            userId: user._id,
            userRole: user.role,
        }, process.env.JWT_SECRET);

        role = user.role

        res.set('Authorization', `Bearer ${token}`);
        res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 }); // 2 days expiry
        res.status(200).json({ message: 'User logged in successfully', token });
    }
    catch  (error)
    {   
        console.log('login has failed ');
        res.status(500).json({ message: 'Error while logging in :(', error: error.message });
    }
});

// @desc    Update a user
// @route   PUT /api/v1/auth/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
    const { name, email, role, bio, password } = req.body;
    console.log(name);
  
    try {
      const userId = req.params.id;
  
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
      user.bio = bio || user.bio;
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      if (password) {
        user.password = await bcrypt.hash(password, 2);
      }
  
      await user.save();
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
      console.error('Error updating user profile:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


export const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
  
    try {
      const user = await User.findOneAndDelete({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  




 
// export const authenticateUser = (req, res, next) => {   dok nkml se3 w ndir auth psk y3yy w idk idha ndir store wl tokens
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: 'Authorization token not found' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { _id: decoded.userId, role: decoded.userRole };
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };




export function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '10000000s' });
}



export const logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Email not found' });
  }

  // Generate a random OTP code
  const otp = crypto.randomInt(100000, 999999).toString();

  console.log(otp)
  // Save the OTP and expiry time to the user document
  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpires = Date.now() + 36000000000000000; // 1 hour
  await user.save({ force: true });

  // Send the OTP email
  await sendResetPasswordEmail(email, otp);

  res.status(200).json({ message: 'Password reset OTP sent to your email' });
});





export const verifyResetPasswordOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Email not found' });
  }

  // Check if the OTP matches and is not expired
  if (user.resetPasswordOTP === otp ) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid or expired OTP' });
  }
});


export const updatePasswordWithOTP = asyncHandler(async (req, res) => {
  const { email, newPassword , otp } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Email not found' });
  }



  // Update the user's password
  if (user.resetPasswordOTP != otp ) {
    return res.status(401).json({message: "invalid otp :( "})
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpires = undefined;
  await user.save();


  res.status(200).json({ message: 'Password updated successfully' });

}
  );