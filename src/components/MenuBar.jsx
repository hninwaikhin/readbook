import SearchBar from "./SearchBar";
import { AiOutlineHome, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { BsCart, BsFillCartFill } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { navigateToBookRegisteredList, navigateToCart, navigateToDashboard, navigateToFavorite, navigateToOrder } from "../common/Variable";
import { useSelector } from "react-redux";
import { GetCartList, GetFavoriteList } from "../slice/bookListSlice";
import { useState } from "react";
import { About } from "./About";
import { FaUser } from "react-icons/fa";

export function MenuBar(props) {
    const navigate = useNavigate();
    const favoriteList = useSelector(GetFavoriteList);
    const cartList = useSelector(GetCartList);
    const [tooltip, setTooltip] = useState(null);

    function handleHomeBtnClick() {
        navigate(navigateToDashboard);
    }

    function handleBookAddBtnClick() {
        navigate(navigateToBookRegisteredList);
    }

    function HandleFavoriteBtnClick() {
        navigate(navigateToFavorite);
    }

    function handleCartBtnClick() {
        navigate(navigateToCart);
    }

    function handleAboutBtnMouseOver() {
        setTooltip(
            <About onClose={() => { setTooltip(null); }} />
        );
    }

    function handleUserOrderBtnClick() {
        navigate(navigateToOrder);
    }

    return (
        <>
            <div className="relative bg-[#737373] h-[68px] w-[1961px] ml-[9px] rounded-md">
                <div className="absolute flex">
                    <ul className="mt-1 w-[385px]">
                        <li><div className="mt-[10px] w-[70px] cursor-pointer" onClick={handleHomeBtnClick}><AiOutlineHome className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }} /></div></li>
                        <li><div className="mt-[10px] w-[70px] cursor-pointer" onClick={handleBookAddBtnClick}><BiBookAdd className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }} /></div></li>
                        <li><div className="mt-[10px] w-[70px] cursor-pointer" onClick={HandleFavoriteBtnClick}>{favoriteList.length > 0 ? <AiFillHeart className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }} /> : <AiOutlineHeart className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }} />}</div></li>
                        <li><div className="mt-[10px] w-[70px] cursor-pointer" onClick={handleCartBtnClick}>{cartList.length > 0 ? <BsFillCartFill className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }} /> : <BsCart className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }} />}</div></li>
                        <li><div className="mt-[10px] w-[70px] cursor-pointer" onMouseOver={handleAboutBtnMouseOver} onMouseLeave={() => { setTooltip(null); }}><FcAbout className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }} /></div></li>
                    </ul>
                    <div className="w-[1500px]">
                        <SearchBar onSearch={props.onSearch}></SearchBar>
                    </div>
                    <div className=" mt-3" onClick={handleUserOrderBtnClick}><FaUser className="hover:bg-[#a1a1aa]" style={{ color: 'white', fontSize: '34px' }}/></div>
                </div>
            </div>
            {tooltip && tooltip}
        </>
    );
}