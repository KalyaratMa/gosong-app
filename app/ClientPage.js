'use client';

import React, { useState, useMemo, useEffect } from 'react';

// --- SVG Icons ---
const HomeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ShoppingCartIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>;
const UserIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const PlusCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>;
const MinusCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const ChevronLeftIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>;
const SpecialDrinkIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M7 13.4v7.9"/><path d="M12 14v8"/><path d="M17 13.4v7.9"/><path d="M2 9v8a10 5 0 0 0 20 0V9"/></svg>;
const CoffeeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg>;
const TeaIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>;
const SmoothieIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>;

const GoDrinkLogo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>
        <span className="text-2xl font-bold tracking-wider">GoSong</span>
    </div>
);

const categories = [
    { name: 'K-POP', thaiName: 'K-POP', icon: CoffeeIcon, color: 'bg-purple-200' },
    { name: 'ไทย', thaiName: 'ไทย', icon: TeaIcon, color: 'bg-violet-200' },
    { name: 'สากล', thaiName: 'สากล', icon: SmoothieIcon, color: 'bg-purple-200' },
    { name: 'ลูกทุ่ง', thaiName: 'ลูกทุ่ง', icon: SpecialDrinkIcon, color: 'bg-violet-200' },
];

// --- Components ---

// ===== [START] NEW TOAST COMPONENT =====
const Toast = ({ message }) => {
    // This component will only render if there is a message.
    if (!message) {
        return null;
    }

    return (
        <div className="fixed bottom-24 md:bottom-10 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 bg-gray-800 text-white py-3 px-6 rounded-full shadow-lg z-50 animate-bounce">
            <span>💗 {message}</span>
        </div>
    );
};
// ===== [END] NEW TOAST COMPONENT =====

