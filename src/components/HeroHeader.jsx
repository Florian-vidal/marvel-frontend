// Composant HeroHeader : bannière d'accueil du site
const HeroHeader = ({title, subtitle}) => {
  return (
    <div className="hero-header">
      {/* Overlay = calque semi-transparent pour améliorer la lisibilité du texte 
          sur une image de fond (géré via le CSS) */}
      <div className="overlay">
        {/* Titre principal du site */}
        <h1>{title}</h1>

        {/* Slogan / description d'accroche */}
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroHeader;
