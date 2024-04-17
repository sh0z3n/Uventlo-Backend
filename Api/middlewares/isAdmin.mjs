export const isAdmin = (req, res, next) => {
    // the user object is attached to the request object by the passport middleware
    if (req.user.role !== 'admin') {
        // res.status(403).redirect("/user/login") yet to be implemented
        return res.status(403).render.json({ message: 'Admin access required' });
    }
    next();
};
