import React, { useEffect, useRef } from "react";

const ReactGridLayout = ({ columns, numOfBoxes }) => {
  const gridRef = useRef(null);

  const numberToWords = (num) => {
    const singleDigits = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const doubleDigits = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    if (num < 0 || num > 99) {
      return "Number out of range";
    }

    if (num < 10) {
      return singleDigits[num];
    } else if (num >= 10 && num < 20) {
      return teens[num - 10];
    } else {
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      const tensStr = doubleDigits[tens];
      const onesStr = singleDigits[ones];
      return ones === 0 ? tensStr : `${tensStr} ${onesStr}`;
    }
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const boxNumber = entry.target.dataset.boxNumber;
        console.log(`${numberToWords(boxNumber)} WAS CALLED`);
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      observer.observe(box);
    });

    return () => {
      boxes.forEach((box) => {
        observer.unobserve(box);
      });
    };
  }, []);

  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "16px",
        width: "100%",
        height: "100vh",
        overflow: "auto",
        padding: "16px",
      }}
    >
      {Array.from({ length: numOfBoxes }, (_, index) => (
        <div
          key={index}
          className="box"
          data-box-number={index + 1}
          style={{
            background: "#f0f0f0",
            padding: "24px",
            backgroundColor: "#3498db",
            color: "#fff",
          }}
        >
          {numberToWords(index + 1)}
        </div>
      ))}
    </div>
  );
};

export default ReactGridLayout;
