import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, _] = useSearchParams();
  console.log(searchParams.get("keyword"));
  return <div>Search</div>;
}
