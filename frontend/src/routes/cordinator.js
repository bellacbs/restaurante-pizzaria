export const goToHomePage = (history) => {
    history.push("/")
}

export const goToLogin = (history) => {
    history.push("/login")
}

export const goToSignup = (history) => {
    history.push("/cadastro")
}

export const goToFeed = (history) => {
    history.push("/feed")
}

export const goToCart = (history) => {
    history.push(`/cart`)
}

export const goToProfile = (history) => {
    history.push('/profile')
}

export const goToOrderDetails = (history, id) => {
    history.push(`/order-details/${id}`)
}