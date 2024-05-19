import React, { useEffect, useState } from "react";
import orderCoverImg from "../assets/shop/banner2.jpg";
import PageCover from "../components/PageCover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../hooks/useMenu";
import FoodCard from "../components/FoodCard";
const Order: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
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
  }, [tabIndex]);
  const foodItems = useMenu(menu);
  console.log(foodItems);
  return (
    <>
      <PageCover img={orderCoverImg} title="Order Food" />
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <div className="text-center">
            <TabList>
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
