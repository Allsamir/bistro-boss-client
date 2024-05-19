import React, { useEffect, useState } from "react";
import orderCoverImg from "../assets/shop/banner2.jpg";
import PageCover from "../components/PageCover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../hooks/useMenu";
import FoodCard from "../components/FoodCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order: React.FC = () => {
  const arryOfTabs = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const defaultCategory =
    category && arryOfTabs.includes(category) ? category : "salad";
  const initialIndex = arryOfTabs.indexOf(defaultCategory);
  const [tabIndex, setTabIndex] = useState<number>(initialIndex);
  const [menu, setMenu] = useState<string>("");
  useEffect(() => {
    if (tabIndex === 0) {
      setMenu("salad");
    } else if (tabIndex === 1) {
      setMenu("pizza");
    } else if (tabIndex === 2) {
      setMenu("soup");
    } else if (tabIndex === 3) {
      setMenu("dessert");
    } else {
      setMenu("drinks");
    }
  }, [tabIndex, category]);
  const foodItems = useMenu(menu);
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Order Food | {menu}</title>
      </Helmet>
      <PageCover img={orderCoverImg} title="Order Food" />
      <div className="my-24">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <div className="text-center">
            <TabList className={`mb-12 uppercase font-semibold`}>
              <Tab>Salad</Tab>
              <Tab>Pizza</Tab>
              <Tab>Soup</Tab>
              <Tab>Desserts</Tab>
              <Tab>Drinks</Tab>
            </TabList>
          </div>
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {foodItems.map((item, index) => (
                <FoodCard item={item} key={index} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {foodItems.map((item, index) => (
                <FoodCard item={item} key={index} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {foodItems.map((item, index) => (
                <FoodCard item={item} key={index} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {foodItems.map((item, index) => (
                <FoodCard item={item} key={index} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {foodItems.map((item, index) => (
                <FoodCard item={item} key={index} />
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Order;
