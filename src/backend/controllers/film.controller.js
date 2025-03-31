import Film from "../models/film.model.js"


// C'EST LE POST, CETTE FONCTION CREER UN NOUVEAU FILM 
export const createFilm = async (req, res) => {
    try {
        const film = new Film(req.body);
        await film.save();
        res.status(201).json(film);
    } catch (err) {
        res.status(400).json({error : err.message});
    }
}

// C'EST LE GET, CETTE FONCTION PREND TOUS LES FILMS DISPONIBLES
export const getFilm = async (req, res) => {
    const films = await Film.find();
    res.json(films);
}

// CETTE FONCTION CHERCHE LE FILM PAR ID
export const getFilmId = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        if (!film) return res.status(404).json({ error : "Film not found"});
        res.json(film);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
}

export const updateFilm = async (req, res) => {
    try {
        const film = await Film.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!film) return res.status(404).json({ error: "Film not found "});
        res.json(film);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
}

export const deleteFilm = async (req, res) => {
    try {
        const film = await Film.findByIdAndDelete(req.params.id);
        if (!film) return res.status(404).json({ error: "Film not found asa7bi"});
    } catch (err) {
        res.status(400).json({ error:err.message });
    }
}