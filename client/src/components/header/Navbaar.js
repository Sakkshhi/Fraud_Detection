import React from 'react'
import "./navbaar.css"
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext';

const Navbaar = () => {
    const navigate = useNavigate();
    const { getTotalItems } = useCart();

    const handleCartClick = () => {
        navigate('/buynow');
    };

    return (
        <header>
            <nav>
                <div className='left'>
                    <div className='navlogo'>
                        <NavLink to='/'><img src="/amazon_PNG25 (1).png" alt='Amazon logo' /></NavLink>
                    </div>

                    <div className='nav_searchbaar'>
                        <input type='text' name='' id='' />
                            <div className='search_icon'>
                                <SearchIcon id='search'/>
                            </div>
                    </div>
                </div>

                <div className='right'>
                    <div className='nav_btn'>
                        <NavLink to='/login'>Sign In</NavLink>
                    </div>
                    <div className='cart_btn' onClick={handleCartClick} style={{ cursor: 'pointer' }}>
                        <Badge badgeContent={getTotalItems()} color="primary">
                            <ShoppingCartIcon id='icon' />
                        </Badge>
                        <p>Cart</p>
                    </div>
                    <Avatar className='avtar' />
                </div>
            </nav>
        </header>
    )
}

export default Navbaar