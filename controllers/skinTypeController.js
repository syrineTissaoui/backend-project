const SkinProfile = require( '../models/skinType');

// GET skin profile
exports.getSkinProfile = async (req, res) => {
  try {
    const profile = await SkinProfile.findOne({ userId: req.params.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSkinType = async (req, res) => {
  try {
    const profile = await SkinProfile.find();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / update skin profile
exports.updateSkinProfile = async (req, res) => {
  try {
    const { skinType, concerns, sensitivity } = req.body;

    if (!skinType || !concerns || !sensitivity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updated = await SkinProfile.findOneAndUpdate(
      { userId:  req.params.id }, // Replace with real user ID later
      { skinType, concerns, sensitivity },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Profile updated', profile: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
