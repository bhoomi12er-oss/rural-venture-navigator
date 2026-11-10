import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Star, ShieldCheck, Heart, ShoppingBag, MessageSquare, CheckCircle, ThumbsUp } from 'lucide-react';

export default function CustomerHome() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuy = async (product) => {
    const token = localStorage.getItem('rvn_token');
    if (!token) {
      alert("Please login first to place a test order! / Kripya pehle login karein!");
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });
      const data = await res.json();
      if (data.success) {
        setPurchasedProduct(product);
        setPurchaseModalOpen(true);
      } else {
        alert(data.message || "Failed to place order / Order fail ho gaya");
      }
    } catch (err) {
      console.error(err);
      alert("Order connection failed / Internet connection check karein");
    }
  };

  const getProductBg = (category) => {
    switch (category) {
      case 'cookies': return "from-emerald-500/10 to-teal-500/5";
      case 'snacks': return "from-amber-500/10 to-orange-500/5";
      case 'flour': return "from-purple-500/10 to-indigo-500/5";
      default: return "from-blue-500/10 to-cyan-500/5";
    }
  };

  const getProductBadge = (category, lang) => {
    const isHindi = lang === 'Hindi (हिंदी)';
    if (category === 'cookies') return isHindi ? 'सबसे लोकप्रिय' : 'Best Seller';
    if (category === 'snacks') return isHindi ? 'फाइबर से भरपूर' : 'High Fiber';
    if (category === 'flour') return isHindi ? 'पौष्टिक' : 'Nutritious';
    return isHindi ? 'ताज़ा उत्पाद' : 'Fresh Choice';
  };

  const renderStars = (rating) => {
    const finalRating = rating || 4.7;
    return (
      <div className="flex gap-0.5 text-amber-500 items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4.5 h-4.5 ${i < Math.round(finalRating) ? 'fill-amber-500' : 'text-stone-300'}`} />
        ))}
        <span className="text-xs font-bold text-brand-dark opacity-75 ml-1">{finalRating}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-brand-primary font-bold text-lg">
        Loading local millet ventures showcase...
      </div>
    );
  }

  return (
    <div className="space-y-10 py-4">
      {/* Header Greeting Banner */}
      <section className="bg-brand-primaryLight border border-brand-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-brand-primary font-bold text-xs uppercase tracking-wider rounded-full border border-brand-primary/10">
            <Heart className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" /> Support Local SHGs
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            {t('customerHomeTitle')}
          </h1>
          <p className="text-sm sm:text-base text-brand-dark opacity-80 leading-relaxed max-w-2xl font-medium">
            {t('customerHomeSubtitle')}
          </p>
        </div>
        <div className="bg-white border border-brand-neutralGray px-5 py-4 rounded-xl shadow-sm text-center flex-shrink-0">
          <span className="text-xs text-brand-dark opacity-60 font-semibold uppercase tracking-wider">Logged In As</span>
          <p className="text-lg font-bold text-brand-primary mt-0.5">{user?.name || 'Gaurav Kumar'}</p>
          <span className="text-[10px] bg-brand-primaryLight text-brand-primary font-bold px-2 py-0.5 rounded-md mt-1 inline-block uppercase">
            {user?.role === 'entrepreneur' ? (t('roleSeller') || 'Seller') : (t('roleCustomer') || 'Customer')}
          </span>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-brand-neutralGray pb-3">
          <h2 className="text-2xl font-extrabold text-brand-dark">{t('featuredProducts')}</h2>
          <span className="text-xs text-brand-dark opacity-60 font-semibold">{products.length} Products Available</span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-brand-neutralGray rounded-xl bg-white text-brand-dark opacity-60">
            No products uploaded by rural entrepreneurs yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card 
                key={product._id} 
                className={`hover:scale-[1.02] hover:shadow-md transition-all duration-350 border-brand-neutralGray relative flex flex-col justify-between overflow-hidden bg-gradient-to-br ${getProductBg(product.category)}`}
              >
                {/* Product Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                    {getProductBadge(product.category, t('language'))}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Product Name & SHG */}
                  <div>
                    <h3 className="text-xl font-extrabold text-brand-dark leading-snug pr-20">
                      {product.productName}
                    </h3>
                    <p className="text-xs text-brand-primary font-bold mt-1 uppercase tracking-wide">
                      {t('shgLabel')}: {product.shg || 'Mahila Jagriti SHG'}
                    </p>
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between border-t border-b border-brand-neutralGray/40 py-2.5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-brand-dark opacity-60 font-bold uppercase tracking-wider">{t('rating')}</span>
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-brand-dark opacity-60 font-bold uppercase tracking-wider">Price</span>
                      <p className="text-2xl font-black text-brand-primary mt-0.5">₹{product.price}</p>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-brand-dark opacity-60 uppercase tracking-wider">{t('ingredients')}:</span>
                    <p className="text-sm font-semibold text-brand-dark opacity-85 leading-relaxed">
                      {product.ingredients}
                    </p>
                  </div>

                  {/* Repeat intent helper */}
                  <div className="bg-white/60 border border-brand-neutralGray p-2.5 rounded-lg flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-brand-primary fill-brand-primaryLight" />
                    <span className="text-xs font-semibold text-brand-dark opacity-80">
                      <strong>{product.repeatIntent || 90}%</strong> of buyers will purchase this product again.
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-3 border-t border-brand-neutralGray/40">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    icon={ShoppingBag} 
                    onClick={() => handleBuy(product)}
                    className="font-bold w-full"
                  >
                    {t('buyNow')}
                  </Button>
                  {user?.role === 'entrepreneur' ? (
                    <Link to="/analytics" className="w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={MessageSquare} 
                        className="font-bold w-full"
                      >
                        {t('viewFeedback')}
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/feedback/${product._id}`} className="w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={MessageSquare} 
                        className="font-bold w-full"
                      >
                        {t('giveFeedback')}
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Trust & Verification Info section */}
      <section className="bg-white border border-brand-neutralGray rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="p-4 bg-brand-primaryLight rounded-2xl text-brand-primary border border-brand-primary/10">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-brand-dark">Supported by Chhattisgarh Women Empowerment Cells</h3>
          <p className="text-sm text-brand-dark opacity-80 leading-relaxed font-semibold">
            Every product purchased supports local millet farming and self-reliant women entrepreneurs in Dhamtari district, promoting health, organic grains, and rural employment.
          </p>
        </div>
      </section>

      {/* Simulated Purchase Success Modal */}
      <Modal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        title="Simulated Purchase Successful!"
        footer={
          <div className="flex gap-2 w-full justify-between items-center">
            {user?.role === 'entrepreneur' ? (
              <Link to="/analytics" className="w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={MessageSquare} 
                  onClick={() => setPurchaseModalOpen(false)}
                  className="w-full sm:w-auto font-bold"
                >
                  {t('viewFeedback')}
                </Button>
              </Link>
            ) : (
              <Link to={`/feedback/${purchasedProduct?._id}`} className="w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={MessageSquare} 
                  onClick={() => setPurchaseModalOpen(false)}
                  className="w-full sm:w-auto font-bold"
                >
                  {t('giveFeedback')}
                </Button>
              </Link>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPurchaseModalOpen(false)}
              className="w-full sm:w-auto font-bold"
            >
              Close
            </Button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
          <div className="w-16 h-16 bg-emerald-50 text-brand-primary rounded-full flex items-center justify-center border-2 border-brand-primary">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-brand-dark">
              Order Simulated for {purchasedProduct?.productName}!
            </h4>
            <p className="text-xs text-brand-primary font-bold mt-1 uppercase tracking-wide">
              Seller: {purchasedProduct?.shg || 'Mahila Jagriti SHG'}
            </p>
          </div>
          <p className="text-sm font-semibold text-brand-dark opacity-80 leading-relaxed max-w-sm">
            Thank you for testing the buying flow. Please help the SHG women refine their product taste and price suitability by submitting a quick buyer review.
          </p>
        </div>
      </Modal>

    </div>
  );
}
