
export const navigateToLogin = "/readbook/login";
export const navigateToUserRegister = "/readbook/userregister";
export const navigateToBookRegister = "/readbook/bookregister";
export const navigateToBookRegisteredList = "/readbook/bookregisterlist";
export const navigateToReceiveRegister = "/readbook/receive";
export const navigateToDashboard = "/readbook/";
export const navigateToCart = "/readbook/cartlist";
export const navigateToFavorite = "/readbook/favoritelist";

export const Tables = {
    User: "User",
    BookInfo: "BookInfo",
    Cart: "Cart",
    Receive: "Receive",
}

export const addressEmptyObj = {
    postalCode: "",
    prefecture: "",
    city: "",
    streetAddress: ""
}

export const userEmptyObj = {
    userName: "",
    email: "",
    password: "",
    address: { ...addressEmptyObj },
    isEnd: false
}

export const deliveryType = {
    None: 0,
    FreeDelivery: 1,
    COD: 2,
}

export const bookType = {
    None: 0,
    Non_fiction: 1,
    Edited_non_fiction: 2,
    Reference_non_fiction: 3,
    Fiction: 4,
}

export const bookInfoEmptyObj = {
    userId: "",
    bookName: "",
    bookType: "",
    imageUrl: "",
    count: 0,
    deliveryType: deliveryType.None,
    note: "",
    isEnd: false
}

export const cartInfoEmptyObj = {

}

export const receiveInfoEmptyObj = {
    shippingAddress: { ...addressEmptyObj }
}

export const japanPrefectures = [
    "Aichi",
    "Akita",
    "Aomori",
    "Chiba",
    "Ehime",
    "Fukui",
    "Fukuoka",
    "Fukushima",
    "Gifu",
    "Gunma",
    "Hiroshima",
    "Hokkaido",
    "Hyogo",
    "Ibaraki",
    "Ishikawa",
    "Iwate",
    "Kagawa",
    "Kagoshima",
    "Kanagawa",
    "Kochi",
    "Kumamoto",
    "Kyoto",
    "Mie",
    "Miyagi",
    "Miyazaki",
    "Nagano",
    "Nagasaki",
    "Nara",
    "Niigata",
    "Oita",
    "Okayama",
    "Okinawa",
    "Osaka",
    "Saga",
    "Saitama",
    "Shiga",
    "Shimane",
    "Shizuoka",
    "Tochigi",
    "Tokushima",
    "Tokyo",
    "Tottori",
    "Toyama",
    "Wakayama",
    "Yamagata",
    "Yamaguchi",
    "Yamanashi",
];