//const Header = () => (<header className="sticky top-0 z-20 bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 flex justify-between items-center shadow-lg"><GoDrinkLogo /><div className="flex items-center space-x-4"><SearchIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" /><UserIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" /></div></header>);
const Header = ({ onLogoClick }) => (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-pink-800 to-pink-300 text-white p-4 flex justify-between items-center shadow-lg">
        <button onClick={onLogoClick} className="cursor-pointer transition-transform duration-200 hover:scale-105">
            <GoDrinkLogo />
        </button>
        <div className="flex items-center space-x-4">
            <SearchIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" />
            <UserIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
    </header>
);
const WelcomeBanner = () => (<div className="p-6 sm:p-8 bg-gradient-to-r from-pink-400 to-pink-300 text-white rounded-xl mb-8 shadow-lg"><h2 className="text-3xl font-bold mb-2" >Welcome to Gosong!</h2><p className="text-lg opacity-90">เพลิดเพลินไปกับเสียงเพลงของคุณได้ที่นี่</p></div>);
const CategoryNav = ({ onSelectCategory }) => (<div className="mb-8"><h3 className="text-2xl font-bold text-gray-800 mb-4">หมวดหมู่</h3><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{categories.map((cat) => (<div key={cat.name} onClick={() => onSelectCategory(cat.name)} className={`${cat.color} p-4 rounded-xl text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}><cat.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" /><span className="font-semibold text-gray-700">{cat.thaiName}</span></div>))}</div></div>);
const ProductCard = ({ product, onAddToCart }) => (<div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group flex flex-col"><img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found'; }} /><div className="p-4 flex flex-col flex-grow"><h4 className="text-lg font-bold text-gray-800">{product.name}</h4><p className="text-sm text-gray-500 mb-3">{product.thaiName}</p><p className="text-gray-600 text-sm flex-grow">{product.description}</p><div className="mt-4 flex justify-between items-center"><span className="text-xl font-extrabold text-purple-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame-icon lucide-flame"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>{product.price}</span><button onClick={() => onAddToCart(product)} className="bg-purple-500 text-white rounded-full p-2 group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-200"><PlusCircleIcon className="w-6 h-6" /></button></div></div></div>);
//const BottomNav = ({ activeView, setActiveView }) => { const navItems = [{ name: 'Home', thaiName: 'หน้าหลัก', icon: HomeIcon, view: 'home' }, { name: 'Menu', thaiName: 'เมนู', icon: CoffeeIcon, view: 'menu' }, { name: 'Cart', thaiName: 'ตะกร้า', icon: ShoppingCartIcon, view: 'cart' }, { name: 'Profile', thaiName: 'โปรไฟล์', icon: UserIcon, view: 'profile' },]; return (<nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden z-20"><div className="flex justify-around items-center h-16">{navItems.map(item => (<button key={item.name} onClick={() => setActiveView(item.view)} className={`flex flex-col items-center justify-center space-y-1 transition-colors ${activeView === item.view ? 'text-purple-600' : 'text-gray-500'}`}><item.icon className="w-6 h-6" /><span className="text-xs font-medium">{item.thaiName}</span></button>))}</div></nav>); };
const BottomNav = ({ activeView, setActiveView, onHomeClick }) => {
    const navItems = [
        { name: 'Home', thaiName: 'หน้าหลัก', icon: HomeIcon, view: 'home' },
        { name: 'Menu', thaiName: 'เมนู', icon: CoffeeIcon, view: 'menu' },
        { name: 'Cart', thaiName: 'รายการเพลงโปรด', icon: ShoppingCartIcon, view: 'cart' },
        { name: 'Profile', thaiName: 'โปรไฟล์', icon: UserIcon, view: 'profile' },
    ];
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden z-20">
            <div className="flex justify-around items-center h-16">
                {navItems.map(item => {
                    // This logic ensures the correct handler is called for each button.
                    const clickHandler = () => {
                        if (item.view === 'home') {
                            onHomeClick();
                        } else {
                            setActiveView(item.view);
                        }
                    };
                    
                    return (
                        <button key={item.name} onClick={clickHandler} className={`flex flex-col items-center justify-center space-y-1 transition-colors ${activeView === item.view ? 'text-blue-600' : 'text-gray-500'}`}>
                            <item.icon className="w-6 h-6" />
                            <span className="text-xs font-medium">{item.thaiName}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
const CartView = ({ cart, onUpdateCart, onBack }) => {
    const total = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
    const handleQuantityChange = (product, change) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            const newQuantity = existingItem.quantity + change;
            if (newQuantity > 0) { onUpdateCart(product, newQuantity); }
            else { onUpdateCart(product, 0); }
        }
    };
    return (<div className="p-4 bg-gray-50 min-h-screen">
        <div className="flex items-center mb-6"><button onClick={onBack} className="p-2 mr-2 rounded-full hover:bg-gray-200">
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" /></button>
            <h2 className="text-3xl font-bold text-gray-800">รายการโปรดของคุณ</h2></div>{cart.length === 0 ? 
            (<div className="text-center py-20"><ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" /><p className="text-gray-500 text-lg">รายการโปรดของคุณว่างเปล่า</p><button onClick={onBack} className="mt-6 bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-purple-600 transition-colors">เลือกเพลงโปรดต่อ</button></div>) : (<div className="space-y-4">{cart.map(item => (<div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center"><img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover mr-4" /><div className="flex-grow"><h3 className="font-bold text-gray-800">{item.name}</h3><p className="text-purple-600 font-semibold">{item.price}</p></div><div className="flex items-center space-x-3"><button onClick={() => handleQuantityChange(item, -1)} className="text-purple-500 rounded-full hover:bg-purple-100 p-1"><MinusCircleIcon className="w-6 h-6" /></button><span className="font-bold text-lg w-8 text-center">{item.quantity}</span><button onClick={() => handleQuantityChange(item, 1)} className="text-purple-500 rounded-full hover:bg-purple-100 p-1"><PlusCircleIcon className="w-6 h-6" /></button></div></div>))}{<div className="mt-8 pt-6 border-t-2 border-gray-200 border-dashed"><h3 className="text-xl font-bold mb-4">สรุปรายการเพลงโปรด</h3><div className="space-y-2 text-gray-700"><div className="flex justify-between"><span>จำนวนเพลง</span><span>{total.toFixed(1)} Song</span></div><div className="flex justify-between">
        {/* <span>ค่าจัดส่ง</span><span>ฟรี</span> */}
        </div><div className="flex justify-between font-bold text-xl text-gray-800 pt-2 border-t mt-2">
        <span>เพลงโปรดทั้งหมด</span><span>{total.toFixed(1)} Song</span></div></div><button className="w-full mt-6 bg-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-colors text-lg">เริ่มร้องเลย!</button></div>}</div>)}</div>);
};

// --- Main App Component ---
export default function ClientPage({ initialProducts }) {
    const [activeView, setActiveView] = useState('home');
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // ===== [START] NEW STATE FOR TOAST =====
    const [toastMessage, setToastMessage] = useState('');
    // ===== [END] NEW STATE FOR TOAST =====

    const products = initialProducts;
    // ===== [START] NEW FUNCTION TO HANDLE GOING HOME =====
    const handleGoHome = () => {
        setActiveView('home');
        setSelectedCategory(null); // Also reset the category filter
    };
    // ===== [END] NEW FUNCTION TO HANDLE GOING HOME =====
    // ===== [START] UPDATED FUNCTION =====
    const handleAddToCart = (productToAdd) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...productToAdd, quantity: 1 }];
        });

        // Show toast notification
        setToastMessage(`เพิ่ม "${productToAdd.name}" ลงรายการโปรดแล้ว`);
        // Hide toast after 3 seconds
        setTimeout(() => {
            setToastMessage('');
        }, 3000);
    };
    // ===== [END] UPDATED FUNCTION =====

    const handleUpdateCart = (productToUpdate, newQuantity) => { if (newQuantity <= 0) { setCart(prevCart => prevCart.filter(item => item.id !== productToUpdate.id)); } else { setCart(prevCart => prevCart.map(item => item.id === productToUpdate.id ? { ...item, quantity: newQuantity } : item)); } };
    const filteredProducts = useMemo(() => { if (!products) return []; if (!selectedCategory) return products; return products.filter(p => p.category === selectedCategory); }, [selectedCategory, products]);
    const handleSelectCategory = (categoryName) => { setSelectedCategory(categoryName); setActiveView('menu'); }

    // const renderView = () => {
    //     switch (activeView) {
    //         case 'cart': return <CartView cart={cart} onUpdateCart={handleUpdateCart} onBack={handleGoHome} />;
    //         case 'menu':
    //         case 'home':
    //         default: return (<div className="p-4 sm:p-6"><WelcomeBanner /><CategoryNav onSelectCategory={handleSelectCategory} /><div><div className="flex justify-between items-center mb-4"><h3 className="text-2xl font-bold text-gray-800">{selectedCategory ? `${selectedCategory} Drinks` : 'เมนูแนะนำ'}</h3>{selectedCategory && (<button onClick={() => setSelectedCategory(null)} className="text-sm font-semibold text-purple-600 hover:underline">แสดงทั้งหมด</button>)}</div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredProducts.map(product => (<ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />))}</div></div></div>);
    //     }
    // };

    const renderView = () => {
        switch (activeView) {
            case 'cart': 
                return <CartView cart={cart} onUpdateCart={handleUpdateCart} onBack={handleGoHome} />;
            
            case 'menu':
            case 'home':
            default:
                const productsToShow = selectedCategory ? filteredProducts : (products ? products.slice(0, 30) : []);

                return (
                    <div className="p-4 sm:p-6">
                        <WelcomeBanner />
                        <CategoryNav onSelectCategory={handleSelectCategory} />
                        <div>
                            <div className="flex justify-between items-center mb-4">
                               <h3 className="text-2xl font-bold text-gray-800">{selectedCategory ? `${selectedCategory} ` : 'Billboard Hot 30™'}</h3>
                               {selectedCategory && (
                                   <button onClick={() => setSelectedCategory(null)} className="text-sm font-semibold text-blue-600 hover:underline">แสดงทั้งหมด</button>
                               )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {productsToShow.map(product => (
                                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                                ))}
                            </div>
                        </div>
                    </div>
                );
        }
    };


    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20 md:pb-0">
            <Header onLogoClick={handleGoHome} />
            <main>
                {renderView()}
            </main>
            <BottomNav 
                activeView={activeView} 
                setActiveView={setActiveView} 
                onHomeClick={handleGoHome}
            />
            {/* ===== [START] ADDED TOAST COMPONENT TO LAYOUT ===== */}
            <Toast message={toastMessage} />
            {/* ===== [END] ADDED TOAST COMPONENT TO LAYOUT ===== */}
        </div>
    );
}
