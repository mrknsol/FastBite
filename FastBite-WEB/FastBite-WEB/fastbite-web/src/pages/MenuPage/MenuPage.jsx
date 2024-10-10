import { useEffect, useState, useRef } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { MenuList } from "../../menu.js";
import "./MenuPage.css";
import { addToOrder } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Notification } from "../../components/Notification/Notification";
 
export const MenuPage = () => {
  const [images, setImages] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [notification, setNotification] = useState({ message: '', visible: false });
  const categoryRefs = useRef({});
  const dispatch = useDispatch();

  const handleAddToOrder = (dish) => {
    dispatch(addToOrder(dish));
    showNotification(`${dish.dishName} added to your order!`);
  };

  const showNotification = (message) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      setNotification({ message: '', visible: false });
    }, 3000);
  };

  useEffect(() => {
    const loadImages = async () => {
      const newImages = {};
      for (const dish of MenuList) {
        try {
          const image = await import(
            `../../assets/dishPhotos/${dish.dishPhoto}`
          );
          newImages[dish.dishID] = image.default;
        } catch (err) {
          console.error(
            `Ошибка при загрузке изображения ${dish.dishPhoto}:`,
            err
          );
        }
      }
      setImages(newImages);
    };

    loadImages();
  }, []);

  const categories = ["Soups", "Salads", "Pasta", "Snacks", "Meat", "Desserts"];

  const scrollToCategory = (category) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ behavior: "smooth" });
      setActiveCategory(category);
    }
  };

  const handleScroll = () => {
    const offsets = categories.map((category) => {
      return {
        category,
        offset: categoryRefs.current[category]?.getBoundingClientRect().top,
      };
    });

    const visibleCategory = offsets.find(({ offset }) => offset >= 0);
    if (visibleCategory) {
      setActiveCategory(visibleCategory.category);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="MenuPage">
      <div className="MenuPage__left-side">
        <div className="MenuPage__background" />
        <span className="MenuPage__left-top">Check Out</span>
        <span className="MenuPage__left-bot">Our Menu</span>
        <Navbar />
      </div>
      <div className="MenuPage__right-side">
        <div className="MenuPage__right-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`MenuPage__right-item ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => scrollToCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="MenuPage__right-menulist">
          {categories.map((category) => (
            <div
              key={category}
              className="MenuPage__category-section"
              ref={(el) => (categoryRefs.current[category] = el)}
            >
              <h2 className="MenuPage__category-title">{category}</h2>
              {MenuList.filter((dish) => dish.dishCategory === category).map(
                (dish) => (
                  <div key={dish.dishID} className="MenuPage__card">
                    {images[dish.dishID] ? (
                      <img
                        src={images[dish.dishID]}
                        alt={dish.dishName}
                        className="MenuPage__card-image"
                      />
                    ) : (
                      <span>Loading...</span>

                    )}
                    <div className="MenuPage__card-desc">
                      <div className="MenuPage__card-desc-info">
                        <span className="card-name">{dish.dishName}</span>
                        <span className="card-desc">
                          {dish.dishDescription}
                        </span>
                      </div>
                        <div className="MenuPage__card-price-button">
                        <span className="MenuPage__card-price">
                          ${dish.dishPrice}
                        </span>
                        <button
                          onClick={() => handleAddToOrder(dish)}
                          className="add-to-order-button"
                        >
                          Add to Order
                        </button>
                        </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <Notification message={notification.message} visible={notification.visible} />
    </div>
  );
};
