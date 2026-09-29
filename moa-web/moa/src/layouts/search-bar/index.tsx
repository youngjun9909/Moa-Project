/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import KeywordSearchGroupList from "./search-bar/KeywordSearchGroupList";
import CategorySearchList from "./category-bar/CategorySearchList";
import HobbyAndRegionCategory from "./category-bar/HobbyAndRegionCategory";

function SearchBarRoutes() {
  const location = useLocation();
  const [groupCategory, setGroupCategory] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div>
      {!location.pathname.includes("/searchresult/") && (
        <HobbyAndRegionCategory
          groupCategory={groupCategory}
          region={region}
          onCategoryChange={setGroupCategory}
          onRegionChange={setRegion}
        />
      )}
      <Routes>
        <Route path="/" element={<CategorySearchList groupCategory={groupCategory} region={region} onReset={() => { setGroupCategory(""); setRegion(""); }} />} />
        <Route
          path="/searchresult/:keyword"
          element={<KeywordSearchGroupList />}
        />
        <Route
          path="/categoryresult/:groupCategory/:region"
          element={<CategorySearchList groupCategory={groupCategory} region={region} onReset={() => { setGroupCategory(""); setRegion(""); }} />}
        />
      </Routes>
    </div>
  );
}

export default SearchBarRoutes;
