import Stream from "../models/Stream.js";

// Create a new stream entry
export const createStream = async (req, res) => {
  try {
    const { film_id, platform, url } = req.body;

    const existing = await Stream.findOne({ film_id, platform });
    if (existing) {
      return res.status(400).json({ message: "Stream entry already exists for this film and platform." });
    }

    const stream = new Stream({ film_id, platform, url });
    await stream.save();

    res.status(201).json({ message: "Stream successfully created.", data: stream });
  } catch (error) {
    res.status(500).json({ message: "Failed to create stream entry.", error });
  }
};

// Retrieve all stream entries
export const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find().sort({ createdAt: -1 });
    res.status(200).json(streams);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch streams.", error });
  }
};

// Retrieve streams by film ID
export const getStreamsByFilm = async (req, res) => {
  try {
    const { film_id } = req.params;
    const streams = await Stream.find({ film_id: parseInt(film_id) });

    if (streams.length === 0) {
      return res.status(404).json({ message: "No streams found for this film." });
    }

    res.status(200).json(streams);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stream data.", error });
  }
};

// Update a stream entry
export const updateStream = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, url } = req.body;

    const updated = await Stream.findByIdAndUpdate(
      id,
      { platform, url },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Stream not found." });
    }

    res.status(200).json({ message: "Stream updated successfully.", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update stream.", error });
  }
};

// Delete a stream entry
export const deleteStream = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Stream.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Stream not found." });
    }

    res.status(200).json({ message: "Stream deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete stream.", error });
  }
};
