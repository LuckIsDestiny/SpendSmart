const User = require('../models/User');

exports.findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ user: user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { name, email, avatarId } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (avatarId) {
            // Validate avatarId is between 1 and 8
            if (avatarId < 1 || avatarId > 8) {
                return res.status(400).json({ message: 'Invalid avatar ID' });
            }
            user.avatarId = avatarId;
        }
        await user.save();
        res.status(200).json({ user: user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
