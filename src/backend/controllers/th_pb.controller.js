import TheaterPlayback from "../models/th_pb.model.js";

// Créer une nouvelle lecture (playback)
export const createPlayback = async (req, res) => {
  try {
    const { c_time, is_paused } = req.body;

    const playback = new TheaterPlayback({ c_time, is_paused });
    await playback.save();

    res.status(201).json({ message: "Playback créé avec succès", data: playback });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du playback", error });
  }
};

// Obtenir tous les états de playback (ou à adapter pour un seul selon besoin)
export const getAllPlaybackStates = async (req, res) => {
  try {
    const playbacks = await TheaterPlayback.find().sort({ createdAt: -1 });
    res.status(200).json(playbacks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des données", error });
  }
};

// Obtenir un playback spécifique par ID
export const getPlaybackById = async (req, res) => {
  try {
    const { id } = req.params;
    const playback = await TheaterPlayback.findById(id);
    if (!playback) return res.status(404).json({ message: "Playback non trouvé" });

    res.status(200).json(playback);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du playback", error });
  }
};

// Mettre à jour le temps et pause (ex: synchronisation live)
export const updatePlayback = async (req, res) => {
  try {
    const { id } = req.params;
    const { c_time, is_paused } = req.body;

    const updated = await TheaterPlayback.findByIdAndUpdate(
      id,
      { c_time, is_paused },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Playback non trouvé" });

    res.status(200).json({ message: "Playback mis à jour", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error });
  }
};

// Supprimer un playback (optionnel)
export const deletePlayback = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TheaterPlayback.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Playback non trouvé" });

    res.status(200).json({ message: "Playback supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};
