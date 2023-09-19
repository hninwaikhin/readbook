import SearchBar from "./SearchBar";
import { AiOutlineHome, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { BsCart, BsFillCartFill } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { currentPage } from "../common/Variable";
import { useSelector } from "react-redux";
import { GetCartList, GetFavoriteList } from "../slice/bookListSlice";
import { useState } from "react";
import { About } from "./About";
import { FaUser } from "react-icons/fa";

export function MenuBar(props) {
    const favoriteList = useSelector(GetFavoriteList);
    const cartList = useSelector(GetCartList);
    const [tooltip, setTooltip] = useState(null);

    function handleHomeBtnClick() {
        props.setCurrPage(currentPage.Dashboard);
    }

    function handleBookAddBtnClick() {
        props.setCurrPage(currentPage.BookRegisteredList);
    }

    function HandleFavoriteBtnClick() {
        props.setCurrPage(currentPage.FavoriteList);
    }

    function handleCartBtnClick() {
        props.setCurrPage(currentPage.CartList);
    }

    function handleAboutBtnMouseOver() {
        setTooltip(
            <About onClose={() => { setTooltip(null); }} />
        );
    }

    function handleUserOrderBtnClick() {
        props.setCurrPage(currentPage.Order);
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
                    <div className="w-[1400px]">
                        <SearchBar onSearch={props.onSearch}></SearchBar>
                    </div>
                    <div className="flex items-center cursor-pointer w-[160px] mt-3 h-[38px] hover:bg-[#a1a1aa]" onClick={handleUserOrderBtnClick}>
                        <FaUser style={{ color: '#93c5fd', fontSize: '34px' }} />
                        <label className="ml-2 text-white text-[18px] cursor-pointer fontfamily">Ordered List</label>
                    </div>
                </div>
            </div>
            {tooltip && tooltip}
        </>
    );
}