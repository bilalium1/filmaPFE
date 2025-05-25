import React from 'react';
import Navbar from '../components/navbar.jsx'
import bg from '../assets/bgmovie.jpg'

const Aboutpage = () => {
    return (
        <div className="p-10 mt-50 h-100 w-9/10 mx-auto bg-linear-to-t from-sky-500/20 rounded-3xl shadow-2xl border-b-[1px] transition-all">
            <h1 className="text-3xl font-bold mb-4 pb-5 border-b-2">À Propos de Nous</h1>
            <p className="mb-4">
                Bienvenue sur notre site web ! Nous sommes dédiés à fournir le meilleur service et la meilleure expérience à nos utilisateurs.
            </p>
            <p className="mb-4">
                Notre mission est de livrer du contenu de haute qualité et d'assurer la satisfaction de nos clients. Nous croyons en l'innovation,
                la créativité et l'excellence dans tout ce que nous faisons.
            </p>
            <p>
                Merci de visiter notre site. Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter !
            </p>
            <Navbar/>
        </div>
    );
};

export default Aboutpage;