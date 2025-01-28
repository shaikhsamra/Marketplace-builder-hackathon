"use client";
import React, { useState } from "react";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdKeyboardArrowRight } from "react-icons/md";

const Filter = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <div className="flex max-w-screen-2xl mx-auto p-4 md:p-10">
      {/* Shop Header */}
      <div className="md:hidden flex justify-center items-center w-full gap-10 mb-2">
        <h1 className="text-[23px] font-bold">Casual</h1>
        <p className="md:block text-[12px]">Showing 1-10 of 100 Products</p>
        {/* Button to toggle filter visibility */}
        <button
          className="bg-black text-white p-2 rounded-full shadow-lg md:hidden"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          <HiAdjustmentsVertical className="text-[20px]" />
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-gray-50 p-4 border shadow-lg rounded-xl border-gray-300 z-40 transform ${
          isFilterVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:static md:w-[310px] md:translate-x-0 overflow-y-auto`}
      >
        <h2 className="text-xl flex justify-between font-bold mb-6">
          Filters
          <HiAdjustmentsVertical className="text-2xl hidden" />
          <button
            onClick={() => setIsFilterVisible(false)}
            className="text-gray-500 text-xl md:hidden"
          >
            ✕
          </button>
        </h2>

        {/* Filter content */}
        <ul className="space-y-2 p-2 border-t">
          {["T-Shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((style) => (
            <li
              key={style}
              className="cursor-pointer hover:text-black flex justify-between items-center hover:bg-slate-100 rounded-xl py-2"
            >
              {style}
              <IoIosArrowForward />
            </li>
          ))}
        </ul>

        {/* Price Range */}
        <div className="mb-6 border-t p-2">
          <h3 className="text-lg font-semibold mb-2">Price</h3>
          <input type="range" min="50" max="200" className="w-full" />
          <div className="flex justify-between text-lg text-black">
            <span>$50</span>
            <span>$200</span>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6 border-t p-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Colors</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#00C12B",
                    "#F50606",
                    "#F5DD06",
                    "#F57906",
                    "#06CAF5",
                    "#063AF5",
                    "#7D06F5",
                    "#F506A4",
                    "#FFFFFF",
                    "#000000",
                  ].map((color) => (
                    <div
                      key={color}
                      className="w-10 h-10 rounded-full cursor-pointer border"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

           {/* Sizes */}
           <div className="mb-6 p-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Sizes</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "XX-Small",
                    "X-Small",
                    "Small",
                    "Medium",
                    "Large",
                    "X-Large",
                    "XX-Large",
                    "3X-Large",
                    "4x-Large",
                  ].map((size) => (
                    <button
                      key={size}
                      className="border rounded-[30px] px-8 py-3 text-sm hover:bg-black hover:text-white"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>


           {/* Dress Style */}
           <div className="mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Dress Style</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {["Casual", "Formal", "Party", "Gym"].map((style) => (
                    <li
                      key={style}
                      className="cursor-pointer hover:text-black flex justify-between items-center"
                    >
                      {style}
                      <MdKeyboardArrowRight />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Apply Filter Button */}
        <button className="w-full bg-black text-white py-2 mt-4 rounded-lg">
          Apply Filter
        </button>
      </aside>

      {/* Overlay for Mobile */}
      {isFilterVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsFilterVisible(false)}
        ></div>
      )}
    </div>
  );
};

export default Filter;
