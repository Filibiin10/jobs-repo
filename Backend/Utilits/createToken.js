import jwt from 'jsonwebtoken';
;
const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    console.log('Setting cookie:', token)
    
    // Set JWT as HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // This may need to be true in production
        sameSite: 'strict', // Use 'lax' if you want cross-site cookies
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
    
    return token;
};

export default generateToken