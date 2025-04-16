import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    vote_average: { type:  Number, required: true  },
    release_date: { type: Date, required: true  },
    runtime: { type: Number, required: true  },
    adult: { type: Boolean, required: true  },
    backdrop_path: { type: String, required: true  },
    homepage: { type: String, required: true  },
    imdb_id: {type: String, required: true},
    overview: { type: String , required: true },
    popularity: { type: Number, required: true  },
    poster_path: { type: String, required: true  },
    tagline: { type: String, required: true  },
    genres: { type: String, required: true  },
    production_companies: { type: String, required: true  },
    spoken_languages: { type: String, required: true  }
}, {
    timestamps: true
});

const Film = mongoose.model("Film", filmSchema);

export default Film;