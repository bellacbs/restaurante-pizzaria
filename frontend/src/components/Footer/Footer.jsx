import { useHistory } from "react-router"
import homepageRed from '../../assets/homepageRed.png'
import homepageGreen from '../../assets/homepageGreen.png'
import shoppingCartRed from '../../assets/shoppingCartRed.png'
import shoppingCartGreen from '../../assets/shoppingCartGreen.png'
import avatarRed from '../../assets/avatarRed.png'
import avatarGreen from '../../assets/avatarGreen.png'
import { goToCart, goToFeed, goToProfile } from "../../routes/cordinator"

const Footer = () => {
    const history = useHistory()

    return(
        <div>
            <img src={history.location.pathname === '/feed'? homepageRed: homepageGreen} alt={"Página inicial"} onClick={() => goToFeed(history)}/>
            <img src={history.location.pathname === '/cart'? shoppingCartRed: shoppingCartGreen} alt={"icone página de carrinho"} onClick={() => goToCart(history)}/>
            <img src={history.location.pathname === '/profile'? avatarRed: avatarGreen} alt={"Página de perfil"} onClick={() => goToProfile(history)}/>
        </div>
    )

}

export default Footer