
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

export const shippingStatus = {
    None: 0,
    Ordered: 1,
    Prepare: 2,
    Shipped: 3,
    Cancel: 4,
}

export const bookInfoEmptyObj = {
    userId: "",
    bookName: "",
    bookType: "",
    imageUrl: "",
    count: 0,
    deliveryType: deliveryType.None,
    note: "",
    isEnd: false,
    status: shippingStatus.None,
    orderedUserId: "",
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

export const currentPage = {
    Dashboard: 0,
    Login: 1,
    UserRegister: 2,
    BookFormRegister: 3,
    BookRegisteredList: 4,
    CartList: 5,
    FavoriteList: 6,
    ReceiveFormRegister: 7,
    Order: 8,
}